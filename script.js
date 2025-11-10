document.addEventListener("DOMContentLoaded", function () {
  // Initialize all galleries with class 'gallery-container'
  initializeAllGalleries();
});

function initializeAllGalleries() {
  const galleryElements = document.querySelectorAll(".gallery-container");

  galleryElements.forEach((galleryElement, index) => {
    if (!galleryElement.id) {
      // If no ID, assign one
      galleryElement.id = `gallery-${index + 1}`;
    }
    initializeGallery(galleryElement.id);
  });
}

function initializeGallery(galleryId) {
  const galleryElement = document.getElementById(galleryId);

  if (!galleryElement) {
    console.error("Gallery element not found");
    return;
  }

  // First initialize justified gallery
  if (window.jQuery && jQuery.fn.justifiedGallery) {
    $(galleryElement).justifiedGallery({
      captions: false,
      lastRow: "hide",
      rowHeight: 180,
      margins: 5,
    });

    // Initialize lightGallery after justified gallery is complete
    $(galleryElement).on("jg.complete", function () {
      initializeLightGallery(galleryElement, galleryId);
    });
  } else {
    console.error("Justified Gallery not loaded");
    // Fallback: initialize lightGallery directly
    initializeLightGallery(galleryElement, galleryId);
  }
}

function initializeLightGallery(galleryElement, galleryId) {
  if (window.lightGallery) {
    lightGallery(galleryElement, {
      autoplayFirstVideo: false,
      pager: false,
      galleryId: galleryId, // Use the unique gallery ID
      flipHorizontal: false,
      flipVertical: false,
      rotateLeft: false,
      plugins: [
        lgZoom,
        lgThumbnail,
        lgShare,
        lgRotate,
        lgFullscreen,
        lgAutoplay,
      ],
      mobileSettings: {
        controls: false,
        showCloseIcon: false,
        download: false,
        rotate: false,
      },
    });
    console.log(
      "lightGallery initialized successfully for gallery: " + galleryId
    );
  } else {
    console.error("lightGallery not loaded");
  }
}
