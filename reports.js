/* =========================================================
   POLARIS CONSULTANTS
   REPORTS & ANALYTICS
   FRONTEND DEMO VERSION
========================================================= */


/* =========================================================
   DEMO DATA
========================================================= */

const reportData = {

    leads: [

        {
            id: "POL-000001",
            country: "United Kingdom",
            visa: "Study Visa",
            employee: "Ayesha Malik",
            status: "Converted",
            date: "2026-08-02"
        },

        {
            id: "POL-000002",
            country: "Canada",
            visa: "Study Visa",
            employee: "Bilal Ahmed",
            status: "Counselling",
            date: "2026-08-05"
        },

        {
            id: "POL-000003",
            country: "Australia",
            visa: "Study Visa",
            employee: "Ayesha Malik",
            status: "Converted",
            date: "2026-08-07"
        },

        {
            id: "POL-000004",
            country: "USA",
            visa: "Visit Visa",
            employee: "Hamza Khan",
            status: "Contacted",
            date: "2026-08-08"
        },

        {
            id: "POL-000005",
            country: "Germany",
            visa: "Study Visa",
            employee: "Bilal Ahmed",
            status: "Converted",
            date: "2026-08-10"
        },

        {
            id: "POL-000006",
            country: "UAE",
            visa: "Work Visa",
            employee: "Hamza Khan",
            status: "Counselling",
            date: "2026-08-12"
        },

        {
            id: "POL-000007",
            country: "Canada",
            visa: "Study Visa",
            employee: "Ayesha Malik",
            status: "Converted",
            date: "2026-08-13"
        },

        {
            id: "POL-000008",
            country: "Turkey",
            visa: "Study Visa",
            employee: "Bilal Ahmed",
            status: "New",
            date: "2026-08-15"
        },

        {
            id: "POL-000009",
            country: "United Kingdom",
            visa: "Work Visa",
            employee: "Hamza Khan",
            status: "Converted",
            date: "2026-08-18"
        },

        {
            id: "POL-000010",
            country: "Australia",
            visa: "Study Visa",
            employee: "Ayesha Malik",
            status: "Converted",
            date: "2026-08-20"
        }

    ],


    applications: [

        {
            id: "APP-000001",
            customer: "Ali Raza",
            country: "United Kingdom",
            visa: "Study Visa",
            officer: "Ayesha Malik",
            status: "Processing",
            fee: 450000,
            paid: 150000,
            date: "2026-08-02"
        },

        {
            id: "APP-000002",
            customer: "Ahmed Khan",
            country: "Canada",
            visa: "Study Visa",
            officer: "Bilal Ahmed",
            status: "Approved",
            fee: 520000,
            paid: 520000,
            date: "2026-08-03"
        },

        {
            id: "APP-000003",
            customer: "Usman Ali",
            country: "Australia",
            visa: "Study Visa",
            officer: "Ayesha Malik",
            status: "Submitted",
            fee: 600000,
            paid: 250000,
            date: "2026-08-05"
        },

        {
            id: "APP-000004",
            customer: "Hassan Ahmed",
            country: "USA",
            visa: "Visit Visa",
            officer: "Hamza Khan",
            status: "Documents Pending",
            fee: 300000,
            paid: 100000,
            date: "2026-08-07"
        },

        {
            id: "APP-000005",
            customer: "Bilal Hussain",
            country: "Germany",
            visa: "Study Visa",
            officer: "Bilal Ahmed",
            status: "Approved",
            fee: 480000,
            paid: 480000,
            date: "2026-08-09"
        },

        {
            id: "APP-000006",
            customer: "Hamza Tariq",
            country: "UAE",
            visa: "Work Visa",
            officer: "Hamza Khan",
            status: "Processing",
            fee: 350000,
            paid: 175000,
            date: "2026-08-11"
        },

        {
            id: "APP-000007",
            customer: "Saad Malik",
            country: "Turkey",
            visa: "Study Visa",
            officer: "Ayesha Malik",
            status: "Submitted",
            fee: 250000,
            paid: 125000,
            date: "2026-08-12"
        },

        {
            id: "APP-000008",
            customer: "Usman Sheikh",
            country: "Canada",
            visa: "Study Visa",
            officer: "Bilal Ahmed",
            status: "Rejected",
            fee: 400000,
            paid: 200000,
            date: "2026-08-13"
        },

        {
            id: "APP-000009",
            customer: "Fahad Ali",
            country: "United Kingdom",
            visa: "Work Visa",
            officer: "Hamza Khan",
            status: "Approved",
            fee: 420000,
            paid: 420000,
            date: "2026-08-15"
        },

        {
            id: "APP-000010",
            customer: "Zain Ahmed",
            country: "Australia",
            visa: "Study Visa",
            officer: "Ayesha Malik",
            status: "Draft",
            fee: 500000,
            paid: 50000,
            date: "2026-08-18"
        }

    ],


    payments: [

        {
            id: "PAY-000001",
            customer: "Ali Raza",
            country: "United Kingdom",
            visa: "Study Visa",
            amount: 150000,
            date: "2026-08-02"
        },

        {
            id: "PAY-000002",
            customer: "Ahmed Khan",
            country: "Canada",
            visa: "Study Visa",
            amount: 200000,
            date: "2026-08-03"
        },

        {
            id: "PAY-000003",
            customer: "Usman Ali",
            country: "Australia",
            visa: "Study Visa",
            amount: 250000,
            date: "2026-08-05"
        },

        {
            id: "PAY-000004",
            customer: "Hassan Ahmed",
            country: "USA",
            visa: "Visit Visa",
            amount: 100000,
            date: "2026-08-07"
        },

        {
            id: "PAY-000005",
            customer: "Bilal Hussain",
            country: "Germany",
            visa: "Study Visa",
            amount: 480000,
            date: "2026-08-09"
        },

        {
            id: "PAY-000006",
            customer: "Hamza Tariq",
            country: "UAE",
            visa: "Work Visa",
            amount: 175000,
            date: "2026-08-11"
        },

        {
            id: "PAY-000007",
            customer: "Saad Malik",
            country: "Turkey",
            visa: "Study Visa",
            amount: 125000,
            date: "2026-08-12"
        },

        {
            id: "PAY-000008",
            customer: "Usman Sheikh",
            country: "Canada",
            visa: "Study Visa",
            amount: 200000,
            date: "2026-08-13"
        },

        {
            id: "PAY-000009",
            customer: "Fahad Ali",
            country: "United Kingdom",
            visa: "Work Visa",
            amount: 420000,
            date: "2026-08-15"
        },

        {
            id: "PAY-000010",
            customer: "Zain Ahmed",
            country: "Australia",
            visa: "Study Visa",
            amount: 50000,
            date: "2026-08-18"
        }

    ],


    expenses: [

        {
            id: "EXP-000001",
            category: "Rent",
            amount: 85000,
            date: "2026-08-01"
        },

        {
            id: "EXP-000002",
            category: "Salaries",
            amount: 240000,
            date: "2026-08-05"
        },

        {
            id: "EXP-000003",
            category: "Marketing",
            amount: 75000,
            date: "2026-08-07"
        },

        {
            id: "EXP-000004",
            category: "Internet",
            amount: 12000,
            date: "2026-08-09"
        },

        {
            id: "EXP-000005",
            category: "Courier",
            amount: 18000,
            date: "2026-08-12"
        },

        {
            id: "EXP-000006",
            category: "Office Supplies",
            amount: 22000,
            date: "2026-08-15"
        }

    ],


    monthly: [

        {
            month: "Jan",
            income: 1250000,
            expense: 480000
        },

        {
            month: "Feb",
            income: 1480000,
            expense: 520000
        },

        {
            month: "Mar",
            income: 1620000,
            expense: 590000
        },

        {
            month: "Apr",
            income: 1790000,
            expense: 640000
        },

        {
            month: "May",
            income: 1950000,
            expense: 710000
        },

        {
            month: "Jun",
            income: 2180000,
            expense: 780000
        },

        {
            month: "Jul",
            income: 2310000,
            expense: 820000
        },

        {
            month: "Aug",
            income: 1850000,
            expense: 452000
        }

    ]

};


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    setupDateFields();

    changeReportPeriod();

    renderReports();

    updateGeneratedDate();

});


