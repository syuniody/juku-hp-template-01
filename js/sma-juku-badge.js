(function () {
  var LABEL = window.SMAJUKU_TEMPLATE || 'デモ';
  var LP_URL = 'https://smart-juku.syuni.jp/';

  // Google Fonts（LPと統一：Shippori Mincho B1 + Zen Kaku Gothic New）
  if (!document.querySelector('link[data-smajuku-font]')) {
    var preconn1 = document.createElement('link');
    preconn1.rel = 'preconnect'; preconn1.href = 'https://fonts.googleapis.com';
    preconn1.setAttribute('data-smajuku-font', '1');
    document.head.appendChild(preconn1);
    var preconn2 = document.createElement('link');
    preconn2.rel = 'preconnect'; preconn2.href = 'https://fonts.gstatic.com'; preconn2.crossOrigin = '';
    preconn2.setAttribute('data-smajuku-font', '1');
    document.head.appendChild(preconn2);
    var fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Shippori+Mincho+B1:wght@600;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Inter:wght@500;600;700&display=swap';
    fontLink.setAttribute('data-smajuku-font', '1');
    document.head.appendChild(fontLink);
  }

  var style = document.createElement('style');
  style.textContent = [
    '#smajuku-badge{',
      'position:fixed;bottom:24px;left:24px;z-index:99999;',
      'width:340px;max-width:calc(100vw - 32px);',
      'background:#FAF7F2;',
      'border:1px solid #E4DED2;',
      'border-radius:4px;',
      'box-shadow:0 1px 0 rgba(0,0,0,0.04),0 18px 40px -12px rgba(26,26,26,0.22);',
      'font-family:"Zen Kaku Gothic New","Hiragino Sans",sans-serif;',
      'color:#1A1A1A;',
      'overflow:hidden;',
      'transition:opacity .35s ease,transform .35s ease;',
    '}',
    '#smajuku-badge.is-hidden{opacity:0;transform:translateY(16px);pointer-events:none;}',

    /* 上部：細い縦アクセントライン */
    '#smajuku-badge::before{',
      'content:"";position:absolute;left:0;top:0;bottom:0;width:3px;background:#C5502E;',
    '}',

    /* ヘッダー */
    '#smajuku-badge__head{',
      'padding:18px 44px 0 22px;position:relative;',
    '}',
    '#smajuku-badge__eyebrow{',
      'display:flex;align-items:center;gap:8px;',
      'font-family:"Inter","Zen Kaku Gothic New",sans-serif;',
      'font-size:11px;font-weight:600;letter-spacing:.14em;',
      'color:#5C5C5C;text-transform:uppercase;',
      'margin-bottom:10px;',
    '}',
    '#smajuku-badge__eyebrow .dot{',
      'width:6px;height:6px;border-radius:50%;background:#C5502E;',
      'display:inline-block;flex:0 0 auto;',
    '}',
    '#smajuku-badge__title{',
      'font-family:"Shippori Mincho B1","Noto Serif JP","YuMincho",serif;',
      'font-size:22px;font-weight:700;line-height:1.35;letter-spacing:.01em;',
      'color:#1A1A1A;',
    '}',
    '#smajuku-badge__title em{',
      'font-style:normal;color:#C5502E;',
    '}',
    '#smajuku-badge__close{',
      'position:absolute;top:14px;right:14px;',
      'width:28px;height:28px;padding:0;',
      'background:transparent;border:1px solid #D4D0C8;border-radius:50%;',
      'color:#5C5C5C;font-size:13px;line-height:1;cursor:pointer;',
      'display:flex;align-items:center;justify-content:center;',
      'transition:background .15s,color .15s,border-color .15s;',
    '}',
    '#smajuku-badge__close:hover{background:#1A1A1A;color:#fff;border-color:#1A1A1A;}',

    /* 本体 */
    '#smajuku-badge__body{padding:14px 22px 20px;}',
    '#smajuku-badge__desc{',
      'font-size:13px;line-height:1.75;color:#2B2B2B;',
      'margin:0 0 16px;',
    '}',
    '#smajuku-badge__rule{',
      'height:1px;background:#E4DED2;margin:0 0 16px;',
    '}',

    /* CTA */
    '#smajuku-badge__link{',
      'display:flex;align-items:center;justify-content:space-between;gap:10px;',
      'background:#C5502E;color:#fff;',
      'padding:13px 18px;border-radius:4px;',
      'text-decoration:none;',
      'font-family:"Zen Kaku Gothic New",sans-serif;',
      'font-size:14px;font-weight:700;letter-spacing:.04em;',
      'box-shadow:0 8px 18px -8px rgba(197,80,46,0.55);',
      'transition:background .2s,transform .2s,box-shadow .2s;',
    '}',
    '#smajuku-badge__link:hover{',
      'background:#A63F1F;transform:translateY(-1px);',
      'box-shadow:0 12px 22px -8px rgba(197,80,46,0.7);',
    '}',
    '#smajuku-badge__link svg{flex:0 0 auto;transition:transform .2s;}',
    '#smajuku-badge__link:hover svg{transform:translateX(3px);}',

    /* モバイル：少しコンパクト */
    '@media (max-width:480px){',
      '#smajuku-badge{width:calc(100vw - 32px);bottom:16px;left:16px;}',
      '#smajuku-badge__title{font-size:20px;}',
    '}',
  ].join('');
  document.head.appendChild(style);

  var badge = document.createElement('aside');
  badge.id = 'smajuku-badge';
  badge.setAttribute('role', 'complementary');
  badge.setAttribute('aria-label', 'スマ塾デモサイト案内');
  badge.innerHTML = [
    '<div id="smajuku-badge__head">',
      '<div id="smajuku-badge__eyebrow"><span class="dot"></span><span>SMAJUKU — DEMO SITE</span></div>',
      '<div id="smajuku-badge__title">テンプレート <em>' + LABEL + '</em></div>',
      '<button id="smajuku-badge__close" aria-label="閉じる" type="button">✕</button>',
    '</div>',
    '<div id="smajuku-badge__body">',
      '<p id="smajuku-badge__desc">',
        'このサイトは、スマ塾が制作した<strong>塾ホームページのデモ</strong>です。<br>',
        '貴塾に合わせてカスタマイズした1ページをご覧ください。',
      '</p>',
      '<div id="smajuku-badge__rule"></div>',
      '<a id="smajuku-badge__link" href="' + LP_URL + '" target="_blank" rel="noopener">',
        '<span>スマ塾のサービスを見る</span>',
        '<svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">',
          '<path d="M1 6h13M10 1l4 5-4 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
        '</svg>',
      '</a>',
    '</div>',
  ].join('');
  document.body.appendChild(badge);

  document.getElementById('smajuku-badge__close').addEventListener('click', function () {
    badge.classList.add('is-hidden');
  });
})();
