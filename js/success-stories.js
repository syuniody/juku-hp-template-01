(() => {
  const CATEGORY_LABELS = {
    junior: '中学受験・中高一貫校',
    high: '高校受験',
  };

  const escapeHtml = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  const renderBody = (body = '') => {
    const paragraphs = String(body)
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);

    if (!paragraphs.length) return '';

    return paragraphs.map((paragraph) => {
      const html = escapeHtml(paragraph)
        .replace(/\*\*([^*]+)\*\*/g, '<span class="success-card__emphasis">$1</span>')
        .replace(/\n/g, '<br>');
      return `<p>${html}</p>`;
    }).join('');
  };

  const getPageYear = () => {
    const title = document.querySelector('.success-hero__title')?.textContent || '';
    const match = title.match(/20\d{2}/);
    return match ? Number(match[0]) : new Date().getFullYear();
  };

  const renderCard = (story) => `
    <article class="success-card" data-category="${escapeHtml(story.category || 'high')}">
      <img alt="" aria-hidden="true" class="success-card__mark" src="../images/success-sakura.png">
      <p class="success-card__school">${escapeHtml(story.school)}</p>
      ${story.name ? `<p class="success-card__name">${escapeHtml(story.name)}</p>` : ''}
      <h2 class="success-card__title">${escapeHtml(story.title)}</h2>
      <div class="success-card__body">${renderBody(story.body)}</div>
    </article>
  `;

  const updateFilterCounts = (stories) => {
    const buttons = document.querySelectorAll('.success-filter [data-filter]');
    buttons.forEach((button) => {
      const target = button.dataset.filter;
      const label = target === 'all' ? 'すべて' : CATEGORY_LABELS[target] || button.textContent.replace(/（.*?）/g, '');
      const count = target === 'all'
        ? stories.length
        : stories.filter((story) => story.category === target).length;
      button.textContent = `${label}（${count}）`;
    });
  };

  const initFilter = () => {
    const filter = document.querySelector('.success-filter');
    if (!filter) return;

    const empty = document.querySelector('.success-empty');
    const buttons = [...filter.querySelectorAll('[data-filter]')];
    const applyFilter = (target) => {
      const cards = [...document.querySelectorAll('.success-card')];
      let visibleCount = 0;

      cards.forEach((card) => {
        const show = target === 'all' || card.dataset.category === target;
        card.classList.toggle('is-hidden', !show);
        if (show) visibleCount += 1;
      });

      buttons.forEach((button) => {
        const active = button.dataset.filter === target;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-selected', String(active));
      });

      if (empty) empty.classList.toggle('is-visible', visibleCount === 0);
    };

    filter.addEventListener('click', (event) => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      applyFilter(button.dataset.filter);
    });

    applyFilter('all');
  };

  const initSuccessStories = async () => {
    const grid = document.querySelector('.success-grid');
    if (!grid) return;

    try {
      const response = await fetch('stories.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('stories.json not found');
      const data = await response.json();
      const year = getPageYear();
      const stories = (data.stories || [])
        .filter((story) => story.published !== false && Number(story.year) === year)
        .sort((a, b) => Number(a.order || 999) - Number(b.order || 999));

      if (!stories.length) {
        initFilter();
        return;
      }

      grid.innerHTML = stories.map(renderCard).join('');
      updateFilterCounts(stories);
      initFilter();
    } catch (error) {
      initFilter();
    }
  };

  document.addEventListener('DOMContentLoaded', initSuccessStories);
})();
