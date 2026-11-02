"""Build a native Elementor Container template from kims-redesign/index.html.

Run:  python build_container_template.py
Writes elementor-container-template.json next to this script and validates it.

The page is rebuilt with Flexbox/Grid containers and core (free) widgets:
heading, text-editor, button, image, icon-list, toggle, google_maps.
HTML widgets are used only for the shared CSS block and the interactive
"Where is your student now?" selector.
"""
import hashlib
import json
import pathlib
import re

HERE = pathlib.Path(__file__).parent
OUT = HERE / "elementor-container-template.json"
CSS_FILE = HERE / "kims-elementor-custom.css"

# Brand tokens (from :root in index.html)
NAVY, NAVY_DEEP, FOOT = "#10283b", "#0a1e2f", "#091b2a"
GOLD, GOLD_DARK, GOLD_LIGHT = "#d1a64a", "#9b6c18", "#f3e6c6"
IVORY, WHITE, SLATE, MIST, INK, LINE = "#f8f7f2", "#ffffff", "#647686", "#dce5ea", "#172b3a", "#d4dfe5"
FONT = "Helvetica"
SITE = "https://kims.edu.pk"
UP = SITE + "/wp-content/uploads"

_ids = set()
_counter = [0]


def eid():
    _counter[0] += 1
    value = hashlib.md5(f"kims-{_counter[0]}".encode()).hexdigest()[:7]
    assert value not in _ids
    _ids.add(value)
    return value


# ---------- setting helpers ----------

def px(size, unit="px"):
    return {"unit": unit, "size": size, "sizes": []}


def dims(top, right=None, bottom=None, left=None, unit="px"):
    right = top if right is None else right
    bottom = top if bottom is None else bottom
    left = right if left is None else left
    vals = [top, right, bottom, left]
    return {"unit": unit, "top": str(top), "right": str(right), "bottom": str(bottom),
            "left": str(left), "isLinked": len(set(vals)) == 1}


def gap(size, row=None):
    row = size if row is None else row
    return {"column": str(size), "row": str(row), "isLinked": size == row, "unit": "px", "size": size}


def resp(key, desktop=None, tablet=None, mobile=None):
    out = {}
    if desktop is not None:
        out[key] = desktop
    if tablet is not None:
        out[key + "_tablet"] = tablet
    if mobile is not None:
        out[key + "_mobile"] = mobile
    return out


def typo(size, weight="400", lh=None, ls=None, transform=None, prefix="typography", t=None, m=None):
    """Font size in px; desktop/tablet/mobile; letter-spacing in px."""
    s = {f"{prefix}_typography": "custom", f"{prefix}_font_family": FONT,
         f"{prefix}_font_size": px(size), f"{prefix}_font_weight": str(weight)}
    if t is not None:
        s[f"{prefix}_font_size_tablet"] = px(t)
    if m is not None:
        s[f"{prefix}_font_size_mobile"] = px(m)
    if lh is not None:
        s[f"{prefix}_line_height"] = px(lh, "em")
    if ls is not None:
        s[f"{prefix}_letter_spacing"] = px(ls)
    if transform:
        s[f"{prefix}_text_transform"] = transform
    return s


def link(url):
    return {"url": url, "is_external": "", "nofollow": "", "custom_attributes": ""}


def bg(color):
    return {"background_background": "classic", "background_color": color}


def border(width, color, style="solid"):
    w = dims(*width) if isinstance(width, tuple) else dims(width)
    return {"border_border": style, "border_width": w, "border_color": color}


def shadow(v, blur, color, h=0, spread=0):
    return {"box_shadow_box_shadow_type": "yes",
            "box_shadow_box_shadow": {"horizontal": h, "vertical": v, "blur": blur, "spread": spread, "color": color}}


def hide(*devices):
    return {f"hide_{d}": f"hidden-{d}" for d in devices}


# ---------- element builders ----------

def con(*children, **s):
    settings = {"content_width": "full", "flex_direction": "column"}
    settings.update(s)
    # Elementor containers default to 10px padding and the kit's 20px widget gap; match the HTML instead.
    settings.setdefault("padding", dims(0))
    settings.setdefault("flex_gap", gap(0))
    # On mobile Elementor forces child containers to 100% width; keep fixed-size boxes (marks, bubbles) fixed.
    if settings.get("width") and "width_mobile" not in settings:
        settings["width_mobile"] = settings["width"]
    return {"id": eid(), "elType": "container", "isInner": False, "settings": settings, "elements": list(children)}


def row(*children, **s):
    # Elementor wraps every flex row on mobile by default; rows that should stack say so explicitly.
    base = {"flex_direction": "row", "flex_wrap_mobile": s.get("flex_wrap", "nowrap")}
    base.update(s)
    return con(*children, **base)


def grid(cols, *children, t=None, m=1, g=16, **s):
    settings = {"container_type": "grid", "grid_columns_grid": px(cols, "fr"),
                "grid_rows_grid": px(1, "fr"), "grid_gaps": {"column": str(g), "row": str(g), "isLinked": True, "unit": "px"},
                "grid_auto_flow": "row"}
    if t is not None:
        settings["grid_columns_grid_tablet"] = px(t, "fr")
    if m is not None:
        settings["grid_columns_grid_mobile"] = px(m, "fr")
    settings.pop("flex_direction", None)
    settings.update(s)
    c = con(*children, **settings)
    c["settings"].pop("flex_direction", None)
    return c


def section(sid, color, *children, pad=96, pad_m=72, cls="", **s):
    """Top-level boxed section, 1240px content, matching .section/.wrap."""
    settings = {"content_width": "boxed", "boxed_width": px(1240), "flex_direction": "column",
                "flex_gap": gap(0), "html_tag": "section", "css_classes": ("kims " + cls).strip(),
                "padding": dims(pad, 32), "padding_tablet": dims(pad, 32), "padding_mobile": dims(pad_m, 16)}
    settings.update(bg(color))
    if sid:
        settings["_element_id"] = sid
    settings.update(s)
    return {"id": eid(), "elType": "container", "isInner": False, "settings": settings, "elements": list(children)}