/* =========================================================
   FORMAT CURRENCY
========================================================= */

function formatCurrency(amount) {

    return "PKR " +
        Number(amount || 0).toLocaleString("en-PK");

}


/* =========================================================
   FORMAT DATE
========================================================= */

function parseDate(date) {

    return new Date(date + "T00:00:00");

}


/* =========================================================
   SETUP DATE FIELDS
========================================================= */

function setupDateFields() {

    const today =
        new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1).padStart(2, "0");

    const day =
        String(today.getDate()).padStart(2, "0");


    document.getElementById("dateTo").value =
        `${year}-${month}-${day}`;


    document.getElementById("dateFrom").value =
        `${year}-${month}-01`;

}


/* =========================================================
   CHANGE REPORT PERIOD
========================================================= */

function changeReportPeriod() {

    const period =
        document.getElementById("periodFilter").value;


    const from =
        document.getElementById("customDateFields");

    const to =
        document.getElementById("customDateFields2");


    if (period === "custom") {

        from.style.display = "flex";
        to.style.display = "flex";

    } else {

        from.style.display = "none";
        to.style.display = "none";

    }


    renderReports();

}


/* =========================================================
   GET DATE RANGE
========================================================= */

function getDateRange() {

    const period =
        document.getElementById("periodFilter").value;


    const now =
        new Date();


    let from;
    let to;


    if (period === "thisMonth") {

        from =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );

        to =
            new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0
            );

    }


    else if (period === "lastMonth") {

        from =
            new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                1
            );

        to =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0
            );

    }


    else if (period === "thisYear") {

        from =
            new Date(
                now.getFullYear(),
                0,
                1
            );

        to =
            new Date(
                now.getFullYear(),
                11,
                31
            );

    }


    else if (period === "custom") {

        const fromValue =
            document.getElementById("dateFrom").value;

        const toValue =
            document.getElementById("dateTo").value;


        from =
            fromValue
                ? new Date(fromValue + "T00:00:00")
                : new Date(2000, 0, 1);


        to =
            toValue
                ? new Date(toValue + "T23:59:59")
                : new Date(2100, 0, 1);

    }


    else {

        from =
            new Date(2000, 0, 1);

        to =
            new Date(2100, 0, 1);

    }


    return {
        from,
        to
    };

}


