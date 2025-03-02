document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.querySelector("iframe");
    if (iframe) {
        iframe.style.pointerEvents = "auto"; // Ensure iframe allows clicks

        // Ensure the chatbot loads properly
        iframe.addEventListener("load", function() {
            console.log("Chatbot iframe loaded successfully!");
            this.style.pointerEvents = "auto"; // Make sure it's interactive
        });

        // Debugging: Log if the iframe exists
        console.log("Chatbot iframe detected:", iframe.src);
    } else {
        console.error("Chatbot iframe NOT found!");
    }

    // ✅ Prevent event interference from chatbot
    document.addEventListener("click", function(event) {
        const chatContainer = document.getElementById("chat-container");
        if (chatContainer && chatContainer.contains(event.target)) {
            event.stopPropagation(); // Stop chatbot from interfering with other clicks
        }
    }, true);
});
