/* =========================================
   POLARIS CONSULTANTS
   FINANCE MANAGEMENT
========================================= */


/* =========================================
   DEMO PAYMENT DATA
========================================= */

let payments = [

    {
        id: "PAY-000001",
        customerId: "CUS-000001",
        customer: "Muhammad Ali",
        application: "APP-000001",
        country: "United Kingdom",
        totalFee: 450000,
        amount: 200000,
        method: "Bank Transfer",
        date: "2026-08-01",
        notes: "Initial consultancy payment."
    },

    {
        id: "PAY-000002",
        customerId: "CUS-000002",
        customer: "Ahmed Khan",
        application: "APP-000002",
        country: "Canada",
        totalFee: 500000,
        amount: 250000,
        method: "Cash",
        date: "2026-08-03",
        notes: "First installment."
    },

    {
        id: "PAY-000003",
        customerId: "CUS-000003",
        customer: "Usman Raza",
        application: "APP-000003",
        country: "Australia",
        totalFee: 550000,
        amount: 350000,
        method: "Bank Transfer",
        date: "2026-08-05",
        notes: "Second installment."
    },

    {
        id: "PAY-000004",
        customerId: "CUS-000004",
        customer: "Hassan Ahmed",
        application: "APP-000004",
        country: "USA",
        totalFee: 600000,
        amount: 150000,
        method: "Easypaisa",
        date: "2026-08-07",
        notes: "Initial payment."
    },

    {
        id: "PAY-000005",
        customerId: "CUS-000005",
        customer: "Bilal Hussain",
        application: "APP-000005",
        country: "Germany",
        totalFee: 420000,
        amount: 420000,
        method: "Bank Transfer",
        date: "2026-08-08",
        notes: "Full payment received."
    },

    {
        id: "PAY-000006",
        customerId: "CUS-000006",
        customer: "Hamza Iqbal",
        application: "APP-000006",
        country: "UAE",
        totalFee: 300000,
        amount: 100000,
        method: "Cash",
        date: "2026-08-10",
        notes: "Initial payment."
    },

    {
        id: "PAY-000007",
        customerId: "CUS-000007",
        customer: "Saad Malik",
        application: "APP-000007",
        country: "Canada",
        totalFee: 500000,
        amount: 200000,
        method: "JazzCash",
        date: "2026-08-11",
        notes: "Payment received."
    }

];


/* =========================================
   DEMO EXPENSE DATA
========================================= */

let expenses = [

    {
        id: "EXP-000001",
        category: "Rent",
        description: "Office monthly rent",
        amount: 120000,
        method: "Bank Transfer",
        date: "2026-08-01",
        addedBy: "Admin"
    },

    {
        id: "EXP-000002",
        category: "Salaries",
        description: "Staff monthly salaries",
        amount: 280000,
        method: "Bank Transfer",
        date: "2026-08-02",
        addedBy: "Admin"
    },

    {
        id: "EXP-000003",
        category: "Marketing",
        description: "Facebook and Google advertising",
        amount: 85000,
        method: "Card",
        date: "2026-08-04",
        addedBy: "Admin"
    },

    {
        id: "EXP-000004",
        category: "Electricity",
        description: "Office electricity bill",
        amount: 35000,
        method: "Bank Transfer",
        date: "2026-08-06",
        addedBy: "Admin"
    },

    {
        id: "EXP-000005",
        category: "Internet",
        description: "Office internet",
        amount: 12000,
        method: "Cash",
        date: "2026-08-08",
        addedBy: "Admin"
    },

    {
        id: "EXP-000006",
        category: "Courier",
        description: "Document courier charges",
        amount: 18000,
        method: "Cash",
        date: "2026-08-09",
        addedBy: "Admin"
    }

];


/* =========================================
   HELPERS
========================================= */

function formatMoney(value) {

    return "Rs. " +
        Number(value || 0)
            .toLocaleString("en-PK");

}


function formatDate(date) {

    if (!date) {
        return "-";
    }

    const parts =
        date.split("-");

    return (
        parts[2] +
        "-" +
        parts[1] +
        "-" +
        parts[0]
    );

}


/* =========================================
   FINANCE CALCULATIONS
========================================= */

