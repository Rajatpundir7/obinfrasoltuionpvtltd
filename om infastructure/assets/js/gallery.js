// Gallery Lightbox Implementation
class GalleryLightbox {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.init();
  }

  init() {
    // Create lightbox HTML
    this.createLightbox();
    // Attach event listeners to gallery items
    this.attachListeners();
  }

  createLightbox() {
    const lightbox = document.createElement('div');
    lightbox.id = 'galleryLightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-overlay"></div>
      <div class="lightbox-content">
        <button class="lightbox-close" aria-label="Close lightbox">×</button>
        <button class="lightbox-prev" aria-label="Previous image">‹</button>
        <button class="lightbox-next" aria-label="Next image">›</button>
        <img class="lightbox-image" src="" alt="">
        <div class="lightbox-caption"></div>
      </div>
    `;
    document.body.appendChild(lightbox);

    // Event listeners
    lightbox.querySelector('.lightbox-overlay').addEventListener('click', () => this.close());
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.next());
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('active')) {
        if (e.key === 'Escape') this.close();
        if (e.key === 'ArrowLeft') this.prev();
        if (e.key === 'ArrowRight') this.next();
      }
    });
  }

  attachListeners() {
    document.querySelectorAll('.gallery-item, .project-card').forEach((item, index) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const img = item.querySelector('img');
        if (img) {
          this.images = Array.from(document.querySelectorAll('.gallery-item img, .project-card img'))
            .map(img => ({
              src: img.src,
              alt: img.alt || ''
            }));
          this.currentIndex = this.images.findIndex(imgObj => imgObj.src === img.src);
          if (this.currentIndex === -1) this.currentIndex = index;
          this.open();
        }
      });
    });
  }

  open() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.updateImage();
  }

  close() {
    const lightbox = document.getElementById('galleryLightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.updateImage();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }

  updateImage() {
    const lightbox = document.getElementById('galleryLightbox');
    const img = lightbox.querySelector('.lightbox-image');
    const caption = lightbox.querySelector('.lightbox-caption');
    
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = this.images[this.currentIndex].src;
      img.alt = this.images[this.currentIndex].alt;
      caption.textContent = this.images[this.currentIndex].alt;
      img.style.opacity = '1';
    }, 200);
  }
}

// Initialize gallery when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new GalleryLightbox());
} else {
  new GalleryLightbox();
}

