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

    transactions.forEach((transaction) => {
        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }
    });
    transactions.forEach((transaction, index) => {
        const li = document.createElement("li");

        li.classList.add(
            "transaction",
            transaction.type === "income"
                ? "transaction-income"
                : "transaction-expense"
        );

        const icon =
            transaction.type === "income"
                ? '<i class="fas fa-arrow-up"></i>'
                : '<i class="fas fa-arrow-down"></i>';

        li.innerHTML = `
      <div>
        <strong>${transaction.description}</strong><br>
        <small>${transaction.category}</small>
      </div>

      <div>
        <span class="amount">${icon} ${formatCurrency(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${index})" title="Deletar">
          <i class="fas fa-trash-alt"></i> Excluir
        </button>
      </div>
    `;

        list.appendChild(li);
    });

    const balance = income - expense;

    animateValue(incomeEl, income);
    animateValue(expenseEl, expense);
    animateValue(balanceEl, balance);

    saveData();
}

function animateValue(el, newValue) {
    const formattedValue = formatCurrency(newValue);
    el.style.opacity = "0.5";

    setTimeout(() => {
        el.textContent = formattedValue;
        el.style.opacity = "1";
        el.style.transition = "opacity 0.3s ease";
    }, 100);
}

function removeTransaction(index) {
    if (confirm("Tem certeza que deseja deletar esta transação?")) {
        transactions.splice(index, 1);
        updateUI();
    }
}
