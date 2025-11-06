const patterns = [
  { rx: /^https?:\/\/(?:www\.)?arxiv\.org\/abs\/([^\/?#]+)/i },
  { rx: /^https?:\/\/(?:www\.)?arxiv\.org\/pdf\/([^\/?#]+)(?:\.pdf)?(?:[?#].*)?$/i },
  { rx: /^https?:\/\/(?:www\.)?arxiv\.org\/format\/([^\/?#]+)/i },
  { rx: /^https?:\/\/(?:www\.)?arxiv\.org\/html\/([^\/?#]+)/i },
  { rx: /^https?:\/\/ar5iv\.org\/abs\/([^\/?#]+)/i }
];

function toAr5iv(href) {
  for (const { rx } of patterns) {
    const m = href.match(rx);
    if (m) return `https://ar5iv.org/html/${m[1]}`;
  }
  return null;
}

function rewriteAnchor(a) {
  if (!a || !a.href) return;
  const newHref = toAr5iv(a.href);
  if (newHref && newHref !== a.href) {
    a.href = newHref;
  }
}

function rewriteAll() {
  document.querySelectorAll('a[href]').forEach(rewriteAnchor);
}

rewriteAll();

const obs = new MutationObserver((mutations) => {
  for (const m of mutations) {
    m.addedNodes.forEach((n) => {
      if (n.nodeType === 1) {
        if (n.tagName === 'A') rewriteAnchor(n);
        n.querySelectorAll?.('a[href]').forEach(rewriteAnchor);
      }
    });
  }
});
obs.observe(document.documentElement, { childList: true, subtree: true });
