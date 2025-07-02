document.addEventListener("DOMContentLoaded", () => {
  const terminal = document.getElementById("terminalText");

  if (!terminal) return;

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
  let phase = "prompt";

  function typePromptWithCommand(commandText, callback) {
    const line = document.createElement("div");

    const promptContainer = document.createElement("span");
    promptContainer.className = "prompt";
    promptContainer.innerHTML = `<span>user@</span><span class="hostname">void</span><span>:~$ </span>`;

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

  terminal.innerHTML = "";
  runBlock();
});
