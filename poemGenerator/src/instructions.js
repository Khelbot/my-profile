function updatePlaceholder() {
  const input = document.getElementById("user-instructions");
  if (window.innerWidth < 600) {
    input.placeholder = "Enter topic";
  } else {
    input.placeholder = "Enter the topic of your poem here.";
  }
}

// Event listeners for resizing and loading
window.addEventListener("resize", updatePlaceholder);
window.addEventListener("load", updatePlaceholder);
