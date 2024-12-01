document.addEventListener("DOMContentLoaded", function () {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    updateHistory(expenses);

    document.getElementById("exit").addEventListener("click", function () {
        window.close();
    });
});

document.querySelector(".add-expense-container form").addEventListener("submit", function(event) {
    event.preventDefault();

    let expenseTitle = document.getElementById("expense").value;
    let expenseAmount = document.getElementById("amount").value;

    if (expenseTitle && expenseAmount) {
        let expense = {
            title: expenseTitle,
            amount: parseFloat(expenseAmount)
        };

        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push(expense);
        localStorage.setItem("expenses", JSON.stringify(expenses));

        updateHistory(expenses);

        document.getElementById("expense").value = "";
        document.getElementById("amount").value = "";
    } else {
        alert("Please provide both title and amount.");
    }
});

function updateHistory(expenses) {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById("totalExpenses").textContent = totalExpenses;

    let tbody = document.querySelector("table tbody");
    tbody.innerHTML = ""; 

    expenses.forEach(expense => {
        let row = document.createElement("tr");
        row.innerHTML = 
            `<td>${expense.title}</td>
            <td>${expense.amount}</td>
            <td><button class="delete-btn" onclick="deleteExpense('${expense.title}')">Delete</button></td>`;
        tbody.appendChild(row);
    });
}

function deleteExpense(expenseTitle) {
    let expenses = JSON.parse(localStorage.getItem("expenses"));
    expenses = expenses.filter(expense => expense.title !== expenseTitle);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateHistory(expenses); 
}

function resetAll() {
    localStorage.removeItem("expenses");
    updateHistory([]); 
}

document.querySelector(".sort-expenses-btn").addEventListener("click", function() {
    let sortOrder = this.getAttribute("data-sort-order");
    let expenses = JSON.parse(localStorage.getItem("expenses"));

    if (sortOrder === "asc") {
        expenses.sort((a, b) => a.amount - b.amount);
        this.setAttribute("data-sort-order", "desc");
        this.textContent = "Sort Expenses (Descending)";
    } else {
        expenses.sort((a, b) => b.amount - a.amount);
        this.setAttribute("data-sort-order", "asc");
        this.textContent = "Sort Expenses (Ascending)";
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));
    updateHistory(expenses); 
});
