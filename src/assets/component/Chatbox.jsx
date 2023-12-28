import { createSignal, onCleanup, createEffect } from "solid-js";

import "../css/chat.css";
import "../css/scroller.css";

const safetySetting = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    threshold: "BLOCK_NONE",
  },
  {
    category: "HARM_CATEGORY_DANGEROUS_CONTENT",
    threshold: "BLOCK_NONE",
  },
];

export default function Chatbox() {
  const [isChatOpen, setIsChatOpen] = createSignal(false);
  const [userInput, setUserInput] = createSignal("");

  createEffect(() => {
    const chatbox = document.getElementById("overall-chat-box");
    const button = document.getElementById("chat-open-button");

    if (isChatOpen()) {
      chatbox.style.display = "block";

      setTimeout(() => {
        chatbox.classList.add("chatbox-activated");
        button.style.display = "none";
      }, 100);
    } else {
      chatbox.classList.remove("chatbox-activated");

      setTimeout(() => {
        chatbox.style.display = "none";
        button.style.display = "block";
      }, 100);
    }

    const input = document.getElementById("userInput");
    const msgArea = document.getElementById("msgArea");

    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        handleSend();
      }
    };

    input.addEventListener("keypress", handleKeyPress);

    // Cleanup event listener on component unmount
    onCleanup(() => {
      input.removeEventListener("keypress", handleKeyPress);
    });

    return () => {};
  });

  const openChat = () => {
    setIsChatOpen(true);
  };

  const closeChat = () => {
    setIsChatOpen(false);
  };

  async function handleSend() {
    const tempText = userInput();

    if (!tempText) {
      return;
    } else {
      setUserInput(""); // Clear the input field

      insertBubble("user", tempText);

      // Loading Text
      setTimeout(() => {
        insertBubble("bot", "", true);
      }, 100);

      // Get bot response
      const response = await getResponse(tempText);

      // Remove loading bubble
      const loadingElement =
        msgArea.querySelectorAll(".text-bubble.bot")[
          msgArea.querySelectorAll(".text-bubble.bot").length - 1
        ];

      if (loadingElement) {
        loadingElement.remove();
      }

      //insertBubble("bot", formatText(response));
      insertBubble("bot", response);
    }
  }

  function insertBubble(who, text, isLoading) {
    const msgArea = document.getElementById("msgArea");

    const p = document.createElement("p");
    const span = document.createElement("span");
    p.classList.add("text-bubble", who);
    span.classList.add("text-cont", who);
    span.innerHTML = text;

    if (isLoading === true) {
      const loader = document.createElement("span");
      loader.classList.add("loader");
      span.appendChild(loader);
    }

    p.appendChild(span);

    msgArea.appendChild(p);

    msgArea.scrollTop = msgArea.scrollHeight;
  }

  async function getResponse(question) {
    var raw = JSON.stringify({ question: question });

    var requestOptions = {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json",

      },
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "https://pvshkng-github-io-api.vercel.app/api/chat",
      requestOptions
    )

    if (response.answer) {
      console.log(response.answer)
      return response.answer
    } else {
      console.error("Unexpected response structure:", response);
      const answer = "Sorry, I couldn't understand that.";
      return answer;
    }

    /*    try {
      const response = await fetch(
        "https://pvshkng-github-io-api.vercel.app/api/chat",
        requestOptions
      ); */

    //const data = await response.json();
    /* console.log(JSON.stringify(response)) */
    //console.log(JSON.stringify(data));

    /*       if (response && response.answer) {
        const answer = await response.answer;
        return answer;
      } else {
        console.error("Unexpected response structure:", response);
        const answer = "Sorry, I couldn't understand that.";
        return answer;
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      const answer = "Sorry, there was an error processing your request.";
      return answer;
    } */
  }

  function formatText(input) {
    let output = JSON.stringify(input).replace(/"/g, "");

    let regex = /\\([^\\]+)\\/g;

    let result = output.replace(regex, "<strong>$1</strong>");

    return result;
  }

  return (
    <>
      {/* Chatbox section */}
      <div
        class="chat-open-button"
        id="chat-open-button"
        onClick={openChat}
      ></div>

      <div id="overall-chat-box">
        {/* Minimize Chat */}
        <button class="chat-close-button" onClick={closeChat}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            width="16"
            viewBox="0 0 512 512"
          >
            <path
              fill="white"
              d="M439 7c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8H296c-13.3 0-24-10.7-24-24V72c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39L439 7zM72 272H216c13.3 0 24 10.7 24 24V440c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39L73 505c-9.4 9.4-24.6 9.4-33.9 0L7 473c-9.4-9.4-9.4-24.6 0-33.9l87-87L55 313c-6.9-6.9-8.9-17.2-5.2-26.2s12.5-14.8 22.2-14.8z"
            />
          </svg>
        </button>

        {/* Message Area */}
        <div class="message-area" id="msgArea">
          {/* <div class="bubble">
          <p class="hello">Hello こんにちは!</p>
        </div> */}

          <p class="text-bubble bot">
            <span class="text-cont bot">
              Hello! My name is Puvish. Ask me anything!
            </span>
          </p>
        </div>

        {/* User input area */}
        <div class="chat-bar-input-block">
          <input
            class="input-box"
            id="userInput"
            value={userInput()}
            onInput={(e) => setUserInput(e.target.value)}
            type="text"
            placeholder="Ask me anything!!!"
          />

          <svg
            id="sendIcon"
            onClick={handleSend}
            class="send-icon"
            height="32"
            width="32"
            viewBox="0 0 512 512"
          >
            <path
              fill="white"
              d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
