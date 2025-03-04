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

                // Add event listeners safely
                chatIcon.addEventListener("click", function (event) {
                    console.log("🟢 Chat icon clicked!");
                    toggleChat(event);
                });

                closeChat.addEventListener("click", function (event) {
                    console.log("🔴 Chat close button clicked!");
                    toggleChat(event);
                });

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
