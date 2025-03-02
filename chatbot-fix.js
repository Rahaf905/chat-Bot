document.addEventListener("DOMContentLoaded", function() {
    const chatContainer = document.getElementById("chat-container");
    const chatIcon = document.getElementById("chat-icon");
    const closeChat = document.getElementById("close-chat");

    function toggleChat() {
        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatIcon.style.pointerEvents = "auto";  // Allow interactions with other elements
        } else {
            chatContainer.classList.add("active");
            chatIcon.style.pointerEvents = "none";  // Prevent interference
        }
    }

    chatIcon.addEventListener("click", function(event) {
        toggleChat();
        event.stopPropagation(); // Stop event interference
    });

    if (closeChat) {
        closeChat.addEventListener("click", function(event) {
            toggleChat();
            event.stopPropagation();
        });
    }

    // Close chatbot when clicking outside of it
    document.addEventListener("click", function(event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatIcon.style.pointerEvents = "auto"; // Restore normal interaction
        }
    });

    // Fix for mobile touch events
    document.addEventListener("touchstart", function(event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatIcon.style.pointerEvents = "auto"; // Restore normal interaction
        }
    }, { passive: true });
});
