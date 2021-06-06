let mainNavBar = document.querySelector(".main-navigation-rapper");
let questRappers = document.querySelectorAll(".question-rapper");
let burgerBtn = document.querySelector(".js-burger-btn");

//toggle burger menu
burgerBtn.addEventListener("click", function() {
  burgerBtn.classList.toggle("burger-btn-active");
});

//opening of questions onclick
(function() {
  for (let x = 0; x < questRappers.length; x++) {
    let questRapper = questRappers[x];
    questRapper.onclick = function() {
      questRapper.classList.toggle("opened");
    };
  }
})();

//open the second question, so that visitors understand that questions can be opened...
if (questRappers[2]) questRappers[2].onclick();

//style the nav bar if visitors scroll down...
function styleNavBar() {
  if (window.scrollY >= 10) {
    mainNavBar.classList.add("style-nav");
  } else {
    mainNavBar.classList.remove("style-nav");
  }
}

window.addEventListener("scroll", function() {
  styleNavBar();
});
window.addEventListener("load", function() {
  styleNavBar();
});
window.addEventListener("resize", function() {
  styleNavBar();
});

let questCatiButtons = document.querySelectorAll(
  ".card.js-question-category-btn"
);
let questSecRappers = document.querySelectorAll(
  ".questions-section-rapper .questions-section"
);

(function() {
  for (let x = 0; x < questCatiButtons.length; x++) {
    let questCatiBtn = questCatiButtons[x];
    let questSecRppr = questSecRappers[x];
    questCatiBtn.onclick = function() {
      questCatiButtons.forEach(e => {
        e.classList.remove("active-card");
      });
      questCatiBtn.classList.add("active-card");
      questSecRappers.forEach(e => {
        e.classList.remove("questions-section-active");
      });
      questSecRppr.classList.add("questions-section-active");
      sessionStorage.setItem("active-card-index", x);
      console.log(sessionStorage.getItem("active-card-index"));
    };
  }
  if (sessionStorage.getItem("active-card-index")) {
    questCatiButtons[sessionStorage.getItem("active-card-index")].onclick();
  }
})();

let QnAs = document.querySelectorAll(
  ".questions-section-rapper .question-rapper"
);
QnAs.forEach(e => {
  let question = e.querySelector(".question");
  let answer = e.querySelector(".answer");
  e.question = question;
  e.answer = answer;
});

let userQuestion = document.querySelector(".js-user-question");
userQuestion.addEventListener("keyup", function() {
  performSearch();

  function performSearch() {
    QnAs.forEach(e => {
      e.closest(".questions-section").style.display = "none";
    });
    if (userQuestion.value != "") {
      let path = new RegExp(`${userQuestion.value}`, "gi");

      QnAs.forEach(e => {
        e.style.display = "none";
        // e.closest(".questions-section").style.display = "none";

        if (
          e.question.innerText.search(path) != -1 ||
          e.answer.innerText.search(path) != -1
        ) {
          e.style.display = "flex";
          e.closest(".questions-section").style.display = "block";
        }
      });
    } else {
      QnAs.forEach(e => {
        e.style.display = "";
        e.style.display = "flex";
        e.closest(".questions-section").style.display = "";
      });
    }
  }
});

