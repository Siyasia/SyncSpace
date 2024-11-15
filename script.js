import Amplify, { Auth } from 'aws-amplify';
import awsconfig from './aws-exports.js'; // Ensure this file exists in your GitHub repo

Amplify.configure(awsconfig);

// Sign-Up Function
const signup = async () => {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  try {
    const user = await Auth.signUp({
      username: email,
      password: password,
    });
    document.getElementById('signup-message').innerText = "Sign-up successful! Please verify your email.";
    console.log('User signed up:', user);
  } catch (error) {
    document.getElementById('signup-message').innerText = `Error signing up: ${error.message}`;
    console.error('Sign-up error:', error);
  }
};

// Login Function
const signin = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const user = await Auth.signIn(email, password);
    document.getElementById('message').innerText = `Welcome, ${user.username}!`;
    document.getElementById('logout-button').style.display = "block";
    console.log('User signed in:', user);
  } catch (error) {
    document.getElementById('message').innerText = `Error logging in: ${error.message}`;
    console.error('Sign-in error:', error);
  }
};

// Logout Function
const logout = async () => {
  try {
    await Auth.signOut();
    document.getElementById('message').innerText = "You have been logged out.";
    document.getElementById('logout-button').style.display = "none";
    console.log('User logged out.');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

// Event Listeners
document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();
  signup();
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  signin();
});

document.getElementById('logout-button').addEventListener('click', logout);
