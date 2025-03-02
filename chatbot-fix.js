document.addEventListener("DOMContentLoaded", function() {
    const chatContainer = document.getElementById("chat-container");
    const chatIcon = document.getElementById("chat-icon");
    const closeChat = document.getElementById("close-chat");

    function toggleChat(event) {
        event?.stopPropagation(); // Prevent event interference

        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Allow clicks on other elements
        } else {
            chatContainer.classList.add("active");
            chatContainer.style.pointerEvents = "auto"; // Enable chat interactions
        }
    }

    // Open chatbot on icon click
    chatIcon.addEventListener("click", function(event) {
        toggleChat(event);
    });

    // Close chatbot when clicking the "X" button
    if (closeChat) {
        closeChat.addEventListener("click", function(event) {
            toggleChat(event);
        });
    }

    // Fix: Allow buttons to work normally (prevent event interference)
    document.addEventListener("click", function(event) {
        const isChat = chatContainer.contains(event.target) || chatIcon.contains(event.target);

        if (!isChat) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Ensure other elements are clickable
        }
    });

    // Fix for mobile touch events
    document.addEventListener("touchstart", function(event) {
        const isChat = chatContainer.contains(event.target) || chatIcon.contains(event.target);

        if (!isChat) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Ensure other elements are clickable
        }
    }, { passive: true });
});
