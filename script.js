const terminal = document.getElementById("terminal");
const proposal = document.getElementById("proposal");

const messages = [
  ">> Booting up system...",
  ">> Hacking love.exe...",
  ">> Accessing feelings_db...",
  ">> Injecting honesty...",
  ">> Scanning compatibility...",
  ">> matchFound = true",
  ">> Initiating proposal_protocol()...",
  ">> Loading...",
  ">> Preparing message for [My Detective]...",
  "",
  "Hello My Detective love... 💚",
  "I have something special to tell you...",
  "You’ve always been more than just a best friend to me.",
  "So here it goes..."
];

let index = 0;
let charIndex = 0;

function typeLine() {
  if (index < messages.length) {
    if (charIndex < messages[index].length) {
      terminal.innerHTML += messages[index].charAt(charIndex);
      charIndex++;
      setTimeout(typeLine, 40);
    } else {
      terminal.innerHTML += '\n';
      index++;
      charIndex = 0;
      setTimeout(typeLine, 300);
    }
  } else {
    showProposal();
  }
}

function showProposal() {
  proposal.style.display = "block";
}

function sendResponse(answer) {
  fetch('save_response.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'answer=' + encodeURIComponent(answer)
  })
  .then(response => response.text())
  .then(data => {
    alert(data);
  })
  .catch(err => {
    alert("Something went wrong 😢");
  });
}

typeLine();
