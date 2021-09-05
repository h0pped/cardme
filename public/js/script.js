const cardContainer = document.querySelector("#generate-card-container");
const titleContainer = document.querySelector("#title-container");
const titleWrapper = document.querySelector(".title-wrap");
const readyCardContainer = document.querySelector("#ready-card-container");
const body = document.querySelector("body");
const card = document.querySelector("#card");
const submitBtn = document.querySelector(".submit-btn");
let cardObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};
let titleObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};
function cardObserver(entries, observer) {
  console.log(...entries);
  if (entries[0].isIntersecting) {
    body.style.backgroundColor = "#b99c85";
    card.classList.remove("hidden");
  } else {
    card.classList.add("hidden");
  }
}
function titleObserverFunc(entries, observer) {
  if (entries[0].isIntersecting) {
    titleWrapper.classList.remove("hidden");
    body.style.backgroundColor = "#CCB3A3";
  } else {
    titleWrapper.classList.add("hidden");
  }
}
let observer = new IntersectionObserver(cardObserver, cardObserverOptions);
let titleObserver = new IntersectionObserver(
  titleObserverFunc,
  titleObserverOptions
);

observer.observe(cardContainer);
titleObserver.observe(titleContainer);

submitBtn.addEventListener("click", (e) => {
  showReadyCardContainer();
  readyCardContainer.scrollIntoView({
    behavior: "smooth",
  });
});

function showReadyCardContainer() {
  readyCardContainer.classList.remove("hidden");
}

// background: colors.$card-page-color;
