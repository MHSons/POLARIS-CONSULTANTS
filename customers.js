/* =========================================
   POLARIS CONSULTANTS
   CUSTOMER MANAGEMENT
========================================= */


/* =========================================
   DEMO CUSTOMER DATA
========================================= */

let customers = [

    {
        id: "CUS-000001",
        name: "Muhammad Ali",
        father: "Muhammad Aslam",
        cnic: "35202-1234567-1",
        passport: "AB1234567",
        phone: "+92 300 1111111",
        whatsapp: "+92 300 1111111",
        email: "ali@example.com",
        country: "United Kingdom",
        visa: "Study",
        assigned: "Asad",
        applications: 1,
        totalFee: 350000,
        paid: 200000,
        status: "Active"
    },

    {
        id: "CUS-000002",
        name: "Ahmed Khan",
        father: "Rashid Khan",
        cnic: "35202-2345678-2",
        passport: "AB2345678",
        phone: "+92 301 2222222",
        whatsapp: "+92 301 2222222",
        email: "ahmed@example.com",
        country: "Canada",
        visa: "Work",
        assigned: "Bilal",
        applications: 1,
        totalFee: 450000,
        paid: 300000,
        status: "Active"
    },

    {
        id: "CUS-000003",
        name: "Usman Raza",
        father: "Raza Hussain",
        cnic: "35202-3456789-3",
        passport: "AB3456789",
        phone: "+92 302 3333333",
        whatsapp: "+92 302 3333333",
        email: "usman@example.com",
        country: "Australia",
        visa: "Study",
        assigned: "Salman",
        applications: 2,
        totalFee: 500000,
        paid: 500000,
        status: "Completed"
    },

    {
        id: "CUS-000004",
        name: "Hassan Ahmed",
        father: "Ahmed Raza",
        cnic: "35202-4567890-4",
        passport: "AB4567890",
        phone: "+92 303 4444444",
        whatsapp: "+92 303 4444444",
        email: "hassan@example.com",
        country: "USA",
        visa: "Visit",
        assigned: "Asad",
        applications: 1,
        totalFee: 180000,
        paid: 80000,
        status: "Pending"
    },

    {
        id: "CUS-000005",
        name: "Bilal Hussain",
        father: "Hussain Ahmed",
        cnic: "35202-5678901-5",
        passport: "AB5678901",
        phone: "+92 304 5555555",
        whatsapp: "+92 304 5555555",
        email: "bilal@example.com",
        country: "Germany",
        visa: "Study",
        assigned: "Bilal",
        applications: 1,
        totalFee: 400000,
        paid: 400000,
        status: "Completed"
    },

    {
        id: "CUS-000006",
        name: "Hamza Iqbal",
        father: "Iqbal Ahmed",
        cnic: "35202-6789012-6",
        passport: "AB6789012",
        phone: "+92 305 6666666",
        whatsapp: "+92 305 6666666",
        email: "hamza@example.com",
        country: "UAE",
        visa: "Work",
        assigned: "Asad",
        applications: 1,
        totalFee: 280000,
        paid: 100000,
        status: "Active"
    },

    {
        id: "CUS-000007",
        name: "Saad Malik",
        father: "Malik Ahmed",
        cnic: "35202-7890123-7",
        passport: "AB7890123",
        phone: "+92 306 7777777",
        whatsapp: "+92 306 7777777",
        email: "saad@example.com",
        country: "Canada",
        visa: "Study",
        assigned: "Salman",
        applications: 1,
        totalFee: 375000,
        paid: 175000,
        status: "Active"
    },

    {
        id: "CUS-000008",
        name: "Adeel Shah",
        father: "Shah Ahmed",
        cnic: "35202-8901234-8",
        passport: "AB8901234",
        phone: "+92 307 8888888",
        whatsapp: "+92 307 8888888",
        email: "adeel@example.com",
        country: "United Kingdom",
        visa: "Work",
        assigned: "Bilal",
        applications: 1,
        totalFee: 425000,
        paid: 225000,
        status: "Pending"
    },

    {
        id: "CUS-000009",
        name: "Waqas Ahmed",
        father: "Ahmed Khan",
        cnic: "35202-9012345-9",
        passport: "AB9012345",
        phone: "+92 308 9999999",
        whatsapp: "+92 308 9999999",
        email: "waqas@example.com",
        country: "Australia",
        visa: "Visit",
        assigned: "Asad",
        applications: 1,
        totalFee: 160000,
        paid: 60000,
        status: "Closed"
    },

    {
        id: "CUS-000010",
        name: "Fahad Khan",
        father: "Khan Muhammad",
        cnic: "35202-0123456-0",
        passport: "AB0123456",
        phone: "+92 309 1010101",
        whatsapp: "+92 309 1010101",
        email: "fahad@example.com",
        country: "Germany",
        visa: "Study",
        assigned: "Salman",
        applications: 1,
        totalFee: 420000,
        paid: 320000,
        status: "Active"
    }

];


