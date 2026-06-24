document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Mobile Hamburger Menu ---
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const navMenu = document.getElementById('nav-menu');

  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // --- 2. Expandable "Read More" Logic ---
  const readMoreBtns = document.querySelectorAll('.read-more-btn');

  readMoreBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Find the specific card this button belongs to
      const card = this.closest('.expandable-card');
      const snippet = card.querySelector('.snippet');
      const fullText = card.querySelector('.full-text');

      if (fullText.classList.contains('hidden')) {
        // EXPAND: Hide snippet, show full text, scale card, change button text
        snippet.classList.add('hidden');
        fullText.classList.remove('hidden');
        card.classList.add('active'); // CSS scales it up
        this.textContent = 'Read Less';
      } else {
        // COLLAPSE: Show snippet, hide full text, unscale card, change button text
        fullText.classList.add('hidden');
        snippet.classList.remove('hidden');
        card.classList.remove('active');
        this.textContent = 'Read More';
      }
    });
  });

  // --- 3. Carousel Sliding Logic ---
  function setupCarousel(trackId, prevBtnId, nextBtnId) {
    const track = document.getElementById(trackId);
    const prevBtn = document.getElementById(prevBtnId);
    const nextBtn = document.getElementById(nextBtnId);
    
    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;

    // Calculate how many cards fit based on screen width matching our CSS
    function getCardsPerView() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 3;
      return 4; // Default desktop view
    }

    function updateCarousel() {
      const cardWidth = track.children[0].getBoundingClientRect().width;
      const gap = 24; // 1.5rem gap defined in CSS
      const amountToMove = (cardWidth + gap) * currentIndex;
      track.style.transform = `translateX(-${amountToMove}px)`;
    }

    nextBtn.addEventListener('click', () => {
      const cardsPerView = getCardsPerView();
      const totalCards = track.children.length;
      
      // Only slide if there are more cards to show
      if (currentIndex < totalCards - cardsPerView) {
        currentIndex++;
        updateCarousel();
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    });

    // Handle window resize to reset carousel to prevent weird alignments
    window.addEventListener('resize', () => {
      currentIndex = 0;
      updateCarousel();
    });
  }

  // Initialize both carousels
  setupCarousel('voices-track', 'voices-prev', 'voices-next');
  setupCarousel('share-track', 'share-prev', 'share-next');

});

