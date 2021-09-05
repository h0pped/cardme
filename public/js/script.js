const cardContainer = document.querySelector("#generate-card-container");
const titleContainer = document.querySelector("#title-container");
const titleWrapper = document.querySelector(".title-wrap");
const readyCardContainer = document.querySelector("#ready-card-container");
const body = document.querySelector("body");
const card = document.querySelector("#generate-card");
const submitBtn = document.querySelector(".submit-btn");

const description = document.querySelector("#description");
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
let generatedObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.2,
};
function cardObserver(entries, observer) {
  console.log(...entries);
  if (entries[0].isIntersecting) {
    card.classList.remove("hidden");
  } else {
    card.classList.add("hidden");
  }
}
function titleObserverFunc(entries, observer) {
  if (entries[0].isIntersecting) {
    titleWrapper.classList.remove("hidden");
  } else {
    titleWrapper.classList.add("hidden");
  }
}
function generatedObserverFunc(entries, observer) {
  console.log("LAST INTERSECTION");

  if (entries[0].isIntersecting) {
  }
}
let observer = new IntersectionObserver(cardObserver, cardObserverOptions);
let titleObserver = new IntersectionObserver(
  titleObserverFunc,
  titleObserverOptions
);
let generatedObserver = new IntersectionObserver(
  generatedObserverFunc,
  generatedObserverOptions
);

observer.observe(cardContainer);
titleObserver.observe(titleContainer);
generatedObserver.observe(readyCardContainer);

submitBtn.addEventListener("click", (e) => {
  showReadyCardContainer();
  readyCardContainer.scrollIntoView({
    behavior: "smooth",
  });
});
function showReadyCardContainer() {
  readyCardContainer.classList.remove("hidden");
}
