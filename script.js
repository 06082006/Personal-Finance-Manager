// Budget Management
const budgetInput = document.getElementById("budget");
const budgetAlert = document.getElementById("budgetAlert");
const clearBudgetBtn = document.getElementById("clearBudgetBtn");
let budget = null;

// Set Budget
function setBudget() {
    const budgetValue = parseFloat(budgetInput.value);
    if (isNaN(budgetValue) || budgetValue <= 0) {
        alert("Please enter a valid budget amount!");
        return;
    }
    budget = budgetValue;
    localStorage.setItem("budget", budgetValue);
    budgetAlert.innerHTML = `<strong>Budget Set:</strong> ₹${budget.toFixed(2)}`;
    budgetAlert.style.color = "green";
    budgetInput.value = "";
}

// Clear Budget
clearBudgetBtn.addEventListener("click", function () {
    budget = null;
    localStorage.removeItem("budget");
    budgetAlert.innerHTML = "Budget has been cleared.";
    budgetAlert.style.color = "red";
});

// Login/Logout
let loggedInUser = null;
const loginForm = document.getElementById("loginForm");
const profileInfo = document.getElementById("profileInfo");
const usernameInput = document.getElementById("username");
const welcomeUser = document.getElementById("welcomeUser");
const profilePicture = document.getElementById("profilePicture");

function login() {
    const username = usernameInput.value.trim();
    if (!username) return alert("Enter a valid username!");
    loggedInUser = username;
    localStorage.setItem("loggedInUser", username);
    welcomeUser.textContent = `Welcome, ${username}!`;
    profilePicture.src = "https://via.placeholder.com/100";
    loginForm.style.display = "none";
    profileInfo.style.display = "block";
}

function logout() {
    loggedInUser = null;
    localStorage.removeItem("loggedInUser");
    loginForm.style.display = "block";
    profileInfo.style.display = "none";
    usernameInput.value = "";
}

// Transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
const transactionTableBody = document.getElementById("transactionTableBody");

function renderTransactions() {
    transactionTableBody.innerHTML = transactions.map((t, index) => `
        <tr>
            <td>${t.date}</td>
            <td>${t.type}</td>
            <td>${t.category}</td>
            <td>₹${t.amount}</td>
            <td><button onclick="deleteTransaction(${index})">Delete</button></td>
        </tr>`).join("");
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
}

// Form Submission
document.getElementById("financeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;
    const date = document.getElementById("date").value;
    if (isNaN(amount) || !type || !category || !date) return alert("Fill all fields correctly!");
    transactions.push({ amount, type, category, date });
    localStorage.setItem("transactions", JSON.stringify(transactions));
    renderTransactions();
    this.reset();
});

// Initialize
window.onload = function () {
    loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
        welcomeUser.textContent = `Welcome, ${loggedInUser}!`;
        loginForm.style.display = "none";
        profileInfo.style.display = "block";
    }
    const savedBudget = localStorage.getItem("budget");
    if (savedBudget) {
        budget = parseFloat(savedBudget);
        budgetAlert.innerHTML = `<strong>Budget Set:</strong> ₹${budget.toFixed(2)}`;
        budgetAlert.style.color = "green";
    }
    renderTransactions();
};
