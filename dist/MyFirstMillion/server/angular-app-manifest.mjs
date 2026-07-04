
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/MyFirstMillion/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/MyFirstMillion/start",
    "route": "/MyFirstMillion"
  },
  {
    "renderMode": 2,
    "route": "/MyFirstMillion/start"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 1064, hash: '579742d72b738168e58a18663f01e974f1341524009e654fdbabb76e2e5ee0a1', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 971, hash: '17149474bc5c1f5002d2e91a9a92852df215d3508467187c82025c058c18aa7c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'start/index.html': {size: 7057, hash: '35d60ebc0300fdef132303b64a1ee2d2aef238b46d17aceee32dc7a80a3c5cff', text: () => import('./assets-chunks/start_index_html.mjs').then(m => m.default)},
    'styles-LBNJDON2.css': {size: 871, hash: 'n2rZ+QU8Goc', text: () => import('./assets-chunks/styles-LBNJDON2_css.mjs').then(m => m.default)}
  },
};
