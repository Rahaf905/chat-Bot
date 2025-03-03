document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatIcon = document.getElementById("chat-icon");
    const closeChat = document.getElementById("close-chat");

    function toggleChat(event) {
        event?.stopPropagation(); // Prevent event interference

        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Allow other elements to work
        } else {
            chatContainer.classList.add("active");
            chatContainer.style.pointerEvents = "auto"; // Enable chat interactions
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
    }

    document.addEventListener("click", function (event) {
    if (chatContainer.classList.contains("active") &&
        !chatContainer.contains(event.target) &&
        !chatIcon.contains(event.target)) {
        chatContainer.classList.remove("active");
        chatContainer.style.pointerEvents = "none"; // Fix button blocking issue
    }
});
   document.addEventListener("touchstart", function (event) {
    if (chatContainer.classList.contains("active") &&
        !chatContainer.contains(event.target) &&
        !chatIcon.contains(event.target)) {
        chatContainer.classList.remove("active");
        chatContainer.style.pointerEvents = "none";
    }
}, { passive: true });

    // Fix: Ensure buttons and links work properly
    document.querySelectorAll("a, button").forEach(element => {
        element.addEventListener("click", function (event) {
            event.stopPropagation(); // Allow clicks to pass through
        });
    });
});
