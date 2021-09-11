const cardContainer = document.querySelector("#generate-card-container");
const titleContainer = document.querySelector("#title-container");
const titleWrapper = document.querySelector(".title-wrap");

const readyCardContainer = document.querySelector("#ready-card-container");
const cardTitleContainer = document.querySelector(".card-title-container");
const cardTitleEl = cardTitleContainer.querySelector(".glass-card");
const cardTitleBlocks = cardTitleEl.querySelectorAll(".card-block");
const body = document.querySelector("body");
const card = document.querySelector("#generate-card");
const submitBtn = document.querySelector(".submit-btn");
const supplementButtons = document.querySelector(".supplements-containter");
const buttonsContainer = document.querySelector("#buttons-container");
const supplementsInput = document.querySelector("#supplementsInput");
const supplementsInputContainer = supplementButtons.querySelector(".input");
const supplementAddButton = supplementButtons.querySelector(
  "#add-supplement-button"
);
//card information elements
const nameInput = document.querySelector("#nameInput");
const jobInput = document.querySelector("#jobInput");
const companyInput = document.querySelector("#companyInput");
const descriptionInput = document.querySelector("#descriptionInput");
const emailInput = document.querySelector("#emailInput");
const numberInput = document.querySelector("#numberInput");
const description = document.querySelector("#description");
let activeInput;
let supplementInputOption;
let currentCardId;
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
  cardEl.classList.add("glass-card");

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
  if (data.job_title)
    cardEl.innerHTML += `
  <div class="card-block">
    <div class="card-block-content">
      <h3>I am ${data.job_title} ${
      data.company_name && data.company_name?.length != 0
        ? `in ${data.company_name}`
        : ""
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
};
submitBtn.addEventListener("click", async (e) => {
  console.log("AAA");
  sendCard()
    .then((result) => {
      QR_CODE.makeCode(document.URL + result._id);
      currentCardId = result._id;
      if (readyCardContainer.querySelector(".glass-card")) {
        readyCardContainer
          .querySelector(".left")
          .removeChild(readyCardContainer.querySelector(".glass-card"));
      }

      console.log(supplementButtons);
      readyCardContainer
        .querySelector(".left")
        .insertBefore(createResultCard(result), supplementButtons);
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

async function addSupplement(supplement, value) {
  return await fetch(`/supplement/${currentCardId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      supplement,
      value,
    }),
  }).then((res) => res.json());
}
function addBlock(value) {
  const readyCard = readyCardContainer.querySelector(".glass-card");
  const block = document.createElement("div");
  block.classList.add("card-block");
  block.innerHTML = `
  <div class="card-block-content">
  ${value}
</div>
  `;
  readyCard.appendChild(block);
}
cardTitleContainer.addEventListener("mousemove", (e) => {
  let xAxis = (window.innerWidth / 1.5 - e.pageX) / 25;
  let yAxis = (window.innerHeight / 1.5 - e.pageY) / 50;
  cardTitleEl.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
});
cardTitleContainer.addEventListener("mouseenter", (e) => {
  cardTitleEl.style.transition = "none";

  // Popout
  cardTitleBlocks.forEach((el) => {
    el.style.transform = "translateZ(50px) ";
  });
});
cardTitleContainer.addEventListener("mouseleave", (e) => {
  cardTitleEl.style.transition = "all 0.5s ease";
  cardTitleBlocks.forEach((el) => {
    el.style.transform = "translateZ(0px)";
  });

  cardTitleEl.style.transform = "rotateY(0deg) rotateX(0deg)";
});

cardContainer.addEventListener("click", (e) => {
  if (e.target.getAttribute("placeholder")) {
    if (activeInput) {
      activeInput.classList.remove("active");
    }
    activeInput = e.target.closest(".card-block");
    activeInput.classList.add("active");
  }
});
buttonsContainer.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    supplementsInputContainer.classList.remove("hidden");
    let supplement = e.target.id.split("-")[1];
    supplementInputOption = supplement;
    switch (supplement) {
      case "telegram":
        supplementsInput.value = "";
        supplementsInput.placeholder = "Add Telegram...";
        break;
      case "instagram":
        supplementsInput.value = "";
        supplementsInput.placeholder = "Add Instagram...";
        break;
      case "link":
        supplementsInput.value = "";
        supplementsInput.placeholder = "Add Link...";
        break;
    }
  }
});
supplementAddButton.addEventListener("click", async (e) => {
  console.log(supplementsInput.value);
  const res = await addSupplement(
    supplementInputOption,
    supplementsInput.value
  );
  if (res._id) {
    switch (supplementInputOption) {
      case "telegram":
        addBlock(
          `<h3>Telegram: <a href="https://t.me/${res.telegram}">@${res.telegram}</a></h3>`
        );
        break;
      case "instagram":
        addBlock(
          `<h3>Instagram: <a href="https://instagram.com/${res.instagram}">@${res.instagram}</a></h3>`
        );
        break;
      case "link":
        addBlock(`<h3>Website: <a href="${res.link}">${res.link}</a></h3>`);
        break;
    }
  }
  console.log(res);
});
