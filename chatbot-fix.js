document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatIcon = document.getElementById("chat-icon");
    const closeChat = document.getElementById("close-chat");

    function toggleChat(event) {
        event?.stopPropagation(); // Stop event interference

        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Prevent interference when closed
            window.parent.postMessage("chatClosed", "*"); // Tell iframe that chat is closed
        } else {
            chatContainer.classList.add("active");
            chatContainer.style.pointerEvents = "auto"; // Enable interactions
            window.parent.postMessage("chatOpened", "*"); // Tell iframe that chat is open
        }
    }

    // Open chatbot on icon click
    chatIcon.addEventListener("click", function (event) {
        toggleChat(event);
    });

    // Close chatbot when clicking the "X" button
    if (closeChat) {
        closeChat.addEventListener("click", function (event) {
            toggleChat(event);
        });
    });

    // Ensure chatbot does not interfere with website buttons
    document.addEventListener("click", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
            window.parent.postMessage("chatClosed", "*");
        }
    });

    // Fix mobile interactions
    document.addEventListener("touchstart", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
            window.parent.postMessage("chatClosed", "*");
        }
    }, { passive: true });

    // Ensure all buttons & links work properly
    document.querySelectorAll("a, button").forEach(element => {
        element.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    // Listen for iframe messages from Durable
    window.addEventListener("message", function (event) {
        if (event.data === "toggleChat") {
            toggleChat();
        }
    });
});
