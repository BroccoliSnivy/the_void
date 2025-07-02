export function initToggleMode() {
    const toggleBtn = document.getElementById("modeToggle");
    const body = document.body;
  
    function updateDynamicText() {
      document.querySelectorAll('[data-hacker]').forEach(el => {
        const text = body.classList.contains("hacker")
          ? el.getAttribute('data-hacker')
          : el.getAttribute('data-professional');
        el.textContent = text;
      });
    }
  
    toggleBtn.addEventListener("click", () => {
      if (body.classList.contains("hacker")) {
        body.classList.remove("hacker");
        body.classList.add("professional");
        toggleBtn.textContent = "Switch to Hacker Mode";
      } else {
        body.classList.remove("professional");
        body.classList.add("hacker");
        toggleBtn.textContent = "Switch to Professional Mode";
      }
      updateDynamicText();
    });
  
    updateDynamicText();
  }
  