def widget(kind, **s):
    # Widgets keep their CSS classes under "_css_classes"; "css_classes" only exists on containers.
    if "css_classes" in s:
        s["_css_classes"] = s.pop("css_classes")
    return {"id": eid(), "elType": "widget", "isInner": False, "settings": s, "elements": [], "widgetType": kind}


def heading(text, tag="h2", color=NAVY, url=None, **s):
    st = {"title": text, "header_size": tag, "title_color": color}
    if url:
        st["link"] = link(url)
    st.update(s)
    return widget("heading", **st)


def h2(text, color=NAVY, **s):
    st = typo(57.6, "700", 1.12, -2.6, t=46, m=36)
    st["typography_letter_spacing_mobile"] = px(-1.6)
    st.update(s)
    return heading(text, "h2", color, **st)


def h3(text, color=NAVY, size=20.8, m=None, **s):
    st = typo(size, "700", 1.12, -0.9, m=m)
    st.update(s)
    return heading(text, "h3", color, **st)


def eyebrow(text, light=False):
    st = typo(11.5, "700", 1.65, 1.6, "uppercase")
    return heading(text, "span", GOLD if light else GOLD_DARK, css_classes="kims-eyebrow", **st)


def small_label(text, color=GOLD_DARK, size=10.6, ls=1.4):
    return heading(text, "span", color, **typo(size, "700", 1.4, ls, "uppercase"))


def text(html, color=SLATE, size=16, lh=1.65, **s):
    st = {"editor": html if html.startswith("<") else f"<p>{html}</p>", "text_color": color}
    st.update(typo(size, "400", lh))
    st.update(s)
    return widget("text-editor", **st)


def button(label, url, style="gold", **s):
    palette = {
        "gold": (NAVY, GOLD, NAVY, "#e0ba67", None),
        "navy": (WHITE, NAVY, WHITE, NAVY_DEEP, None),
        "outline": (WHITE, "rgba(255,255,255,0)", WHITE, "rgba(255,255,255,0.07)", "rgba(255,255,255,0.54)"),
    }[style]
    fg, bgc, hfg, hbg, bcolor = palette
    st = {"text": label, "link": link(url), "size": "sm", "button_text_color": fg,
          "background_background": "classic", "background_color": bgc, "hover_color": hfg,
          "button_background_hover_background": "classic", "button_background_hover_color": hbg,
          "border_radius": dims(4), "text_padding": dims(16, 22), "css_classes": "kims-btn"}
    st.update(typo(13.1, "700", 1.3))
    st.update(border(1, bcolor or bgc))
    if style == "outline":
        st["button_hover_border_color"] = WHITE
    st.update(s)
    return widget("button", **st)


def text_link(label, url, color=NAVY, **s):
    """.text-link: bold inline link with an arrow, styled as a bare button."""
    st = {"text": label, "link": link(url), "size": "sm", "button_text_color": color, "hover_color": color,
          "background_background": "classic", "background_color": "rgba(0,0,0,0)",
          "button_background_hover_background": "classic", "button_background_hover_color": "rgba(0,0,0,0)",
          "text_padding": dims(0), "border_radius": dims(0), "css_classes": "kims-text-link"}
    st.update(typo(13.4, "700", 1.4))
    st.update(s)
    return widget("button", **st)


def image(url, alt, h, t=None, m=None, **s):
    st = {"image": {"url": url, "id": "", "alt": alt, "source": "url"}, "image_size": "full",
          "width": px(100, "%"), "height": px(h), "object-fit": "cover", "object-position": "center center"}
    if t is not None:
        st["height_tablet"] = px(t)
    if m is not None:
        st["height_mobile"] = px(m)
    st.update(s)
    return widget("image", **st)


def icon_list(items, view="inline", color=INK, hover=None, size=12.6, space=23, icon=None, **s):
    entries = []
    for item in items:
        label, url = item if isinstance(item, tuple) else (item, None)
        e = {"_id": eid(), "text": label,
             "selected_icon": {"value": icon, "library": "fa-solid"} if icon else {"value": "", "library": ""}}
        if url:
            e["link"] = link(url)
        entries.append(e)
    st = {"icon_list": entries, "view": view, "space_between": px(space), "text_color": color,
          "text_color_hover": hover or color, "text_indent": px(8 if icon else 0)}
    st.update(typo(size, "700", 1.5, prefix="icon_typography"))
    st.update(s)
    return widget("icon-list", **st)


def card(*children, color=WHITE, pad=None, line=LINE, **s):
    st = bg(color)
    if line:
        st.update(border(1, line))
    if pad is not None:
        st["padding"] = dims(pad)
    st["flex_gap"] = gap(0)
    st.update(s)
    return con(*children, **st)


def section_head(eye, title, desc, light=False):
    """.section-head: title block left, short intro right, aligned to bottom."""
    title_color = WHITE if light else NAVY
    desc_color = "#c6d3dc" if light else SLATE
    left = con(eyebrow(eye, light), h2(title, title_color), flex_gap=gap(12), width=px(720),
               width_tablet=px(60, "%"), width_mobile=px(100, "%"))
    right = text(desc, desc_color, width=None)
    right["settings"]["_element_width"] = "initial"
    right["settings"]["_element_custom_width"] = px(360)
    right["settings"]["_element_custom_width_tablet"] = px(36, "%")
    right["settings"]["_element_custom_width_mobile"] = px(100, "%")
    return row(left, right, flex_justify_content="space-between", flex_align_items="flex-end",
               flex_gap=gap(36), flex_direction_mobile="column", flex_align_items_mobile="flex-start",
               flex_gap_mobile=gap(16), margin=dims(0, 0, 34, 0))


def actions(*buttons, **s):
    st = {"flex_gap": gap(12), "flex_wrap": "wrap", "flex_align_items": "center"}
    st.update(s)
    return row(*buttons, **st)


# ---------- sections ----------

def custom_css_widget():
    css = CSS_FILE.read_text(encoding="utf-8")
    return con(widget("html", html=f"<style>\n{css}</style>", _title="KIMS custom CSS (see kims-elementor-custom.css)"),
               css_classes="kims-css-holder", padding=dims(0), flex_gap=gap(0))


