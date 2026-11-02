# KIMS Lahore homepage revamp

This is a review-ready, unpublished redesign concept for `kims.edu.pk`. It does not replace the live homepage.

## Deliverables

- `index.html` — complete, responsive standalone page. Open locally in a browser to review the visual design and interactions.
- `kims-homepage-revamp-elementor.json` — Elementor template built from native containers, heading, image, and text-editor widgets.
- `build_elementor.py` — converts the page structure from `index.html` into the Elementor template.

## Design direction

The supplied KIMS PDF informed the visual system: Helvetica/Arial, deep navy `#10283B`, gold `#D1A64A`, white, mist `#DCE5EA`, and slate `#647686`. The layout improves spacing, hierarchy, wayfinding, responsive navigation, and calls to action while retaining the brief's full homepage scope.

Sections: utility bar and navigation; hero and quick actions; programmes; interactive pathway selector; why KIMS; outcomes; campus life; faculty; admissions; family support; fees and scholarships; FAQ; alumni; guides and news; contact and map; final CTA; footer and mobile quick actions.

Content uses published KIMS pages for school facts, faculty, alumni, programmes, admissions, fees, contact information, and photography. It avoids unverified result statistics and fabricated testimonials. Images remain hosted by KIMS, so an online connection is required to load them.

## Elementor handoff

Import the JSON via Elementor Templates, insert it into a **new page**, and set the page layout to **Elementor Canvas** to avoid duplicating the theme header and footer. Save as **Draft** until the KIMS team has reviewed the page, links, facts, and mobile presentation. The conversion retains the source hierarchy and order of layout containers, sections, card links, FAQ disclosures, lists, and navigation, including their classes, IDs, and attributes. Headings and images are native Elementor widgets, and most copy is editable in text-editor widgets. HTML widgets are retained for CSS, interactive controls, the map embed, and JavaScript. The generated CSS adapts layout rules to Elementor's inner container wrappers so rows and grids remain aligned. Preview the imported desktop, tablet, and mobile layouts in Elementor before publishing.

The WordPress draft was **not** saved from this workspace because the signed-in KIMS Chrome window was actively under user control, while the automation browser profile was not signed in. The local page and import file are complete; the live homepage remains unchanged.

## QA performed

- The builder verifies unique Elementor element IDs, the source hierarchy and attributes, and responsive inner-container rules for the quick-action row and grids. It also checks all 44 headings and 18 image widgets with ALT text.
- The standalone source page received desktop/mobile visual review; its programme selector and mobile navigation were exercised, with no browser-console errors during that review.
- A browser preview using Elementor-style wrappers confirmed the quick-action row matches the desktop reference and switches to its responsive two-column layout on mobile. Programme cards retain their desktop/mobile grid columns, and the page has no horizontal overflow at the tested 1920px and 390px widths.
- The template has not been previewed inside WordPress/Elementor. Review its desktop, tablet, and mobile layouts, links, facts, and interactions before publishing.

Before publishing, verify every current intake date, staff role, fee, scholarship term, and external link with KIMS, then run the final Elementor desktop/tablet/mobile preview and compare the published version with this source.
