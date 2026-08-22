/* =========================================
   POLARIS CONSULTANTS
   APPLICATION MANAGEMENT
========================================= */


/* =========================================
   DEMO APPLICATION DATA
========================================= */

let applications = [

    {
        id: "APP-000001",
        customerId: "CUS-000001",
        customer: "Muhammad Ali",
        passport: "AB1234567",
        phone: "+92 300 1111111",
        country: "United Kingdom",
        visa: "Study",
        officer: "Asad",
        submission: "2026-08-05",
        appointment: "2026-08-20",
        decision: "",
        documents: "Complete",
        status: "Processing",
        priority: "High",
        fee: 350000,
        paid: 200000,
        notes: "Application under processing."
    },

    {
        id: "APP-000002",
        customerId: "CUS-000002",
        customer: "Ahmed Khan",
        passport: "AB2345678",
        phone: "+92 301 2222222",
        country: "Canada",
        visa: "Work",
        officer: "Bilal",
        submission: "2026-08-01",
        appointment: "2026-08-15",
        decision: "",
        documents: "Complete",
        status: "Submitted",
        priority: "Urgent",
        fee: 450000,
        paid: 300000,
        notes: "Waiting for application processing."
    },

    {
        id: "APP-000003",
        customerId: "CUS-000003",
        customer: "Usman Raza",
        passport: "AB3456789",
        phone: "+92 302 3333333",
        country: "Australia",
        visa: "Study",
        officer: "Salman",
        submission: "2026-07-10",
        appointment: "2026-07-25",
        decision: "2026-08-10",
        documents: "Complete",
        status: "Approved",
        priority: "Normal",
        fee: 500000,
        paid: 500000,
        notes: "Visa approved."
    },

    {
        id: "APP-000004",
        customerId: "CUS-000004",
        customer: "Hassan Ahmed",
        passport: "AB4567890",
        phone: "+92 303 4444444",
        country: "USA",
        visa: "Visit",
        officer: "Asad",
        submission: "",
        appointment: "",
        decision: "",
        documents: "Pending",
        status: "Documents Pending",
        priority: "Normal",
        fee: 180000,
        paid: 80000,
        notes: "Bank statement required."
    },

    {
        id: "APP-000005",
        customerId: "CUS-000005",
        customer: "Bilal Hussain",
        passport: "AB5678901",
        phone: "+92 304 5555555",
        country: "Germany",
        visa: "Study",
        officer: "Bilal",
        submission: "2026-06-12",
        appointment: "2026-06-30",
        decision: "2026-07-20",
        documents: "Complete",
        status: "Approved",
        priority: "Normal",
        fee: 400000,
        paid: 400000,
        notes: "Successfully completed."
    },

    {
        id: "APP-000006",
        customerId: "CUS-000006",
        customer: "Hamza Iqbal",
        passport: "AB6789012",
        phone: "+92 305 6666666",
        country: "UAE",
        visa: "Work",
        officer: "Asad",
        submission: "2026-08-12",
        appointment: "",
        decision: "",
        documents: "Partial",
        status: "Processing",
        priority: "High",
        fee: 280000,
        paid: 100000,
        notes: "Employment documents under review."
    },

    {
        id: "APP-000007",
        customerId: "CUS-000007",
        customer: "Saad Malik",
        passport: "AB7890123",
        phone: "+92 306 7777777",
        country: "Canada",
        visa: "Study",
        officer: "Salman",
        submission: "",
        appointment: "",
        decision: "",
        documents: "Pending",
        status: "Draft",
        priority: "Normal",
        fee: 375000,
        paid: 175000,
        notes: "Application preparation."
    },

    {
        id: "APP-000008",
        customerId: "CUS-000008",
        customer: "Adeel Shah",
        passport: "AB8901234",
        phone: "+92 307 8888888",
        country: "United Kingdom",
        visa: "Work",
        officer: "Bilal",
        submission: "2026-08-08",
        appointment: "2026-08-22",
        decision: "",
        documents: "Complete",
        status: "Processing",
        priority: "High",
        fee: 425000,
        paid: 225000,
        notes: "Case under processing."
    },

    {
        id: "APP-000009",
        customerId: "CUS-000009",
        customer: "Waqas Ahmed",
        passport: "AB9012345",
        phone: "+92 308 9999999",
        country: "Australia",
        visa: "Visit",
        officer: "Asad",
        submission: "2026-07-01",
        appointment: "2026-07-20",
        decision: "2026-08-01",
        documents: "Complete",
        status: "Rejected",
        priority: "Normal",
        fee: 160000,
        paid: 60000,
        notes: "Visa application rejected."
    },

    {
        id: "APP-000010",
        customerId: "CUS-000010",
        customer: "Fahad Khan",
        passport: "AB0123456",
        phone: "+92 309 1010101",
        country: "Germany",
        visa: "Study",
        officer: "Salman",
        submission: "2026-08-10",
        appointment: "",
        decision: "",
        documents: "Complete",
        status: "Submitted",
        priority: "Normal",
        fee: 420000,
        paid: 320000,
        notes: "Submitted successfully."
    }

];


