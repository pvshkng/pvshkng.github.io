function openChat() {
  const chatbox = document.getElementById("overall-chat-box");
  const button = document.getElementById("chat-open-button");
  chatbox.style.display = "block";

  setTimeout(() => {
    chatbox.classList.add("chatbox-activated");
    button.style.display = "none";
  }, 100);
}

function closeChat() {
  const chatbox = document.getElementById("overall-chat-box");
  const button = document.getElementById("chat-open-button");
  chatbox.classList.remove("chatbox-activated");

  setTimeout(() => {
    chatbox.style.display = "none";
    button.style.display = "block";
  }, 100);
}

var input = document.getElementById("userInput");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    //event.preventDefault();
    //document.getElementById("sendIcon").click();
    handleSend();
  }
});

function handleSend() {
  const userInput = document.getElementById("userInput");

  if (!userInput.value) {
    return;
  } else {
    const tempText = userInput.value;
    userInput.value = "";

    //User Text
    /* const p = document.createElement("p");
    const span = document.createElement("span");
    p.classList.add("text-bubble", "user");
    span.classList.add("text-cont", "user");
    span.innerText = tempText;
    p.appendChild(span); */
    insertBubble("user", tempText);

    //Loading Text
    setTimeout(() => {
        insertBubble("bot", "", true)
    }, 1000);
    
  }
}

function insertBubble(who, text, isLoading) {
  const p = document.createElement("p");
  const span = document.createElement("span");
  p.classList.add("text-bubble", who);
  span.classList.add("text-cont", who);
  span.innerText = text;

  if (isLoading === true) {
    const loader = document.createElement("span");
    loader.classList.add("loader")
    span.appendChild(loader)
  }

  p.appendChild(span);

  const msgArea = document.getElementById("msgArea");
  msgArea.appendChild(p);
}
