document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById("chat-icon");
    const chatContainer = document.getElementById("chat-container");
    const closeChat = document.getElementById("close-chat");

    if (!chatIcon || !chatContainer || !closeChat) {
        console.error("❌ Chatbot elements NOT found in DOM!");
        return;
    }

    function toggleChat(event) {
        event?.stopPropagation(); // Stop event interference

        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Allow buttons to work
            console.log("🔴 Chatbot closed");
        } else {
            chatContainer.classList.add("active");
            chatContainer.style.pointerEvents = "auto"; // Enable chatbot interactions
            console.log("🟢 Chatbot opened");
        }
    }

    // Fix: Ensure chatbot opens when clicking chat icon
    chatIcon.addEventListener("click", function (event) {
        toggleChat(event);
    });

    // Fix: Ensure chatbot closes when clicking "X"
    closeChat.addEventListener("click", function (event) {
        toggleChat(event);
    });

    // Fix: Prevent chatbot from blocking website buttons
    document.addEventListener("click", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
        }
    });

    // Fix: Ensure mobile touch works properly
    document.addEventListener("touchstart", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
        }
    }, { passive: true });

    console.log("✅ Chatbot script loaded successfully!");
});
