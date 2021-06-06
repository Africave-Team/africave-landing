let toBeSlidUp = document.querySelectorAll(".to-be-slid-up");
let toBeSlidRight = document.querySelectorAll(".to-be-slid-right");

let burgerBtn = document.querySelector(".js-burger-btn")

let mainNavBar = document.querySelector(".main-navigation-rapper")

//toggle burger menu
burgerBtn.addEventListener("click", function(){
  console.log("clicked")
  burgerBtn.classList.toggle("burger-btn-active")
})

function onscrollanimations() {
  checkForSlideCont("slide-up", toBeSlidUp, 200);
  checkForSlideCont("slide-right", toBeSlidRight, 200);
}

function styleNavBar() {
  if (window.scrollY >= 10) {
    mainNavBar.classList.add("style-nav");
  } else {
    mainNavBar.classList.remove("style-nav");
  }
}
window.addEventListener("load", function() {
  onscrollanimations();
});

window.addEventListener("scroll", function() {
  onscrollanimations();
  styleNavBar();
});

//add animationName to every "list[x]" once list[0] is in view
function checkForslidupLine(animationname, list, everySec) {
  if (checkView(list[0]) === true) {
    let count = 0;
    let interv = setInterval(function() {
      count === list.length
        ? clearInterval(interv)
        : (function() {
            list[count].classList.add(animationname);
          })();
      count++;
    }, everySec);
  }
}

//adds "animationname" to every visible "list"[x] with an interval of "everySec"
function checkForSlideCont(animationname, list, everySec) {
  let count = 0;
  let interv = setInterval(function() {
    count === list.length
      ? clearInterval(interv)
      : (function() {
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
  }

  // checking for partial visibility
  else if (position.top < window.innerHeight && position.bottom >= 0) {
    return true;
  }
  return false;
}