def utility_bar():
    loc = text("3-C Zahoor Elahi Road, Gulberg II, Lahore", "#d9e4e9", 12, 1.4, **hide("mobile"))
    links = icon_list([("Call +92 303 444 3804", "tel:+923034443804"), ("admin@kims.edu.pk", "mailto:admin@kims.edu.pk")],
                      color="#d9e4e9", hover=WHITE, size=12, space=22, css_classes="kims-utility-links",
                      icon_typography_font_weight="400", icon_typography_font_size_mobile=px(11))
    s = section(None, NAVY_DEEP, row(loc, links, flex_justify_content="space-between", flex_align_items="center",
                                     flex_gap=gap(20), flex_justify_content_mobile="center"),
                pad=0, pad_m=0, html_tag="div", min_height=px(36), flex_justify_content="center")
    s["settings"]["padding"] = dims(8, 32)
    s["settings"]["padding_tablet"] = dims(8, 32)
    s["settings"]["padding_mobile"] = dims(6, 16)
    return s


def header():
    logo = image(UP + "/2026/04/White-logo-kims.png", "KIMS logo", 48, width=px(142), width_mobile=px(112),
                 **{"object-fit": "contain", "link_to": "custom", "link": link("#top")})
    brand = con(logo, **bg(NAVY), padding=dims(7, 13), border_radius=dims(2), width=px(168), width_mobile=px(138),
                flex_gap=gap(0), _flex_size="none", css_classes="kims-brand")
    nav = icon_list([("Programmes", "#programmes"), ("Admissions", "#admissions"), ("Campus life", "#campus"),
                     ("Results", "#results"), ("About", "#why"), ("Contact", "#contact")],
                    color=NAVY, hover=GOLD_DARK, size=12.6, space=23, space_between_tablet=px(13),
                    icon_typography_font_size_tablet=px(11.5), icon_typography_font_size_mobile=px(13),
                    space_between_mobile=px(14), css_classes="kims-nav")
    cta = button("Explore admissions ↗", SITE + "/admissions/", "navy", **hide("tablet", "mobile"))
    inner = row(brand, nav, cta, flex_justify_content="space-between", flex_align_items="center", flex_gap=gap(32),
                flex_gap_tablet=gap(20), flex_wrap_mobile="wrap", flex_gap_mobile=gap(10),
                flex_justify_content_mobile="center", min_height=px(82), min_height_mobile=px(70))
    s = section(None, WHITE, inner, pad=0, pad_m=0, html_tag="header", cls="kims-sticky-header",
                **shadow(1, 0, LINE))
    s["settings"]["padding_mobile"] = dims(10, 16)
    s["settings"]["padding"] = dims(0, 32)
    s["settings"]["padding_tablet"] = dims(0, 32)
    return s


def hero():
    h1 = heading('A strong start.<br><span class="kims-gold">A clear next step.</span>', "h1", WHITE,
                 **typo(76, "700", 1.12, -3.4, t=56, m=44), typography_letter_spacing_mobile=px(-2),
                 _margin=dims(6, 0, 14, 0))
    lead = text("From the middle years to O and A Levels, KIMS helps students build the knowledge, confidence and "
                "direction to shape what comes next.", MIST, 17.9, 1.75, typography_font_size_mobile=px(16),
                _element_width="initial", _element_custom_width=px(550), _element_custom_width_mobile=px(100, "%"))
    btns = actions(button("Explore admissions ↗", SITE + "/admissions/", "gold"),
                   button("Plan a campus visit", SITE + "/contact-us/", "outline"), margin=dims(18, 0, 0, 0))
    proof = icon_list(["Established 1993", "Cambridge O & A Levels", "Gulberg II, Lahore"], color="#e8eef1",
                      size=12.2, space=25, icon="fas fa-circle", icon_color=GOLD, icon_size=px(6),
                      space_between_mobile=px(16), _margin=dims(20, 0, 0, 0))
    copy = con(eyebrow("Cambridge education · Gulberg, Lahore", True), h1, lead, btns, proof,
               width=px(47.5, "%"), width_tablet=px(50, "%"), width_mobile=px(100, "%"),
               padding=dims(68, 56, 68, 0), padding_tablet=dims(64, 32, 64, 0), padding_mobile=dims(52, 0, 35, 0),
               flex_justify_content="center", flex_gap=gap(12))
    caption = con(heading("Learn with direction.", "h3", NAVY, **typo(16, "700", 1.4)),
                  text("Explore a connected pathway from Grade VI to A Level.", NAVY, 13.8, 1.55),
                  **bg(WHITE), **border((0, 0, 0, 4), GOLD), **shadow(16, 40, "rgba(0,23,39,0.23)"),
                  padding=dims(18, 22), width=px(315), width_mobile=px(100, "%"), flex_gap=gap(2),
                  css_classes="kims-hero-caption")
    media = con(caption,
                background_background="classic", background_image={"url": UP + "/2026/04/Study-at-KIMS.webp", "id": "",
                                                                   "alt": "Students at KIMS Lahore", "source": "url"},
                background_position="center center", background_size="cover", background_repeat="no-repeat",
                background_overlay_background="gradient", background_overlay_color="rgba(16,40,59,0.8)",
                background_overlay_color_stop=px(0, "%"), background_overlay_color_b="rgba(16,40,59,0)",
                background_overlay_color_b_stop=px(42, "%"), background_overlay_gradient_type="linear",
                background_overlay_gradient_angle=px(0, "deg"),
                width=px(52.5, "%"), width_tablet=px(50, "%"), width_mobile=px(100, "%"),
                min_height=px(610), min_height_tablet=px(520), min_height_mobile=px(300),
                flex_justify_content="flex-end", flex_align_items="flex-end",
                padding=dims(42, 40), padding_mobile=dims(20, 16), css_classes="kims-hero-media")
    s = section("top", NAVY, row(copy, media, flex_gap=gap(0), flex_direction_mobile="column",
                                 flex_align_items="stretch"),
                pad=0, pad_m=0, overflow="hidden", cls="kims-hero")
    s["settings"]["padding"] = dims(0, 32)
    s["settings"]["padding_tablet"] = dims(0, 32)
    s["settings"]["padding_mobile"] = dims(0, 16)
    return s


