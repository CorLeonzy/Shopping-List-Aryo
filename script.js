const toggleButton = document.querySelector('#toggleList');
const listDiv = document.querySelector('.list');
const userInput = document.querySelector('.userInput');
const colorButton = document.querySelector('button.description');
const addItemInput = document.querySelector('.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const removeItemButton = document.querySelector('button.removeItemButton');
const list = document.querySelector('#shoppingList');

const registerForm = document.querySelector('#registerForm');
const loginForm = document.querySelector('#loginForm');
const authContainer = document.querySelector('#authContainer');
const darkToggle = document.getElementById('darkModeToggle');

let currentUser = null;
let lastPickedColor = '#2c3e50';
let shoppingItems = [];

// Render List
function renderList() {
  list.innerHTML = '';
  shoppingItems.forEach((item, index) => {
    const li = document.createElement('li');
    li.style.color = lastPickedColor;
    li.innerHTML = `
      <span><strong>${item.name}</strong> - ${item.quantity} (${item.category})</span>
      <button onclick="editItem(${index})" style="background:#fdcb6e;border:none;border-radius:6px;padding:5px 10px;cursor:pointer;font-weight:600;">Edit</button>
    `;
    list.appendChild(li);
  });
}

// Register
function register() {
  const username = document.querySelector('#registerUsername').value.trim();
  const password = document.querySelector('#registerPassword').value.trim();

  if (!username || !password) return alert('Fill all fields!');

  const users = JSON.parse(localStorage.getItem('users')) || [];
  if (users.find(u => u.username === username)) return alert('Username already exists!');

  users.push({ username, password });
  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful! Please login.');
  showLogin();
}

// Login
function login() {
  const username = document.querySelector('#loginUsername').value.trim();
  const password = document.querySelector('#loginPassword').value.trim();

  if (!username || !password) return alert('Fill all fields!');

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) return alert('Invalid username or password!');

  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
  alert('Login successful!');
  showShoppingList();
}

// Show Shopping List
function showShoppingList() {
  authContainer.style.display = 'none';
  listDiv.style.display = 'block';
}

// Logout
function logout() {
  localStorage.removeItem('currentUser');
  currentUser = null;
  alert('Logged out!');
  authContainer.style.display = 'block';
  listDiv.style.display = 'none';
}

// Show Forms
function showLogin() {
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
}
function showRegister() {
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
}

// Edit Item
window.editItem = function(index) {
  const newItem = prompt("Edit item (Format: Name, Quantity, Category):", `${shoppingItems[index].name}, ${shoppingItems[index].quantity}, ${shoppingItems[index].category}`);
  if (!newItem) return;
  const parts = newItem.split(',');
  if (parts.length < 3) return alert('Invalid format!');

  shoppingItems[index] = {
    name: parts[0].trim(),
    quantity: parts[1].trim(),
    category: parts[2].trim()
  };
  renderList();
};

// Add Item
addItemButton.addEventListener('click', () => {
  const itemText = addItemInput.value.trim();
  if (!itemText) return alert('Enter item details!');

  const [name, quantity, category] = itemText.split(',').map(val => val.trim());
  if (!name || !quantity || !category) return alert('Format: Name, Quantity, Category');

  shoppingItems.push({ name, quantity, category });
  addItemInput.value = '';
  renderList();
});

// Remove Item
removeItemButton.addEventListener('click', () => {
  shoppingItems.pop();
  renderList();
});

// Toggle List
toggleButton.addEventListener('click', () => {
  if (list.style.display === 'none') {
    list.style.display = 'block';
    toggleButton.textContent = 'Hide list';
  } else {
    list.style.display = 'none';
    toggleButton.textContent = 'Show list';
  }
});

// Change Color
colorButton.addEventListener('click', () => {
  const color = userInput.value.trim();
  if (color) {
    lastPickedColor = color;
    renderList();
  }
});

// Auto-login check
document.addEventListener('DOMContentLoaded', () => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser'));
  if (storedUser) {
    currentUser = storedUser;
    showShoppingList();
  }
});

// Dark Mode Toggle
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    darkToggle.textContent = "☀️ Light Mode";
  } else {
    darkToggle.textContent = "🌙 Dark Mode";
  }
});
