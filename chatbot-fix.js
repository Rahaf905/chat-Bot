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
                console.log("✅ Chatbot elements found!");

                function toggleChat(event) {
                    event?.stopPropagation();

                    if (chatContainer.classList.contains("active")) {
                        chatContainer.classList.remove("active");
                        chatContainer.style.pointerEvents = "none";
                        console.log("🔴 Chatbot closed");
                    } else {
                        chatContainer.classList.add("active");
                        chatContainer.style.pointerEvents = "auto";
                        console.log("🟢 Chatbot opened");
                    }
                }

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
                        chatContainer.classList.remove("active");
                        chatContainer.style.pointerEvents = "none";
                        console.log("🔴 Chatbot closed (clicked outside)");
                    }
                });

                document.addEventListener("touchstart", function (event) {
                    if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
                        chatContainer.classList.remove("active");
                        chatContainer.style.pointerEvents = "none";
                        console.log("🔴 Chatbot closed (mobile touch)");
                    }
                }, { passive: true });

                console.log("✅ Chatbot script fully loaded!");
            });
        });
    });
});