/* =========================================================
   FILTER DATA
========================================================= */

function filterData(data) {

    const range =
        getDateRange();


    const country =
        document.getElementById("countryFilter").value;


    const visa =
        document.getElementById("visaFilter").value;


    return data.filter(function (item) {

        const itemDate =
            parseDate(item.date);


        const dateMatch =
            itemDate >= range.from &&
            itemDate <= range.to;


        const countryMatch =
            !country ||
            item.country === country;


        const visaMatch =
            !visa ||
            item.visa === visa;


        return (
            dateMatch &&
            countryMatch &&
            visaMatch
        );

    });

}


/* =========================================================
   RENDER ALL REPORTS
========================================================= */

function renderReports() {

    const leads =
        filterData(reportData.leads);

    const applications =
        filterData(reportData.applications);

    const payments =
        filterData(reportData.payments);

    const expenses =
        filterData(reportData.expenses);


    const income =
        payments.reduce(
            (sum, item) =>
                sum + Number(item.amount || 0),
            0
        );


    const expenseTotal =
        expenses.reduce(
            (sum, item) =>
                sum + Number(item.amount || 0),
            0
        );


    const contractValue =
        applications.reduce(
            (sum, item) =>
                sum + Number(item.fee || 0),
            0
        );


    const paidFromApplications =
        applications.reduce(
            (sum, item) =>
                sum + Number(item.paid || 0),
            0
        );


    const outstanding =
        Math.max(
            contractValue - paidFromApplications,
            0
        );


    const profit =
        income - expenseTotal;


    const margin =
        income > 0
            ? (profit / income) * 100
            : 0;


    updateKPI(
        income,
        expenseTotal,
        profit,
        outstanding,
        margin
    );


    updateApplicationStats(
        leads,
        applications
    );


    renderMonthlyChart();

    renderStatusChart(applications);

    renderCountryChart(
        leads,
        applications
    );

    renderVisaChart(
        leads,
        applications
    );

    renderTopCustomers(applications);

    renderTeamPerformance(
        leads,
        applications
    );

    renderApplicationStatus(
        applications
    );

}


/* =========================================================
   UPDATE KPI
========================================================= */

function updateKPI(
    income,
    expenses,
    profit,
    outstanding,
    margin
) {

    document.getElementById("totalIncome")
        .textContent =
        formatCurrency(income);


    document.getElementById("totalExpenses")
        .textContent =
        formatCurrency(expenses);


    document.getElementById("netProfit")
        .textContent =
        formatCurrency(profit);


    document.getElementById("outstanding")
        .textContent =
        formatCurrency(outstanding);


    document.getElementById("profitMargin")
        .textContent =
        margin.toFixed(1) + "% margin";


    document.getElementById("incomeChange")
        .textContent =
        "Collected payments";


    document.getElementById("expenseChange")
        .textContent =
        "Recorded expenses";

}