function calculateFinance() {

    const income =
        payments.reduce(
            (total, item) =>
                total + Number(item.amount),
            0
        );


    const expenseTotal =
        expenses.reduce(
            (total, item) =>
                total + Number(item.amount),
            0
        );


    const contractValue =
        payments.reduce(
            (total, item) =>
                total + Number(item.totalFee),
            0
        );


    const remaining =
        payments.reduce(
            (total, item) => {

                const balance =
                    Number(item.totalFee) -
                    Number(item.amount);

                return total + balance;

            },
            0
        );


    const profit =
        income - expenseTotal;


    return {

        income,
        expenseTotal,
        contractValue,
        remaining,
        profit

    };

}


/* =========================================
   UPDATE DASHBOARD
========================================= */

function updateDashboard() {

    const finance =
        calculateFinance();


    document.getElementById(
        "totalIncome"
    ).textContent =
        formatMoney(finance.income);


    document.getElementById(
        "totalExpenses"
    ).textContent =
        formatMoney(finance.expenseTotal);


    document.getElementById(
        "netProfit"
    ).textContent =
        formatMoney(finance.profit);


    document.getElementById(
        "outstanding"
    ).textContent =
        formatMoney(finance.remaining);


    document.getElementById(
        "contractValue"
    ).textContent =
        formatMoney(finance.contractValue);


    document.getElementById(
        "amountReceived"
    ).textContent =
        formatMoney(finance.income);


    document.getElementById(
        "remainingAmount"
    ).textContent =
        formatMoney(finance.remaining);


    let percentage = 0;


    if (finance.contractValue > 0) {

        percentage =
            (
                finance.income /
                finance.contractValue
            ) * 100;

    }


    percentage =
        Math.min(
            100,
            percentage
        );


    document.getElementById(
        "collectionProgress"
    ).style.width =
        percentage + "%";


    document.getElementById(
        "progressText"
    ).textContent =
        percentage.toFixed(1) +
        "% collected";


    updateExpenseSummary();

}


/* =========================================
   EXPENSE SUMMARY
========================================= */

function updateExpenseSummary() {

    const categories = {

        Rent: 0,

        Salaries: 0,

        Marketing: 0,

        Other: 0

    };


    expenses.forEach(
        function(item) {

            if (
                item.category ===
                "Rent"
            ) {

                categories.Rent +=
                    Number(item.amount);

            }
            else if (
                item.category ===
                "Salaries"
            ) {

                categories.Salaries +=
                    Number(item.amount);

            }
            else if (
                item.category ===
                "Marketing"
            ) {

                categories.Marketing +=
                    Number(item.amount);

            }
            else {

                categories.Other +=
                    Number(item.amount);

            }

        }
    );


    document.getElementById(
        "rentExpense"
    ).textContent =
        formatMoney(categories.Rent);


    document.getElementById(
        "salaryExpense"
    ).textContent =
        formatMoney(categories.Salaries);


    document.getElementById(
        "marketingExpense"
    ).textContent =
        formatMoney(categories.Marketing);


    document.getElementById(
        "otherExpense"
    ).textContent =
        formatMoney(categories.Other);

}


/* =========================================
   RENDER PAYMENTS
========================================= */

function renderPayments(
    data = payments
) {

    const tbody =
        document.getElementById(
            "paymentTableBody"
        );


    tbody.innerHTML = "";


    if (!data.length) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="10"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#718096;
                    "
                >
                    No payment records found.
                </td>

            </tr>

        `;

        return;

    }


    data.forEach(
        function(item) {


            const remaining =
                Number(item.totalFee) -
                Number(item.amount);


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>

                    <strong>
                        ${item.id}
                    </strong>

                </td>


                <td>

                    <div class="customer-cell">

                        <strong>
                            ${item.customer}
                        </strong>

                        <small>
                            ${item.customerId}
                        </small>

                    </div>

                </td>


                <td>
                    ${item.application}
                </td>


                <td>
                    ${item.country}
                </td>


                <td>
                    ${formatMoney(item.totalFee)}
                </td>


                <td>

                    <strong class="amount-positive">
                        ${formatMoney(item.amount)}
                    </strong>

                </td>


                <td>

                    <strong
                        class="
                            ${remaining > 0
                                ? "amount-warning"
                                : "amount-positive"}
                        "
                    >
                        ${formatMoney(remaining)}
                    </strong>

                </td>


                <td>

                    <span class="payment-method">
                        ${item.method}
                    </span>

                </td>


                <td>
                    ${formatDate(item.date)}
                </td>


                <td>

                    <div class="action-buttons">

                        <button
                            class="action-button"
                            title="View"
                            onclick="viewPayment('${item.id}')"
                        >
                            👁
                        </button>

                        <button
                            class="action-button"
                            title="Receipt"
                            onclick="createReceipt('${item.id}')"
                        >
                            🧾
                        </button>

                    </div>

                </td>

            `;


            tbody.appendChild(row);

        }
    );


    document.getElementById(
        "paymentResultText"
    ).textContent =
        `Showing ${data.length} payment records`;

}


