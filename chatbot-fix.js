document.addEventListener("DOMContentLoaded", function() {
    const iframe = document.querySelector("iframe");
    if (iframe) {
        iframe.addEventListener("click", function() {
            this.style.pointerEvents = "auto";
        });
    }
});