/* =========================================
   ELEMENTS
========================================= */

const tableBody =
    document.getElementById(
        "applicationTableBody"
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

const officerFilter =
    document.getElementById(
        "officerFilter"
    );

const resultText =
    document.getElementById(
        "resultText"
    );


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

    return flags[country] || "🌍";

}


/* =========================================
   STATUS CLASS
========================================= */

function getStatusClass(status) {

    const classes = {

        "Draft":
            "status-draft",

        "Documents Pending":
            "status-documents",

        "Submitted":
            "status-submitted",

        "Processing":
            "status-processing",

        "Approved":
            "status-approved",

        "Rejected":
            "status-rejected"

    };

    return (
        classes[status] ||
        "status-draft"
    );

}


/* =========================================
   DOCUMENT CLASS
========================================= */

function getDocumentClass(status) {

    const classes = {

        "Pending":
            "document-pending",

        "Partial":
            "document-partial",

        "Complete":
            "document-complete"

    };

    return (
        classes[status] ||
        "document-pending"
    );

}


/* =========================================
   PRIORITY CLASS
========================================= */

function getPriorityClass(priority) {

    return (
        "priority-" +
        priority
            .toLowerCase()
            .replace(
                " ",
                "-"
            )
    );

}


/* =========================================
   FORMAT DATE
========================================= */

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
   RENDER APPLICATIONS
========================================= */

