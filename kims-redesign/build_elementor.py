"""Convert the KIMS homepage HTML into an Elementor container-based template."""

from __future__ import annotations

import html
import json
import re
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "index.html"
OUTPUT = ROOT / "kims-homepage-revamp-elementor.json"

VOID_TAGS = {
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
}
CONTAINER_TAGS = {
    "article",
    "aside",
    "div",
    "details",
    "footer",
    "header",
    "main",
    "nav",
    "ol",
    "section",
    "ul",
}
WIDGET_TAGS = {"button", "details", "iframe", "label", "ol", "p", "select", "ul"}


class Element:
    def __init__(self, tag: str, attrs: list[tuple[str, str | None]] | None = None):
        self.tag = tag
        self.attrs = dict(attrs or [])
        self.children: list[Element | str] = []


class DocumentParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.root = Element("document")
        self.stack = [self.root]

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        node = Element(tag, attrs)
        self.stack[-1].children.append(node)
        if tag not in VOID_TAGS:
            self.stack.append(node)

    def handle_startendtag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        self.stack[-1].children.append(Element(tag, attrs))

    def handle_endtag(self, tag: str) -> None:
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                return

    def handle_data(self, data: str) -> None:
        self.stack[-1].children.append(data)


def find_first(node: Element, tag: str) -> Element | None:
    for child in node.children:
        if isinstance(child, Element):
            if child.tag == tag:
                return child
            found = find_first(child, tag)
            if found:
                return found
    return None


def serialize(node: Element | str) -> str:
    if isinstance(node, str):
        return html.escape(node, quote=False)
    attrs = "".join(
        f" {name}" if value is None else f' {name}="{html.escape(value, quote=True)}"'
        for name, value in node.attrs.items()
    )
    if node.tag in VOID_TAGS:
        return f"<{node.tag}{attrs}>"
    content = "".join(serialize(child) for child in node.children)
    return f"<{node.tag}{attrs}>{content}</{node.tag}>"


def descendants(node: Element):
    for child in node.children:
        if isinstance(child, Element):
            yield child
            yield from descendants(child)


def classes(node: Element) -> str:
    return " ".join(node.attrs.get("class", "").split())


def css_rules(css: str, conditions: tuple[str, ...] = ()):
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.S)
    position = 0
    while position < len(css):
        while position < len(css) and (css[position].isspace() or css[position] == ";"):
            position += 1
        opening = css.find("{", position)
        if opening < 0:
            return
        prelude = css[position:opening].strip()
        depth = 1
        closing = opening + 1
        while closing < len(css) and depth:
            if css[closing] == "{":
                depth += 1
            elif css[closing] == "}":
                depth -= 1
            closing += 1
        if depth:
            raise SystemExit("Unable to parse the source stylesheet")
        body = css[opening + 1 : closing - 1]
        position = closing
        if prelude.startswith(("@media", "@supports", "@container")):
            yield from css_rules(body, conditions + (prelude,))
        elif not prelude.startswith("@"):
            yield prelude, body, conditions


