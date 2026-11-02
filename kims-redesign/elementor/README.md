# KIMS homepage: Elementor container template

| File | What it is |
|---|---|
| `elementor-container-template.json` | Template you import into Elementor (type `page`, format version `0.4`) |
| `kims-elementor-custom.css` | The small amount of CSS that native controls can't express. It's already embedded in the template's first HTML widget. |
| `build_container_template.py` | Script that generates the JSON. It also checks IDs, nesting, and widget types. Run `python build_container_template.py` after you edit it. |

`../index.html` is the single source of truth. The older `../kims-homepage-revamp-elementor.json` is left as is. That build wraps most of the page in HTML widgets. This one rebuilds the page with native widgets.

## Conversion report

There are 131 Flexbox and Grid containers and 206 widgets: 101 Heading, 51 Text Editor, 32 Button, 12 Image, 6 Icon List, 2 HTML, 1 Toggle and 1 Google Maps. Every widget is in core Elementor, so Pro isn't required.

| Source section | How it's built |
|---|---|
| Utility bar | A row container with a Text Editor for the address (hidden on mobile) and an inline Icon List for phone and email |
| Header / nav | A `<header>` container. The logo is an Image widget inside a navy container, the nav is an inline Icon List, and the CTA is a Button hidden on tablet and mobile. CSS makes the header sticky. |
| Hero | Two flex columns: an eyebrow (Heading), the H1, a Text Editor and Buttons, with the proof points as an Icon List. The photo is a container background with a gradient overlay. The caption is a nested container. |
| Quick links | A gold row with a label Heading and 3 Buttons styled as links. On mobile it uses a 50/50/100 % layout. |
| Programmes | Grid container (4 → 2 → 1 columns) of cards. Each card has an Image, a label, an H3, text and a link button. |
| Pathway | A 2-column grid. The progression strip is a native 3-column grid. **The stage selector is an HTML widget** (select + script). |
| Why KIMS | A 2-column grid. The photo is a container background with a navy label badge. The reasons are a 2-column grid. |
| Outcomes, Support, Admissions | Grid containers of card containers |
| Campus life | Grid (4 → 2 → 2). Each card is a container rendered as `<a>`, with a background image and a gradient overlay. |
| Faculty | Grid (4 → 2 → 2) with an Image and a text container in each card |
| Fees | 2-column grid with a bordered note container |
| FAQ | A Toggle widget (all items closed, +/− icons) beside the title column |
| Alumni, News | 3-column grids of card containers |
| Contact | Rows of Heading widgets with `tel:`/`mailto:` links, plus the **Google Maps widget** |
| Final CTA | A flex row that stacks on mobile |
| Footer | Flex row (34/18/18/18 % plus 45 px gaps → 100/46/46 on mobile) with Icon Lists for the links |
| Mobile bar | Gold container with 2 Buttons, hidden on desktop and tablet, sticky at the bottom via CSS |

The 2 HTML widgets are:
1. **KIMS custom CSS**: a `<style>` block. If you'd rather keep the CSS in Site Settings → Custom CSS (Pro) or Appearance → Customize → Additional CSS, paste `kims-elementor-custom.css` there and delete this widget.
2. **Pathway selector**: the interactive dropdown. Elementor has no native widget that updates content when a dropdown changes. Its options and copy are in the widget's HTML and script.

### Responsive mapping
Elementor's default breakpoints are tablet ≤ 1024 px and mobile ≤ 767 px. The source's 1100 px rules map to tablet, and its 800/600 px rules map to mobile. Section padding goes from 96/32 px to 72/16 px on mobile. Heading sizes step down from 57.6/46/36 px for H2 and 76/56/44 px for H1. Card image heights are set per device.

## Asset report
All 18 image references point to `https://kims.edu.pk/wp-content/uploads/...` and are used as given. None were renamed or replaced.

- If you import on the **kims.edu.pk** site, the images already exist there. To get responsive `srcset` sizes, you can reselect each image from the Media Library so it gets an attachment ID.
- If you import on **another site** (staging), the images still load from kims.edu.pk. If you want them on the new site, upload them to its Media Library first, then reselect them.
- **Alt text:** the Image widgets carry an `alt` value. Elementor only uses it for URL-only images. Once you reselect an image from the Media Library, the alt comes from the attachment, so check it there. Background images (hero, why-photo, campus cards) have no alt in HTML, same as in the source.
- **Fonts:** Helvetica falling back to Arial, which are system fonts, so nothing loads.
- **Icons:** Font Awesome `fa-circle`, `fa-plus` and `fa-minus`, which ship with Elementor.
- **External services:** the Google Maps embed (Maps widget) and the fee PDF at `/wp-content/uploads/2026/04/Fee-Structure-2026-2027.pdf`.

## Import instructions
1. In WordPress go to **Templates → Saved Templates → Import Templates**, choose `elementor-container-template.json`, then click **Import Now**.
2. Make sure **Elementor → Settings → Features → Flexbox Container** and **Grid Container** are active. They're on by default in recent Elementor versions.
3. Create a new page and choose **Edit with Elementor**. Open the folder icon, go to **My Templates** and insert **KIMS Homepage — Container Template**.
4. In page settings, set **Page Layout → Elementor Canvas**, because the template includes its own header and footer. To use the theme's header and footer instead, delete the utility bar, header, footer and mobile-bar containers. To use them site-wide, rebuild them as Theme Builder parts (Pro).
5. Preview desktop, tablet and mobile, and save as **Draft** until the content has been checked.

## Known limitations
- **Tested in a local WordPress Playground with Elementor 4.3.5.** It imported cleanly with Elementor's own importer, and the desktop render was compared with `index.html` in headless Chrome. That test found a bug: widget CSS classes were stored under `css_classes` instead of `_css_classes`, so the CSS hooks didn't apply. It also found mobile layout issues: fixed-size boxes stretched and rows wrapped. Both are now fixed in the generator, but the regenerated file hasn't been screenshotted again yet. One issue is still open: at 1366px the hero H1 wraps to three lines (76px against 68px in the source).
- **Mobile menu:** the source's "Menu" toggle is replaced by the nav Icon List wrapping under the logo on mobile. For a hamburger menu, swap in the Pro **Menu/Nav Menu** widget.
- **Skip-to-content link** was left out because most themes provide one.
- **Proportional columns** in the hero (0.95 / 1.05 fr), FAQ (0.7 / 1.3 fr) and footer (2 / 1 / 1 / 1 fr) use percentage widths on flex children. They're close to the original but not exact.
- **Image aspect ratios** use a fixed height per device with `object-fit: cover`, instead of CSS `aspect-ratio`.
- **On mobile, programme cards** stack the image above the text instead of the source's 38/62 side-by-side layout.
- **Hover effects** (button lift, card lift, link underline), the eyebrow rule, the sticky header and the sticky mobile bar depend on the custom CSS. The campus-card image zoom on hover was not reproduced.
- **The hero's second gradient** (the left fade) is a CSS `::after`, because a container overlay holds only one gradient.
- **Typography**: each widget's typography is set to Helvetica. If the site kit sets other global fonts, these widgets won't follow them.
