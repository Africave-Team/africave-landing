let toBeSlidUp = document.querySelectorAll(".to-be-slid-up");
let hwwCards = document.querySelectorAll(".js-how-we-work-section .card");
let sltToProCards = document.querySelectorAll(".slt-to-pro-section .card");
let toBeSlidUpLine = document.querySelectorAll(".to-be-slid-up-line");
let gchCards = document.querySelectorAll(".gch .card-container");
let toBeSlidRight = document.querySelectorAll(".to-be-slid-right");
let burgerBtn = document.querySelector(".js-burger-btn");
let mainNavBar = document.querySelector(".main-navigation-rapper");
let mblImg = document.querySelector(".mbl-img img");
let bodyLoader = document.querySelector(".body-loader");
let topSectionInput = document.querySelector(
  ".top-section-text .bordered-input"
);

// console.log(gchCards);
//toggle burger menu
burgerBtn.addEventListener("click", function () {
  burgerBtn.classList.toggle("burger-btn-active");
});

//style navigation bar when window is scrolled down...
function styleNavBar() {
  window.scrollY >= 10
    ? mainNavBar.classList.add("style-nav")
    : mainNavBar.classList.remove("style-nav");
}

//all onscroll animations
function onscrollanimations() {
  checkForSlideCont("slide-up", toBeSlidUp, 150);
  checkForSlideCont("slide-right", toBeSlidRight, 200);
  // checkForslidupLine("slide-up", hwwCards, 200);
  checkForslidupLine("slide-up", toBeSlidUpLine, 200);
  checkForslidupLine("slide-up", sltToProCards, 200);
  checkForslidupLine("slide-up", gchCards, 200);
}

//hiding loader
function hideBodyLoader() {
  bodyLoader.classList.add("hide-body-loader");
}

window.addEventListener("DOMContentLoaded", function () {
  onscrollanimations();
  styleNavBar();
  hideBodyLoader();
});

window.addEventListener("scroll", function () {
  onscrollanimations();
  styleNavBar();
});

window.addEventListener("resize", function () {
  onscrollanimations();
  styleNavBar();
});

//add animationName to every "list[x]" once list[0] is in view
function checkForslidupLine(animationname, list, everySec) {
  function dskTopMode() {
    if (checkView(list[0]) === true) {
      let count = 0;
      let interv = setInterval(function () {
        count === list.length
          ? clearInterval(interv)
          : (function () {
              list[count].classList.add(animationname);
            })();
        count++;
      }, everySec);
    }
  }
  window.outerWidth > 768
    ? dskTopMode()
    : checkForSlideCont(animationname, list, everySec);
}

//adds "animationname" to every visible "list"[x] with an interval of "everySec"
function checkForSlideCont(animationname, list, everySec) {
  let count = 0;
  let interv = setInterval(function () {
    count === list.length
      ? clearInterval(interv)
      : (function () {
          checkView(list[count]) == true
            ? list[count].classList.add(animationname)
            : 0;
        })();
    count++;
  }, everySec);
}

//check if "element" in view port
function checkView(element) {
  var position = element.getBoundingClientRect();
  // checking whether fully visible
  if (position.top >= 0 && position.bottom <= window.innerHeight) {
    return true;
  } else if (position.top < window.innerHeight && position.bottom >= 0) {
    // checking for partial visibility
    return true;
  }
  return false;
}

//code to move tool tip...
function initTipLoop() {
  // format ----[[top, left], name, role, imgSrc(relative to index.html)]
  let Tippositions = [
    ["20%", "35%", "Lanre Okemati", "Ui/Ux developer", "./img/lanre.png"],
    [
      "60%",
      "50%",
      "Olamide Sholanke",
      "Front-end developer",
      "./img/sholankeolamide.jpeg",
    ],
    ["78%", "85%", "Kenneth Osas", "DevOps developer", "./img/female.jpg"],
    ["25%", "70%", "Chidenu", "Back-end developer", "./img/chinedu.jpg"],
  ];

  let tooltipCont = document.querySelector(".top-section .tool-tip-container");
  let tooltipRapper = document.querySelector(".top-section .tool-tip-rapper");
  let tooltipName = document.querySelector(".top-section .tool-tip .name");
  let tooltipRole = document.querySelector(".top-section .tool-tip .role");
  let tooltipDp = document.querySelector(".top-section .dp");

  let x = 1;
  setInterval(function () {
    tooltipRapper.classList.add("hide");
    let y = x;
    setTimeout(() => {
      tooltipRapper.classList.remove("hide");
      tooltipName.innerText = Tippositions[y][2];
      tooltipRole.innerText = Tippositions[y][3];
      tooltipDp.setAttribute("src", Tippositions[y][4]);
    }, 1000);

    tooltipCont.style.top = Tippositions[x][0];
    tooltipCont.style.left = Tippositions[x][1];

    x === Tippositions.length - 1 ? (x = -1) : false;
    x++;
  }, 4000);
}

