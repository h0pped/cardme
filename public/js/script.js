const cardContainer = document.querySelector("#generate-card-container");
const body = document.querySelector("body");
const card = document.querySelector("#card");

let cardObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.6,
};
function cardObserver(entries, observer) {
  console.log(...entries);
  if (entries[0].isIntersecting) {
    console.log("TRYE");
    body.style.backgroundColor = "#b99c85";
    card.classList.remove("hidden");
  } else {
    card.classList.add("hidden");
    body.style.backgroundColor = "#CCB3A3";
  }
}
let observer = new IntersectionObserver(cardObserver, cardObserverOptions);

observer.observe(cardContainer);

// background: colors.$card-page-color;
