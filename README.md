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
- `assets/js/academic-home.js` — active-section navigation, research selection, and accessible figure previews
- `assets/images/zequn-li-orange.jpg` — profile portrait used on the homepage
- `assets/images/papers/` — publication figures and source notes
- `assets/images/projects/` — author-provided EditBanana and Qiyan Program figures
- `assets/images/institutions/` — official university emblems and source notes
- `assets/type/` — self-hosted Outfit variable font and its SIL Open Font License

## Design and content

The layout is inspired by [Haolin Yang's homepage](https://tidalharley.github.io/):
a white reading surface, serif section headings, a compact section index, and
consistent publication rows with a pale-blue background for selected work.
The HTML, CSS, and interactions are implemented
locally without framework or CDN dependencies. At narrow widths, the section
index becomes a sticky horizontal navigation bar.

The Research section combines the three publications and two projects in one
consistent illustrated list. By default, **Highlighted Research** shows DocDB,
CCL, and the Qiyan Program, each with a concise description. **All Research**
reveals OIE and EditBanana as well; **Highlights only** returns to the selection.
Set `data-highlight="true"` on an article to include it in the default view.
This selection pattern was informed by the reference homepage's public repository,
but the implementation is local. The pale-blue rows are highlights, not a dark theme.

The index always links to `#research`, regardless of the active filter. Scrolling
within either project keeps Research active. The old `#projects` anchor remains
available at the Qiyan entry. Direct links to `#oie` and `#editbanana` automatically
reveal the full list when necessary. Screen readers receive an update after a
filter change. Without JavaScript, and when printing, all five entries are visible.

Publications use the same title / authors / venue and presentation type /
summary / resource-link order. Projects share the same image and text layout.
Figures preserve their aspect ratios, and clicking one opens a keyboard-accessible
preview with a source link when available. Escape, the close
button, or a click on the backdrop closes the preview. Without JavaScript, figure
links open the image directly, and all page content remains accessible.

About includes the author's supplied **Current Research** statement on multimodal
data processing on heterogeneous systems, focusing on Apple Silicon unified
memory, CPU-GPU collaboration, resource contention, and adaptive execution.
It describes an ongoing research direction without disclosing methods or results.

Education lists the BIT undergraduate period as **2023–2027 (expected)** and
the Tsinghua direct-entry Ph.D. as **Incoming, expected start in 2027**. The
prospective advisor is Prof. Jiannan Wang; the research group name is **Database
Group**, verified against its [faculty list](https://dbgroup.cs.tsinghua.edu.cn/people.htm).
Rows follow the reference homepage's emblem / institution details / dates layout;
on narrow screens, dates move below the details while the emblem stays on the left.
University emblems are copied unchanged from their official visual-identity pages.
No doctoral graduation year is inferred. GPA, class rank, and author-position
labels remain omitted. The admission news stays labeled “Latest” because no
admission announcement date was provided.

Outfit is distributed under the SIL Open Font License; see `assets/type/OFL-Outfit.txt`.
