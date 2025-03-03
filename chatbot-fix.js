document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatIcon = document.getElementById("chat-icon");
    const closeChat = document.getElementById("close-chat");

    function toggleChat(event) {
        event?.stopPropagation(); // Prevent event interference

        if (chatContainer.classList.contains("active")) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none"; // Prevent blocking elements when closed
            window.parent.postMessage("chatClosed", "*"); // Notify Durable that chat is closed
            console.log("Chat closed - message sent to parent");
        } else {
            chatContainer.classList.add("active");
            chatContainer.style.pointerEvents = "auto"; // Allow interactions
            window.parent.postMessage("chatOpened", "*"); // Notify Durable that chat is open
            console.log("Chat opened - message sent to parent");
        }
    }

    // Open/Close chatbot on icon click
    chatIcon.addEventListener("click", function (event) {
        console.log("Chat icon clicked");
        toggleChat(event);
    });

    // Close chatbot when clicking the "X" button
    if (closeChat) {
        closeChat.addEventListener("click", function (event) {
            console.log("Close button clicked");
            toggleChat(event);
        });
    }

    // Close chatbot when clicking outside of it
    document.addEventListener("click", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
            window.parent.postMessage("chatClosed", "*");
            console.log("Chat closed by clicking outside");
        }
    });

    // Fix mobile interactions
    document.addEventListener("touchstart", function (event) {
        if (!chatContainer.contains(event.target) && !chatIcon.contains(event.target)) {
            chatContainer.classList.remove("active");
            chatContainer.style.pointerEvents = "none";
            window.parent.postMessage("chatClosed", "*");
            console.log("Chat closed by touch outside");
        }
    }, { passive: true });

    // Ensure all buttons & links work properly
    document.querySelectorAll("a, button").forEach(element => {
        element.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    // 🔹 **FIX: Listen for messages from Durable and force open the chatbot**
    window.addEventListener("message", function (event) {
        console.log("Received message from Durable:", event.data);
        if (event.data === "toggleChat") {
            console.log("Toggling chat from Durable");
            chatContainer.classList.add("active");  // Open chat
            chatContainer.style.pointerEvents = "auto";
        }
    });
});
