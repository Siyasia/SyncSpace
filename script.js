// Replace this with your actual API Gateway endpoint
const API_URL = "https://your-api-gateway-endpoint.com"; 

// Event listener for the group creation form
document.getElementById("group-form").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent page refresh

  // Get form input values
  const groupName = document.getElementById("group-name").value;
  const groupId = document.getElementById("group-id").value;

  try {
    // Send a POST request to create a new group
    const response = await fetch(`${API_URL}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupName: groupName,
        groupId: groupId,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Group created successfully!");
      fetchGroups(); // Refresh the group list after creation
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error creating group:", error);
    alert("An error occurred while creating the group.");
  }
});

// Function to fetch and display groups
async function fetchGroups() {
  try {
    // Send a GET request to retrieve all groups
    const response = await fetch(`${API_URL}/groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok) {
      const groupList = document.getElementById("group-list");
      groupList.innerHTML = ""; // Clear the existing list

      // Loop through the groups and display them
      result.groups.forEach((group) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${group.groupName} (${group.groupId})`;
        groupList.appendChild(listItem);
      });
    } else {
      console.error(`Error fetching groups: ${result.message}`);
    }
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
}

// Fetch and display groups when the page loads
fetchGroups();

