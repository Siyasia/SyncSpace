const API_URL = "https://your-api-gateway-endpoint.com"; // Replace with your API Gateway endpoint

// Switch between pages
const showSection = (sectionId) => {
  document.querySelectorAll("section").forEach((section) => {
    section.style.display = "none";
  });
  document.getElementById(sectionId).style.display = "block";
};

// Event: Go to Sign-Up
document.getElementById("go-to-signup").addEventListener("click", () => {
  showSection("signup-section");
});

// Event: Go to Login
document.getElementById("go-to-login").addEventListener("click", () => {
  showSection("login-section");
});

// Login Logic
document.getElementById("login-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Login successful!");
      localStorage.setItem("token", result.token); // Store token for future use
      showSection("group-section"); // Redirect to group page
      fetchGroups(); // Load groups
    } else {
      document.getElementById("login-error").innerText = result.message;
    }
  } catch (error) {
    console.error("Login error:", error);
    document.getElementById("login-error").innerText = "Login failed.";
  }
});

// Sign-Up Logic
document.getElementById("signup-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    const response = await fetch(`${API_URL}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Sign-up successful! Please log in.");
      showSection("login-section");
    } else {
      document.getElementById("signup-error").innerText = result.message;
    }
  } catch (error) {
    console.error("Sign-up error:", error);
    document.getElementById("signup-error").innerText = "Sign-up failed.";
  }
});

// Group Creation Logic
document.getElementById("group-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const groupName = document.getElementById("group-name").value;
  const groupId = document.getElementById("group-id").value;

  try {
    const response = await fetch(`${API_URL}/groups`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ groupName, groupId }),
    });

    const result = await response.json();

    if (response.ok) {
      alert("Group created successfully!");
      fetchGroups(); // Refresh group list
    } else {
      document.getElementById("group-error").innerText = result.message;
    }
  } catch (error) {
    console.error("Group creation error:", error);
    document.getElementById("group-error").innerText = "Group creation failed.";
  }
});

// Fetch Groups
async function fetchGroups() {
  try {
    const response = await fetch(`${API_URL}/groups`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      const groupList = document.getElementById("group-list");
      groupList.innerHTML = ""; // Clear previous groups

      result.groups.forEach((group) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${group.groupName} (${group.groupId})`;
        groupList.appendChild(listItem);
      });
    } else {
      console.error("Error fetching groups:", result.message);
    }
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
}

// Logout Logic
document.getElementById("logout-button").addEventListener("click", () => {
  localStorage.removeItem("token");
  alert("Logged out successfully!");
  showSection("login-section");
});
