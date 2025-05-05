document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById('chat-container');

  container.innerHTML = `
    <button id="chat-toggle">🦉</button>
    <div id="chat-box">
      <div id="chat-messages"></div>
      <form id="chat-form">
        <input type="text" id="chat-input" placeholder="Ask OwlMind..." />
        <button type="submit">➤</button>
      </form>
    </div>
  `;

  const chatToggle = document.getElementById('chat-toggle');
  const chatBox = document.getElementById('chat-box');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');

  chatToggle.onclick = () => {
    chatBox.style.display = chatBox.style.display === 'none' ? 'flex' : 'none';
  };

  chatForm.onsubmit = async (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;

    chatMessages.innerHTML += `<div class="chat-user">🧑 ${message}</div>`;
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const res = await fetch('/api/assistant/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    chatMessages.innerHTML += `<div class="chat-ai">🦉 ${data.reply}</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };
});
