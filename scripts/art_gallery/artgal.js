document.addEventListener("DOMContentLoaded", () => {
    const zoomables = document.querySelectorAll('.zoomable-art');
  
    zoomables.forEach(el => {
      el.addEventListener('click', () => {
        const overlay = document.createElement('div');
        overlay.classList.add('image-overlay');
  
        let content;
  
        // ✅ Check if it's a fallback (text box)
        if (el.classList.contains('fallback')) {
          content = document.createElement('div');
          content.textContent = el.textContent || "Artwork not found";
          content.classList.add('zoomed-fallback');
        } else {
          content = document.createElement('img');
          content.src = el.src;
          content.alt = el.alt;
        }
  
        overlay.appendChild(content);
        document.body.appendChild(overlay);
  
        // Animate in
        requestAnimationFrame(() => {
          overlay.classList.add('show');
        });
  
        const closeOverlay = () => {
          overlay.classList.remove('show');
          setTimeout(() => overlay.remove(), 300);
          document.removeEventListener('keydown', escListener);
          overlay.removeEventListener('click', closeOverlay);
        };
  
        const escListener = (e) => {
          if (e.key === "Escape") {
            closeOverlay();
          }
        };
  
        overlay.addEventListener('click', closeOverlay);
        document.addEventListener('keydown', escListener);
      });
    });
  });
  