/* =========================================
   ELEMENTS
========================================= */

const tableBody =
    document.getElementById(
        "customerTableBody"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const countryFilter =
    document.getElementById(
        "countryFilter"
    );

const visaFilter =
    document.getElementById(
        "visaFilter"
    );

const statusFilter =
    document.getElementById(
        "statusFilter"
    );

const resultText =
    document.getElementById(
        "resultText"
    );


/* =========================================
   FORMAT MONEY
========================================= */

function formatMoney(amount) {

    return (
        "Rs. " +
        Number(amount || 0)
            .toLocaleString("en-PK")
    );

}


/* =========================================
   STATUS CLASS
========================================= */

function getStatusClass(status) {

    const statusClasses = {

        "Active":
            "status-active",

        "Pending":
            "status-pending",

        "Completed":
            "status-completed",

        "Closed":
            "status-closed"

    };

    return (
        statusClasses[status] ||
        "status-pending"
    );

}


/* =========================================
   FLAG
========================================= */

function getFlag(country) {

    const flags = {

        "United Kingdom": "🇬🇧",

        "Canada": "🇨🇦",

        "Australia": "🇦🇺",

        "USA": "🇺🇸",

        "Germany": "🇩🇪",

        "UAE": "🇦🇪"

    };

    return (
        flags[country] ||
        "🌍"
    );

}


/* =========================================
   RENDER CUSTOMERS
========================================= */

function renderCustomers(
    data = customers
) {

    tableBody.innerHTML = "";


    if (!data.length) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="10"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#718096;
                    "
                >
                    No customers found.
                </td>

            </tr>

        `;

        resultText.textContent =
            "Showing 0 customers";

        return;
    }


    data.forEach(function(customer) {


        const initials =
            customer.name
                .split(" ")
                .map(
                    word =>
                        word.charAt(0)
                )
                .slice(0,2)
                .join("")
                .toUpperCase();


        const remaining =
            Math.max(
                0,
                customer.totalFee -
                customer.paid
            );


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <input
                    type="checkbox"
                    class="customer-checkbox"
                    value="${customer.id}"
                >

            </td>


            <td>

                <div class="customer-cell">

                    <div class="customer-avatar">
                        ${initials}
                    </div>

                    <div class="customer-name">

                        <strong>
                            ${customer.name}
                        </strong>

                        <small>
                            ${customer.id}
                        </small>

                    </div>

                </div>

            </td>


            <td>

                <div class="contact-cell">

                    <span>
                        ${customer.phone}
                    </span>

                    <small>
                        ${customer.email}
                    </small>

                </div>

            </td>


            <td>

                ${getFlag(customer.country)}
                ${customer.country}

            </td>


            <td>
                ${customer.visa}
            </td>


            <td>
                ${customer.assigned}
            </td>


            <td>

                <strong>
                    ${customer.applications}
                </strong>

            </td>


            <td>

                <div class="finance-cell">

                    <strong>
                        Paid:
                        ${formatMoney(customer.paid)}
                    </strong>

                    <small>
                        Due:
                        ${formatMoney(remaining)}
                    </small>

                </div>

            </td>


            <td>

                <span
                    class="
                        customer-status
                        ${getStatusClass(customer.status)}
                    "
                >
                    ${customer.status}
                </span>

            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="action-button"
                        title="View"
                        onclick="viewCustomer('${customer.id}')"
                    >
                        👁
                    </button>

                    <button
                        class="action-button"
                        title="Edit"
                        onclick="editCustomer('${customer.id}')"
                    >
                        ✎
                    </button>

                    <button
                        class="action-button"
                        title="WhatsApp"
                        onclick="openWhatsApp('${customer.whatsapp}')"
                    >
                        W
                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });


    resultText.textContent =
        `Showing ${data.length} customers`;

}


/* =========================================
   FILTER CUSTOMERS
========================================= */

function filterCustomers() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const country =
        countryFilter.value;


    const visa =
        visaFilter.value;


    const status =
        statusFilter.value;


    const filtered =
        customers.filter(
            function(customer) {


                const searchMatch =

                    !search ||

                    customer.id
                        .toLowerCase()
                        .includes(search) ||

                    customer.name
                        .toLowerCase()
                        .includes(search) ||

                    customer.cnic
                        .toLowerCase()
                        .includes(search) ||

                    customer.passport
                        .toLowerCase()
                        .includes(search) ||

                    customer.phone
                        .toLowerCase()
                        .includes(search);


                const countryMatch =

                    !country ||

                    customer.country ===
                        country;


                const visaMatch =

                    !visa ||

                    customer.visa ===
                        visa;


                const statusMatch =

                    !status ||

                    customer.status ===
                        status;


                return (

                    searchMatch &&

                    countryMatch &&

                    visaMatch &&

                    statusMatch

                );

            }
        );


    renderCustomers(filtered);

}


/* =========================================
   FILTER EVENTS
========================================= */

searchInput.addEventListener(
    "input",
    filterCustomers
);


countryFilter.addEventListener(
    "change",
    filterCustomers
);


visaFilter.addEventListener(
    "change",
    filterCustomers
);


statusFilter.addEventListener(
    "change",
    filterCustomers
);


/* =========================================
   RESET
========================================= */

document
    .getElementById("resetFilters")
    .addEventListener(
        "click",
        function() {


            searchInput.value = "";

            countryFilter.value = "";

            visaFilter.value = "";

            statusFilter.value = "";


            renderCustomers();

        }
    );


/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStats() {


    const total =
        customers.length;


    const active =
        customers.filter(
            customer =>
                customer.status ===
                "Active"
        ).length;


    const applications =
        customers.reduce(
            (
                total,
                customer
            ) =>
                total +
                customer.applications,
            0
        );


    const receivable =
        customers.reduce(
            (
                total,
                customer
            ) =>
                total +
                Math.max(
                    0,
                    customer.totalFee -
                    customer.paid
                ),
            0
        );


    document
        .getElementById(
            "totalCustomers"
        )
        .textContent = total;


    document
        .getElementById(
            "activeCustomers"
        )
        .textContent = active;


    document
        .getElementById(
            "totalApplications"
        )
        .textContent = applications;


    document
        .getElementById(
            "totalReceivable"
        )
        .textContent =
            formatMoney(receivable);

}


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById(
        "customerModal"
    );


const addCustomerButton =
    document.getElementById(
        "addCustomerButton"
    );


const closeModal =
    document.getElementById(
        "closeModal"
    );


const cancelModal =
    document.getElementById(
        "cancelModal"
    );


function openCustomerModal() {

    modal.classList.add(
        "show"
    );

    document.body.style.overflow =
        "hidden";

}


function closeCustomerModal() {

    modal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


addCustomerButton.addEventListener(
    "click",
    openCustomerModal
);


closeModal.addEventListener(
    "click",
    closeCustomerModal
);


cancelModal.addEventListener(
    "click",
    closeCustomerModal
);


modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeCustomerModal();

        }

    }
);


/* =========================================
   ADD CUSTOMER
========================================= */

document
    .getElementById("customerForm")
    .addEventListener(
        "submit",
        function(event) {


            event.preventDefault();


            const totalFee =
                Number(
                    document
                        .getElementById(
                            "totalFee"
                        )
                        .value
                ) || 0;


            const paidAmount =
                Number(
                    document
                        .getElementById(
                            "paidAmount"
                        )
                        .value
                ) || 0;


            const newNumber =
                customers.length + 1;


            const customer = {

                id:
                    "CUS-" +
                    String(newNumber)
                        .padStart(6,"0"),

                name:
                    document
                        .getElementById(
                            "customerName"
                        )
                        .value,

                father:
                    document
                        .getElementById(
                            "fatherName"
                        )
                        .value,

                cnic:
                    document
                        .getElementById(
                            "customerCnic"
                        )
                        .value,

                passport:
                    document
                        .getElementById(
                            "customerPassport"
                        )
                        .value,

                phone:
                    document
                        .getElementById(
                            "customerPhone"
                        )
                        .value,

                whatsapp:
                    document
                        .getElementById(
                            "customerWhatsapp"
                        )
                        .value,

                email:
                    document
                        .getElementById(
                            "customerEmail"
                        )
                        .value,

                country:
                    document
                        .getElementById(
                            "customerCountry"
                        )
                        .value,

                visa:
                    document
                        .getElementById(
                            "customerVisa"
                        )
                        .value,

                assigned:
                    document
                        .getElementById(
                            "assigned"
                        )
                        .value,

                applications: 0,

                totalFee:
                    totalFee,

                paid:
                    paidAmount,

                status:
                    document
                        .getElementById(
                            "customerStatus"
                        )
                        .value

            };


            customers.unshift(
                customer
            );


            document
                .getElementById(
                    "customerForm"
                )
                .reset();


            closeCustomerModal();


            renderCustomers();

            updateStats();


            alert(
                `Customer ${customer.id} created successfully.`
            );

        }
    );


/* =========================================
   VIEW CUSTOMER
========================================= */

function viewCustomer(id) {


    const customer =
        customers.find(
            item =>
                item.id === id
        );


    if (!customer) {
        return;
    }


    const remaining =
        customer.totalFee -
        customer.paid;


    alert(

        "CUSTOMER PROFILE\n\n" +

        "Customer ID: " +
        customer.id +

        "\nName: " +
        customer.name +

        "\nPhone: " +
        customer.phone +

        "\nCountry: " +
        customer.country +

        "\nVisa: " +
        customer.visa +

        "\nAssigned: " +
        customer.assigned +

        "\nStatus: " +
        customer.status +

        "\n\nTotal Fee: " +
        formatMoney(
            customer.totalFee
        ) +

        "\nPaid: " +
        formatMoney(
            customer.paid
        ) +

        "\nRemaining: " +
        formatMoney(
            remaining
        )

    );

}


/* =========================================
   EDIT
========================================= */

function editCustomer(id) {


    const customer =
        customers.find(
            item =>
                item.id === id
        );


    if (!customer) {
        return;
    }


    alert(
        "Customer editing will be connected to the secure CRM database."
    );

}


/* =========================================
   WHATSAPP
========================================= */

function openWhatsApp(phone) {


    const cleanPhone =
        phone.replace(
            /[^0-9]/g,
            ""
        );


    window.open(
        "https://wa.me/" +
        cleanPhone,
        "_blank"
    );

}


/* =========================================
   SELECT ALL
========================================= */

document
    .getElementById("selectAll")
    .addEventListener(
        "change",
        function() {


            document
                .querySelectorAll(
                    ".customer-checkbox"
                )
                .forEach(
                    function(checkbox) {

                        checkbox.checked =
                            this.checked;

                    },
                    this
                );

        }
    );


/* =========================================
   EXPORT CSV
========================================= */

document
    .getElementById("exportButton")
    .addEventListener(
        "click",
        function() {


            let csv =
                "Customer ID,Name,Phone,Country,Visa,Assigned,Applications,Total Fee,Paid,Remaining,Status\n";


            customers.forEach(
                function(customer) {


                    const remaining =
                        customer.totalFee -
                        customer.paid;


                    csv +=

                        `"${customer.id}",` +

                        `"${customer.name}",` +

                        `"${customer.phone}",` +

                        `"${customer.country}",` +

                        `"${customer.visa}",` +

                        `"${customer.assigned}",` +

                        `"${customer.applications}",` +

                        `"${customer.totalFee}",` +

                        `"${customer.paid}",` +

                        `"${remaining}",` +

                        `"${customer.status}"\n`;

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
                "polaris-customers.csv";


            link.click();


            URL.revokeObjectURL(
                url
            );

        }
    );


/* =========================================
   MOBILE SIDEBAR
========================================= */

const menuButton =
    document.getElementById(
        "menuButton"
    );


const sidebar =
    document.getElementById(
        "sidebar"
    );


menuButton.addEventListener(
    "click",
    function() {

        sidebar.classList.toggle(
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
   INITIAL LOAD
========================================= */

renderCustomers();

updateStats();


console.log(
    "Polaris Consultants Customer Management loaded."
);