/* =========================================================
   APPLICATION STATS
========================================================= */

function updateApplicationStats(
    leads,
    applications
) {

    const approved =
        applications.filter(
            item => item.status === "Approved"
        ).length;


    const rejected =
        applications.filter(
            item => item.status === "Rejected"
        ).length;


    const processing =
        applications.filter(
            item =>
                item.status === "Processing" ||
                item.status === "Submitted"
        ).length;


    const converted =
        leads.filter(
            item =>
                item.status === "Converted"
        ).length;


    const conversion =
        leads.length > 0
            ? (converted / leads.length) * 100
            : 0;


    document.getElementById("totalLeads")
        .textContent =
        leads.length;


    document.getElementById("totalApplications")
        .textContent =
        applications.length;


    document.getElementById("approvedApplications")
        .textContent =
        approved;


    document.getElementById("rejectedApplications")
        .textContent =
        rejected;


    document.getElementById("processingApplications")
        .textContent =
        processing;


    document.getElementById("conversionRate")
        .textContent =
        conversion.toFixed(1) + "%";

}


/* =========================================================
   MONTHLY CHART
========================================================= */

function renderMonthlyChart() {

    const container =
        document.getElementById("monthlyChart");


    const maxValue =
        Math.max(
            ...reportData.monthly.flatMap(
                item => [
                    item.income,
                    item.expense,
                    item.income - item.expense
                ]
            )
        );


    container.innerHTML = reportData.monthly
        .map(function (item) {

            const profit =
                item.income - item.expense;


            const incomeHeight =
                (item.income / maxValue) * 85;


            const expenseHeight =
                (item.expense / maxValue) * 85;


            const profitHeight =
                (profit / maxValue) * 85;


            return `

                <div class="month-group">

                    <div
                        class="bar income"
                        style="height:${incomeHeight}%"
                        title="Income: ${formatCurrency(item.income)}"
                    ></div>

                    <div
                        class="bar expense"
                        style="height:${expenseHeight}%"
                        title="Expenses: ${formatCurrency(item.expense)}"
                    ></div>

                    <div
                        class="bar profit"
                        style="height:${profitHeight}%"
                        title="Profit: ${formatCurrency(profit)}"
                    ></div>

                    <span class="month-label">
                        ${item.month}
                    </span>

                </div>

            `;

        })
        .join("");


    const chartArea =
        container.parentElement;


    if (!chartArea.querySelector(".chart-legend")) {

        chartArea.insertAdjacentHTML(
            "afterend",

            `

            <div class="chart-legend">

                <div class="legend-item">

                    <span class="legend-dot income"></span>

                    Income

                </div>

                <div class="legend-item">

                    <span class="legend-dot expense"></span>

                    Expenses

                </div>

                <div class="legend-item">

                    <span class="legend-dot profit"></span>

                    Profit

                </div>

            </div>

            `
        );

    }

}


/* =========================================================
   STATUS CHART
========================================================= */

function renderStatusChart(applications) {

    const statuses = [

        {
            name: "Processing",
            color: "#0b1f3a"
        },

        {
            name: "Submitted",
            color: "#c9a227"
        },

        {
            name: "Approved",
            color: "#16834b"
        },

        {
            name: "Other",
            color: "#cfd5dd"
        }

    ];


    const processing =
        applications.filter(
            item => item.status === "Processing"
        ).length;


    const submitted =
        applications.filter(
            item => item.status === "Submitted"
        ).length;


    const approved =
        applications.filter(
            item => item.status === "Approved"
        ).length;


    const other =
        Math.max(
            applications.length -
            processing -
            submitted -
            approved,
            0
        );


    const values = [
        processing,
        submitted,
        approved,
        other
    ];


    const total =
        applications.length;


    let start = 0;


    const gradientParts =
        values.map(function (value, index) {

            const degrees =
                total > 0
                    ? (value / total) * 360
                    : 0;


            const end =
                start + degrees;


            const part =
                `${statuses[index].color} ${start}deg ${end}deg`;


            start = end;

            return part;

        });


    const chart =
        document.getElementById("statusChart");


    chart.style.background =
        `conic-gradient(${gradientParts.join(",")})`;


    chart.innerHTML = `

        <div class="donut-inner">

            <strong>
                ${total}
            </strong>

            <span>
                Applications
            </span>

        </div>

    `;


    document.getElementById("statusLegend")
        .innerHTML = statuses
        .map(function (status, index) {

            return `

                <div class="status-legend">

                    <div class="status-name">

                        <span
                            class="status-dot"
                            style="background:${status.color}"
                        ></span>

                        ${status.name}

                    </div>

                    <strong>
                        ${values[index]}
                    </strong>

                </div>

            `;

        })
        .join("");

}


