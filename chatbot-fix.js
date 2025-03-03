document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const chatIcon = document.getElementById("chat-icon");
        const chatContainer = document.getElementById("chat-container");
        const closeChat = document.getElementById("close-chat");

        if (!chatIcon) {
            console.error("❌ Chatbot icon NOT found in Durable! Ensure it exists in the HTML.");
            return;
        }

        function toggleChat(event) {
            event?.stopPropagation(); // Stop event interference

            if (chatContainer.classList.contains("active")) {
                chatContainer.classList.remove("active");
                chatContainer.style.pointerEvents = "none"; // Allow other buttons to work
                window.parent.postMessage("chatClosed", "*"); // Inform iframe that chat is closed
            } else {
                chatContainer.classList.add("active");
                chatContainer.style.pointerEvents = "auto"; // Enable chatbot interactions
                window.parent.postMessage("chatOpened", "*"); // Inform iframe that chat is open
            }
        }

        // Ensure chatbot opens and closes on icon click
        chatIcon.addEventListener("click", function (event) {
            console.log("🟢 Chatbot icon clicked - toggling chatbot");
            toggleChat(event);
        });

        // Ensure chatbot closes on "X" button click
        if (closeChat) {
            closeChat.addEventListener("click", function (event) {
                toggleChat(event);
            });
        }

        // Ensure chatbot closes when clicking outside
        document.addEventListener("click", function (event) {
            if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
                chatContainer.classList.remove("active");
                chatContainer.style.pointerEvents = "none";
                window.parent.postMessage("chatClosed", "*");
            }
        });

        // Ensure mobile devices don't block other buttons
        document.addEventListener("touchstart", function (event) {
            if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
                chatContainer.classList.remove("active");
                chatContainer.style.pointerEvents = "none";
                window.parent.postMessage("chatClosed", "*");
            }
        }, { passive: true });

        // Ensure all buttons and links work properly
        document.querySelectorAll("a, button").forEach(element => {
            element.addEventListener("click", function (event) {
                event.stopPropagation(); // Ensure clicks work normally
            });
        });

        // Listen for messages from the iframe
        window.addEventListener("message", function (event) {
            if (event.data === "toggleChat") {
                toggleChat();
            }
        });

        console.log("✅ Chatbot script loaded successfully!");
    }, 500); // 500ms delay to ensure elements are fully loaded
});
