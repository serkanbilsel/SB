'use strict';



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR TOGGLE FOR MOBILE
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER
 * active header when window scroll down to 100px
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
});



/**
 * SCROLL REVEAL
 */

const revealElements = document.querySelectorAll("[data-reveal]");
const revealDelayElements = document.querySelectorAll("[data-reveal-delay]");

const reveal = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    if (revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.2) {
      revealElements[i].classList.add("revealed");
    }
  }
}

for (let i = 0, len = revealDelayElements.length; i < len; i++) {
  revealDelayElements[i].style.transitionDelay = revealDelayElements[i].dataset.revealDelay;
}

window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);



  function toggleDescription() {
    const description = document.querySelector('.detailed-description');

    // Açıklamanın gösterilip gösterilmediğini kontrol ediyoruz
    const isVisible = description.style.display !== 'none';

    // Açıklamanın görünürlüğünü değiştiriyoruz
    if (isVisible) {
      description.style.display = 'none';
    } else {
      description.style.display = 'block';
    }
  }





// JavaScript code
document.addEventListener('DOMContentLoaded', function () {
  const menuToggler = document.getElementById('menu-toggler');
  const menuLabel = document.querySelector('label[for="menu-toggler"]');
  const menuItems = document.querySelectorAll('.menu-item');

  // Resmin üzerine gelme olayını dinle
  const image = document.querySelector('.hero-banner img');
  image.addEventListener('mouseenter', function () {
    menuToggler.checked = true; // menüyü açmak için menü toggle'ı true olarak ayarla
  });

  // Resmin dışına çıkma olayını dinle
 
  // Menü öğelerine tıklanınca menüyü kapat
  menuItems.forEach(function (item) {
    item.addEventListener('click', function () {
      menuToggler.checked = false;
    });
  });

  // Menü açıldığında menü toggle'ını kaydırma özelliğini ekle
  menuToggler.addEventListener('change', function () {
    if (this.checked) {
      document.body.style.overflow = 'hidden'; // Menü açıldığında sayfanın kaydırılmasını engelle
    } else {
      document.body.style.overflow = ''; // Menü kapandığında sayfanın kaydırılmasını etkinleştir
    }
  });

  // Menü etiketine tıklandığında menüyü kapat
  menuLabel.addEventListener('click', function () {
    menuToggler.checked = false;
  });
});


if (/Mobi|Android/i.test(navigator.userAgent)) {
  window.addEventListener('load', function() {
    // Menüyü açmak için menü toggle'ını işaretleyin
    document.getElementById('menu-toggler').checked = true;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const menuToggler = document.getElementById('menu-toggler');
  menuToggler.checked = true; // sayfa yüklendiğinde menüyü otomatik olarak açmak için menü toggle'ını işaretleyin
});