/* =========================================================
   COUNTRY CHART
========================================================= */

function renderCountryChart(
    leads,
    applications
) {

    const countries = [

        "United Kingdom",
        "Canada",
        "Australia",
        "USA",
        "Germany",
        "UAE",
        "Turkey"

    ];


    const values =
        countries.map(function (country) {

            const leadCount =
                leads.filter(
                    item => item.country === country
                ).length;


            const applicationCount =
                applications.filter(
                    item => item.country === country
                ).length;


            return {

                country,

                value:
                    leadCount +
                    applicationCount

            };

        });


    const max =
        Math.max(
            ...values.map(item => item.value),
            1
        );


    document.getElementById("countryChart")
        .innerHTML =
        values.map(function (item) {

            const width =
                (item.value / max) * 100;


            return `

                <div class="horizontal-row">

                    <div class="horizontal-head">

                        <span>
                            ${item.country}
                        </span>

                        <strong>
                            ${item.value}
                        </strong>

                    </div>

                    <div class="progress-track">

                        <div
                            class="progress-fill"
                            style="width:${width}%"
                        ></div>

                    </div>

                </div>

            `;

        })
        .join("");

}


/* =========================================================
   VISA CHART
========================================================= */

function renderVisaChart(
    leads,
    applications
) {

    const visas = [

        "Study Visa",
        "Work Visa",
        "Visit Visa"

    ];


    const values =
        visas.map(function (visa) {

            const leadCount =
                leads.filter(
                    item => item.visa === visa
                ).length;


            const applicationCount =
                applications.filter(
                    item => item.visa === visa
                ).length;


            return {

                visa,

                value:
                    leadCount +
                    applicationCount

            };

        });


    const max =
        Math.max(
            ...values.map(item => item.value),
            1
        );


    document.getElementById("visaChart")
        .innerHTML =
        values.map(function (item) {

            const width =
                (item.value / max) * 100;


            return `

                <div class="horizontal-row">

                    <div class="horizontal-head">

                        <span>
                            ${item.visa}
                        </span>

                        <strong>
                            ${item.value}
                        </strong>

                    </div>

                    <div class="progress-track">

                        <div
                            class="progress-fill"
                            style="width:${width}%"
                        ></div>

                    </div>

                </div>

            `;

        })
        .join("");

}


/* =========================================================
   TOP CUSTOMERS
========================================================= */

function renderTopCustomers(applications) {

    const customerMap = {};


    applications.forEach(function (application) {

        if (!customerMap[application.customer]) {

            customerMap[application.customer] = {

                customer:
                    application.customer,

                country:
                    application.country,

                fee: 0,

                paid: 0

            };

        }


        customerMap[application.customer].fee +=
            Number(application.fee || 0);


        customerMap[application.customer].paid +=
            Number(application.paid || 0);

    });


    const customers =
        Object.values(customerMap)
            .sort(
                (a, b) =>
                    b.paid - a.paid
            )
            .slice(0, 6);


    const tbody =
        document.getElementById(
            "topCustomersTable"
        );


    if (!customers.length) {

        tbody.innerHTML = `
            <tr>
                <td colspan="4">
                    No customer data.
                </td>
            </tr>
        `;

        return;
    }


    tbody.innerHTML =
        customers.map(function (customer) {

            return `

                <tr>

                    <td class="customer-name">
                        ${escapeHtml(customer.customer)}
                    </td>

                    <td>
                        ${escapeHtml(customer.country)}
                    </td>

                    <td class="money">
                        ${formatCurrency(customer.fee)}
                    </td>

                    <td class="money">
                        ${formatCurrency(customer.paid)}
                    </td>

                </tr>

            `;

        }).join("");

}


/* =========================================================
   TEAM PERFORMANCE
========================================================= */

