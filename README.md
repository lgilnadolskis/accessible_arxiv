# accessible_arxiv (Chrome Extension)

**Goal:** Always open arXiv papers on the accessible HTML mirror `https://ar5iv.org/html/<id>`.

## What it does
- Redirects main navigations from:
  - `arxiv.org/abs/<id>`
  - `arxiv.org/pdf/<id>.pdf`
  - `arxiv.org/format/<id>`
  - `arxiv.org/html/<id>` (normalize)
  - `ar5iv.org/abs/<id>` (normalize)
  to `https://ar5iv.org/html/<id>`.
- Adds a toolbar button “Open on ar5iv” for the current tab.
- Rewrites `<a>` links on pages so that arXiv links point to ar5iv HTML.

## Install (unpacked)
1. Open Chrome and go to `chrome://extensions`.
2. Turn on **Developer mode**.
3. Click **Load unpacked** and select this folder.
4. Visit any `https://arxiv.org/abs/<id>` — you should land at `https://ar5iv.org/html/<id>`.

## Zotero
- If Zotero opens links in your default browser and that browser is Chrome with this extension enabled, clicking **View Online** on arXiv items will automatically open ar5iv HTML.
- Optional: convert stored arXiv URLs in Zotero to ar5iv permanently. Use **Tools → Developer → Run JavaScript** and run the contents of `zotero_ar5iv_convert.js` after selecting items to update.

## Files
- `manifest.json` — MV3 manifest.
- `rules_1.json` — declarativeNetRequest rules to redirect navigations.
- `background.js` — adds a toolbar button to convert the current tab.
- `content.js` — rewrites in-page arXiv links to ar5iv HTML.
- `zotero_ar5iv_convert.js` — helper you can paste into Zotero's JS runner to update item URLs.
- `LICENSE` — MIT.

## License
MIT
# accessible_arxiv
