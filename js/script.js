// Ahlas Grup Yapı - shared site behavior

document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  var hamburger = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      var expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', String(!expanded));
    });

    // Close mobile menu when a link is clicked
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Header shadow on scroll
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add('shadow-md');
      } else {
        header.classList.remove('shadow-md');
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  // Footer year
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Project carousel (Projeler sayfası)
  var track = document.getElementById('carousel-track');
  var prevBtn = document.getElementById('carousel-prev');
  var nextBtn = document.getElementById('carousel-next');
  var dotsWrap = document.getElementById('carousel-dots');
  var carousel = document.getElementById('project-carousel');

  if (track && prevBtn && nextBtn && dotsWrap && carousel) {
    var slides = track.children;
    var dots = dotsWrap.children;
    var index = 0;
    var timer = null;

    var goTo = function (i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + (index * 100) + '%)';
      Array.prototype.forEach.call(dots, function (dot, dotIndex) {
        dot.classList.toggle('bg-primary', dotIndex === index);
        dot.classList.toggle('bg-primary/30', dotIndex !== index);
      });
    };

    var startAutoplay = function () {
      timer = setInterval(function () { goTo(index + 1); }, 6000);
    };
    var stopAutoplay = function () {
      if (timer) { clearInterval(timer); timer = null; }
    };

    prevBtn.addEventListener('click', function () { stopAutoplay(); goTo(index - 1); startAutoplay(); });
    nextBtn.addEventListener('click', function () { stopAutoplay(); goTo(index + 1); startAutoplay(); });
    Array.prototype.forEach.call(dots, function (dot, dotIndex) {
      dot.addEventListener('click', function () { stopAutoplay(); goTo(dotIndex); startAutoplay(); });
    });
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    goTo(0);
    startAutoplay();
  }

  // Basic contact form feedback (works alongside Formspree action)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function () {
      var btn = contactForm.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Gönderiliyor...';
      }
    });
  }
});