def quick_bar():
    intro = heading("What would you like to explore?", "span", NAVY, **typo(13.6, "700", 1.4),
                    _element_width_mobile="initial", _element_custom_width_mobile=px(100, "%"),
                    _margin_mobile=dims(0, 0, 4, 0))
    links = []
    items = [("Admissions process ↗", SITE + "/admissions/"),
             ("2026–27 fee guide ↗", UP + "/2026/04/Fee-Structure-2026-2027.pdf"),
             ("Find the campus ↗", "#contact")]
    for i, (label, url) in enumerate(items):
        w = text_link(label, url, NAVY, align="justify", text_padding=dims(11, 18), text_padding_mobile=dims(11, 10),
                      border_border="solid", border_width=dims(0, 0, 0, 1), border_width_mobile=dims(1, 0, 0, 0),
                      border_color="rgba(16,40,59,0.25)", typography_font_size=px(13),
                      _element_width="initial", _element_custom_width=px(240),
                      _element_custom_width_mobile=px(100 if i == 2 else 50, "%"))
        w["settings"]["css_classes"] = "kims-text-link kims-quick-link"
        links.append(w)
    s = section(None, GOLD, row(intro, *links, flex_justify_content="space-between", flex_align_items="center",
                                flex_gap=gap(10), flex_wrap_mobile="wrap", flex_gap_mobile=gap(0)),
                pad=0, pad_m=0, html_tag="div", min_height=px(72), flex_justify_content="center")
    s["settings"]["padding"] = dims(10, 32)
    s["settings"]["padding_tablet"] = dims(10, 32)
    s["settings"]["padding_mobile"] = dims(12, 16)
    return s


def programmes():
    data = [
        ("41b0afe9-536d-42ab-a6ca-16fcec45b6d1-819x1024.webp", "Middle school learning at KIMS", "Foundation · Grades VI–VIII",
         "Middle school", "Build strong foundations before the Cambridge pathway.", "Explore middle school ↗", "/gr-vi-viii/"),
        ("2-iMAGE-WEB-819x1024-1.webp", "KIMS O Level student", "Cambridge", "O Level",
         "A focused two-year programme with guidance for subject choices.", "Explore O Level ↗", "/o-level-programme/"),
        ("Web-site-image-819x1024-1.webp", "KIMS A Level learning", "Cambridge", "A Level",
         "Develop subject depth and plan for your next academic step.", "Explore A Level ↗", "/a-level/"),
        ("Web-image-3-819x1024-1.webp", "Primary learners at Lahore School of Learning", "LSL · Separate campus",
         "Playgroup–Grade V", "Early years and primary learning at Lahore School of Learning in Gulberg III.",
         "Explore LSL ↗", "/playgroup-to-grade-v/"),
    ]
    cards = []
    for img, alt, tag, title, body, cta, path in data:
        copy = con(small_label(tag, size=10.6, ls=1.4), h3(title, _margin=dims(4, 0, 0, 0)),
                   text(body, SLATE, 14.1, 1.6, _flex_size="grow"), text_link(cta, SITE + path),
                   padding=dims(22), padding_mobile=dims(18), flex_gap=gap(8), _flex_size="grow")
        cards.append(card(image(UP + "/2026/04/" + img, alt, 224, t=340, m=240), copy,
                          css_classes="kims-lift"))
    return section("programmes", IVORY,
                   section_head("Learning at KIMS", "Choose the stage that<br>fits your student.",
                                "A connected pathway, with academic focus and support at each step."),
                   grid(4, *cards, t=2))


PATH_WIDGET = """<div class="kims-path">
  <label for="kims-current-stage">Current grade or programme</label>
  <select id="kims-current-stage">
    <option value="">Choose a stage</option>
    <option value="grade7">Grade VII</option>
    <option value="grade8">Grade VIII</option>
    <option value="olevel">O Level</option>
    <option value="alevel">A Level</option>
    <option value="primary">Playgroup–Grade V</option>
  </select>
  <div class="kims-path-result" id="kims-path-result" aria-live="polite">
    <small>Your suggested next step</small>
    <h3>Start with your student’s current stage.</h3>
    <p>See which programme to explore next and where to ask questions.</p>
    <a class="kims-path-link" href="https://kims.edu.pk/admissions/">View admissions ↗</a>
  </div>
</div>
<script>
(function(){
  var select=document.getElementById('kims-current-stage');
  var result=document.getElementById('kims-path-result');
  if(!select||!result){return;}
  var fallback=result.innerHTML;
  var nextStep={
    grade7:{title:'Build your middle school foundation',text:'Explore Grades VI–VIII at KIMS and plan the transition to Cambridge.',href:'https://kims.edu.pk/gr-vi-viii/',label:'Explore middle school ↗'},
    grade8:{title:'Explore the two-year O Level programme',text:'See programme details, subject options and current admission information.',href:'https://kims.edu.pk/o-level-programme/',label:'Explore O Level ↗'},
    olevel:{title:'Plan the next step after O Level',text:'Explore A Level options and ask KIMS about subject choices and guidance.',href:'https://kims.edu.pk/a-level/',label:'Explore A Level ↗'},
    alevel:{title:'Talk through your next step',text:'Contact KIMS for guidance on applications and university planning.',href:'https://kims.edu.pk/contact-us/',label:'Contact KIMS ↗'},
    primary:{title:'Explore early years and primary',text:'Playgroup–Grade V is offered by Lahore School of Learning at a separate Gulberg III campus.',href:'https://kims.edu.pk/playgroup-to-grade-v/',label:'Explore LSL ↗'}
  };
  select.addEventListener('change',function(){
    var item=nextStep[select.value];
    if(!item){result.innerHTML=fallback;return;}
    result.innerHTML='<small>Your suggested next step</small><h3>'+item.title+'</h3><p>'+item.text+'</p><a class="kims-path-link" href="'+item.href+'">'+item.label+'</a>';
  });
})();
</script>"""


