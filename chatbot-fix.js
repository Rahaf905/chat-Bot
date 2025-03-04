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

    // ✅ Ensure chatbot opens when clicking chat icon (Prevent duplication)
    if (!chatIcon.dataset.clickEventAdded) {
        chatIcon.addEventListener("click", function (event) {
            console.log("🟢 Chat icon clicked!");
            toggleChat(event);
        });
        chatIcon.dataset.clickEventAdded = true;
    }

    // ✅ Ensure chatbot closes when clicking "X" button
    closeChat.addEventListener("click", function (event) {
        console.log("🔴 Chat close button clicked!");
        toggleChat(event);
    });

    // ✅ Ensure chatbot does NOT block website buttons
    document.addEventListener("click", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
            console.log("🔴 Chatbot closed (clicked outside)");
        }
    });

    // ✅ Ensure mobile touch works properly
    document.addEventListener("touchstart", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
            console.log("🔴 Chatbot closed (mobile touch)");
        }
    }, { passive: true });

    console.log("✅ Chatbot script loaded successfully!");
});
