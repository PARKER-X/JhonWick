
        const typingForm = document.querySelector(".typing-form");
        const chatContainer = document.querySelector(".chat-list");
        const suggestions = document.querySelectorAll(".suggestion");
        const toggleThemeButton = document.querySelector("#theme-toggle-button");
        const deleteChatButton = document.querySelector("#delete-chat-button");

        // State variables
        let userMessage = null;
        let isResponseGenerating = false;

        // Predefined responses
        const predefinedResponses = {
            "hi": "Hello! How may I assist you?",
            "hello": "Hello! How may I assist you?",
            "hello there": "Hello! How may I assist you?",
            "how are you": "I'm doing well, thank you for asking!",
            "what's your name?": "I'm Mega-Bot, your friendly AI assistant!",
            "tell me a joke": "Why don't scientists trust atoms? Because they make up everything!",
            "what is your purpose?": "My purpose is to assist you with information and tasks to the best of my ability.",
            "can you help me with my homework?": "I can certainly try! What subject are you working on?",
            "what is the weather like today?": "I don't have access to real-time weather data, but I can suggest a weather website.",
            "what is the capital of France?": "The capital of France is Paris.",
            "what programming languages do you know?": "I have knowledge of JavaScript, Python, Java, and many others.",
            "write javascript code to sum all elements in an array.": `
            function sumArray(arr) {
                let sum = 0;
                for (let i = 0; i < arr.length; i++) {
                    sum += arr[i];
                }
                return sum;
            }
            `
        };

        // Load theme from local storage on page load
        const loadThemeFromLocalstorage = () => {
            const isLightMode = (localStorage.getItem("themeColor") === "light_mode");
            document.body.classList.toggle("light_mode", isLightMode);
            toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
        }

        // Create a new message element and return it
        const createMessageElement = (content, ...classes) => {
            const div = document.createElement("div");
            div.classList.add("message", ...classes);
            div.innerHTML = content;
            return div;
        }

        // Show typing effect by displaying words one by one
        const showTypingEffect = (text, textElement, incomingMessageDiv) => {
            const words = text.split(' ');
            let currentWordIndex = 0;
            const typingInterval = setInterval(() => {
                textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++];
                incomingMessageDiv.querySelector(".icon").classList.add("hide");
                if (currentWordIndex === words.length) {
                    clearInterval(typingInterval);
                    isResponseGenerating = false;
                    incomingMessageDiv.querySelector(".icon").classList.remove("hide");
                    // NO SAVING TO LOCAL STORAGE
                }
                chatContainer.scrollTo(0, chatContainer.scrollHeight);
            }, 30); // Approximate 200 WPM (adjusted for setInterval accuracy)
        }

        // Show predefined response - with 1-second delay
        const showPredefinedResponse = (incomingMessageDiv, textElement) => {
            setTimeout(() => {
                const normalizedUserMessage = userMessage.toLowerCase().trim(); // Normalize input
                const response = predefinedResponses[normalizedUserMessage] || "I'm sorry, I don't have an answer for that yet. Please try another prompt.";
                showTypingEffect(response, textElement, incomingMessageDiv);
            }, 1000);
        }

        // Show a loading animation while waiting for the API response
        const showLoadingAnimation = () => {
            const html = `<div class="message-content">
                            <img class="avatar" src="images/gemini.svg" alt="Gemini avatar">
                            <p class="text"></p>
                            <div class="loading-indicator">
                                <div class="loading-bar"></div>
                                <div class="loading-bar"></div>
                                <div class="loading-bar"></div>
                            </div>
                        </div>
                        <span onClick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>`;
            const incomingMessageDiv = createMessageElement(html, "incoming", "loading");
            chatContainer.appendChild(incomingMessageDiv);
            chatContainer.scrollTo(0, chatContainer.scrollHeight);
            const textElement = incomingMessageDiv.querySelector(".text");

            showPredefinedResponse(incomingMessageDiv, textElement);
        }

        // Copy message text to the clipboard
        const copyMessage = (copyButton) => {
            const messageText = copyButton.parentElement.querySelector(".text").innerText;
            navigator.clipboard.writeText(messageText);
            copyButton.innerText = "done"; // Show confirmation icon
            setTimeout(() => copyButton.innerText = "content_copy", 1000); // Revert icon after 1 second
        }

        // Handle sending outgoing chat messages
        const handleOutgoingChat = () => {
            userMessage = typingForm.querySelector(".typing-input").value.trim(); // Get user message, no default
            if (!userMessage || isResponseGenerating) return;

            isResponseGenerating = true;

            const html = `<div class="message-content">
                            <img class="avatar" src="images/user.jpg" alt="User avatar">
                            <p class="text"></p>
                          </div>`;
            const outgoingMessageDiv = createMessageElement(html, "outgoing");
            outgoingMessageDiv.querySelector(".text").innerText = userMessage;
            chatContainer.appendChild(outgoingMessageDiv);

            typingForm.reset();
            document.body.classList.add("hide-header");
            chatContainer.scrollTo(0, chatContainer.scrollHeight);

            showLoadingAnimation();
        }

        // Toggle between light and dark themes
        toggleThemeButton.addEventListener("click", () => {
            const isLightMode = document.body.classList.toggle("light_mode");
            localStorage.setItem("themeColor", isLightMode ? "light_mode" : "dark_mode");
            toggleThemeButton.innerText = isLightMode ? "dark_mode" : "light_mode";
        });

        // Delete all chats from local storage
        deleteChatButton.addEventListener("click", () => {
           // no operation
        });

        // Handle suggestion clicks
        suggestions.forEach(suggestion => {
            suggestion.addEventListener("click", () => {
                userMessage = suggestion.querySelector(".text").innerText;
                handleOutgoingChat();
            });
        });

        // Handle form submission
        typingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            handleOutgoingChat();
        });

        // Load saved theme
        loadThemeFromLocalstorage();
    
   document.getElementById("file-upload").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        // Just to show feedback (or you can attach it to the message payload)
        alert(`File attached: ${file.name}`);

        // TODO: Send this file along with the prompt to your backend
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const promptInput = document.querySelector(".typing-input");
    const form = document.querySelector(".typing-form");

    document.querySelectorAll(".suggestion").forEach((item) => {
        item.addEventListener("click", () => {
            const prompt = item.getAttribute("data-query");

            // Fill the input with the selected prompt
            promptInput.value = prompt;

            // Optional: focus the input (for editing)
            promptInput.focus();

            // Automatically submit the form
            form.dispatchEvent(new Event("submit", { cancelable: true }));
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const chatList = document.querySelector(".chat-list");
  const promptInput = document.querySelector(".typing-input");
  const form = document.querySelector(".typing-form");

  function addChatBubble(text, sender = "user") {
    const bubble = document.createElement("div");
    bubble.className = `chat-bubble ${sender}`;
    bubble.innerText = text;
    chatList.appendChild(bubble);
    chatList.scrollTop = chatList.scrollHeight;
  }

  async function sendToGemini(prompt) {
    addChatBubble(prompt, "user");

    const botBubble = document.createElement("div");
    botBubble.className = "chat-bubble bot";
    botBubble.innerText = "Thinking...";
    chatList.appendChild(botBubble);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      botBubble.innerText = data.result || "No response.";
    } catch (err) {
      botBubble.innerText = "Error contacting Gemini.";
    }
  }

  document.querySelectorAll(".suggestion").forEach(item => {
    item.addEventListener("click", () => {
      const prompt = item.getAttribute("data-query");
      chatList.innerHTML = ""; // Clear previous chat
      promptInput.value = "";  // Clear input field
      sendToGemini(prompt);    // Send new chat
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const prompt = promptInput.value.trim();
    if (!prompt) return;
    promptInput.value = "";
    sendToGemini(prompt);
  });
});
