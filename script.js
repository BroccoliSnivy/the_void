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
let typingIndex = 0;
let phase = "prompt";

function typePromptWithCommand(commandText, callback) {
  const line = document.createElement("div");

  const promptContainer = document.createElement("span");
  promptContainer.className = "prompt";

  const userSpan = document.createElement("span");
  userSpan.textContent = "user@";

  const hostSpan = document.createElement("span");
  hostSpan.textContent = "void";
  hostSpan.className = "hostname";

  const suffixSpan = document.createElement("span");
  suffixSpan.textContent = ":~$ ";

  promptContainer.appendChild(userSpan);
  promptContainer.appendChild(hostSpan);
  promptContainer.appendChild(suffixSpan);

  const commandSpan = document.createElement("span");
  commandSpan.className = "command";

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = " ";
  commandSpan.appendChild(cursor);

  line.appendChild(promptContainer);
  line.appendChild(commandSpan);
  terminal.appendChild(line);

  let charIndex = 0;

  function typeChar() {
    if (charIndex < commandText.length) {
      cursor.remove();
      commandSpan.textContent += commandText[charIndex];
      commandSpan.appendChild(cursor);
      charIndex++;
      setTimeout(typeChar, 40);
    } else {
      cursor.remove();
      setTimeout(callback, 500);
    }
  }

  typeChar();
}

function printLine(text, className) {
  const line = document.createElement("div");
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  line.appendChild(span);
  terminal.appendChild(line);
}

function runBlock() {
  const block = fullSequence[blockIndex];

  if (phase === "prompt") {
    phase = "command";
    typePromptWithCommand(block.command, runBlock);
  } else if (phase === "command") {
    phase = "outputs";
    outputIndex = 0;
    setTimeout(runBlock, 500);
  } else if (phase === "outputs") {
    if (outputIndex < block.outputs.length) {
      printLine(block.outputs[outputIndex], "output");
      outputIndex++;
      setTimeout(runBlock, 700);
    } else {
      blockIndex++;
      if (blockIndex < fullSequence.length) {
        phase = "prompt";
        setTimeout(runBlock, 1000);
      } else {
        // move to hackerLines phase directly without adding another prompt
        phase = "hackerLines";
        outputIndex = 0;
        setTimeout(runBlock, 1000);
      }
    }
  } else if (phase === "hackerLines") {
    if (outputIndex < hackerLines.length) {
      printLine(hackerLines[outputIndex], "output");
      outputIndex++;
      setTimeout(runBlock, 700);
    } else {
      phase = "clearCommand";
      setTimeout(runBlock, 1000);
    }
  } else if (phase === "clearCommand") {
    typePromptWithCommand("clear", () => {
      terminal.innerHTML = "";
      blockIndex = 0;
      outputIndex = 0;
      phase = "prompt";
      setTimeout(runBlock, 1000);
    });
  }
}

// Clear terminal at load
terminal.innerHTML = "";
runBlock();