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

// event listner
document.getElementById('get-started-btn').addEventListener('click', () => {
  // Redirect to group creation or list page
  document.getElementById('signup-section').style.display = 'none';
  document.getElementById('group-section').style.display = 'block';
});

