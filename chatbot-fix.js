document.addEventListener("DOMContentLoaded", function() {
    const chatContainer = document.getElementById("chat-container");
    const chatIcon = document.getElementById("chat-icon");
    const closeChat = document.getElementById("close-chat");

    function toggleChat(event) {
        event?.stopPropagation(); // Prevent event interference

        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatIcon.style.pointerEvents = "auto";  // Allow interactions with other elements
        } else {
            chatContainer.classList.add("active");
            chatIcon.style.pointerEvents = "none";  // Prevent chatbot icon from blocking clicks
        }
    }

    // Open/Close chatbot on icon click
    chatIcon.addEventListener("click", function(event) {
        toggleChat(event);
    });

    // Close chatbot when clicking the "X" button
    if (closeChat) {
        closeChat.addEventListener("click", function(event) {
            toggleChat(event);
        });
    }

    // Detect clicks outside the chatbot to close it
    document.addEventListener("click", function(event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatIcon.style.pointerEvents = "auto"; // Restore button interactions
        }
    });

    // Fix for mobile touch events
    document.addEventListener("touchstart", function(event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatIcon.style.pointerEvents = "auto"; // Restore normal button clicks
        }
    }, { passive: true });
});