def pathway():
    steps = []
    for big, label in [("VI–VIII", "Middle school"), ("O", "O Level"), ("A", "A Level")]:
        steps.append(con(heading(big, "span", GOLD_DARK, **typo(25.6, "700", 1.3, m=20.8)),
                         heading(label, "span", INK, **typo(16, "700", 1.5)),
                         **bg("#f8fbfc"), padding=dims(20), padding_mobile=dims(13), flex_gap=gap(2),
                         flex_direction_mobile="row", flex_align_items_mobile="center", flex_gap_mobile=gap(18)))
    path_line = grid(3, *steps, m=1, g=1, **bg("#b9cbd4"), **border(1, "#b9cbd4"), margin=dims(24, 0, 0, 0))
    left = con(eyebrow("Find the right next step"), h2("Where is your student now?"),
               text("Choose a current stage and we’ll point you to the most relevant programme information.",
                    SLATE, _margin=dims(8, 0, 0, 0)),
               path_line, flex_gap=gap(12))
    panel = con(widget("html", html=PATH_WIDGET, _title="Pathway selector (interactive)"),
                **bg(WHITE), **shadow(20, 50, "rgba(16,40,59,0.08)"), padding=dims(32), padding_mobile=dims(20))
    return section(None, MIST, grid(2, left, panel, m=1, g=70, grid_gaps_mobile={"column": "34", "row": "34",
                                                                                   "isLinked": True, "unit": "px"},
                                    grid_align_items="start"))


def why():
    photo = con(heading("Learning in Lahore since 1993", "span", WHITE, **typo(16, "700", 1.4),
                        _background_background="classic", _background_color=NAVY, _padding=dims(16, 22),
                        _element_width="auto"),
                background_background="classic",
                background_image={"url": UP + "/2026/04/Group-Discussion-.webp", "id": "",
                                  "alt": "KIMS students in a group discussion", "source": "url"},
                background_position="center center", background_size="cover",
                min_height=px(470), min_height_tablet=px(360), min_height_mobile=px(286),
                flex_justify_content="flex-end", flex_align_items="flex-start", padding=dims(0))
    reasons = []
    for title, body in [("Experienced teaching", "Meet the people behind the learning."),
                        ("Academic guidance", "Support with subjects and next steps."),
                        ("Campus life", "Learning beyond the classroom."),
                        ("Scholarships", "Review the current policy and eligibility.")]:
        reasons.append(con(heading(title, "span", INK, **typo(14.4, "700", 1.5)), text(body, SLATE, 13.3, 1.5),
                           **border((1, 0, 0, 0), LINE), padding=dims(13, 0, 0, 0), flex_gap=gap(2)))
    copy = con(eyebrow("Why KIMS"), h2("Experience that makes room for every learner."),
               text("KIMS has supported students through important academic choices for more than three decades. "
                    "A purpose-built campus, experienced faculty and guidance help students move forward with purpose.",
                    SLATE, _margin=dims(8, 0, 18, 0), _element_width="initial", _element_custom_width=px(560),
                    _element_custom_width_mobile=px(100, "%")),
               grid(2, *reasons, m=1, g=18),
               text_link("Learn about KIMS ↗", SITE + "/about-us/", _margin=dims(12, 0, 0, 0)), flex_gap=gap(12))
    return section("why", WHITE, grid(2, photo, copy, m=1, g=68, grid_align_items="center",
                                      grid_gaps_mobile={"column": "34", "row": "34", "isLinked": True, "unit": "px"}))


def outcomes():
    cards = []
    for tag, title, body, cta, url in [
        ("01 / Examination outcomes", "Cambridge achievements",
         "Read verified distinctions and updates from KIMS. Ask the school for the latest exam session results.",
         "Explore updates ↗", "/announcements/"),
        ("02 / Alumni", "Paths beyond KIMS", "Discover how former students continued their studies and careers.",
         "Meet KIMS alumni ↗", "/alumni/"),
        ("03 / Guidance", "Plan what comes next",
         "Discuss subjects, university applications and future goals with the KIMS team.",
         "Ask about guidance ↗", "/contact-us/")]:
        cards.append(card(small_label(tag, GOLD, 11.2, 1.2), h3(title, WHITE, _margin=dims(12, 0, 0, 0)),
                          text(body, "#c6d3dc", 14.4, _flex_size="grow"), text_link(cta, SITE + url, GOLD),
                          color="rgba(255,255,255,0.04)", line="rgba(255,255,255,0.24)", pad=30, flex_gap=gap(10)))
    return section("results", NAVY,
                   section_head("Academic outcomes", "Results that open<br>new pathways.",
                                "Explore school achievements, alumni journeys and guidance for future choices.", True),
                   grid(3, *cards, t=3))


def campus():
    cards = []
    for img, alt, title, path in [
        ("Chemistry-Biology-Lab.webp", "Chemistry and biology laboratory at KIMS", "Science & technology", "/science-labs/"),
        ("Library-1.webp", "Library at KIMS", "Library & learning", "/library/"),
        ("Sports-Areas.jpg", "Sports areas at KIMS", "Sports & wellbeing", "/sports-areas/"),
        ("Seminar-at-KIMS-1024x1016.webp", "Student event at KIMS", "Clubs & activities", "/news-events/")]:
        cards.append(con(h3(title, WHITE, 17.3, m=15.2),
                         html_tag="a", link=link(SITE + path),
                         background_background="classic",
                         background_image={"url": UP + "/2026/04/" + img, "id": "", "alt": alt, "source": "url"},
                         background_position="center center", background_size="cover",
                         background_overlay_background="gradient", background_overlay_color="rgba(6,21,34,0.79)",
                         background_overlay_color_stop=px(0, "%"), background_overlay_color_b="rgba(6,21,34,0)",
                         background_overlay_color_b_stop=px(70, "%"), background_overlay_gradient_type="linear",
                         background_overlay_gradient_angle=px(0, "deg"),
                         min_height=px(300), min_height_mobile=px(220), flex_justify_content="flex-end",
                         padding=dims(18, 20), padding_mobile=dims(12), overflow="hidden",
                         css_classes="kims-campus-card"))
    return section("campus", IVORY,
                   section_head("Beyond the classroom", "Explore life at KIMS.",
                                "Discover the facilities and activities that shape the school day."),
                   grid(4, *cards, t=2, m=2, g=12))