/* =========================================
   RENDER EXPENSES
========================================= */

function renderExpenses(
    data = expenses
) {

    const tbody =
        document.getElementById(
            "expenseTableBody"
        );


    tbody.innerHTML = "";


    if (!data.length) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="8"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#718096;
                    "
                >
                    No expense records found.
                </td>

            </tr>

        `;

        return;

    }


    data.forEach(
        function(item) {


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${item.id}
                    </strong>
                </td>


                <td>
                    ${item.category}
                </td>


                <td>
                    ${item.description}
                </td>


                <td>

                    <strong class="amount-negative">
                        ${formatMoney(item.amount)}
                    </strong>

                </td>


                <td>

                    <span class="payment-method">
                        ${item.method}
                    </span>

                </td>


                <td>
                    ${formatDate(item.date)}
                </td>


                <td>
                    ${item.addedBy}
                </td>


                <td>

                    <div class="action-buttons">

                        <button
                            class="action-button"
                            title="View"
                            onclick="viewExpense('${item.id}')"
                        >
                            👁
                        </button>

                        <button
                            class="action-button"
                            title="Delete"
                            onclick="deleteExpense('${item.id}')"
                        >
                            ×
                        </button>

                    </div>

                </td>

            `;


            tbody.appendChild(row);

        }
    );

}


/* =========================================
   RENDER CUSTOMER LEDGER
========================================= */

