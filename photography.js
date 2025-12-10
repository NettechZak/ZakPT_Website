// Photography page specific JS
document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('photo-gallery');

    if (gallery) {
        // Try to load up to 20 photos
        const maxPhotos = 20;
        const photoExtensions = ['jpg', 'jpeg', 'png', 'webp'];
        let loadedPhotos = 0;

        // Clear the gallery first
        gallery.innerHTML = '';

        // Function to create gallery item
        function createGalleryItem(index, src) {
            const item = document.createElement('div');
            item.className = 'gallery-item';

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Photo ${index}`;
            img.loading = 'lazy';

            // Handle image load error
            img.onerror = () => {
                item.remove();
            };

            img.onload = () => {
                loadedPhotos++;
            };

            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            overlay.innerHTML = `<span class="mono">IMG_${String(index).padStart(2, '0')}</span>`;

            item.appendChild(img);
            item.appendChild(overlay);
            gallery.appendChild(item);
        }

        // Try to load photos
        for (let i = 1; i <= maxPhotos; i++) {
            // Try .jpg first (most common)
            createGalleryItem(i, `photos/photo-${i}.jpg`);
        }

        // If no photos loaded after a delay, show a message
        setTimeout(() => {
            if (loadedPhotos === 0) {
                gallery.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-dim);"><p class="mono">No photos found. Add your photos to the /photos folder!</p><p style="margin-top: 1rem;">Name them photo-1.jpg, photo-2.jpg, etc.</p></div>';
            }
        }, 2000);
    }
});
