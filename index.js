// Generate or retrieve temporary user ID
function getTempUserId() {
  let tempUserId = localStorage.getItem('tempUserId');
  if (!tempUserId) {
    tempUserId = generateUUID();
    localStorage.setItem('tempUserId', tempUserId);
  }
  return tempUserId;
}

// Generate a UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Redirect to Create Group Page
document.getElementById('start-button')?.addEventListener('click', () => {
  const userId = getTempUserId();
  console.log(`Temporary User ID: ${userId}`);
  window.location.href = 'create-group.html';
});

document.getElementById('get-started-btn').addEventListener('click', async () => {
  try {
    const userId = localStorage.getItem('tempUserId');
    const response = await fetch('https://<your-api-url>/groups', {
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



});

