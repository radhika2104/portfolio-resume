// In OS setting dark/light - icon image opp should be visible
// On click, light/dark them should be reversed along with icon image
// add event listener on icons - if clicked , check changes in theme prefernce again
// use adding a class of light-theme and dark-theme in body for both media queries in classlist - put those styles in CSS

document.addEventListener("DOMContentLoaded", function () {
  let themeVarForLocalStorage;
  let currentThemeLocalStorage;
  // helper function for getting theme from local storage
  function getThemeFromLocalStorage() {
    return localStorage.getItem("theme");
  }

  // check changes in OS theme preference changes, and change icon image on DOM content load

  let darkThemePreference = window.matchMedia("(prefers-color-scheme:dark)");
  // true if theme pref is dark
  // console.log("darkThemePreference intial when image src is sun in html: ",darkThemePreference)
  let themeImages = document.querySelectorAll(".theme-icon");

  function checkIconAsPerTheme() {
    darkThemePreference = window.matchMedia("(prefers-color-scheme:dark)");
    currentThemeLocalStorage = getThemeFromLocalStorage();
    // console.log("darkThemePreference on first check to assign icon and changes in rendering tab: ",darkThemePreference)
    for (let themeImage of themeImages) {
      themeImage.src = darkThemePreference.matches ? "sun.png" : "moon.png";
      if (currentThemeLocalStorage == "light") {
        themeImage.src = "moon.png";
      } else if (currentThemeLocalStorage == "dark") {
        themeImage.src = "sun.png";
      }
    }
  }

  function checkThemeAsPerLocalStorage() {
    // if there is any theme in localStorage, follow that
    currentThemeLocalStorage = getThemeFromLocalStorage();
    if (currentThemeLocalStorage == "light") {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
    } else if (currentThemeLocalStorage == "dark") {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
    }
  }
  // check initial preference of OS when site is loaded
  checkIconAsPerTheme();
  checkThemeAsPerLocalStorage();
  // if preference is changed in rendering tab, change icon again
  darkThemePreference.addEventListener("change", function () {
    // remove any classes if present
    if (document.body.classList.contains("dark-theme")) {
      document.body.classList.remove("dark-theme");
    }
    if (document.body.classList.contains("light-theme")) {
      document.body.classList.remove("light-theme");
    }

    checkThemeAsPerLocalStorage();
    checkIconAsPerTheme();
  });

  // Now in any of the current preference of OS, add classList of light-theme/dark-theme on button click
  let themeImageButtons = document.querySelectorAll(".theme-icon-btn");
  for (let themeImageBtn of themeImageButtons) {
    themeImageBtn.addEventListener("click", function () {
      // if button is clicked, simply add or remove light-theme/dark-theme classes defined in CSS in both light and dark mode

      if (darkThemePreference.matches == true) {
        document.body.classList.toggle("light-theme");
      } else {
        document.body.classList.toggle("dark-theme");
      }

      // change Icon for image as per toggle
      for (let themeImage of themeImages) {
        if (themeImage.getAttribute("src") === "moon.png") {
          themeImage.src = "sun.png";
        } else {
          themeImage.src = "moon.png";
        }
      }
      // incase of preference change by icon click save it in localstorage
      themeVarForLocalStorage = document.body.classList.contains("light-theme")
        ? "light"
        : "dark";
      localStorage.setItem("theme", themeVarForLocalStorage);
    });
  }
});
