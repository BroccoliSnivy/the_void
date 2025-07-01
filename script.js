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

// On load
updateDynamicText();

// Terminal Box simulation Logic
const terminal = document.getElementById("terminalText");

const fullSequence = [
  {
    command: "Establishing secure connection...",
    outputs: [
      "[ * ] Initializing handshake...",
      "[ * ] Handshake accepted.",
      "[ * ] Generating encryption keys...",
      "[ * ] Connection established."
    ]
  },
  {
    command: "Performing integrity check...",
    outputs: [
      "[ * ] Scanning bootloader...",
      "[ * ] Scanning kernel modules...",
      "[ * ] Verifying root integrity...",
      "[ * ] System secure. All diagnostics passed."
    ]
  }
];

const hackerLines = [
  "[ * ] Accessing node 127.0.0.1 ",
  "[ * ] Injecting payload into subnet",
  "[ * ] Retrying handshake...",
  "[ * ] Uplink status: ACTIVE"
];

let blockIndex = 0;
let outputIndex = 0;
let hackerLineIndex = 0;
let typingIndex = 0;
let phase = "prompt"; // prompt > command > outputs > hackerLines > clearCommand

function printPrompt() {
  const promptContainer = document.createElement("span");
  promptContainer.className = "prompt";

  const userSpan = document.createElement("span");
  userSpan.textContent = "user@";

  const hostSpan = document.createElement("span");
  hostSpan.textContent = "void";
  hostSpan.className = "hostname"; // this will be red

  const suffixSpan = document.createElement("span");
  suffixSpan.textContent = ":~$ ";

  promptContainer.appendChild(userSpan);
  promptContainer.appendChild(hostSpan);
  promptContainer.appendChild(suffixSpan);

  terminal.appendChild(promptContainer);
  return promptContainer;
}


function typeLine(text, className, callback) {
  const span = document.createElement("span");
  span.className = className;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = " "; // We'll use background-color, not text
  span.appendChild(cursor);

  terminal.appendChild(span);

  function typeChar() {
    if (typingIndex < text.length) {
      cursor.remove();
      span.textContent += text[typingIndex];
      span.appendChild(cursor);
      typingIndex++;
      setTimeout(typeChar, 40);
    } else {
      cursor.remove();
      terminal.appendChild(document.createElement("br"));
      typingIndex = 0;
      setTimeout(callback, 700);
    }
  }

  typeChar();
}

function printLine(text, className) {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  terminal.appendChild(span);
  terminal.appendChild(document.createElement("br"));
}

function runBlock() {
  if (phase === "prompt") {
    printPrompt();
    phase = "command";
    typeLine(fullSequence[blockIndex].command, "command", runBlock);
  }

  else if (phase === "command") {
    phase = "outputs";
    outputIndex = 0;
    setTimeout(runBlock, 500);
  }

  else if (phase === "outputs") {
    if (outputIndex < fullSequence[blockIndex].outputs.length) {
      printLine(fullSequence[blockIndex].outputs[outputIndex], "output");
      outputIndex++;
      setTimeout(runBlock, 700);
    } else {
      blockIndex++;
      if (blockIndex < fullSequence.length) {
        phase = "prompt";
        setTimeout(runBlock, 1000);
      } else {
        phase = "hackerLines";
        hackerLineIndex = 0;
        setTimeout(runBlock, 1000);
      }
    }
  }

  else if (phase === "hackerLines") {
    if (hackerLineIndex < hackerLines.length) {
      printLine(hackerLines[hackerLineIndex], "output");
      hackerLineIndex++;
      setTimeout(runBlock, 1000);
    } else {
      phase = "clearCommand";
      setTimeout(runBlock, 1000);
    }
  }

  else if (phase === "clearCommand") {
    printPrompt();
    typeLine("clear", "command", () => {
      terminal.innerHTML = "";
      blockIndex = 0;
      outputIndex = 0;
      hackerLineIndex = 0;
      phase = "prompt";
      setTimeout(runBlock, 1000);
    });
  }
}

// Clear terminal at load
terminal.innerHTML = "";
terminal.textContent = "";
runBlock();