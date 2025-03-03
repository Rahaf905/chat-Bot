document.addEventListener("DOMContentLoaded", function() {
    const chatContainer = document.getElementById("chat-container");
    const chatIcon = document.getElementById("chat-icon");
    const closeChat = document.getElementById("close-chat");

    function toggleChat(event) {
        event?.stopPropagation(); // Prevent event interference

        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Ensure buttons work normally
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

    // Allow normal button clicks and prevent chatbot from interfering
    document.addEventListener("click", function(event) {
        const isChat = chatContainer.contains(event.target) || chatIcon.contains(event.target);

        if (!isChat) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Allow other buttons to work normally
        }
    });

    // Fix mobile touch events issue
    document.addEventListener("touchstart", function(event) {
        const isChat = chatContainer.contains(event.target) || chatIcon.contains(event.target);

        if (!isChat) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Ensure normal button functionality
        }
    }, { passive: true });

    // Fix: Ensure buttons that open new tabs work properly
    document.querySelectorAll("a[target='_blank'], button").forEach(button => {
        button.addEventListener("click", function(event) {
            event.stopPropagation(); // Ensure chatbot does not capture click events
        });
    });
})
