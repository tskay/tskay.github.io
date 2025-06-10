function toggleChat() {
  const container = document.getElementById("chatbot");
  const body = document.getElementById("chat-body");

  if (container.classList.contains("chat-container-open")) {
    container.classList.remove("chat-container-open");
    body.style.display = "none";
  } else {
    container.classList.add("chat-container-open");
    body.style.display = "flex";
  }
}
