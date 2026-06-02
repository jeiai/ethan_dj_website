const filterButtons = document.querySelectorAll("[data-filter]");
const photoCards = document.querySelectorAll("[data-category]");
const videoCards = Array.from(document.querySelectorAll(".video-card"));
const videoShell = document.querySelector("[data-video-shell]");
const toggleVideos = document.querySelector("[data-toggle-videos]");
const nextVideo = document.querySelector("[data-video-next]");
const prevVideo = document.querySelector("[data-video-prev]");
const galleryItems = Array.from(document.querySelectorAll(".photo-card"));
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");

let activeVideo = 0;
let activePhoto = 0;

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    photoCards.forEach((card) => {
      const shouldShow = filter === "todos" || card.dataset.category === filter;
      card.classList.toggle("hidden", !shouldShow);
    });
  });
});

function showVideo(index) {
  activeVideo = (index + videoCards.length) % videoCards.length;
  videoCards.forEach((card, cardIndex) => {
    card.classList.toggle("active", cardIndex === activeVideo);
  });
}

nextVideo?.addEventListener("click", () => showVideo(activeVideo + 1));
prevVideo?.addEventListener("click", () => showVideo(activeVideo - 1));

toggleVideos?.addEventListener("click", () => {
  const isCollapsed = videoShell.classList.toggle("collapsed");
  toggleVideos.textContent = isCollapsed ? "Mostrar carrusel" : "Ocultar carrusel";
  toggleVideos.setAttribute("aria-expanded", String(!isCollapsed));
});

function getVisibleGalleryItems() {
  return galleryItems.filter((item) => !item.classList.contains("hidden"));
}

function renderLightbox(index) {
  const visibleItems = getVisibleGalleryItems();
  if (!visibleItems.length) return;

  activePhoto = (index + visibleItems.length) % visibleItems.length;
  const activeCard = visibleItems[activePhoto];
  const image = activeCard.querySelector("img");
  const caption = activeCard.querySelector("span")?.textContent || image.alt;

  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption;
}

function openLightbox(card) {
  const visibleItems = getVisibleGalleryItems();
  const index = visibleItems.indexOf(card);

  renderLightbox(index);
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
}

function closeLightbox() {
  lightbox.hidden = true;
  document.body.style.overflow = "";
  lightboxImage.src = "";
}

galleryItems.forEach((card) => {
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.addEventListener("click", () => openLightbox(card));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(card);
    }
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => renderLightbox(activePhoto - 1));
lightboxNext?.addEventListener("click", () => renderLightbox(activePhoto + 1));

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (lightbox?.hidden) return;
  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") renderLightbox(activePhoto - 1);
  if (event.key === "ArrowRight") renderLightbox(activePhoto + 1);
});
