// Handle Group Creation
document.getElementById('create-group-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();

  const groupName = document.getElementById('group-name').value;
  const ownerId = localStorage.getItem('tempUserId');

  try {
    const response = await fetch('https://<your-http-api-endpoint>/groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groupName, ownerId }),
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById('group-message').innerText = `Group "${groupName}" created successfully!`;
      window.location.href = 'chat.html'; // Redirect to chat page
    } else {
      document.getElementById('group-message').innerText = `Error: ${result.message}`;
    }
  } catch (error) {
    document.getElementById('group-message').innerText = `Error: ${error.message}`;
  }
});
