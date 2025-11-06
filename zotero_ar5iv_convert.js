// Convert arxiv.org links in selected Zotero items to ar5iv.org/html
const items = Zotero.getActiveZoteroPane().getSelectedItems();
let changed = 0;

for (const item of items) {
  if (!item.isRegularItem()) continue;
  const url = item.getField('url') || '';
  if (!url) continue;

  const toAr5iv = (href) => {
    try {
      const u = new URL(href);
      const host = u.hostname.toLowerCase();
      if (!/^(?:www\.)?arxiv\.org$/.test(host) && host !== 'ar5iv.org') return null;

      const path = u.pathname.replace(/^\/+/, "");
      let id = null;
      const mAbs = path.match(/^abs\/([^\/?#]+)/);
      const mPdf = path.match(/^pdf\/([^\/?#]+)(?:\.pdf)?/);
      const mFmt = path.match(/^format\/([^\/?#]+)/);
      const mHtml = path.match(/^html\/([^\/?#]+)/);
      if (mAbs) id = mAbs[1];
      else if (mPdf) id = mPdf[1];
      else if (mFmt) id = mFmt[1];
      else if (mHtml) id = mHtml[1];

      return id ? `https://ar5iv.org/html/${id}` : null;
    } catch { return null; }
  };

  const newURL = toAr5iv(url);
  if (newURL && newURL !== url) {
    item.setField('url', newURL);
    await item.saveTx();
    changed++;
  }
}

`Updated ${changed} item(s).`;