initTipLoop();

//first movement... translate(calc(-1 * (calc(23pc + 40px))),0)
function profileSlider() {
  let sliderRapper = document.querySelector(".profile-slider");
  let orginalCards = sliderRapper.querySelector(".original-cards");
  let nextButton = document.querySelector(".engs-profiles .ctrls .next-Btn");
  let previousButton = document.querySelector(
    ".engs-profiles .ctrls .prev-Btn"
  );
  let cards = orginalCards.querySelectorAll(".card");

  let pc = 0;
  let px = 0;
  //activeCardIndex = Math.floor of number of cards divided by 2
  let activecardIndex = Math.floor(cards.length / 2);
  //pc part of the width
  let pc1 = 23;
  //margin right + left
  let px1 = 40;

  //reduce the width on small screens
  if (window.outerWidth < 769) {
    pc1 = 20;
  }
  let movementCounter = 0;
  let formerWidth = window.outerWidth;
  //when I resize the window, if the width changes reset the scroll bar, if the width is 769, reduce the pc part of the width
  window.addEventListener("resize", function () {
    if (window.outerWidth < 769) {
      if (window.outerWidth != formerWidth) {
        pc1 = 20;
        resetScrollBar();
      }
    } else {
      if (window.outerWidth != formerWidth) {
        pc1 = 23;
        resetScrollBar();
      }
    }
    formerWidth = window.outerWidth;
    function resetScrollBar() {
      pc = 0;
      px = 0;
      movementCounter = 0;
      activecardIndex = 2;
      changeActiveCard();
      sliderRapper.style.transform = `translate( calc(-1 * (calc(${0}pc + ${0}px))),0)`;
      //disable the relative movement buttons if user has scrolled to either ends of the slider
      if (movementCounter === -2 || movementCounter === 2) {
        previousButton.classList.add("disabled");
        nextButton.classList.remove("disabled");
      } else {
        previousButton.classList.remove("disabled");
        nextButton.classList.remove("disabled");
      }
    }
  });

  //function to move engineers' profile slider right...
  function moveright() {
    pc = pc + pc1;
    px = px + px1;
    sliderRapper.style.transform = `translate( calc(-1 * (calc(${pc}pc + ${px}px))),0)`;
    movementCounter++;
    activecardIndex++;
    changeActiveCard();
    if (movementCounter === 2) {
      nextButton.classList.add("disabled");
      previousButton.classList.remove("disabled");
    } else {
      previousButton.classList.remove("disabled");
      nextButton.classList.remove("disabled");
    }
  }

  //function to move engineers' profile slider left...
  function moveleft() {
    pc = pc - pc1;
    px = px - px1;
    sliderRapper.style.transform = `translate( calc(-1 * (calc(${pc}pc + ${px}px))),0)`;
    movementCounter--;
    activecardIndex--;
    changeActiveCard();
    if (movementCounter === -2) {
      previousButton.classList.add("disabled");
      nextButton.classList.remove("disabled");
    } else {
      previousButton.classList.remove("disabled");
      nextButton.classList.remove("disabled");
    }
  }

  //function to change active card....
  function changeActiveCard() {
    cards.forEach((elem) => {
      elem.classList.remove("active-card");
    });
    cards[activecardIndex].classList.add("active-card");
    cards[activecardIndex].classList.add("active-card");
  }

  //adding actual functions to left and right buttons...
  nextButton.onclick = function () {
    moveright();
  };

  previousButton.onclick = function () {
    moveleft();
  };
}
//wait for window to load before running profileSlider
window.addEventListener("load", function () {
  profileSlider();
});
