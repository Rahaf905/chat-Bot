document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.querySelector("iframe");
    if (iframe) {
        iframe.style.pointerEvents = "none"; // Prevent blocking scroll

        iframe.addEventListener("click", function() {
            this.style.pointerEvents = "auto"; // Enable chatbot when clicked
        });
    }

    console.log("Chatbot fix applied!"); // Debugging message
});

