setTimeout(() => {
    document.addEventListener("DOMContentLoaded", function () {
        const chatIcon = document.getElementById("chat-icon");
        const chatContainer = document.getElementById("chat-container");
        const closeChat = document.getElementById("close-chat");

        if (!chatIcon || !chatContainer || !closeChat) {
            console.error("❌ Chatbot elements NOT found in DOM!");
            return;
        }

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

        console.log("✅ Chatbot script loaded successfully!");
    });
}, 500);