def faculty():
    cards = []
    for img, name, subject, quals in [
        ("Untitled-design-9-1024x1024.webp", "Kamran Malik", "Economics & business", "Principal · MBA, M.A. Economics"),
        ("29-1024x1024.webp", "Nauman Malik", "Accounting", "MBA Finance, MS Accounting, FCMA"),
        ("25-1024x1024.webp", "Shakeel Ahmed", "O Level physics", "M.Sc. Physics"),
        ("12-1024x1024.webp", "Shazia Hashmi", "Middle school mathematics", "M.A. Pure Mathematics")]:
        body = con(small_label(subject, "#966b1d", 11.2, 1),
                   h3(name, m=16, _margin=dims(4, 0, 0, 0)),
                   text(quals, SLATE, 13.3, 1.5, typography_font_size_mobile=px(12)),
                   padding=dims(20), padding_mobile=dims(14), flex_gap=gap(2))
        cards.append(card(image(UP + "/2026/07/" + img, name, 298, t=380, m=170), body, color=IVORY))
    return section("faculty", WHITE,
                   section_head("Meet the faculty", "People who know their subjects<br>and their students.",
                                "Explore the experience and qualifications of KIMS teachers."),
                   grid(4, *cards, t=2, m=2),
                   text_link("Meet all KIMS faculty ↗", SITE + "/faculties/", _margin=dims(24, 0, 0, 0)),
                   flex_align_items="flex-start")


def admissions():
    steps = []
    for n, title, body in [("01", "Register", "Complete the admission form and provide the required documents."),
                           ("02", "Application review", "Previous results are reviewed; an admission test may be required."),
                           ("03", "Confirm admission", "After an offer, review the fee details and complete payment.")]:
        steps.append(card(heading(n, "span", GOLD_DARK, **typo(32, "700", 1)),
                          h3(title, _margin=dims(20, 0, 0, 0)), text(body, SLATE, 14.4),
                          line=None, **border((4, 0, 0, 0), GOLD), pad=28, flex_gap=gap(8)))
    return section("admissions", MIST,
                   section_head("Admissions", "Your next step, made clear.",
                                "Confirm current availability, dates and requirements with the admissions office."),
                   grid(3, *steps, t=3, margin=dims(0, 0, 28, 0)),
                   actions(button("Start an application ↗", SITE + "/admission-form/", "navy"),
                           text_link("Read admissions details ↗", SITE + "/admissions/"), flex_gap=gap(24)))


def support():
    cards = []
    for tag, title, body, cta, url in [
        ("GUIDANCE", "Academic planning", "Explore subjects, study goals and the next stage of learning.",
         "Speak with KIMS ↗", "/contact-us/"),
        ("FUTURE PATHS", "University counselling", "Ask about applications and pathways suited to each student.",
         "Explore alumni journeys ↗", "/alumni/"),
        ("COMMUNITY", "Campus activities", "See opportunities to learn, compete and collaborate with others.",
         "Explore events ↗", "/news-events/")]:
        cards.append(card(small_label(tag, GOLD_DARK, 12, 1.2), h3(title, _margin=dims(14, 0, 0, 0)),
                          text(body, SLATE, 14.4, _flex_size="grow"), text_link(cta, SITE + url),
                          pad=26, flex_gap=gap(8)))
    return section("support", WHITE,
                   section_head("Support at every step", "Good guidance goes<br>beyond the classroom.",
                                "Talk through choices that affect your student’s learning and future plans."),
                   grid(3, *cards, t=3))


def fees():
    left = con(eyebrow("Fees & scholarships"), h2("Know the details<br>before you apply."),
               text("Review the published 2026–27 fee guide. Contact admissions to confirm the next intake, "
                    "instalments and scholarship eligibility.", INK, _margin=dims(8, 0, 8, 0)),
               actions(button("View fee guide ↗", UP + "/2026/04/Fee-Structure-2026-2027.pdf", "navy"),
                       text_link("Scholarship policy ↗", SITE + "/kims-scholarship/"), flex_gap=gap(24)),
               flex_gap=gap(12))
    note = con(h3("Ask for current information"),
               text("Fees, available places and scholarship criteria can change by session. The admissions team "
                    "can confirm what applies to your student.", SLATE),
               text_link("Contact admissions ↗", SITE + "/admission-enquriy-form/"),
               **bg(WHITE), **border((0, 0, 0, 4), GOLD), padding=dims(30), flex_gap=gap(10))
    return section("fees", GOLD_LIGHT, grid(2, left, note, m=1, g=60, grid_align_items="center",
                                            grid_gaps_mobile={"column": "34", "row": "34", "isLinked": True, "unit": "px"}))


def faq():
    items = [
        ("Which grades and programmes does KIMS offer?",
         "KIMS offers Grades VI–VIII, O Level and A Level at its Gulberg II campus. Playgroup–Grade V is offered "
         "through Lahore School of Learning at a separate Gulberg III location."),
        ("How does the admission process work?",
         "Submit the admission form and required documents. KIMS reviews prior results and may require an admission "
         "test. If an offer is made, admission is final once the fee is paid."),
        ("Can I visit the campus before applying?",
         "Contact KIMS to arrange a visit and confirm a suitable date and time."),
        ("Where can I check the latest fees and scholarships?",
         "Read the published fee guide and scholarship page, then contact admissions to confirm the details for the "
         "current session."),
    ]
    toggle = widget("toggle",
                    tabs=[{"_id": eid(), "tab_title": q, "tab_content": f"<p>{a}</p>"} for q, a in items],
                    selected_icon={"value": "fas fa-plus", "library": "fa-solid"},
                    selected_active_icon={"value": "fas fa-minus", "library": "fa-solid"},
                    icon_align="right", title_html_tag="h3", border_width=px(0), space_between=px(0),
                    title_background="rgba(0,0,0,0)", title_color=INK, tab_active_color=INK,
                    icon_color=GOLD_DARK, icon_active_color=GOLD_DARK,
                    title_padding=dims(20, 6, 20, 0), content_padding=dims(0, 36, 20, 0),
                    content_background_color="rgba(0,0,0,0)", content_color=SLATE,
                    css_classes="kims-faq",
                    **typo(16, "700", 1.5, prefix="title_typography"),
                    **typo(14.9, "400", 1.65, prefix="content_typography"))
    left = con(eyebrow("Good to know"), h2("Questions families often ask."),
               text("For current dates and seat availability, contact admissions.", SLATE, _margin=dims(8, 0, 0, 0)),
               width=px(32, "%"), width_mobile=px(100, "%"), flex_gap=gap(12))
    right = con(toggle, width=px(62, "%"), width_mobile=px(100, "%"), **border((1, 0, 0, 0), LINE))
    return section("faq", WHITE, row(left, right, flex_gap=gap(70), flex_justify_content="space-between",
                                     flex_direction_mobile="column", flex_gap_mobile=gap(34)))


