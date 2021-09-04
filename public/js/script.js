const cardContainer = document.querySelector("#generate-card-container");
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
    card.classList.remove("hidden");
  } else {
    card.classList.add("hidden");
  }
}
let observer = new IntersectionObserver(cardObserver, cardObserverOptions);

observer.observe(cardContainer);