class ElementorConverter:
    def __init__(self, css: str):
        self.css = css
        self.counter = 0
        self.layout_rules: list[tuple[str, dict[str, str], tuple[str, ...]]] = []
        self._read_layout_rules()

    def new_id(self) -> str:
        self.counter += 1
        return f"{self.counter:07x}"

    def _read_layout_rules(self) -> None:
        for selectors, declarations, conditions in css_rules(self.css):
            properties = {}
            for declaration in declarations.split(";"):
                if ":" not in declaration:
                    continue
                name, value = declaration.split(":", 1)
                properties[name.strip().lower()] = value.strip()
            if not properties:
                continue
            self.layout_rules.append((selectors, properties, conditions))

    def css_layout_overrides(self) -> str:
        layout_properties = {
            "align-content",
            "align-items",
            "align-self",
            "column-gap",
            "display",
            "flex",
            "flex-direction",
            "flex-wrap",
            "gap",
            "grid-auto-columns",
            "grid-auto-flow",
            "grid-auto-rows",
            "grid-column",
            "grid-row",
            "grid-template-areas",
            "grid-template-columns",
            "grid-template-rows",
            "justify-content",
            "justify-items",
            "justify-self",
            "place-content",
            "place-items",
            "row-gap",
        }
        rules = [
            ".elementor-element.e-con{display:flex!important;min-width:0!important}"
            ".elementor-element.e-con>.e-con-inner>"
            ".elementor-element.e-con:not(.wrap){width:auto!important;min-width:0!important}"
            ".elementor-element.e-con>.e-con-inner>.elementor-widget{min-width:0!important}"
        ]
        for selector_group, declarations, conditions in self.layout_rules:
            layout = {
                name: value
                for name, value in declarations.items()
                if name in layout_properties
            }
            if not layout:
                continue
            rules_in_group = []
            for selector in selector_group.split(","):
                selector = selector.strip()
                if not re.search(r"\.[A-Za-z_-][\w-]*", selector):
                    continue
                elementor_selector = re.sub(
                    r"\.([A-Za-z_-][\w-]*)", r".elementor-element.\1", selector
                )
                css_declarations = ";".join(
                    f"{name}:{self._layout_value(name, value)}!important"
                    for name, value in layout.items()
                )
                rules_in_group.append(f"{elementor_selector}>.e-con-inner{{{css_declarations}}}")
                if layout.get("display") == "none":
                    rules_in_group.append(f"{elementor_selector}{{display:none!important}}")
            if rules_in_group:
                rule = "".join(rules_in_group)
                for condition in reversed(conditions):
                    rule = f"{condition}{{{rule}}}"
                rules.append(rule)
        rules.append(
            ".elementor-element.quick .elementor-element.wrap>.e-con-inner>"
            ".elementor-widget-text-editor:first-child{width:auto!important;flex:0 0 auto!important}"
            ".elementor-element.quick .elementor-element.wrap>.e-con-inner>"
            "a.elementor-element{width:auto!important;min-width:0;flex:1 1 0!important}"
            ".elementor-element.quick strong{font-family:var(--font)!important;"
            "font-size:.85rem!important;line-height:1.3!important}"
            "@media(max-width:600px){.elementor-element.quick .elementor-element.wrap>"
            ".e-con-inner>.elementor-widget-text-editor:first-child{grid-column:1/-1!important;"
            "width:auto!important;flex:auto!important}}"
        )
        return "".join(rules)

    @staticmethod
    def _layout_value(name: str, value: str) -> str:
        if name != "grid-template-columns":
            return value
        return re.sub(
            r"(?<![\w)])(\d*\.?\d+)fr",
            r"minmax(0,\1fr)",
            value,
        )

    @staticmethod
    def _matches_compound(node: Element, compound: str) -> bool:
        compound = re.sub(r":{1,2}[\w-]+(?:\([^)]*\))?", "", compound)
        tag = re.match(r"^[A-Za-z][\w-]*", compound)
        if tag and node.tag != tag.group(0).lower():
            return False
        selector_classes = re.findall(r"\.([A-Za-z_-][\w-]*)", compound)
        if not set(selector_classes).issubset(set(classes(node).split())):
            return False
        selector_ids = re.findall(r"#([A-Za-z_-][\w-]*)", compound)
        return all(node.attrs.get("id") == selector_id for selector_id in selector_ids)

    def _selector_matches(self, selector: str, node: Element, ancestors: tuple[Element, ...]) -> bool:
        compounds = [part for part in re.split(r"\s+|>", selector.strip()) if part]
        if not compounds or not self._matches_compound(node, compounds[-1]):
            return False
        ancestor_index = len(ancestors) - 1
        for compound in reversed(compounds[:-1]):
            while ancestor_index >= 0 and not self._matches_compound(
                ancestors[ancestor_index], compound
            ):
                ancestor_index -= 1
            if ancestor_index < 0:
                return False
            ancestor_index -= 1
        return True

    def _matching_layout_rules(
        self, node: Element, ancestors: tuple[Element, ...]
    ) -> list[dict[str, str]]:
        return [
            declarations
            for selector_group, declarations, _ in self.layout_rules
            if any(
                self._selector_matches(selector, node, ancestors)
                for selector in selector_group.split(",")
            )
        ]

    def _uses_layout(self, node: Element, ancestors: tuple[Element, ...]) -> bool:
        return any(
            rule.get("display") in {"flex", "grid"}
            for rule in self._matching_layout_rules(node, ancestors)
        )

    def _flex_direction(self, node: Element, ancestors: tuple[Element, ...]) -> str:
        direction = "column"
        for rule in self._matching_layout_rules(node, ancestors):
            if rule.get("display") == "flex":
                direction = rule.get("flex-direction", "row")
            elif rule.get("flex-direction") in {"row", "column"}:
                direction = rule["flex-direction"]
        return direction

    def _element_settings(self, node: Element) -> dict:
        settings = {}
        if classes(node):
            settings["css_classes"] = classes(node)
        if node.attrs.get("id"):
            settings["css_id"] = node.attrs["id"]
        return settings

    def _container(self, node: Element, ancestors: tuple[Element, ...] = ()) -> dict:
        element_id = self.new_id()
        direction = self._flex_direction(node, ancestors)
        settings = {
            "content_width": "full",
            "flex_direction": direction,
            "html_tag": node.tag,
            **self._element_settings(node),
        }
        custom_attributes = [
            f"{name}|{value or ''}"
            for name, value in node.attrs.items()
            if name not in {"class", "id"}
        ]
        if custom_attributes:
            settings["custom_attributes"] = "\n".join(custom_attributes)
        return {
            "id": element_id,
            "elType": "container",
            "isInner": False,
            "settings": settings,
            "elements": self._children(node, ancestors + (node,)),
        }

    def _widget(self, widget_type: str, settings: dict) -> dict:
        return {
            "id": self.new_id(),
            "elType": "widget",
            "widgetType": widget_type,
            "settings": settings,
            "elements": [],
        }

    def _text_widget(self, markup: str, node: Element | None = None) -> dict:
        settings = {"editor": markup}
        if node:
            settings.update(self._element_settings(node))
        return self._widget("text-editor", settings)

    def _html_widget(self, markup: str) -> dict:
        return self._widget("html", {"html": markup})

    def _image_widget(self, image: Element) -> dict:
        alt = image.attrs.get("alt", "")
        settings = {
            "image": {"id": 0, "url": image.attrs.get("src", ""), "alt": alt},
            "image_size": "full",
            "image_alt": alt,
            "caption_source": "none",
            "link_to": "none",
        }
        settings.update(self._element_settings(image))
        return self._widget("image", settings)

    def _convert_widget(self, node: Element) -> dict:
        if node.tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            return self._widget(
                "heading",
                {
                    "title": "".join(serialize(child) for child in node.children).strip(),
                    "header_size": "default",
                    "html_tag": node.tag,
                    **self._element_settings(node),
                },
            )
        if node.tag == "img":
            return self._image_widget(node)
        if node.tag in {"button", "select", "iframe"}:
            return self._html_widget(serialize(node))
        return self._text_widget(serialize(node), node)

    def _children(self, node: Element, ancestors: tuple[Element, ...]) -> list[dict]:
        elements = []
        inline_group: list[Element | str] = []

        def flush_inline() -> None:
            if inline_group:
                markup = "".join(serialize(child) for child in inline_group).strip()
                if markup:
                    elements.append(self._text_widget(markup))
                inline_group.clear()

        for child in node.children:
            if isinstance(child, str):
                if child.strip() or inline_group:
                    inline_group.append(child)
                continue
            if child.tag in CONTAINER_TAGS:
                flush_inline()
                elements.append(self._container(child, ancestors))
            elif child.tag == "a":
                if self._uses_layout(node, ancestors) or any(
                    isinstance(candidate, Element)
                    and (
                        candidate.tag in CONTAINER_TAGS
                        or candidate.tag == "img"
                        or candidate.tag == "a"
                    )
                    for candidate in child.children
                ):
                    flush_inline()
                    elements.append(self._container(child, ancestors))
                else:
                    inline_group.append(child)
            elif child.tag == "img":
                flush_inline()
                elements.append(self._image_widget(child))
            elif child.tag in WIDGET_TAGS or re.fullmatch(r"h[1-6]", child.tag):
                flush_inline()
                elements.append(self._convert_widget(child))
            else:
                inline_group.append(child)
        flush_inline()
        return elements

    def convert(self, body: Element, scripts: list[Element]) -> dict:
        style_markup = f"<style>{self.css}{self.css_layout_overrides()}</style>"
        content = [
            self._container(
                Element(
                    "div",
                    [("class", "kims-elementor-assets")],
                )
            )
        ]
        content[0]["elements"] = [self._html_widget(style_markup)]
        for child in body.children:
            if isinstance(child, Element) and child.tag == "script":
                continue
            if isinstance(child, str) and not child.strip():
                continue
            if isinstance(child, Element) and child.tag in CONTAINER_TAGS:
                content.append(self._container(child))
            elif isinstance(child, Element):
                content.append(
                    {
                        "id": self.new_id(),
                        "elType": "container",
                        "isInner": False,
                        "settings": {
                            "content_width": "full",
                            "flex_direction": "column",
                        },
                        "elements": [self._convert_widget(child)],
                    }
                )
        if scripts:
            script_html = "".join(serialize(script) for script in scripts)
            content.append(
                {
                    "id": self.new_id(),
                    "elType": "container",
                    "isInner": False,
                    "settings": {
                        "content_width": "full",
                        "flex_direction": "column",
                        "css_classes": "kims-elementor-scripts",
                    },
                    "elements": [self._html_widget(script_html)],
                }
            )
        return {
            "content": content,
            "page_settings": [],
            "version": "0.4",
            "title": "KIMS Homepage Revamp — PDF Design System",
            "type": "page",
        }


