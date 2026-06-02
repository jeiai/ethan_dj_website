const filterButtons = document.querySelectorAll("[data-filter]");
const photoCards = document.querySelectorAll("[data-category]");
const videoCards = Array.from(document.querySelectorAll(".video-card"));
const videoShell = document.querySelector("[data-video-shell]");
const toggleVideos = document.querySelector("[data-toggle-videos]");
const nextVideo = document.querySelector("[data-video-next]");
const prevVideo = document.querySelector("[data-video-prev]");

let activeVideo = 0;

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
