chrome.action.onClicked.addListener(async (tab) => {
  if (!tab || !tab.url) return;
  try {
    const newUrl = toAr5ivHtml(tab.url);
    if (newUrl && newUrl !== tab.url) {
      await chrome.tabs.update(tab.id, { url: newUrl });
    }
  } catch (e) {
    // no-op
  }
});

function toAr5ivHtml(urlStr) {
  let u;
  try { u = new URL(urlStr); } catch { return null; }

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

  if (!id) return null;
  return `https://ar5iv.org/html/${id}`;
}