function renderApplications(
    data = applications
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
                    No applications found.
                </td>

            </tr>

        `;

        resultText.textContent =
            "Showing 0 applications";

        return;
    }


    data.forEach(function(application) {


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>

                <input
                    type="checkbox"
                    class="application-checkbox"
                    value="${application.id}"
                >

            </td>


            <td>

                <div class="application-cell">

                    <strong>
                        ${application.id}
                    </strong>

                    <small>
                        ${application.priority} Priority
                    </small>

                </div>

            </td>


            <td>

                <div class="customer-cell">

                    <strong>
                        ${application.customer}
                    </strong>

                    <small>
                        ${application.customerId}
                    </small>

                </div>

            </td>


            <td>

                <div class="country-cell">

                    ${getFlag(application.country)}
                    ${application.country}

                </div>

            </td>


            <td>
                ${application.visa}
            </td>


            <td>
                ${application.officer}
            </td>


            <td>
                ${formatDate(application.submission)}
            </td>


            <td>

                <span
                    class="
                        document-status
                        ${getDocumentClass(
                            application.documents
                        )}
                    "
                >
                    ${application.documents}
                </span>

            </td>


            <td>

                <span
                    class="
                        application-status
                        ${getStatusClass(
                            application.status
                        )}
                "
                >
                    ${application.status}
                </span>

            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="action-button"
                        title="View"
                        onclick="viewApplication('${application.id}')"
                    >
                        👁
                    </button>


                    <button
                        class="action-button"
                        title="Edit"
                        onclick="editApplication('${application.id}')"
                    >
                        ✎
                    </button>


                    <button
                        class="action-button"
                        title="WhatsApp"
                        onclick="openWhatsApp('${application.phone}')"
                    >
                        W
                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });


    resultText.textContent =
        `Showing ${data.length} applications`;

}


/* =========================================
   FILTER
========================================= */

function filterApplications() {


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const country =
        countryFilter.value;


    const visa =
        visaFilter.value;


    const officer =
        officerFilter.value;


    const activeStatus =
        document
            .querySelector(
                ".pipeline-item.active"
            )
            ?.dataset.status || "";


    const filtered =
        applications.filter(
            function(application) {


                const searchMatch =

                    !search ||

                    application.id
                        .toLowerCase()
                        .includes(search) ||

                    application.customer
                        .toLowerCase()
                        .includes(search) ||

                    application.passport
                        .toLowerCase()
                        .includes(search) ||

                    application.phone
                        .toLowerCase()
                        .includes(search);


                const countryMatch =

                    !country ||

                    application.country ===
                        country;


                const visaMatch =

                    !visa ||

                    application.visa ===
                        visa;


                const officerMatch =

                    !officer ||

                    application.officer ===
                        officer;


                const statusMatch =

                    !activeStatus ||

                    application.status ===
                        activeStatus;


                return (

                    searchMatch &&

                    countryMatch &&

                    visaMatch &&

                    officerMatch &&

                    statusMatch

                );

            }
        );


    renderApplications(filtered);

}


/* =========================================
   SEARCH / FILTER EVENTS
========================================= */

searchInput.addEventListener(
    "input",
    filterApplications
);


countryFilter.addEventListener(
    "change",
    filterApplications
);


visaFilter.addEventListener(
    "change",
    filterApplications
);


officerFilter.addEventListener(
    "change",
    filterApplications
);


/* =========================================
   PIPELINE
========================================= */

document
    .querySelectorAll(
        ".pipeline-item"
    )
    .forEach(
        function(button) {


            button.addEventListener(
                "click",
                function() {


                    document
                        .querySelectorAll(
                            ".pipeline-item"
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


                    filterApplications();

                }
            );

        }
    );


/* =========================================
   RESET
========================================= */

document
    .getElementById(
        "resetFilters"
    )
    .addEventListener(
        "click",
        function() {


            searchInput.value = "";

            countryFilter.value = "";

            visaFilter.value = "";

            officerFilter.value = "";


            document
                .querySelectorAll(
                    ".pipeline-item"
                )
                .forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


            document
                .querySelector(
                    '.pipeline-item[data-status=""]'
                )
                .classList.add(
                    "active"
                );


            renderApplications();

        }
    );


/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStats() {


    const total =
        applications.length;


    const processing =
        applications.filter(
            application =>
                application.status ===
                "Processing"
        ).length;


    const approved =
        applications.filter(
            application =>
                application.status ===
                "Approved"
        ).length;


    const rejected =
        applications.filter(
            application =>
                application.status ===
                "Rejected"
        ).length;


    document
        .getElementById(
            "totalApplications"
        )
        .textContent = total;


    document
        .getElementById(
            "processingApplications"
        )
        .textContent = processing;


    document
        .getElementById(
            "approvedApplications"
        )
        .textContent = approved;


    document
        .getElementById(
            "rejectedApplications"
        )
        .textContent = rejected;


    updatePipelineCounts();

}


/* =========================================
   PIPELINE COUNTS
========================================= */

function updatePipelineCounts() {


    const count = function(status) {

        if (!status) {

            return applications.length;

        }


        return applications.filter(
            application =>
                application.status ===
                status
        ).length;

    };


    document
        .getElementById("allCount")
        .textContent =
            count("");


    document
        .getElementById("draftCount")
        .textContent =
            count("Draft");


    document
        .getElementById("documentsCount")
        .textContent =
            count("Documents Pending");


    document
        .getElementById("submittedCount")
        .textContent =
            count("Submitted");


    document
        .getElementById("processingCount")
        .textContent =
            count("Processing");


    document
        .getElementById("approvedCount")
        .textContent =
            count("Approved");


    document
        .getElementById("rejectedCount")
        .textContent =
            count("Rejected");

}


/* =========================================
   MODAL
========================================= */

const modal =
    document.getElementById(
        "applicationModal"
    );


document
    .getElementById(
        "addApplicationButton"
    )
    .addEventListener(
        "click",
        function() {

            modal.classList.add(
                "show"
            );

            document.body.style.overflow =
                "hidden";

        }
    );


function closeApplicationModal() {

    modal.classList.remove(
        "show"
    );

    document.body.style.overflow =
        "";

}


document
    .getElementById(
        "closeModal"
    )
    .addEventListener(
        "click",
        closeApplicationModal
    );


document
    .getElementById(
        "cancelModal"
    )
    .addEventListener(
        "click",
        closeApplicationModal
    );


modal.addEventListener(
    "click",
    function(event) {

        if (
            event.target === modal
        ) {

            closeApplicationModal();

        }

    }
);


/* =========================================
   CREATE APPLICATION
========================================= */

document
    .getElementById(
        "applicationForm"
    )
    .addEventListener(
        "submit",
        function(event) {


            event.preventDefault();


            const newNumber =
                applications.length + 1;


            const newApplication = {

                id:
                    "APP-" +
                    String(newNumber)
                        .padStart(6,"0"),

                customerId:
                    document
                        .getElementById(
                            "customerId"
                        )
                        .value,

                customer:
                    document
                        .getElementById(
                            "customerName"
                        )
                        .value,

                passport:
                    document
                        .getElementById(
                            "passport"
                        )
                        .value,

                phone:
                    document
                        .getElementById(
                            "phone"
                        )
                        .value,

                country:
                    document
                        .getElementById(
                            "country"
                        )
                        .value,

                visa:
                    document
                        .getElementById(
                            "visa"
                        )
                        .value,

                officer:
                    document
                        .getElementById(
                            "officer"
                        )
                        .value,

                submission:
                    document
                        .getElementById(
                            "submissionDate"
                        )
                        .value,

                appointment:
                    document
                        .getElementById(
                            "appointmentDate"
                        )
                        .value,

                decision:
                    document
                        .getElementById(
                            "decisionDate"
                        )
                        .value,

                documents:
                    document
                        .getElementById(
                            "documentsStatus"
                        )
                        .value,

                status:
                    document
                        .getElementById(
                            "applicationStatus"
                        )
                        .value,

                priority:
                    document
                        .getElementById(
                            "priority"
                        )
                        .value,

                fee:
                    Number(
                        document
                            .getElementById(
                                "fee"
                            )
                            .value
                    ) || 0,

                paid:
                    Number(
                        document
                            .getElementById(
                                "paid"
                            )
                            .value
                    ) || 0,

                notes:
                    document
                        .getElementById(
                            "notes"
                        )
                        .value

            };


            applications.unshift(
                newApplication
            );


            document
                .getElementById(
                    "applicationForm"
                )
                .reset();


            closeApplicationModal();


            renderApplications();

            updateStats();


            alert(
                `Application ${newApplication.id} created successfully.`
            );

        }
    );


/* =========================================
   VIEW APPLICATION
========================================= */

function viewApplication(id) {


    const application =
        applications.find(
            item =>
                item.id === id
        );


    if (!application) {
        return;
    }


    const remaining =
        application.fee -
        application.paid;


    alert(

        "APPLICATION DETAILS\n\n" +

        "Application ID: " +
        application.id +

        "\nCustomer: " +
        application.customer +

        "\nCustomer ID: " +
        application.customerId +

        "\nCountry: " +
        application.country +

        "\nVisa: " +
        application.visa +

        "\nOfficer: " +
        application.officer +

        "\nStatus: " +
        application.status +

        "\nDocuments: " +
        application.documents +

        "\nPriority: " +
        application.priority +

        "\nSubmission: " +
        formatDate(
            application.submission
        ) +

        "\nAppointment: " +
        formatDate(
            application.appointment
        ) +

        "\nDecision: " +
        formatDate(
            application.decision
        ) +

        "\n\nFee: Rs. " +
        application.fee
            .toLocaleString() +

        "\nPaid: Rs. " +
        application.paid
            .toLocaleString() +

        "\nRemaining: Rs. " +
        remaining
            .toLocaleString()

    );

}


/* =========================================
   EDIT APPLICATION
========================================= */

function editApplication(id) {


    const application =
        applications.find(
            item =>
                item.id === id
        );


    if (!application) {
        return;
    }


    alert(
        "Application editing will be connected to the secure CRM database."
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


    if (!cleanPhone) {

        alert(
            "Customer WhatsApp number is not available."
        );

        return;
    }


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
    .getElementById(
        "selectAll"
    )
    .addEventListener(
        "change",
        function() {


            document
                .querySelectorAll(
                    ".application-checkbox"
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
    .getElementById(
        "exportButton"
    )
    .addEventListener(
        "click",
        function() {


            let csv =
                "Application ID,Customer ID,Customer,Passport,Phone,Country,Visa,Officer,Submission,Appointment,Documents,Status,Priority,Fee,Paid,Remaining\n";


            applications.forEach(
                function(application) {


                    const remaining =
                        application.fee -
                        application.paid;


                    csv +=

                        `"${application.id}",` +

                        `"${application.customerId}",` +

                        `"${application.customer}",` +

                        `"${application.passport}",` +

                        `"${application.phone}",` +

                        `"${application.country}",` +

                        `"${application.visa}",` +

                        `"${application.officer}",` +

                        `"${application.submission}",` +

                        `"${application.appointment}",` +

                        `"${application.documents}",` +

                        `"${application.status}",` +

                        `"${application.priority}",` +

                        `"${application.fee}",` +

                        `"${application.paid}",` +

                        `"${remaining}"\n`;

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
                "polaris-applications.csv";


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

renderApplications();

updateStats();


console.log(
    "Polaris Consultants Application Management loaded."
);