def voices():
    cards = []
    for quote, name, role in [
        ("After A Levels at KIMS, Zenith Irfan became known for her solo motorcycle journey across Pakistan.",
         "Zenith Irfan", "A Level alumna · 2014"),
        ("Omair Safdar continued from KIMS to economics at LUMS and a career in investment banking.",
         "Omair Safdar", "A Level alumnus"),
        ("Zain Khalid continued from KIMS to computer science at Harvard College.", "Zain Khalid",
         "A Level alumnus · 2004")]:
        cards.append(card(text(quote, INK, 15, _flex_size="grow", _margin=dims(0, 0, 14, 0)),
                          heading(name, "span", INK, **typo(13.1, "700", 1.5)),
                          text(role, SLATE, 13.3, 1.5), pad=28))
    return section("community", IVORY,
                   section_head("KIMS community", "Paths shaped here.", "Read alumni stories published by KIMS."),
                   grid(3, *cards, t=3),
                   text_link("Read more alumni stories ↗", SITE + "/alumni/", _margin=dims(24, 0, 0, 0)),
                   flex_align_items="flex-start")


def news():
    cards = []
    for img, alt, tag, title, body, cta, url in [
        ("/2026/04/Study-at-KIMS.webp", "KIMS campus", "Admissions", "Dates, eligibility and what to prepare",
         "Check the application process and confirm current availability.", "Read admissions details ↗", "/admissions/"),
        ("/2026/10/What-Happens-After-O-Levels-in-Pakistan-1024x536.webp", "What happens after O Levels in Pakistan",
         "Study guide", "What happens after O Levels in Pakistan?", "Explore the choices students face after O Level.",
         "Read the guide ↗", "/what-happens-after-o-levels-in-pakistan/"),
        ("/2026/04/Seminar-at-KIMS-1024x1016.webp", "Seminar at KIMS", "Campus news",
         "What’s happening in the KIMS community", "Follow recent events, activities and school announcements.",
         "See campus updates ↗", "/news-events/")]:
        body_c = con(small_label(tag, GOLD_DARK, 12, 1.2), h3(title, _margin=dims(4, 0, 4, 0)),
                     text(body, SLATE, 13.8, _flex_size="grow"), text_link(cta, SITE + url),
                     padding=dims(22), flex_gap=gap(8), _flex_size="grow")
        cards.append(card(image(UP + img, alt, 227, t=170, m=200), body_c))
    return section("guides", WHITE,
                   section_head("News & useful guides", "Helpful answers for<br>the road ahead.",
                                "Explore current KIMS articles, admissions information and campus updates."),
                   grid(3, *cards, t=3))


def contact():
    rows = []
    for label, value, url in [("Call", "+92 303 444 3804", "tel:+923034443804"),
                              ("Email", "admin@kims.edu.pk", "mailto:admin@kims.edu.pk"),
                              ("Visit", "3-C Zahoor Elahi Road, Gulberg II, Lahore", None)]:
        rows.append(con(small_label(label, "#80601d", 12, 1.6),
                        heading(value, "span", INK, url=url, **typo(16, "400", 1.65)),
                        **border((1, 0, 0, 0), "#bdccd5"), padding=dims(15, 0), flex_gap=gap(0)))
    left = con(eyebrow("Contact KIMS"), h2("We’re here to help."),
               text("Ask a question or arrange a visit to the Gulberg campus.", SLATE, _margin=dims(8, 0, 0, 0)),
               con(*rows, flex_gap=gap(0), margin=dims(13, 0, 0, 0)),
               text_link("Open directions ↗",
                         "https://www.google.com/maps/search/?api=1&query=3-C+Zahoor+Elahi+Road+Gulberg+II+Lahore",
                         _margin=dims(4, 0, 0, 0)),
               flex_gap=gap(12))
    gmap = widget("google_maps", address="3-C Zahoor Elahi Road Gulberg II Lahore", zoom=px(15),
                  height=px(370), height_mobile=px(320), css_classes="kims-map",
                  _title="Map showing the KIMS Gulberg II campus")
    return section("contact", MIST, grid(2, left, con(gmap, flex_justify_content="stretch"), m=1, g=60,
                                         grid_gaps_mobile={"column": "34", "row": "34", "isLinked": True, "unit": "px"}))


def final_cta():
    left = con(eyebrow("Come see the campus", True),
               h2("Meet the people. Explore the campus. Plan your next step.", WHITE),
               text("Visit KIMS at 3-C Zahoor Elahi Road, Gulberg II, Lahore.", "#c6d3dc", _margin=dims(6, 0, 0, 0)),
               width=px(760), width_tablet=px(62, "%"), width_mobile=px(100, "%"), flex_gap=gap(12))
    btns = actions(button("Plan a campus visit ↗", SITE + "/contact-us/", "gold"),
                   button("Explore admissions", SITE + "/admissions/", "outline"), _flex_size="none",
                   flex_wrap="nowrap", flex_wrap_mobile="wrap")
    return section(None, NAVY, row(left, btns, flex_justify_content="space-between", flex_align_items="center",
                                   flex_gap=gap(40), flex_direction_mobile="column",
                                   flex_align_items_mobile="flex-start", flex_gap_mobile=gap(24)),
                   pad=78, pad_m=64, cls="kims-final-cta")


