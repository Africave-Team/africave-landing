// console.log("connected")
let windowURL = window.location.href;
let urlparams = new URLSearchParams(windowURL);
let id = urlparams.get("id");
urlparams.append("title", "transparency");
let bdyNode = document.querySelector(".content-rapper .js-bdy");
let contentNode = bdyNode.querySelector(".js-content");
let titleNode = bdyNode.querySelector(".js-title");
let prvBtn = document.querySelector(".ctrls .js-prv-btn");
let nextBtn = document.querySelector(".ctrls .js-next-btn");
// console.log(id)

function fetchData(url) {
  return new Promise(function(success, fail) {
    let ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function() {
      if (ajax.readyState === 4) {
        if (ajax.status < 400) {
          success(ajax.responseText);
        }
      }
    };
    ajax.open("GET", url, true);
    ajax.send();
  });
}
fetchData("data/guide-lines.json").then(function(jsonData) {
  let parsedJson = JSON.parse(jsonData);
  for (content in parsedJson) {
    if (content === id) {
      let currentContent = content;
      let currentData = parsedJson[currentContent];
      //   console.log(currentData)
      let htmlContent = "";

      //since there can only be one title ...
      let htmlTitle = `${currentData["title"]}`;
      for (contentSections in currentData) {
        if (currentData[contentSections]["type"] === "paragraph") {
          //   console.log(currentData[contentSections]);
          htmlContent += `<p>${currentData[contentSections]["text"]}</p>`;
        }
      }
      titleNode.innerHTML = htmlTitle;
      contentNode.innerHTML += htmlContent;
    }
  }
  if (parsedJson[Number(id) + 1]) {
    nextBtn.setAttribute("href", `./guide-lines.html?&id=${Number(id) + 1}`);
  } else {
    nextBtn.disabled = true;
    nextBtn.classList.add("disabled");
  }
  if (parsedJson[Number(id) - 1]) {
    prvBtn.setAttribute("href", `./guide-lines.html?&id=${Number(id) - 1}`);
  } else {
    prvBtn.disabled = true;
    prvBtn.classList.add("disabled");

  }
});
