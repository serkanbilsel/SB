'use strict';

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.querySelector("[data-navbar]");
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const overlay = document.querySelector("[data-overlay]");

  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  };

  navTogglers.forEach(toggler => {
    toggler.addEventListener('click', toggleNavbar);
  });

  const header = document.querySelector("[data-header]");
  window.addEventListener("scroll", function () {
    header.classList.toggle("active", window.scrollY > 100);
  });

  const revealElements = document.querySelectorAll("[data-reveal]");
  const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

  const reveal = function () {
    revealElements.forEach(element => {
      if (element.getBoundingClientRect().top < window.innerHeight / 1.2) {
        element.classList.add("revealed");
      }
    });
  };

  revealDelayElements.forEach(element => {
    element.style.transitionDelay = element.dataset.revealDelay;
  });

  window.addEventListener('scroll', reveal);
  reveal();

  const menuToggler = document.getElementById('menu-toggler');
  const menuItems = document.querySelectorAll('.menu-item');

  menuToggler.checked = true;

  menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
      menuToggler.checked = false;
      document.body.style.overflow = 'auto';
    });
  });

  menuToggler.addEventListener('change', function () {
    document.body.style.overflow = this.checked ? 'hidden' : 'auto';
  });

  const slider = document.querySelector('.slider');
  const sliderItems = document.querySelectorAll('.slider-item');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  let currentIndex = 0;
  let autoSlideInterval;

  function autoSlide() {
    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sliderItems.length;
      showSliderItem(currentIndex);
    }, 5000);
  }

  function showSliderItem(index) {
    slider.style.transform = `translateX(${-index * 100}%)`;
  }

  nextBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    currentIndex = (currentIndex + 1) % sliderItems.length;
    showSliderItem(currentIndex);
    autoSlide();
  });

  prevBtn.addEventListener('click', () => {
    clearInterval(autoSlideInterval);
    currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
    showSliderItem(currentIndex);
    autoSlide();
  });

  autoSlide();

  function openPDF(pdfUrl) {
    const popup = document.createElement('div');
    popup.classList.add('pdf-popup');

    const popupContent = document.createElement('div');
    popupContent.classList.add('pdf-popup-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('pdf-popup-close');
    closeButton.innerHTML = '&times;';

    closeButton.onclick = function () {
      document.body.removeChild(popup);
      document.body.style.overflow = 'auto';
    };

    const iframe = document.createElement('iframe');
    iframe.src = pdfUrl;
    iframe.style.width = '100%';
    iframe.style.height = '100%';

    popupContent.appendChild(closeButton);
    popupContent.appendChild(iframe);
    popup.appendChild(popupContent);
    document.body.appendChild(popup);

    document.body.style.overflow = 'hidden';
  }

  const pdfItems = document.querySelectorAll('.pdf-slider-item');
  pdfItems.forEach(function (item) {
    const pdfUrl = item.getAttribute('data-pdf');
    const canvas = item.querySelector('.pdf-thumbnail');
    const context = canvas.getContext('2d');

    const loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(function (pdf) {
      pdf.getPage(1).then(function (page) {
        const viewport = page.getViewport({ scale: 0.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        page.render(renderContext);
      });
    });
  });
});



function openModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
}


function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}


window.onclick = function (event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    closeModal();
  }
};
function openPDF(pdfPath) {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {

    window.open(pdfPath, '_blank');
  } else {

    const popup = document.createElement('div');
    popup.classList.add('pdf-popup');

    const iframe = document.createElement('iframe');
    iframe.src = pdfPath;

    popup.appendChild(iframe);
    document.body.appendChild(popup);

    popup.classList.add('active');

    popup.addEventListener('click', function () {
      popup.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 300);
    });
  }
}

document.querySelectorAll('.pdf-slider').forEach((slider) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
});

