document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatIcon = document.getElementById("chat-icon");
    const closeChat = document.getElementById("close-chat");

    function toggleChat(event) {
        event?.stopPropagation(); // Prevent event interference

        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Ensure it does not block anything
        } else {
            chatContainer.classList.add("active");
            chatContainer.style.pointerEvents = "auto"; // Allow chatbot interactions
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

    // Ensure chat does not interfere with website buttons
    document.addEventListener("click", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
        }
    });

    // Fix mobile interactions
    document.addEventListener("touchstart", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
        }
    }, { passive: true });

    // Ensure all buttons & links work
    document.querySelectorAll("a, button").forEach(element => {
        element.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });
});