def footer():
    def col(title, items, w=18):
        return con(heading(title, "h4", WHITE, **typo(12.8, "700", 1.4, 1.3, "uppercase")),
                   icon_list(items, "traditional", "#dce5ea", GOLD, 13.4, 8, icon_typography_font_weight="400"),
                   width=px(w, "%"), width_tablet=px(18, "%"), width_mobile=px(46, "%"), flex_gap=gap(14))

    brand = con(heading('KIMS<small class="kims-brand-sub">Keynesian Institute of Management &amp; Sciences</small>',
                        "span", WHITE, **typo(23.2, "700", 1, -0.9)),
                text("A Cambridge learning community in Gulberg II, Lahore, established in 1993.", "#bdcad3", 13.6,
                     _element_width="initial", _element_custom_width=px(350), _element_custom_width_mobile=px(100, "%")),
                width=px(34, "%"), width_tablet=px(32, "%"), width_mobile=px(100, "%"), flex_gap=gap(18))
    cols = row(brand,
               col("Programmes", [("Grades VI–VIII", SITE + "/gr-vi-viii/"), ("O Level", SITE + "/o-level-programme/"),
                                  ("A Level", SITE + "/a-level/"), ("LSL early years", SITE + "/playgroup-to-grade-v/")]),
               col("Explore", [("Admissions", SITE + "/admissions/"), ("Faculty", SITE + "/faculties/"),
                               ("Alumni", SITE + "/alumni/"), ("Facilities", SITE + "/facilities/"),
                               ("Scholarships", SITE + "/kims-scholarship/")]),
               col("Get in touch", ["3-C Zahoor Elahi Road", "Gulberg II, Lahore",
                                    ("+92 303 444 3804", "tel:+923034443804"),
                                    ("admin@kims.edu.pk", "mailto:admin@kims.edu.pk"),
                                    ("Contact & directions", SITE + "/contact-us/")]),
               flex_gap=gap(45), flex_justify_content="space-between", flex_wrap_mobile="wrap",
               flex_gap_mobile=gap(18, 28))
    legal = row(text("© 2026 KIMS. All rights reserved.", "#a6b8c5", 12, 1.5),
                text(f'<p><a href="{SITE}/rules-regulations/">Rules &amp; regulations</a> · '
                     f'<a href="{SITE}/general-information/">General information</a></p>', "#a6b8c5", 12, 1.5,
                     css_classes="kims-footer-legal"),
                flex_justify_content="space-between", flex_gap=gap(20), flex_direction_mobile="column",
                flex_gap_mobile=gap(6), **border((1, 0, 0, 0), "rgba(255,255,255,0.19)"),
                padding=dims(18, 0, 0, 0), margin=dims(40, 0, 0, 0))
    s = section(None, FOOT, cols, legal, html_tag="footer", cls="kims-footer")
    s["settings"]["padding"] = dims(55, 32, 24, 32)
    s["settings"]["padding_tablet"] = dims(55, 32, 24, 32)
    s["settings"]["padding_mobile"] = dims(48, 16, 24, 16)
    return s


def mobile_bar():
    items = [("Admissions", SITE + "/admissions/"), ("Call KIMS", "tel:+923034443804")]
    btns = [text_link(label, url, NAVY, align="justify", text_padding=dims(11), typography_font_size=px(13.1),
                      _flex_size="grow", border_border="solid", border_width=dims(0, 1 if i == 0 else 0, 0, 0),
                      border_color="rgba(16,40,59,0.2)", css_classes="kims-mobile-bar-link")
            for i, (label, url) in enumerate(items)]
    return con(*btns, flex_direction="row", flex_gap=gap(0), padding=dims(0), **bg(GOLD),
               **shadow(-4, 15, "rgba(16,40,59,0.13)"), css_classes="kims kims-mobile-bar",
               **hide("desktop", "tablet"))


# ---------- assemble + validate ----------

def mark_inner(elements, depth=0):
    for el in elements:
        if el["elType"] == "container":
            el["isInner"] = depth > 0
        mark_inner(el["elements"], depth + 1)


def clean(obj):
    """Drop None values so the JSON contains only real settings."""
    if isinstance(obj, dict):
        return {k: clean(v) for k, v in obj.items() if v is not None}
    if isinstance(obj, list):
        return [clean(v) for v in obj]
    return obj


KNOWN_WIDGETS = {"heading", "text-editor", "button", "image", "icon-list", "toggle", "google_maps", "html"}


def validate(template):
    seen, counts = set(), {}

    def walk(els, parent_type, depth):
        for el in els:
            assert re.fullmatch(r"[0-9a-f]{7}", el["id"]), el["id"]
            assert el["id"] not in seen, "duplicate id " + el["id"]
            seen.add(el["id"])
            assert el["elType"] in ("container", "widget")
            if el["elType"] == "widget":
                assert el["widgetType"] in KNOWN_WIDGETS, el["widgetType"]
                assert el["elements"] == []
                counts[el["widgetType"]] = counts.get(el["widgetType"], 0) + 1
            else:
                assert el["isInner"] == (depth > 0)
                counts["container"] = counts.get("container", 0) + 1
            walk(el["elements"], el["elType"], depth + 1)

    walk(template["content"], None, 0)
    for key in ("content", "page_settings", "version", "title", "type"):
        assert key in template
    return counts


def build():
    content = [custom_css_widget(), utility_bar(), header(), hero(), quick_bar(), programmes(), pathway(), why(),
               outcomes(), campus(), faculty(), admissions(), support(), fees(), faq(), voices(), news(), contact(),
               final_cta(), footer(), mobile_bar()]
    mark_inner(content)
    template = clean({
        "content": content,
        "page_settings": {"template": "elementor_canvas", "background_background": "classic",
                          "background_color": IVORY, "hide_title": "yes"},
        "version": "0.4",
        "title": "KIMS Homepage — Container Template",
        "type": "page",
    })
    counts = validate(template)
    text_out = json.dumps(template, ensure_ascii=False, indent=2)
    json.loads(text_out)  # round-trip parse check
    OUT.write_text(text_out, encoding="utf-8")
    print(f"Wrote {OUT.name} ({len(text_out):,} bytes)")
    for k in sorted(counts):
        print(f"  {k}: {counts[k]}")


if __name__ == "__main__":
    build()