page = SOURCE.read_text(encoding="utf-8")
parser = DocumentParser()
parser.feed(page)
parser.close()
head = find_first(parser.root, "head")
body = find_first(parser.root, "body")
if not head or not body:
    raise SystemExit("HTML source needs both a head and a body")

style_node = find_first(head, "style")
if not style_node:
    raise SystemExit("HTML source needs a style block")
css = "".join(child for child in style_node.children if isinstance(child, str))
scripts = [child for child in body.children if isinstance(child, Element) and child.tag == "script"]
template = ElementorConverter(css).convert(body, scripts)

all_elements = []


def collect(elements: list[dict]) -> None:
    for element in elements:
        all_elements.append(element)
        collect(element.get("elements", []))


collect(template["content"])
element_ids = [element["id"] for element in all_elements]
if len(element_ids) != len(set(element_ids)):
    raise SystemExit("Elementor validation failed: duplicate element IDs")
if any(element["elType"] != "container" for element in template["content"]):
    raise SystemExit("Elementor validation failed: top-level elements must be containers")
image_widgets = sum(element.get("widgetType") == "image" for element in all_elements)
source_images = sum(node.tag == "img" for node in descendants(body))
if image_widgets != source_images:
    raise SystemExit(
        f"Elementor validation failed: converted {image_widgets} of {source_images} images"
    )
