document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.querySelector("iframe");
    if (iframe) {
        iframe.style.pointerEvents = "auto"; // Ensure chatbot can be clicked

        // Debugging - Check if iframe is loading
        iframe.addEventListener("load", function() {
            console.log("Chatbot iframe loaded successfully!");
        });

        // Fix issue where iframe is not interactive initially
        iframe.addEventListener("click", function() {
            this.style.pointerEvents = "auto";
        });
    }
});


