const cardContainer = document.querySelector("#generate-card-container");
const titleContainer = document.querySelector("#title-container");
const titleWrapper = document.querySelector(".title-wrap");
const readyCardContainer = document.querySelector("#ready-card-container");
const body = document.querySelector("body");
const card = document.querySelector("#generate-card");
const submitBtn = document.querySelector(".submit-btn");

//card information elements
const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const companyInput = document.querySelector("#companyInput");
const descriptionInput = document.querySelector("#descriptionInput");
const emailInput = document.querySelector("#emailInput");
const numberInput = document.querySelector("#numberInput");

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

const formatDescription = (str) =>
  str
    .replace(/(\n[ ]*)+/g, "\n")
    .split("\n")
    .map((el) => el.trim())
    .filter((el) => el)
    .join("\n");
const generateCardBody = function () {
  return {
    name: nameInput.value,
    job_title: jobInput.value,
    company_name: companyInput.value,
    description: formatDescription(descriptionInput.innerText),
    email: emailInput.value,
    phone: numberInput.value,
  };
};

const sendCard = () =>
  new Promise((resolve, reject) => {
    let card = generateCardBody();
    console.log(card);
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    })
      .then((res) => res.json())
      .then((data) => resolve(data))
      .catch((err) => {
        reject(err);
      });
  });

submitBtn.addEventListener("click", async (e) => {
  console.log("AAA");
  sendCard()
    .then((result) => console.log(result))
    .catch((err) => {
      console.log(err);
    });
  showReadyCardContainer();
  readyCardContainer.scrollIntoView({
    behavior: "smooth",
  });
});
function showReadyCardContainer() {
  readyCardContainer.classList.remove("hidden");
}
