document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        const chatIcon = document.getElementById("chat-icon");
        const chatContainer = document.getElementById("chat-container");
        const closeChat = document.getElementById("close-chat");
        const chatIframe = document.querySelector("iframe");

        if (!chatIcon || !chatContainer) {
            console.error("❌ Chatbot elements NOT found! Ensure they exist in the HTML.");
            return;
        }

        function toggleChat(event) {
            event?.stopPropagation(); // Prevent event interference

            if (chatContainer.classList.contains("active")) {
                chatContainer.classList.remove("active");
                chatContainer.style.pointerEvents = "none"; // Allow buttons to work
                if (chatIframe) chatIframe.style.pointerEvents = "none"; // Disable iframe interactions when closed
                window.parent.postMessage("chatClosed", "*");
            } else {
                chatContainer.classList.add("active");
                chatContainer.style.pointerEvents = "auto"; // Enable chatbot interactions
                if (chatIframe) chatIframe.style.pointerEvents = "auto"; // Enable iframe interactions
                window.parent.postMessage("chatOpened", "*");
            }
        }

        // Open and close chatbot on icon click
        chatIcon.addEventListener("click", function (event) {
            console.log("🟢 Chatbot icon clicked - toggling chatbot");
            toggleChat(event);
        });

        // Close chatbot when clicking "X"
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
                if (chatIframe) chatIframe.style.pointerEvents = "none";
                window.parent.postMessage("chatClosed", "*");
            }
        });

        // Ensure mobile touch does not block other buttons
        document.addEventListener("touchstart", function (event) {
            if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
                chatContainer.classList.remove("active");
                chatContainer.style.pointerEvents = "none";
                if (chatIframe) chatIframe.style.pointerEvents = "none";
                window.parent.postMessage("chatClosed", "*");
            }
        }, { passive: true });

        // Fix: Ensure all buttons and links work properly
        document.querySelectorAll("a, button").forEach(element => {
            element.addEventListener("click", function (event) {
                event.stopPropagation(); // Allow clicks to work normally
            });
        });

        // Listen for messages from iframe
        window.addEventListener("message", function (event) {
            if (event.data === "toggleChat") {
                toggleChat();
            }
        });

        console.log("✅ Chatbot script loaded successfully!");
    }, 1000); // Delay to ensure elements are fully loaded
});
