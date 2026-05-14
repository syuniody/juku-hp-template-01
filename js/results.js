(() => {
  const CMS_RESULTS_URL = 'https://raw.githubusercontent.com/syuniody/juku-hp-template-01/main/data/results.json';
  const categories = [
    ['private_junior', '私立中'],
    ['public_high', '国公立高'],
    ['private_high', '私立高'],
  ];

  const escapeHtml = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const normalizeSchools = (items) => (items || [])
    .map((item) => typeof item === 'string' ? item : item?.name)
    .map((name) => String(name || '').trim())
    .filter(Boolean);

  const renderSchoolList = (schools, note) => {
    const text = schools.join('・');
    const suffix = note ? ` ${note}` : '';
    return `${escapeHtml(text)}${escapeHtml(suffix)}`;
  };

  const initResults = async () => {
    const section = document.querySelector('#achievement');
    const schoolsWrap = document.querySelector('.achievement__schools');
    if (!section || !schoolsWrap) return;

    try {
      const isLocalPreview = ['localhost', '127.0.0.1', ''].includes(location.hostname);
      const sources = isLocalPreview ? ['data/results.json', CMS_RESULTS_URL] : [CMS_RESULTS_URL, 'data/results.json'];
      let response;

      for (const source of sources) {
        response = await fetch(source, { cache: 'no-store' }).catch(() => null);
        if (response?.ok) break;
      }

      if (!response?.ok) throw new Error('results data not found');
      const data = await response.json();
      const lead = section.querySelector('.achievement__lead');
      if (lead && data.lead) lead.textContent = data.lead;

      schoolsWrap.innerHTML = categories.map(([key, label], index) => {
        const schools = normalizeSchools(data[key]);
        if (!schools.length) return '';
        const margin = index > 0 ? ' style="margin-top: 12px;"' : '';
        return `
          <p class="achievement__school-category"${margin}>【${escapeHtml(label)}】</p>
          <p class="achievement__school-list">${renderSchoolList(schools, data.note)}</p>
        `;
      }).join('');
    } catch (error) {
      // 静的HTMLの内容を残すため、読み込み失敗時は何もしない。
    }
  };

  document.addEventListener('DOMContentLoaded', initResults);
})();
