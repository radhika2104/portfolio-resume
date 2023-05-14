const roles = [
  "Fashion Buyer turned Software Developer..",
  "Reader..",
  "Fitness Enthusiast..",
  "Nature lover..",
];

let roleSpan = document.getElementById("role");
let roleIndex = 0;
let letterIndex = 0;
let printingSpeed = 150;
let clearingSpeed = 70;
// console.log('understanding slice:',roles[0].slice(0,0))

function printRole(role) {
  if (letterIndex < role.length) {
    // add char and recursively call until we reach end of string length
    // roleSpan.textContent += role.charAt(letterIndex);
    roleSpan.textContent += role[letterIndex];
    // console.log(role[letterIndex]);
    letterIndex++;
    // call the function again to print next letter
    setTimeout(printRole, printingSpeed, role);
  } else {
    clearRole(role);
  }
}

function clearRole(role) {
  if (letterIndex <= -1) {
    letterIndex = 0;
    roleIndex++;
    // roleIndex can be greater than or equal to roles.length but we want to loop infinitely..
    if (roleIndex < 100) {
      let nextRole = roles[roleIndex % roles.length];
      printRole(nextRole);
    }
  } else {
    //  if letterIndex is greater than 0, show sliced text on every decrement recuresively
    // roleSpan.textContent = role.slice(0,letterIndex);
    // console.log(role.slice(0,letterIndex));
    let updatedRole = "";
    for (let i = 0; i < letterIndex; i++) {
      updatedRole += role.charAt(i);
    }
    roleSpan.textContent = updatedRole;
    // console.log(updatedRole);
    letterIndex--;
    setTimeout(clearRole, clearingSpeed, role);
  }
}

printRole(roles[roleIndex]);

// header position static till 'about me' section , sticky after that
window.addEventListener("scroll", function () {
  let intro = this.document.getElementById("main-profile");
  if (this.window.scrollY >= intro.offsetHeight + intro.offsetTop) {
    this.document.querySelector(".navigation").style.position = "sticky";
  } else {
    this.document.querySelector(".navigation").style.position = "revert";
  }
});
