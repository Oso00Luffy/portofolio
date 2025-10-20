// Image Slideshow for SCC App Project
document.addEventListener('DOMContentLoaded', function() {
  let currentSlide = 0;
  const slideshowContainer = document.querySelector('#scc-slideshow');
  
  if (slideshowContainer) {
    const slides = slideshowContainer.querySelectorAll('img');
    const prevBtn = document.querySelector('#scc-prev');
    const nextBtn = document.querySelector('#scc-next');
    const totalSlides = slides.length;
    let isAnimating = false;
    
    if (slides.length > 0) {
      // Show specific slide with animation
      function showSlide(index, direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;
        
        const prevIndex = currentSlide;
        
        // Wrap around if needed
        if (index >= totalSlides) {
          currentSlide = 0;
        } else if (index < 0) {
          currentSlide = totalSlides - 1;
        } else {
          currentSlide = index;
        }
        
        // Add exit animation to current slide
        if (direction === 'next') {
          slides[prevIndex].classList.add('slide-out-left');
        } else {
          slides[prevIndex].classList.add('slide-out-right');
        }
        
        // Remove active class after animation
        setTimeout(() => {
          slides[prevIndex].classList.remove('active', 'slide-out-left', 'slide-out-right');
          
          // Show new slide with entrance animation
          slides[currentSlide].classList.add('active');
          
          // Reset animation lock
          setTimeout(() => {
            isAnimating = false;
          }, 100);
        }, 600);
      }
      
      // Next slide function
      function nextSlide() {
        showSlide(currentSlide + 1, 'next');
      }
      
      // Previous slide function
      function prevSlide() {
        showSlide(currentSlide - 1, 'prev');
      }
      
      // Add click events to navigation arrows
      if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
      }
      
      if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
      }
      
      // Auto-play slideshow every 4 seconds
      let autoSlide = setInterval(nextSlide, 4000);
      
      // Pause auto-play on hover
      const outerContainer = document.querySelector('.new_pro1 .outer_iframe');
      if (outerContainer) {
        outerContainer.addEventListener('mouseenter', function() {
          clearInterval(autoSlide);
        });
        
        outerContainer.addEventListener('mouseleave', function() {
          autoSlide = setInterval(nextSlide, 4000);
        });
      }
      
      // Keyboard navigation
      document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          nextSlide();
        }
      });
      
      // Initialize first slide
      slides[0].classList.add('active');
    }
  }
});

// Image Slideshow for PC Assistant Project
document.addEventListener('DOMContentLoaded', function() {
  let currentSlide = 0;
  const slideshowContainer = document.querySelector('#pc-slideshow');
  
  if (slideshowContainer) {
    const slides = slideshowContainer.querySelectorAll('img');
    const prevBtn = document.querySelector('#pc-prev');
    const nextBtn = document.querySelector('#pc-next');
    const totalSlides = slides.length;
    let isAnimating = false;
    
    if (slides.length > 0) {
      // Show specific slide with animation
      function showSlide(index, direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;
        
        const prevIndex = currentSlide;
        
        // Wrap around if needed
        if (index >= totalSlides) {
          currentSlide = 0;
        } else if (index < 0) {
          currentSlide = totalSlides - 1;
        } else {
          currentSlide = index;
        }
        
        // Add exit animation to current slide
        if (direction === 'next') {
          slides[prevIndex].classList.add('slide-out-left');
        } else {
          slides[prevIndex].classList.add('slide-out-right');
        }
        
        // Remove active class after animation
        setTimeout(() => {
          slides[prevIndex].classList.remove('active', 'slide-out-left', 'slide-out-right');
          
          // Show new slide with entrance animation
          slides[currentSlide].classList.add('active');
          
          // Reset animation lock
          setTimeout(() => {
            isAnimating = false;
          }, 100);
        }, 600);
      }
      
      // Next slide function
      function nextSlide() {
        showSlide(currentSlide + 1, 'next');
      }
      
      // Previous slide function
      function prevSlide() {
        showSlide(currentSlide - 1, 'prev');
      }
      
      // Add click events to navigation arrows
      if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
      }
      
      if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
      }
      
      // Auto-play slideshow every 4 seconds
      let autoSlide = setInterval(nextSlide, 4000);
      
      // Pause auto-play on hover
      const outerContainer = document.querySelector('.new_pro2 .outer_iframe');
      if (outerContainer) {
        outerContainer.addEventListener('mouseenter', function() {
          clearInterval(autoSlide);
        });
        
        outerContainer.addEventListener('mouseleave', function() {
          autoSlide = setInterval(nextSlide, 4000);
        });
      }
      
      // Initialize first slide
      slides[0].classList.add('active');
    }
  }
});
