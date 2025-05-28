$(document).ready(function() {

  // Initialize the typewriter animation
  var typed = new Typed('#typed-text', {
      strings: [
        'AI/ML Engineer',
        'Software Developer',
        'Data Scientist',
        'Computer Scientist',
        'Problem Solver',
        'Innovator',
        'Cross-Platform App Developer'
      ],
      typeSpeed: 100,
      backSpeed: 75,
      backDelay: 750,
      startDelay: 750,
      loop: true,
      showCursor: true,
      cursorChar: '|'
  });

  // Scroll to top button
  $(".scroll-top").click(function() {
    $("html, body").animate({ scrollTop: 0 }, 500);
  });

  // Dark/light mode toggle
  $(".mode-toggle").click(function() {
    $("body").toggleClass("light-mode");
    
    if ($("body").hasClass("light-mode")) {
      $(this).html('<i class="fas fa-moon"></i>');
      localStorage.setItem("mode", "light");
    } else {
      $(this).html('<i class="fas fa-sun"></i>');
      localStorage.setItem("mode", "dark");
    }
  });

  // Check for saved mode preference (default to dark mode)
  if (localStorage.getItem("mode") === "light") {
    $("body").addClass("light-mode");
    $(".mode-toggle").html('<i class="fas fa-moon"></i>');
  } else {
    // Ensure we start in dark mode
    $("body").removeClass("light-mode");
    $(".mode-toggle").html('<i class="fas fa-sun"></i>');
    localStorage.setItem("mode", "dark");
  }

  // Project filtering - smooth animations without jumps
  $(".filter-btn").click(function() {
    const value = $(this).attr("data-filter");
    
    // First, fade out all projects that don't match
    if (value === "all") {
      $(".project").fadeIn(600);
    } else {
      // Hide non-matching projects first
      $(".project").not("." + value).fadeOut(300);
      
      // Then show matching projects after a slight delay
      setTimeout(function() {
        $(".project").filter("." + value).fadeIn(400);
      }, 200);
    }
    
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");
  });

  //sticky header
    $(window).scroll(function() {
      if ($(this).scrollTop() > 1) {
        $(".header-area").addClass("sticky");
      } else {
        $(".header-area").removeClass("sticky");
      }
  
      // Update the active section in the header
      updateActiveSection();

      // Show/hide scroll to top button
      if ($(this).scrollTop() > 300) {
        $(".scroll-top").css("display", "flex");
      } else {
        $(".scroll-top").css("display", "none");
      }
    });
  
    $(".header ul li a").click(function(e) {
      e.preventDefault(); 
  
      var target = $(this).attr("href");
  
      if ($(target).hasClass("active-section")) {
        return; 
      }
  
      if (target === "#home") {
        $("html, body").animate(
          {
            scrollTop: 0 
          },
          500
        );
      } else {
        var offset = $(target).offset().top - 40; 
  
        $("html, body").animate(
          {
            scrollTop: offset
          },
          500
        );
      }
  
      $(".header ul li a").removeClass("active");
      $(this).addClass("active");
    });
  

    //Initial content revealing js
    ScrollReveal({
      distance: "100px",
      duration: 2000,
      delay: 200
    });
  
    ScrollReveal().reveal(".header a, .profile-photo, .about-content, .education", {
      origin: "left"
    });
    ScrollReveal().reveal(".header ul, .profile-text, .about-skills, .internship", {
      origin: "right"
    });
    ScrollReveal().reveal(".project-title, .contact-title", {
      origin: "top"
    });
    ScrollReveal().reveal(".projects, .contact", {
      origin: "bottom"
    });

  //contact form to excel sheet
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
  const form = document.forms['submitToGoogleSheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
      e.preventDefault()
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              msg.innerHTML = "Message sent successfully"
              setTimeout(function () {
                  msg.innerHTML = ""
              }, 5000)
              form.reset()
          })
          .catch(error => console.error('Error!', error.message))
  })
    
  });
  
  function updateActiveSection() {
    var scrollPosition = $(window).scrollTop();
  
    // Checking if scroll position is at the top of the page
    if (scrollPosition === 0) {
      $(".header ul li a").removeClass("active");
      $(".header ul li a[href='#home']").addClass("active");
      return;
    }
  
    // Iterate through each section and update the active class in the header
    $("section").each(function() {
      var target = $(this).attr("id");
      var offset = $(this).offset().top;
      var height = $(this).outerHeight();
  
      if (
        scrollPosition >= offset - 40 &&
        scrollPosition < offset + height - 40
      ) {
        $(".header ul li a").removeClass("active");
        $(".header ul li a[href='#" + target + "']").addClass("active");
      }
    });
  }
  

 