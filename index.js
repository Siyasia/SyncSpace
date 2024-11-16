// Set the WebSocket API URL and HTTP API URL
const websocketUrl = 'wss://kecqoiszr7.execute-api.us-east-1.amazonaws.com/prod'; // WebSocket URL
const httpApiUrl = 'https://9ywal030f2.execute-api.us-east-1.amazonaws.com/prod'; // HTTP API URL

// Mock User ID (used for testing)
const mockUserId = 'mockUser123'; // Use a temporary mock user ID for testing

// Get Started Button - Fetch groups using the mock user ID
document.getElementById('get-started-btn').addEventListener('click', async () => {
  try {
    const userId = mockUserId; // Use the mock user ID here
    const response = await fetch(`${httpApiUrl}/groups`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': userId },
    });
    const groups = await response.json();

    // Populate group section
    const groupSection = document.getElementById('group-section');
    groupSection.innerHTML = groups.data.map(group => `
      <div>
        <p>${group.name}</p>
        <button onclick="enterGroup('${group.id}')">Enter Group</button>
      </div>
    `).join('');

    // Show group section
    document.getElementById('signup-section').style.display = 'none';
    groupSection.style.display = 'block';
  } catch (error) {
    console.error('Failed to load groups:', error);
  }
});

// Function to handle entering the group
function enterGroup(groupId) {
  // Logic to enter a specific group room (use WebSocket to send/receive messages)
  const socket = new WebSocket(websocketUrl);

  socket.onopen = () => {
    console.log(`Connected to group ${groupId}`);
    socket.send(JSON.stringify({ action: 'join', groupId }));
  };

  socket.onmessage = (event) => {
    console.log('Message from server:', event.data);
  };

  socket.onclose = () => {
    console.log('Disconnected from group');
  };
}
