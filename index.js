// Event listener for the "Get Started" button
document.getElementById('get-started-btn').addEventListener('click', async () => {
  try {
    // Fetch user ID from localStorage
    const userId = localStorage.getItem('tempUserId');

    // Make a GET request to fetch groups (replace with your actual API URL)
    const response = await fetch('https://<your-api-url>/groups', {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': userId // Include the user ID in the request
      },
    });

    // Parse the JSON response
    const groups = await response.json();

    // Populate the group section with group data
    const groupSection = document.getElementById('group-section');
    groupSection.innerHTML = groups.data.map(group => `
      <div>
        <p>${group.name}</p>
        <button onclick="enterGroup('${group.id}')">Enter Group</button>
      </div>
    `).join('');
    
    // Hide the "Get Started" section and show the group section
    document.getElementById('get-started-section').style.display = 'none';
    groupSection.style.display = 'block';

  } catch (error) {
    console.error('Failed to load groups:', error);
  }
});

// Function to handle entering a group (you can implement this logic as needed)
function enterGroup(groupId) {
  console.log('Entering group:', groupId);
  // Add logic to navigate to the group page or display its content
}


