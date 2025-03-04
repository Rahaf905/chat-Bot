document.addEventListener("DOMContentLoaded", function () {
    const chatIcon = document.getElementById("chat-icon");
    const chatContainer = document.getElementById("chat-container");
    const closeChat = document.getElementById("close-chat");

    if (!chatIcon || !chatContainer || !closeChat) {
        console.error("❌ Chatbot elements NOT found in DOM!");
        return;
    }

    function toggleChat(event) {
        event?.stopPropagation(); // Prevents interference with other clicks

        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Allow website buttons to work
            console.log("🔴 Chatbot closed");
        } else {
            chatContainer.classList.add("active");
            chatContainer.style.pointerEvents = "auto"; // Enable chatbot interactions
            console.log("🟢 Chatbot opened");
        }
    }

    // ✅ Ensure chatbot opens when clicking chat icon
    chatIcon.addEventListener("click", function (event) {
        console.log("🟢 Chat icon clicked!");
        toggleChat(event);
    });

    // ✅ Ensure chatbot closes when clicking "X" button
    closeChat.addEventListener("click", function (event) {
        console.log("🔴 Chat close button clicked!");
        toggleChat(event);
    });

    // ✅ Fix: Ensure chatbot does NOT block website buttons
    document.addEventListener("click", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
            console.log("🔴 Chatbot closed (clicked outside)");
        }
    });

    // ✅ Fix: Ensure mobile touch works properly
    document.addEventListener("touchstart", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
            console.log("🔴 Chatbot closed (mobile touch)");
        }
    }, { passive: true });

    // ✅ Listen for messages from the iframe (Durable)
    window.addEventListener("message", function (event) {
        if (event.data === "toggleChat") {
            console.log("📩 Received 'toggleChat' message from iframe");
            toggleChat();
        }
    });

    console.log("✅ Chatbot script loaded successfully!");
});
