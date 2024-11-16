const ws = new WebSocket('wss://<your-websocket-endpoint>/production');

ws.onopen = () => {
  console.log('Connected to WebSocket');
};

ws.onmessage = (event) => {
  const chatBox = document.getElementById('chat-box');
  const message = JSON.parse(event.data);

  const messageElement = document.createElement('div');
  messageElement.textContent = message.body;
  chatBox.appendChild(messageElement);
};

ws.onerror = (error) => {
  console.error('WebSocket Error:', error);
};

document.getElementById('chat-form')?.addEventListener('submit', (e) => {
  e.preventDefault();

  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;

  ws.send(
    JSON.stringify({
      action: 'sendMessage',
      body: message,
    })
  );

  messageInput.value = '';
});
