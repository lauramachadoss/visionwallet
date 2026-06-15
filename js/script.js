const form = document.getElementById("transactionForm");
const list = document.getElementById("transactionList");

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");

let transactions = JSON.parse(localStorage.getItem("visionwallet")) || [];

function formatCurrency(amount) {
    return amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

function saveData() {
    localStorage.setItem("visionwallet", JSON.stringify(transactions));
}

function updateUI() {
    list.innerHTML = "";

    let income = 0;
    let expense = 0;
}