function renderTeamPerformance(
    leads,
    applications
) {

    const employees = [

        "Ayesha Malik",
        "Bilal Ahmed",
        "Hamza Khan"

    ];


    const tbody =
        document.getElementById(
            "teamTable"
        );


    tbody.innerHTML =
        employees.map(function (employee) {

            const employeeLeads =
                leads.filter(
                    item =>
                        item.employee === employee
                ).length;


            const employeeApplications =
                applications.filter(
                    item =>
                        item.officer === employee
                );


            const approved =
                employeeApplications.filter(
                    item =>
                        item.status === "Approved"
                ).length;


            return `

                <tr>

                    <td class="customer-name">
                        ${employee}
                    </td>

                    <td>
                        ${employeeLeads}
                    </td>

                    <td>
                        ${employeeApplications.length}
                    </td>

                    <td>
                        ${approved}
                    </td>

                </tr>

            `;

        }).join("");

}


/* =========================================================
   APPLICATION STATUS
========================================================= */

function renderApplicationStatus(
    applications
) {

    const statuses = {

        Draft: 0,

        "Documents Pending": 0,

        Submitted: 0,

        Processing: 0,

        Approved: 0,

        Rejected: 0

    };


    applications.forEach(function (application) {

        if (
            Object.prototype.hasOwnProperty.call(
                statuses,
                application.status
            )
        ) {

            statuses[application.status]++;

        }

    });


    document.getElementById("draftCount")
        .textContent =
        statuses.Draft;


    document.getElementById("documentsPendingCount")
        .textContent =
        statuses["Documents Pending"];


    document.getElementById("submittedCount")
        .textContent =
        statuses.Submitted;


    document.getElementById("processingCount")
        .textContent =
        statuses.Processing;


    document.getElementById("approvedCount")
        .textContent =
        statuses.Approved;


    document.getElementById("rejectedCount")
        .textContent =
        statuses.Rejected;

}


/* =========================================================
   RESET FILTERS
========================================================= */

function resetReportFilters() {

    document.getElementById("periodFilter").value =
        "thisMonth";


    document.getElementById("countryFilter").value =
        "";


    document.getElementById("visaFilter").value =
        "";


    setupDateFields();

    changeReportPeriod();

}


/* =========================================================
   EXPORT CSV
========================================================= */

function exportReportCSV() {

    const applications =
        filterData(reportData.applications);

    const payments =
        filterData(reportData.payments);

    const expenses =
        filterData(reportData.expenses);


    const income =
        payments.reduce(
            (sum, item) =>
                sum + Number(item.amount || 0),
            0
        );


    const expenseTotal =
        expenses.reduce(
            (sum, item) =>
                sum + Number(item.amount || 0),
            0
        );


    const profit =
        income - expenseTotal;


    const outstanding =
        applications.reduce(
            (sum, item) =>
                sum +
                Math.max(
                    Number(item.fee || 0) -
                    Number(item.paid || 0),
                    0
                ),
            0
        );


    const rows = [

        [
            "Metric",
            "Value"
        ],

        [
            "Total Income",
            income
        ],

        [
            "Total Expenses",
            expenseTotal
        ],

        [
            "Net Profit",
            profit
        ],

        [
            "Outstanding",
            outstanding
        ],

        [
            "Total Leads",
            filterData(reportData.leads).length
        ],

        [
            "Applications",
            applications.length
        ],

        [
            "Approved",
            applications.filter(
                item =>
                    item.status === "Approved"
            ).length
        ],

        [
            "Rejected",
            applications.filter(
                item =>
                    item.status === "Rejected"
            ).length
        ]

    ];


    let csv =
        rows
            .map(
                row =>
                    row.map(csvEscape).join(",")
            )
            .join("\n");


    const blob =
        new Blob(
            [csv],
            {
                type:
                    "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "polaris-business-report.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}


/* =========================================================
   CSV ESCAPE
========================================================= */

function csvEscape(value) {

    return '"' +
        String(value ?? "")
            .replace(/"/g, '""') +
        '"';

}


/* =========================================================
   PRINT REPORT
========================================================= */

function printReport() {

    window.print();

}


/* =========================================================
   GENERATED DATE
========================================================= */

function updateGeneratedDate() {

    const now =
        new Date();


    document.getElementById(
        "reportGenerated"
    ).textContent =
        "Report generated: " +
        now.toLocaleString("en-GB");

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function toggleSidebar() {

    document
        .querySelector(".sidebar")
        .classList.toggle("open");

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    const confirmLogout =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmLogout) {
        return;
    }


    alert(
        "Authentication will be connected with Supabase in the security/authentication stage."
    );

}


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
