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

var QR_CODE = new QRCode("qrcode", {
  width: 220,
  height: 220,
  colorDark: "#000000",
  colorLight: "transparent",
  correctLevel: QRCode.CorrectLevel.H,
});

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
    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(card),
    })
      .then((res) => res.json())
      .then((data) => (data.err ? reject(data.err) : resolve(data)))
      .catch((err) => {
        reject(err);
      });
  });
const generateDescriptionBlocks = (description) => {
  let descriptionBlocks = "";

  description.split("\n").forEach((el) => {
    descriptionBlocks += `
      <div class="card-block">
      <div class="card-block-content">
        <h3>${el}</h3>
      </div>
    </div>
      `;
  });
  return descriptionBlocks;
};
const createResultCard = (data) => {
  let cardEl = document.createElement("div");
  cardEl.classList.add("card");

  //NAME BLOCK
  cardEl.innerHTML += `
  <div class="card-block">
    <div class="card-block-content">
      <h3>Hello!</h3>
    </div>
  </div>
  <div class="card-block">
    <div class="card-block-content">
      <h3>My name is ${data.name}</h3>
    </div>
  </div>
  `;

  // JOB BLOCK
  if (data.job)
    cardEl.innerHTML += `
  <div class="card-block">
    <div class="card-block-content">
      <h3>I am ${data.job} ${
      data.company_name.length != 0 ? `in ${data.company_name}` : ""
    }</h3>
    </div>
  </div>
  `;

  //DESCRIPTION BLOCKS
  if (data.description)
    cardEl.innerHTML += generateDescriptionBlocks(data.description);

  //email
  if (data.email)
    cardEl.innerHTML += `
  <div class="card-block block-stretch">
    <div class="card-block-content">
      <h3>My Email:
        <a
          href="mailto:${data.email}"
        >${data.email}</a></h3>
    </div>
  </div>
  `;
  if (data.phone)
    cardEl.innerHTML += `
  <div class="card-block">
    <div class="card-block-content">
      <h3>Phone number:
        <a href="tel:${data.phone}">${data.phone}</a></h3>

    </div>
  </div>
  `;
  return cardEl;
  /*
   <div id="ready-card-container" class="hidden">
        <div class="left">

          <div class="card">
            <div class="card-block">
              <div class="card-block-content">
                <h3>Hello!</h3>
              </div>
            </div>
            <div class="card-block">
              <div class="card-block-content">
                <h3>My name is Illia</h3>
              </div>
            </div>
            <div class="card-block">
              <div class="card-block-content">
                <h3>I am Digital Assistant At Google</h3>
              </div>

            </div>
            <div class="card-block">
              <div class="card-block-content">
                <h3>I help people to manage their tasks in a specific way</h3>
              </div>
            </div>
            <div class="card-block">
              <div class="card-block-content">
                <h3>
                  Also I like dogs :)
                </h3>
              </div>
            </div>
            <div class="card-block block-stretch">
              <div class="card-block-content">
                <h3>My Email:
                  <a
                    href="mailto:notawril@gmail.com"
                  >notawril@gmail.com</a></h3>
              </div>
            </div>
            <div class="card-block">
              <div class="card-block-content">
                <h3>Phone number:
                  <a href="tel:+380958539914">+380958539114</a></h3>

              </div>
            </div>

          </div>
          <div id="add-links-container">
            <button id="add-link-btn" class="links-button">
              Add link
            </button>
            <button id="add-telegram-btn" class="links-button">
              Add Telegram
            </button>
            <button id="add-whatsapp-btn" class="links-button">
              Add WhatsApp
            </button>
          </div>
        </div>*/
};
submitBtn.addEventListener("click", async (e) => {
  console.log("AAA");
  sendCard()
    .then((result) => {
      QR_CODE.makeCode(document.URL + result._id);
      readyCardContainer.querySelector(".left").innerHTML = "";
      readyCardContainer
        .querySelector(".left")
        .appendChild(createResultCard(result));
      showReadyCardContainer();
    })
    .catch((err) => {
      console.log(err);
    });
});
function showReadyCardContainer() {
  readyCardContainer.classList.remove("hidden");
  readyCardContainer.scrollIntoView({
    behavior: "smooth",
  });
}
