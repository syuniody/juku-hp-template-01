(function () {
  var LABEL = window.SMAJUKU_TEMPLATE || 'デモ';
  var LP_URL = 'https://smart-juku.syuni.jp/';

  var style = document.createElement('style');
  style.textContent = [
    '#smajuku-badge{',
      'position:fixed;bottom:28px;left:28px;z-index:99999;',
      'width:360px;',
      'background:#1B2A4A;border-radius:20px;',
      'box-shadow:0 12px 40px rgba(0,0,0,0.4);',
      'font-family:-apple-system,BlinkMacSystemFont,"Hiragino Sans",sans-serif;',
      'overflow:hidden;',
      'transition:opacity .3s,transform .3s;',
    '}',
    '#smajuku-badge.hidden{opacity:0;transform:translateY(20px);pointer-events:none;}',

    '#smajuku-badge__head{',
      'background:#0F1C33;padding:18px 52px 18px 22px;position:relative;',
    '}',
    '#smajuku-badge__eyebrow{',
      'font-size:13px;font-weight:700;letter-spacing:.1em;',
      'color:#7B9FC4;margin-bottom:6px;',
    '}',
    '#smajuku-badge__title{',
      'font-size:24px;font-weight:800;color:#fff;line-height:1.2;',
    '}',
    '#smajuku-badge__close{',
      'position:absolute;top:14px;right:14px;',
      'background:rgba(255,255,255,0.12);border:none;color:#fff;',
      'font-size:16px;cursor:pointer;line-height:1;padding:6px 9px;',
      'border-radius:8px;opacity:.7;',
    '}',
    '#smajuku-badge__close:hover{opacity:1;background:rgba(255,255,255,0.22);}',

    '#smajuku-badge__body{padding:20px 22px 22px;}',
    '#smajuku-badge__desc{',
      'font-size:15px;color:#C8DCF0;line-height:1.8;margin-bottom:18px;',
    '}',
    '#smajuku-badge__link{',
      'display:block;',
      'background:linear-gradient(135deg,#38BDF8,#6366F1);',
      'color:#fff;text-align:center;',
      'padding:16px 20px;border-radius:12px;',
      'text-decoration:none;font-weight:800;font-size:18px;',
      'box-shadow:0 6px 20px rgba(99,102,241,0.55);',
      'transition:opacity .2s,transform .2s;',
      'letter-spacing:.03em;',
    '}',
    '#smajuku-badge__link:hover{opacity:.9;transform:translateY(-2px);}',
  ].join('');
  document.head.appendChild(style);

  var badge = document.createElement('div');
  badge.id = 'smajuku-badge';
  badge.innerHTML = [
    '<div id="smajuku-badge__head">',
      '<div id="smajuku-badge__eyebrow">📋 スマ塾 デモサイト</div>',
      '<div id="smajuku-badge__title">テンプレート：' + LABEL + '</div>',
      '<button id="smajuku-badge__close" aria-label="閉じる">✕</button>',
    '</div>',
    '<div id="smajuku-badge__body">',
      '<div id="smajuku-badge__desc">',
        'このサイトはスマ塾が制作した<br>デモサイトです。<br>お問い合わせはこちらから。',
      '</div>',
      '<a id="smajuku-badge__link" href="' + LP_URL + '" target="_blank" rel="noopener">',
        '🚀 スマ塾で作る →',
      '</a>',
    '</div>',
  ].join('');
  document.body.appendChild(badge);

  document.getElementById('smajuku-badge__close').addEventListener('click', function () {
    badge.classList.add('hidden');
  });
})();
