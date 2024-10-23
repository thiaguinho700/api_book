function LoginScroll() {
  window.scrollBy({
    top: 1100,
    left: 0,
    behavior: "smooth",
  });
}
function SignUpScroll() {
  window.scrollBy({
    top: 2700,
    left: 0,
    behavior: "smooth",
  });
}

var i = 0;
var j = 0;
var txt = 'WELCOME TO';
var txt2 = "BOOKS"
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("welcomeText").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else if( i === txt.length){
    if (j < txt2.length) {
      document.getElementById("booksText").innerHTML += txt2.charAt(j);
      j++;
      setTimeout(typeWriter, speed);
    }
  }
  
}

typeWriter()

const track = document.querySelector(".carousel-track");
let index = 0;

function moveCarousel() {
  index++;
  if (index >= track.children.length) {
    index = 0;
  }
  track.style.transform = `translateX(-${index * 300}px)`;
}

setInterval(moveCarousel, 2000);

const trackCopis = document.querySelector(".carousel-track-copies");
let indexCopies = 0;

function moveCarouselCopies() {
  indexCopies++;
  if (indexCopies >= trackCopis.children.length) {
    indexCopies = 0;
  }
  trackCopis.style.transform = `translateX(-${indexCopies * 200}px)`;
}

setInterval(moveCarouselCopies, 2000);

const trackdown = document.querySelector(".carousel-track-down");
let indexdown = 0;

function moveCarouselindexdown() {
  indexdown++;
  if (indexdown >= trackdown.children.length) {
    indexdown = 0;
  }
  trackdown.style.transform = `translateX(-${indexdown * 300}px)`;
}

setInterval(moveCarouselindexdown, 2000);
