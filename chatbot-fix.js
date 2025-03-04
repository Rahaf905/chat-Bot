document.addEventListener("DOMContentLoaded", function () {
    function waitForElement(selector, callback, maxAttempts = 10) {
        let attempts = 0;
        const interval = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(interval);
                callback(element);
            } else {
                attempts++;
                if (attempts >= maxAttempts) {
                    clearInterval(interval);
                    console.error(`❌ Element ${selector} not found after ${maxAttempts} attempts.`);
                }
            }
        }, 500); // Check every 500ms
    }

    waitForElement("#chat-icon", function (chatIcon) {
        waitForElement("#chat-container", function (chatContainer) {
            waitForElement("#close-chat", function (closeChat) {
                console.log("✅ All chatbot elements found!");

                function toggleChat(event) {
                    event?.stopPropagation();

                    if (chatContainer.style.display === "none" || !chatContainer.style.display) {
                        chatContainer.style.display = "flex";
                        chatContainer.style.pointerEvents = "auto";
                        console.log("🟢 Chatbot Opened");
                    } else {
                        chatContainer.style.display = "none";
                        chatContainer.style.pointerEvents = "none";
                        console.log("🔴 Chatbot Closed");
                    }
                }

                // ✅ Add event listeners safely (Prevent duplicates)
                if (!chatIcon.dataset.clickEventAdded) {
                    chatIcon.addEventListener("click", function (event) {
                        console.log("🟢 Chat icon clicked!");
                        toggleChat(event);
                    });
                    chatIcon.dataset.clickEventAdded = true;
                }

                if (!closeChat.dataset.clickEventAdded) {
                    closeChat.addEventListener("click", function (event) {
                        console.log("🔴 Chat close button clicked!");
                        toggleChat(event);
                    });
                    closeChat.dataset.clickEventAdded = true;
                }

                document.addEventListener("click", function (event) {
                    if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
                        chatContainer.style.display = "none";
                        chatContainer.style.pointerEvents = "none";
                        console.log("🔴 Chatbot closed (clicked outside)");
                    }
                });

                console.log("✅ Chatbot script fully loaded!");
            });
        });
    });
});

// ✅ Listen for messages from the parent page (iframe communication)
window.addEventListener("message", function (event) {
    if (event.data.action === "toggleChat") {
        console.log("🟢 Received toggleChat message from main page.");
        const chatContainer = document.getElementById("chat-container");

        if (chatContainer.style.display === "none" || !chatContainer.style.display) {
            chatContainer.style.display = "flex";
            chatContainer.style.pointerEvents = "auto";
            console.log("🟢 Chatbot Opened via iframe message.");
        } else {
            chatContainer.style.display = "none";
            chatContainer.style.pointerEvents = "none";
            console.log("🔴 Chatbot Closed via iframe message.");
        }
    }
});