function renderLedger() {

    const tbody =
        document.getElementById(
            "ledgerTableBody"
        );


    tbody.innerHTML = "";


    const customerMap = {};


    payments.forEach(
        function(item) {


            if (
                !customerMap[
                    item.customerId
                ]
            ) {

                customerMap[
                    item.customerId
                ] = {

                    customerId:
                        item.customerId,

                    customer:
                        item.customer,

                    application:
                        item.application,

                    totalFee: 0,

                    credit: 0

                };

            }


            customerMap[
                item.customerId
            ].totalFee +=
                Number(item.totalFee);


            customerMap[
                item.customerId
            ].credit +=
                Number(item.amount);

        }
    );


    Object.values(
        customerMap
    ).forEach(
        function(item) {


            const balance =
                item.totalFee -
                item.credit;


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>

                    <div class="customer-cell">

                        <strong>
                            ${item.customer}
                        </strong>

                        <small>
                            ${item.customerId}
                        </small>

                    </div>

                </td>


                <td>
                    ${item.application}
                </td>


                <td>
                    ${formatMoney(item.totalFee)}
                </td>


                <td>
                    ${formatMoney(item.totalFee)}
                </td>


                <td>

                    <strong class="amount-positive">
                        ${formatMoney(item.credit)}
                    </strong>

                </td>


                <td>

                    <strong
                        class="
                            ${balance > 0
                                ? "amount-warning"
                                : "amount-positive"}
                        "
                    >
                        ${formatMoney(balance)}
                    </strong>

                </td>


                <td>

                    <span
                        class="
                            balance-badge
                            ${balance > 0
                                ? "balance-pending"
                                : "balance-paid"}
                        "
                    >

                        ${
                            balance > 0
                                ? "Outstanding"
                                : "Paid"
                        }

                    </span>

                </td>


                <td>

                    <button
                        class="action-button"
                        onclick="viewLedger('${item.customerId}')"
                    >
                        👁
                    </button>

                </td>

            `;


            tbody.appendChild(row);

        }
    );

}


/* =========================================
   FILTER PAYMENTS
========================================= */

function filterPayments() {

    const search =
        document.getElementById(
            "searchInput"
        )
        .value
        .toLowerCase()
        .trim();


    const country =
        document.getElementById(
            "countryFilter"
        ).value;


    const method =
        document.getElementById(
            "paymentMethodFilter"
        ).value;


    const filtered =
        payments.filter(
            function(item) {


                const searchMatch =

                    !search ||

                    item.id
                        .toLowerCase()
                        .includes(search) ||

                    item.customer
                        .toLowerCase()
                        .includes(search) ||

                    item.application
                        .toLowerCase()
                        .includes(search) ||

                    item.customerId
                        .toLowerCase()
                        .includes(search);


                const countryMatch =

                    !country ||
                    item.country === country;


                const methodMatch =

                    !method ||
                    item.method === method;


                return (
                    searchMatch &&
                    countryMatch &&
                    methodMatch
                );

            }
        );


    renderPayments(filtered);

}


/* =========================================
   FILTER EVENTS
========================================= */

document
    .getElementById(
        "searchInput"
    )
    .addEventListener(
        "input",
        filterPayments
    );


document
    .getElementById(
        "countryFilter"
    )
    .addEventListener(
        "change",
        filterPayments
    );


document
    .getElementById(
        "paymentMethodFilter"
    )
    .addEventListener(
        "change",
        filterPayments
    );


document
    .getElementById(
        "resetFilters"
    )
    .addEventListener(
        "click",
        function() {

            document.getElementById(
                "searchInput"
            ).value = "";

            document.getElementById(
                "countryFilter"
            ).value = "";

            document.getElementById(
                "paymentMethodFilter"
            ).value = "";

            renderPayments();

        }
    );


/* =========================================
   TABS
========================================= */

document
    .querySelectorAll(
        ".finance-tab"
    )
    .forEach(
        function(tab) {


            tab.addEventListener(
                "click",
                function() {


                    document
                        .querySelectorAll(
                            ".finance-tab"
                        )
                        .forEach(
                            item =>
                                item.classList.remove(
                                    "active"
                                )
                        );


                    this.classList.add(
                        "active"
                    );


                    const selected =
                        this.dataset.tab;


                    document
                        .getElementById(
                            "paymentsSection"
                        )
                        .classList.add(
                            "hidden-section"
                        );


                    document
                        .getElementById(
                            "expensesSection"
                        )
                        .classList.add(
                            "hidden-section"
                        );


                    document
                        .getElementById(
                            "ledgerSection"
                        )
                        .classList.add(
                            "hidden-section"
                        );


                    if (
                        selected ===
                        "payments"
                    ) {

                        document
                            .getElementById(
                                "paymentsSection"
                            )
                            .classList.remove(
                                "hidden-section"
                            );

                    }


                    if (
                        selected ===
                        "expenses"
                    ) {

                        document
                            .getElementById(
                                "expensesSection"
                            )
                            .classList.remove(
                                "hidden-section"
                            );

                        renderExpenses();

                    }


                    if (
                        selected ===
                        "ledger"
                    ) {

                        document
                            .getElementById(
                                "ledgerSection"
                            )
                            .classList.remove(
                                "hidden-section"
                            );

                        renderLedger();

                    }

                }
            );

        }
    );


/* =========================================
   MODAL HELPERS
========================================= */

const paymentModal =
    document.getElementById(
        "paymentModal"
    );


const expenseModal =
    document.getElementById(
        "expenseModal"
    );


function closePaymentModal() {

    paymentModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


function closeExpenseModal() {

    expenseModal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


/* =========================================
   OPEN PAYMENT
========================================= */

document
    .getElementById(
        "addPaymentButton"
    )
    .addEventListener(
        "click",
        function() {

            paymentModal.classList.add(
                "show"
            );

            document.body.style.overflow =
                "hidden";

            document.getElementById(
                "paymentDate"
            ).value =
                new Date()
                    .toISOString()
                    .split("T")[0];

        }
    );


document
    .getElementById(
        "closePaymentModal"
    )
    .addEventListener(
        "click",
        closePaymentModal
    );


document
    .getElementById(
        "cancelPayment"
    )
    .addEventListener(
        "click",
        closePaymentModal
    );


/* =========================================
   OPEN EXPENSE
========================================= */

document
    .getElementById(
        "addExpenseButton"
    )
    .addEventListener(
        "click",
        function() {

            expenseModal.classList.add(
                "show"
            );

            document.body.style.overflow =
                "hidden";

            document.getElementById(
                "expenseDate"
            ).value =
                new Date()
                    .toISOString()
                    .split("T")[0];

        }
    );


document
    .getElementById(
        "closeExpenseModal"
    )
    .addEventListener(
        "click",
        closeExpenseModal
    );


document
    .getElementById(
        "cancelExpense"
    )
    .addEventListener(
        "click",
        closeExpenseModal
    );


paymentModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            paymentModal
        ) {

            closePaymentModal();

        }

    }
);


expenseModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            expenseModal
        ) {

            closeExpenseModal();

        }

    }
);


/* =========================================
   SAVE PAYMENT
========================================= */

document
    .getElementById(
        "paymentForm"
    )
    .addEventListener(
        "submit",
        function(event) {


            event.preventDefault();


            const totalFee =
                Number(
                    document.getElementById(
                        "paymentTotalFee"
                    ).value
                );


            const amount =
                Number(
                    document.getElementById(
                        "paymentAmount"
                    ).value
                );


            if (
                amount >
                totalFee
            ) {

                alert(
                    "Payment amount cannot be greater than total consultancy fee."
                );

                return;

            }


            const newNumber =
                payments.length + 1;


            const newPayment = {

                id:
                    "PAY-" +
                    String(newNumber)
                        .padStart(6,"0"),

                customerId:
                    document.getElementById(
                        "paymentCustomerId"
                    ).value,

                customer:
                    document.getElementById(
                        "paymentCustomer"
                    ).value,

                application:
                    document.getElementById(
                        "paymentApplication"
                    ).value,

                country:
                    document.getElementById(
                        "paymentCountry"
                    ).value,

                totalFee,

                amount,

                method:
                    document.getElementById(
                        "paymentMethod"
                    ).value,

                date:
                    document.getElementById(
                        "paymentDate"
                    ).value,

                notes:
                    document.getElementById(
                        "paymentNotes"
                    ).value

            };


            payments.unshift(
                newPayment
            );


            document
                .getElementById(
                    "paymentForm"
                )
                .reset();


            closePaymentModal();


            renderPayments();

            updateDashboard();

            renderLedger();


            alert(
                `${newPayment.id} saved successfully.`
            );

        }
    );


/* =========================================
   SAVE EXPENSE
========================================= */

document
    .getElementById(
        "expenseForm"
    )
    .addEventListener(
        "submit",
        function(event) {


            event.preventDefault();


            const newNumber =
                expenses.length + 1;


            const newExpense = {

                id:
                    "EXP-" +
                    String(newNumber)
                        .padStart(6,"0"),

                category:
                    document.getElementById(
                        "expenseCategory"
                    ).value,

                description:
                    document.getElementById(
                        "expenseDescription"
                    ).value,

                amount:
                    Number(
                        document.getElementById(
                            "expenseAmount"
                        ).value
                    ),

                method:
                    document.getElementById(
                        "expenseMethod"
                    ).value,

                date:
                    document.getElementById(
                        "expenseDate"
                    ).value,

                addedBy:
                    "Admin"

            };


            expenses.unshift(
                newExpense
            );


            document
                .getElementById(
                    "expenseForm"
                )
                .reset();


            closeExpenseModal();


            renderExpenses();

            updateDashboard();


            alert(
                `${newExpense.id} saved successfully.`
            );

        }
    );


/* =========================================
   VIEW PAYMENT
========================================= */

function viewPayment(id) {


    const item =
        payments.find(
            payment =>
                payment.id === id
        );


    if (!item) {
        return;
    }


    const remaining =
        Number(item.totalFee) -
        Number(item.amount);


    alert(

        "PAYMENT DETAILS\n\n" +

        "Payment ID: " +
        item.id +

        "\nCustomer: " +
        item.customer +

        "\nCustomer ID: " +
        item.customerId +

        "\nApplication: " +
        item.application +

        "\nCountry: " +
        item.country +

        "\nTotal Fee: " +
        formatMoney(item.totalFee) +

        "\nPaid: " +
        formatMoney(item.amount) +

        "\nRemaining: " +
        formatMoney(remaining) +

        "\nMethod: " +
        item.method +

        "\nDate: " +
        formatDate(item.date) +

        "\n\nNotes: " +
        item.notes

    );

}


/* =========================================
   CREATE RECEIPT
========================================= */

function createReceipt(id) {

    alert(
        `Receipt generation for ${id} will be connected to the Receipt & QR module in Step 8.`
    );

}


/* =========================================
   VIEW EXPENSE
========================================= */

function viewExpense(id) {


    const item =
        expenses.find(
            expense =>
                expense.id === id
        );


    if (!item) {
        return;
    }


    alert(

        "EXPENSE DETAILS\n\n" +

        "Expense ID: " +
        item.id +

        "\nCategory: " +
        item.category +

        "\nDescription: " +
        item.description +

        "\nAmount: " +
        formatMoney(item.amount) +

        "\nMethod: " +
        item.method +

        "\nDate: " +
        formatDate(item.date) +

        "\nAdded By: " +
        item.addedBy

    );

}


/* =========================================
   DELETE EXPENSE
========================================= */

function deleteExpense(id) {


    const confirmed =
        confirm(
            `Delete ${id}?`
        );


    if (!confirmed) {
        return;
    }


    expenses =
        expenses.filter(
            item =>
                item.id !== id
        );


    renderExpenses();

    updateDashboard();

}


/* =========================================
   VIEW LEDGER
========================================= */

function viewLedger(customerId) {


    const customerPayments =
        payments.filter(
            item =>
                item.customerId ===
                customerId
        );


    if (!customerPayments.length) {
        return;
    }


    let message =
        "CUSTOMER LEDGER\n\n";


    customerPayments.forEach(
        function(item) {

            message +=

                item.date +
                " | " +
                item.id +
                " | Paid: " +
                formatMoney(item.amount) +
                "\n";

        }
    );


    alert(message);

}


/* =========================================
   EXPORT
========================================= */

document
    .getElementById(
        "exportButton"
    )
    .addEventListener(
        "click",
        function() {


            let csv =

                "Payment ID,Customer ID,Customer,Application,Country,Total Fee,Payment,Remaining,Method,Date\n";


            payments.forEach(
                function(item) {


                    const remaining =
                        Number(item.totalFee) -
                        Number(item.amount);


                    csv +=

                        `"${item.id}",` +

                        `"${item.customerId}",` +

                        `"${item.customer}",` +

                        `"${item.application}",` +

                        `"${item.country}",` +

                        `"${item.totalFee}",` +

                        `"${item.amount}",` +

                        `"${remaining}",` +

                        `"${item.method}",` +

                        `"${item.date}"\n`;

                }
            );


            csv += "\n\nEXPENSES\n";


            csv +=
                "Expense ID,Category,Description,Amount,Method,Date,Added By\n";


            expenses.forEach(
                function(item) {


                    csv +=

                        `"${item.id}",` +

                        `"${item.category}",` +

                        `"${item.description}",` +

                        `"${item.amount}",` +

                        `"${item.method}",` +

                        `"${item.date}",` +

                        `"${item.addedBy}"\n`;

                }
            );


            const blob =
                new Blob(
                    [csv],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const url =
                URL.createObjectURL(
                    blob
                );


            const link =
                document.createElement(
                    "a"
                );


            link.href = url;

            link.download =
                "polaris-finance.csv";


            link.click();


            URL.revokeObjectURL(
                url
            );

        }
    );


/* =========================================
   MOBILE MENU
========================================= */

document
    .getElementById(
        "menuButton"
    )
    .addEventListener(
        "click",
        function() {

            document
                .getElementById(
                    "sidebar"
                )
                .classList.toggle(
                    "mobile-open"
                );

        }
    );


/* =========================================
   LOGOUT
========================================= */

document
    .getElementById(
        "logoutButton"
    )
    .addEventListener(
        "click",
        function() {

            alert(
                "Secure logout will be connected with Supabase Authentication."
            );

        }
    );


/* =========================================
   INITIALIZE
========================================= */

renderPayments();

renderExpenses();

renderLedger();

updateDashboard();


console.log(
    "Polaris Consultants Finance Management loaded."
);
