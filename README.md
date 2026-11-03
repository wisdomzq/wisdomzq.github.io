# Zequn Li's Academic Homepage

Personal academic homepage for [Zequn Li](https://wisdomzq.github.io/), hosted with GitHub Pages.

## Local preview

The homepage is intentionally static and has no build dependencies:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Main files

- `index.html` — page content and metadata
- `assets/css/academic-home.css` — responsive visual system
- `assets/js/academic-home.js` — active-section navigation and accessible figure previews
- `assets/images/zequn-li-orange.jpg` — profile portrait used on the homepage
- `assets/images/papers/` — publication figures and source notes
- `assets/type/` — self-hosted Outfit variable font and its SIL Open Font License

## Design and content

The layout is inspired by [Haolin Yang's homepage](https://tidalharley.github.io/):
a white reading surface, serif section headings, a compact section index, and
consistent publication rows. The HTML, CSS, and interactions are implemented
locally without framework or CDN dependencies. At narrow widths, the section
index becomes a sticky horizontal navigation bar.

All three publications use the same title / authors / venue and presentation type /
summary / resource-link order. Figures preserve their aspect ratios, and clicking
one opens a keyboard-accessible preview with a source link. Escape, the close
button, or a click on the backdrop closes the preview. Without JavaScript, figure
links open the image directly, and all page content remains accessible.

The introduction describes the Tsinghua admission as **incoming**, not already
enrolled. The admission news is labeled “Latest” because no admission date was
provided. Education, GPA, class rank, and author-position labels remain omitted.

Outfit is distributed under the SIL Open Font License; see `assets/type/OFL-Outfit.txt`.
