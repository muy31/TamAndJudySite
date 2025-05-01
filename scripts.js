// Add any JavaScript functionality here
// This file is currently empty as there is no JavaScript functionality yet 

document.addEventListener('DOMContentLoaded', function() {
    // Get all gallery images
    const galleryImages = document.querySelectorAll('.screenshots img');
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="" alt="">
            <div class="lightbox-nav lightbox-prev">&#10094;</div>
            <div class="lightbox-nav lightbox-next">&#10095;</div>
        </div>
    `;
    document.body.appendChild(lightbox);

    let currentImageIndex = 0;

    // Open lightbox when clicking on an image
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            updateLightboxImage();
            lightbox.classList.add('active');
        });
    });

    // Close lightbox
    lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Close lightbox when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });

    // Navigation
    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    });

    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
                updateLightboxImage();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
                updateLightboxImage();
            }
        }
    });

    function updateLightboxImage() {
        const lightboxImg = lightbox.querySelector('img');
        lightboxImg.src = galleryImages[currentImageIndex].src;
        lightboxImg.alt = galleryImages[currentImageIndex].alt;
    }
}); 