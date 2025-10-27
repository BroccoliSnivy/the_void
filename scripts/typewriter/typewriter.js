const roles = [" an Artist", " a Hacker", " a Gamer", " an Engineer"];
const dynamicSpan = document.querySelector(".dynamic-text");

let roleIndex = 0;
let charIndex = 0;
let typing = true;

function typeLoop() {
  const current = roles[roleIndex];
  if (typing) {
    if (charIndex < current.length) {
      dynamicSpan.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      setTimeout(typeLoop, 100);
    } else {
      typing = false;
      setTimeout(typeLoop, 1200);
    }
  } else {
    if (charIndex > 0) {
      dynamicSpan.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(typeLoop, 50);
    } else {
      typing = true;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeLoop, 400);
    }
  }
}

typeLoop();
