document.addEventListener("DOMContentLoaded", function() {
    const chatContainer = document.getElementById("chat-container");
    const chatIcon = document.getElementById("chat-icon");
    const closeChat = document.getElementById("close-chat");

    // Ensure chat container is hidden initially and doesn't interfere with clicks
    chatContainer.classList.remove("active");

    // ✅ Toggle chat visibility properly
    function toggleChat() {
        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Disable interactions when closed
        } else {
            chatContainer.classList.add("active");
            chatContainer.style.pointerEvents = "auto"; // Enable interactions when open
        }
    }

    // ✅ Open chat when icon is clicked
    chatIcon.addEventListener("click", function(event) {
        toggleChat();
        event.stopPropagation(); // Prevent interference
    });

    // ✅ Close chat when clicking outside
    document.addEventListener("click", function(event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
        }
    });

    // ✅ Ensure chat close button works
    if (closeChat) {
        closeChat.addEventListener("click", function(event) {
            toggleChat();
            event.stopPropagation(); // Stop propagation when closing chat
        });
    }
});
