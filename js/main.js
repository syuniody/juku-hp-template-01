/* ===================================
   main.js — ハンバーガーメニュー・スムーススクロール・スライダー
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHamburgerMenu();
  initSmoothScroll();
  initSlider();
});

/* --- ハンバーガーメニュー --- */
function initHamburgerMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-open');
    body.style.overflow = isOpen ? 'hidden' : '';
  });

  // メニューリンクをクリックで閉じる
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('is-active');
      mobileMenu.classList.remove('is-open');
      body.style.overflow = '';
    });
  });

  // リサイズ時にメニューを閉じる
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('is-active');
      mobileMenu.classList.remove('is-open');
      body.style.overflow = '';
    }
  });
}

/* --- スムーススクロール --- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/* --- 教室写真スライダー --- */
function initSlider() {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const track = slider.querySelector('.slider__track');
  const slides = slider.querySelectorAll('.slider__slide');
  const prevBtn = slider.querySelector('.slider__prev');
  const nextBtn = slider.querySelector('.slider__next');
  const dotsContainer = slider.querySelector('.slider__dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;
  let autoplayInterval;

  // ドットを生成
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.classList.add('slider__dot');
      dot.setAttribute('aria-label', `スライド ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // ドット更新
    const dots = dotsContainer?.querySelectorAll('.slider__dot');
    dots?.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // ボタン操作
  prevBtn?.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  // タッチ/ドラッグ操作
  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      resetAutoplay();
    }
    isDragging = false;
  }, { passive: true });

  track.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
    track.style.cursor = 'grabbing';
  });

  track.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      resetAutoplay();
    }
    isDragging = false;
    track.style.cursor = 'grab';
  });

  track.addEventListener('mouseleave', () => {
    isDragging = false;
    track.style.cursor = 'grab';
  });

  // 自動再生
  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 4000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  track.style.cursor = 'grab';
  startAutoplay();
}
