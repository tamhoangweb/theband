let banners = document.querySelectorAll(".banner");
let countOfBanners = banners.length - 1;
let number = 1;
let active = "active";
let paused = false;

let intervalSlide = setInterval(() => {
  if (!paused) {
    number > countOfBanners ? (number = 1) : number++;

    let className = `.banner-${number}`;
    let banner1 = document.querySelector(className);
    banners.forEach((banner) => {
      banner.classList.remove(active);
    });
    banner1.classList.add(active);
  }
}, 2000);

banners.forEach((banner) => {
  banner.addEventListener("mouseover", () => {
    paused = true;
  });
  banner.addEventListener("mouseout", () => {
    paused = false;
  });
});

let btnMenu = document.querySelector(".btn-menu");
let nav2 = document.querySelector(".nav2");
btnMenu.addEventListener("click", () => {
  nav2.classList.toggle("active");
});

nav2.addEventListener("click", () => {
  nav2.classList.remove("active");
});
