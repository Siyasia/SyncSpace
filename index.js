// API URLs
const httpApiUrl = 'https://9ywal030f2.execute-api.us-east-1.amazonaws.com/prod'; // HTTP API URL
const mockUserId = 'mockUser123'; // Mock User ID

// Create Group Button Event
document.getElementById('create-group-btn').addEventListener('click', async () => {
  try {
    const groupName = document.getElementById('group-name').value.trim();

    if (!groupName) {
      document.getElementById('create-group-message').innerText = 'Group name is required.';
      return;
    }

    // API Request to create a group
    const response = await fetch(`${httpApiUrl}/groups`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': mockUserId,
      },
      body: JSON.stringify({ name: groupName }),
    });

    const result = await response.json();

    if (response.ok) {
      // Show the group space
      document.getElementById('create-group-section').style.display = 'none';
      document.getElementById('group-space-section').style.display = 'block';
      document.getElementById('group-name-display').innerText = `Group: ${groupName}`;
    } else {
      document.getElementById('create-group-message').innerText = `Error: ${result.message}`;
    }
  } catch (error) {
    console.error('Error creating group:', error);
    document.getElementById('create-group-message').innerText = 'An error occurred. Please try again.';
  }
});
