let webSocket;

// Backend API URLs
const API_BASE_URL = "https://<your-http-api-endpoint>"; // Replace with HTTP API Gateway URL
const WEBSOCKET_URL = "wss://<your-websocket-endpoint>/production"; // Replace with WebSocket API Gateway URL

// Authentication
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Login successful!");
      showGroupPage();
    } else {
      alert(data.message || "Login failed");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

async function signup() {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Signup successful! Please log in.");
    } else {
      alert(data.message || "Signup failed");
    }
  } catch (error) {
    console.error("Error signing up:", error);
  }
}

// Group Management
async function createGroup() {
  const groupName = document.getElementById("groupName").value;

  try {
    const response = await fetch(`${API_BASE_URL}/groups`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: groupName }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Group created successfully!");
      enterGroup(groupName);
    } else {
      alert(data.message || "Group creation failed");
    }
  } catch (error) {
    console.error("Error creating group:", error);
  }
}

function enterGroup(groupName) {
  alert(`Entering group: ${groupName}`);
  document.getElementById("groupContainer").style.display = "none";
  document.getElementById("chatContainer").style.display = "block";
  connectWebSocket();
}

// WebSocket Integration
function connectWebSocket() {
  webSocket = new WebSocket(WEBSOCKET_URL);

  webSocket.onopen = () => {
    console.log("WebSocket connected");
  };

  webSocket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    displayMessage(message.body);
  };

  webSocket.onclose = () => {
    console.log("WebSocket disconnected");
  };

  webSocket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };
}

function sendMessage() {
  const message = document.getElementById("messageInput").value;

  if (webSocket && webSocket.readyState === WebSocket.OPEN) {
    const payload = {
      action: "sendMessage",
      message,
    };

    webSocket.send(JSON.stringify(payload));
    console.log("Message sent:", payload);
  } else {
    console.error("WebSocket is not connected");
  }
}

function displayMessage(message) {
  const messageContainer = document.getElementById("messages");
  const messageElement = document.createElement("div");
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
}

// Navigation
function showGroupPage() {
  document.getElementById("authContainer").style.display = "none";
  document.getElementById("groupContainer").style.display = "block";
}
