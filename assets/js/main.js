
/***************************
        mode switch
***************************/

document.addEventListener('DOMContentLoaded', function() {

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        var checkbox = document.getElementById("lc-swich");
        checkbox.checked = true;
    }
    // Clone .lc-mode-switcher and append it to .lc-mode-switcher-place
const lcModeSwitcher = document.querySelector('.lc-mode-switcher');
const lcModeSwitcherPlace = document.querySelector('.lc-mode-switcher-place');
lcModeSwitcherPlace.appendChild(lcModeSwitcher.cloneNode(true));

// Add event listener to #lc-switch
const lcSwitch = document.getElementById('lc-swich');
lcSwitch.addEventListener('change', function() {
  if (this.checked) {
    // Set .lc-hidden-switcher input to true
    const lcHiddenSwitcherInput = document.querySelectorAll('.lc-hidden-switcher input');
    lcHiddenSwitcherInput.forEach(function(input) {
      input.checked = true;
    });

    // Add lc-active class to .lc-mode-swich-animation-frame
    const lcModeSwitchAnimationFrame = document.querySelector('.lc-mode-swich-animation-frame');
    lcModeSwitchAnimationFrame.classList.add('lc-active');

    // Fade out #lc-scroll-container and perform callback function
    const lcScrollContainer = document.querySelector('#lc-scroll-container');
    lcScrollContainer.animate({opacity: 0}, 600);
      // Add lc-active class to .lc-mode-swich-animation and change href of #lc-switch-style
      setTimeout(function() {
        const lcModeSwitchAnimation = document.querySelector('.lc-mode-swich-animation');
        lcModeSwitchAnimation.classList.add('lc-active');
        const lcSwitchStyle = document.getElementById('lc-switch-style');
        lcSwitchStyle.href = 'assets/css/style-dark.css';
      }, 200);

      // Remove lc-active class from .lc-mode-swich-animation-frame and fade in #lc-scroll-container
      setTimeout(function() {
        lcModeSwitchAnimationFrame.classList.remove('lc-active');
        lcScrollContainer.animate({opacity: 1}, 600);
      }, 1000);
    
  } else {
    // Set .lc-hidden-switcher input to false
    const lcHiddenSwitcherInput = document.querySelectorAll('.lc-hidden-switcher input');
    lcHiddenSwitcherInput.forEach(function(input) {
      input.checked = false;
    });

    // Add lc-active class to .lc-mode-swich-animation-frame
    const lcModeSwitchAnimationFrame = document.querySelector('.lc-mode-swich-animation-frame');
    lcModeSwitchAnimationFrame.classList.add('lc-active');

    // Fade out #lc-scroll-container and perform callback function
    const lcScrollContainer = document.querySelector('#lc-scroll-container');
    lcScrollContainer.animate({opacity: 0}, 600);
    
      // Remove lc-active class from .lc-mode-swich-animation and change href of #lc-switch-style
      setTimeout(() => {
        const lcModeSwitchAnimation = document.querySelector('.lc-mode-swich-animation');
        lcModeSwitchAnimation.classList.remove('lc-active');
        const lcSwitchStyle = document.getElementById('lc-switch-style');
        lcSwitchStyle.href = 'assets/css/style-light.css';
      }, 200);

      // Remove lc-active class from .lc-mode-swich-animation-frame and fade in #lc-scroll-container
      setTimeout(function() {
        lcModeSwitchAnimationFrame.classList.remove('lc-active');
        lcScrollContainer.animate({opacity: 1}, 600);
      }, 1000);
    
  }
});
});
  

$(function() {

    "use strict";
  
    /***************************
    contact form 1
    ***************************/
    $("#form1").submit(function() {
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: $(this).serialize()
      }).done(function() {
        $('.lc-popup-form-frame .lc-success-banner').addClass('lc-active');
      });
      return false;
    });
  
    /***************************
    contact form 2
    ***************************/
    $("#form2").submit(function() {
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: $(this).serialize()
      }).done(function() {
        $('.lc-contact-card .lc-success-banner').addClass('lc-active');
      });
      return false;
    });
  
    /***************************
    preloader
    ***************************/
  
    $(document).ready(function() {
      $('html').addClass('is-animating');
      $(".lc-scroll-container").animate({
        opacity: 0,
      });
      setTimeout(function() {
        $('html').removeClass('is-animating');
        $(".lc-scroll-container").animate({
          opacity: 1,
        }, 600);
      }, 1000);
    });
  
    
    $('.lc-menu-btn').on('click', function() {
      $('.lc-menu-btn , .lc-right-side').toggleClass('lc-active');
    })
    $('.lc-menu ul li a').on('click', function() {
      $('.lc-menu-btn , .lc-right-side').removeClass('lc-active');
    })

    var swiper = new Swiper('.lc-slideshow', {
      slidesPerView: 1,
      effect: 'fade',
      parallax: true,
      autoplay: true,
      speed: 1400,
    });
    
    /***************************
  
    fancybox
  
    ***************************/
    $('[data-fancybox]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });
    $('[data-fancybox="gallery"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });
    $('[data-fancybox="portfolio"]').fancybox({
      animationEffect: "zoom-in-out",
      animationDuration: 600,
      transitionDuration: 1200,
      buttons: [
        "zoom",
        "slideShow",
        "thumbs",
        "close",
      ],
    });
    $.fancybox.defaults.hash = false;
  
  });