if sum(element.get("widgetType") == "heading" for element in all_elements) != sum(
    node.tag in {"h1", "h2", "h3", "h4", "h5", "h6"} for node in descendants(body)
):
    raise SystemExit("Elementor validation failed: not all source headings became heading widgets")


def template_structure(elements: list[dict]) -> list[tuple]:
    result = []
    for element in elements:
        settings = element.get("settings", {})
        tag = settings.get("html_tag")
        element_classes = settings.get("css_classes", "")
        if tag in CONTAINER_TAGS | {"a"} and element_classes != "kims-elementor-assets":
            custom_attributes = tuple(
                tuple(attribute.split("|", 1))
                for attribute in settings.get("custom_attributes", "").splitlines()
                if attribute
            )
            result.append(
                (
                    tag,
                    element_classes,
                    settings.get("css_id", ""),
                    custom_attributes,
                )
            )
        result.extend(template_structure(element.get("elements", [])))
    return result


converter = ElementorConverter(css)
layout_overrides = converter.css_layout_overrides()
required_layout_rules = (
    ".elementor-element.e-con{display:flex!important;min-width:0!important}",
    ".elementor-element.e-con>.e-con-inner>.elementor-element.e-con:not(.wrap)"
    "{width:auto!important;min-width:0!important}",
    ".elementor-element.quick .elementor-element.wrap>.e-con-inner{display:flex!important;",
    ".elementor-element.program-grid>.e-con-inner{display:grid!important;"
    "grid-template-columns:repeat(4,minmax(0,1fr))!important;",
    "@media(max-width:600px){.elementor-element.quick .elementor-element.wrap>"
    ".e-con-inner{display:grid!important;",
    "@media(max-width:600px){.elementor-element.quick .elementor-element.wrap>"
    ".e-con-inner>.elementor-widget-text-editor:first-child{grid-column:1/-1!important;",
    "@media(max-width:600px){.elementor-element.faculty-grid>.e-con-inner{"
    "grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important}",
)
if any(rule not in layout_overrides for rule in required_layout_rules):
    missing_rules = [rule for rule in required_layout_rules if rule not in layout_overrides]
    raise SystemExit(
        "Elementor validation failed: responsive container layout rules are missing: "
        + "; ".join(missing_rules)
    )
expected_structure = []


def collect_source_structure(node: Element, ancestors: tuple[Element, ...] = ()) -> None:
    for child in node.children:
        if not isinstance(child, Element):
            continue
        is_layout_link = child.tag == "a" and (
            converter._uses_layout(node, ancestors)
            or any(
                isinstance(grandchild, Element)
                and (grandchild.tag in CONTAINER_TAGS or grandchild.tag == "img")
                for grandchild in child.children
            )
        )
        if child.tag in CONTAINER_TAGS or is_layout_link:
            expected_structure.append(
                (
                    child.tag,
                    classes(child),
                    child.attrs.get("id", ""),
                    tuple(
                        (name, value or "")
                        for name, value in child.attrs.items()
                        if name not in {"class", "id"}
                    ),
                )
            )
        collect_source_structure(child, ancestors + (node,))


collect_source_structure(body)
if template_structure(template["content"]) != expected_structure:
    raise SystemExit(
        "Elementor validation failed: source container hierarchy, classes, "
        "IDs, or attributes were changed"
    )

OUTPUT.write_text(json.dumps(template, ensure_ascii=False, indent=2), encoding="utf-8")
print(
    f"Validation: OK — {len(all_elements)} elements, "
    f"{len(template['content'])} top-level containers: "
    f"{OUTPUT} ({OUTPUT.stat().st_size:,} bytes)"
)
