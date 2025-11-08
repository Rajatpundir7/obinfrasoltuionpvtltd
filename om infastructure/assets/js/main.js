// Hero Background Image Carousel
const heroImages = ['/1.jpg', '/2.jpg', '/3.jpg', '/4.jpg', '/5.jpg', '/6.jpg'];
let currentHeroIndex = 0;
const heroBg = document.getElementById('heroBg');

if (heroBg) {
  // Preload images
  heroImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });

  // Change hero background every 8 seconds
  setInterval(() => {
    currentHeroIndex = (currentHeroIndex + 1) % heroImages.length;
    heroBg.style.opacity = '0';
    setTimeout(() => {
      heroBg.src = heroImages[currentHeroIndex];
      heroBg.style.opacity = '1';
    }, 500);
  }, 8000);

  heroBg.style.transition = 'opacity 1s ease-in-out';
}

// Header shrink on scroll
const header = document.querySelector('.header');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 50;
  header?.classList.toggle('shrink', scrolled);
  lastScrollY = window.scrollY;
}, { passive: true });

// Mobile menu
const menuBtn = document.querySelector('#hamburger');
const mobileMenu = document.querySelector('#mobileMenu');
const overlay = document.querySelector('#overlay');

function toggleMenu(open) {
  const isOpen = open ?? !mobileMenu?.classList.contains('open');
  mobileMenu?.classList.toggle('open', isOpen);
  overlay?.classList.toggle('show', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
  if (menuBtn) {
    menuBtn.textContent = isOpen ? '✕' : '☰';
  }
}

menuBtn?.addEventListener('click', () => toggleMenu());
overlay?.addEventListener('click', () => toggleMenu(false));

// Close mobile menu on link click
document.querySelectorAll('.mobile-links a').forEach(link => {
  link.addEventListener('click', () => toggleMenu(false));
});

// FAQ accordion
document.querySelectorAll('.accordion').forEach(acc => {
  const singleOpen = acc.dataset.singleOpen === 'true';
  
  acc.querySelectorAll('.accordion-item').forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    const button = header?.querySelector('button');
    
    if (!header || !content) return;
    
    header.addEventListener('click', () => {
      const isOpen = content.classList.contains('open');
      
      if (singleOpen) {
        // Close all other items
        acc.querySelectorAll('.accordion-content').forEach(c => {
          if (c !== content) {
            c.style.maxHeight = null;
            c.classList.remove('open');
            const btn = c.parentElement.querySelector('.accordion-header button');
            if (btn) {
              btn.textContent = '+';
              btn.setAttribute('aria-expanded', 'false');
            }
          }
        });
      }
      
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.classList.add('open');
        if (button) {
          button.textContent = '−';
          button.setAttribute('aria-expanded', 'true');
        }
      } else {
        content.style.maxHeight = null;
        content.classList.remove('open');
        if (button) {
          button.textContent = '+';
          button.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe cards and sections
document.querySelectorAll('.card, .stat, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// Animated background sections - ensure background images load
document.querySelectorAll('.animated-bg-section').forEach(section => {
  const bgImage = section.style.getPropertyValue('--bg-image');
  if (bgImage) {
    // Preload the background image
    const img = new Image();
    const imageUrl = bgImage.replace(/url\(['"]?|['"]?\)/g, '');
    img.src = imageUrl;
    
    // Ensure the CSS variable is properly set
    section.style.setProperty('--bg-image', bgImage);
    
    // Add a class when image is loaded for smooth transition
    img.onload = () => {
      section.classList.add('bg-loaded');
    };
    
    // If image is already cached, add class immediately
    if (img.complete) {
      section.classList.add('bg-loaded');
    }
  }
});

// Parallax effect for hero on scroll
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const hero = document.querySelector('.hero-bg');
      if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px) scale(1.1)`;
      }
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

// Contact form handling with backend
const contactForm = document.querySelector('#contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Disable button and show loading
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
      // Try to send via fetch API (Vercel serverless function)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });
      
      const result = await response.json();
      
      if (result.success) {
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.style.cssText = 'padding: 16px; background: #22C55E; color: white; border-radius: 8px; margin-top: 16px; animation: slideIn 0.3s ease;';
        successMsg.textContent = result.message || 'Thank you for your message! We will contact you shortly.';
        contactForm.appendChild(successMsg);
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
          successMsg.remove();
        }, 5000);
      } else {
        alert(result.message || 'Sorry, there was an error. Please try again.');
      }
    } catch (error) {
      // Fallback: use mailto if backend fails
      console.error('Error:', error);
      const data = Object.fromEntries(formData.entries());
      
      // Basic validation
      if (!data.name || !data.email || !data.message) {
        alert('Please fill in all required fields (Name, Email, and Message).');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        alert('Please enter a valid email address.');
        submitButton.disabled = false;
        submitButton.textContent = originalText;
        return;
      }
      
      // Use mailto as fallback
      const subject = encodeURIComponent(data.subject || 'Contact Form Submission');
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\n\nMessage:\n${data.message}`);
      window.location.href = `mailto:ombalaji.ltd@gmail.com?subject=${subject}&body=${body}`;
      
      alert('Opening your email client. If it doesn\'t open, please email us at ombalaji.ltd@gmail.com');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}


// Performance: Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', function() {
    this.style.opacity = '1';
  });
  if (!img.complete) {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
  }
});
