console.log("howdy 🤠");
//TODO
// refactor or clean up everything
// flex box or grid for board instead of img
// snap to grid?
// simple dice animation?

// this uses "bubbling" to make all these
// react to the drag function
document.addEventListener("mousedown", drag);

let imgList = ["d1.png", "d2.png", "d3.png", "d4.png", "d5.png", "d6.png"];
let diceImg = document.querySelector(".dice");
let vampDiv = document.querySelector(".vampDiv");
let humanDiv = document.querySelector(".humanDiv");
let dayModeDiv = document.querySelector(".dayModeDiv");
let boardImg = document.querySelector(".boardImg");
dayModeDiv.addEventListener("click", dayNightToggle);
let bod = document.querySelector("body");
let nav = document.querySelector("nav");

diceImg.addEventListener("click", function (event) {
  diceImg.src =
    "img/dice/" + imgList[Math.floor(Math.random() * imgList.length)];
  dayNightToggle();
});

GenStuff();
// yuck refactor
function GenStuff() {
  for (let i = 0; i < 2; i++) {
    let humanNode = document.createElement("img");
    let vampNode = document.createElement("img");
    humanNode.src = "img/man.png";
    humanNode.classList.add("piece");
    humanDiv.appendChild(humanNode);
    vampNode.src = "img/vamp.png";
    vampNode.classList.add("piece");
    vampDiv.appendChild(vampNode);
  }

  for (let i = 0; i < 10; i++) {
    let imgNode = document.createElement("img");
    imgNode.src = "img/bat.png";
    imgNode.classList.add("piece");
    vampDiv.appendChild(imgNode);
  }

  for (let i = 0; i < 10; i++) {
    let imgNode = document.createElement("img");
    imgNode.src = "img/garlic.png";
    imgNode.classList.add("piece");
    humanDiv.appendChild(imgNode);
  }
}

// Mouse down
// Mouse move
// Mouse up
function drag(e) {
  // if it's not a piece, don't drag it
  if (!e.target.classList.contains("piece")) return;

  // so this is your mouse position inside of the image
  // like if you click the middle of the image you get x and y offset
  let shiftX = e.clientX - e.target.getBoundingClientRect().left;
  let shiftY = e.clientY - e.target.getBoundingClientRect().top;

  e.target.style.position = "absolute";
  e.target.style.zIndex = 99;

  move(e.pageX, e.pageY);

  function move(x, y) {
    e.target.style.left = x - shiftX + "px";
    e.target.style.top = y - shiftY + "px";
  }

  function moving(event) {
    move(event.pageX, event.pageY);
  }

  document.addEventListener("mousemove", moving);

  e.target.onmouseup = function () {
    document.removeEventListener("mousemove", moving);
  };

  // jquery for mousing out
  // so the img doesn't stick to the mouse forever
  $(document).mouseleave(function () {
    document.removeEventListener("mousemove", moving);
  });

  e.target.ondragstart = function () {
    return false;
  };
}

// ugly toggle, ternary instead?
function dayNightToggle() {
  if (dayModeDiv.innerText == "☀") {
    bod.classList.toggle("bg-dark");
    nav.classList.toggle("bg-dark");
    nav.classList.toggle("navbar-dark");
    boardImg.src = "img/board2night.png";
    dayModeDiv.innerText = "🌙";
  } else {
    bod.classList.toggle("bg-dark");
    nav.classList.toggle("bg-dark");
    nav.classList.toggle("navbar-dark");
    boardImg.src = "img/board2day.png";
    dayModeDiv.innerText = "☀";
  }
}
