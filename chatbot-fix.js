document.addEventListener("DOMContentLoaded", function() {
    const chatContainer = document.getElementById("chat-container");
    const chatIcon = document.getElementById("chat-icon");
    const closeChat = document.getElementById("close-chat");

    function toggleChat() {
        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
        } else {
            chatContainer.classList.add("active");
        }
    }

    chatIcon.addEventListener("click", function(event) {
        toggleChat();
        event.stopPropagation(); // Prevents event interference
    });

    if (closeChat) {
        closeChat.addEventListener("click", function(event) {
            toggleChat();
            event.stopPropagation();
        });
    }

    document.addEventListener("click", function(event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
        }
    });
});
