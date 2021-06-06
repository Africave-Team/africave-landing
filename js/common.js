/**
 * All common js code will go in this file. Common js code is any code that will be used across multiple pages.
 *
 */

const servers = ["africave.co", "africavetest.com"];
const apiServer = servers.includes(location.hostname)
  ? `https://api.${location.hostname}/api/v1`
  : `https://api.${servers[1]}/api/v1`;

const countriesEndpoint = `${apiServer}/countries`;
const registerEndpoint = `${apiServer}/register`;
const loginEndpoint = `${apiServer}/login`;
const stacksEndpoint = `${apiServer}/stacks`;
const toolsEndpoint = `${apiServer}/tools`;

//client onboarding...
const clientsEndpoint = `${apiServer}/clients`;
const clientOnboarding = `${clientsEndpoint}/onboarding`;
const autUserDetails = `${apiServer}/users/me`;
const emailConfirmation = `${apiServer}/email/confirmation`;
const basicValidation = `${clientsEndpoint}/onboarding/details`;

//developer on-boarding
const devStepOneValidation = `${apiServer}/developers/onboarding/first`;
const ExperienceEndpoint = `${apiServer}/experience_level`;
const developerOnboarding = `${apiServer}/developers/onboarding`;

//dashboards
const dashboards = {
  client: "./dashboard/client",
  admin: "./dashboard/admin",
  developer: "./dashboard/developer",
};

function getnadd(url, selectBox) {
  let selectOptionsHtml = "";
  // selectBox.innerHTML = '';
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((object) => {
      // console.log(object);
      for (let x = 0; x < object.data.length; x++) {
        let itemName = object.data[x].name || object.data[x].value;
        let itemId = object.data[x].id;
        selectOptionsHtml += `<option value="${itemName}" apiId = ${
          itemId ? itemId : false
        }>${itemName[0].toUpperCase()}${itemName.slice(1)}</option>`;
      }
      // console.log(selectBox);
      selectBox.innerHTML += selectOptionsHtml;
    });
}

const getQueryParams = (params, url) => {
  let href = url;
  //this expression is to get the query strings...
  let reg = new RegExp("[?&]" + params + "=([^&#]*)", "i");
  let queryString = reg.exec(href);
  return queryString ? queryString[1] : null;
};

// [{key: key, value: value}, ...]

//example...
// storeItemsLocally([
//   {
//     key: "test",
//     value: "test",
//   },
//   {
//     key: "test2",
//     value: "test",
//   },
//   {
//     key: "test3",
//     value: "test",
//   },
// ]);

const storeItemsLocally = (Array) => {
  Array.forEach((set) => {
    if (typeof set.value === "object") {
      localStorage.setItem(set.key, JSON.stringify(set.value));
      //to get this item from localstorage use JSON.parse(localStorage.getItem(set.key))
    } else {
      localStorage.setItem(set.key, set.value);
    }
  });
};

const storeItemsSession = (Array) => {
  Array.forEach((set) => {
    if (typeof set.value === "object") {
      sessionStorage.setItem(set.key, JSON.stringify(set.value));
      //to get this item from localstorage use JSON.parse(localStorage.getItem(set.key))
    } else {
      sessionStorage.setItem(set.key, set.value);
    }
  });
};

function getSelectedOptionId(elem) {
  return elem.options[elem.selectedIndex].getAttribute("apiid");
}

const ref_id = getQueryParams("ref", window.location.href);
ref_id ? sessionStorage.setItem("referral_id", ref_id) : false;
const referral_id = sessionStorage.getItem("referral_id");

//ALLNEW