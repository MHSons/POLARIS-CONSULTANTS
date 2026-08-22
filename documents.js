/* =========================================
   POLARIS CONSULTANTS
   DOCUMENT MANAGEMENT
========================================= */


/* =========================================
   DEMO DOCUMENT DATA
========================================= */

let documents = [

    {
        id: "DOC-000001",
        customerId: "CUS-000001",
        customer: "Muhammad Ali",
        application: "APP-000001",
        passport: "AB1234567",
        country: "United Kingdom",
        type: "Passport",
        uploaded: "2026-08-05",
        expiry: "2030-04-12",
        status: "Verified",
        file: "passport.pdf",
        notes: "Passport verified."
    },

    {
        id: "DOC-000002",
        customerId: "CUS-000001",
        customer: "Muhammad Ali",
        application: "APP-000001",
        passport: "AB1234567",
        country: "United Kingdom",
        type: "Educational",
        uploaded: "2026-08-06",
        expiry: "",
        status: "Verified",
        file: "education.pdf",
        notes: "Educational documents verified."
    },

    {
        id: "DOC-000003",
        customerId: "CUS-000002",
        customer: "Ahmed Khan",
        application: "APP-000002",
        passport: "AB2345678",
        country: "Canada",
        type: "Bank Statement",
        uploaded: "2026-08-02",
        expiry: "2026-09-01",
        status: "Received",
        file: "bank-statement.pdf",
        notes: "Awaiting officer verification."
    },

    {
        id: "DOC-000004",
        customerId: "CUS-000003",
        customer: "Usman Raza",
        application: "APP-000003",
        passport: "AB3456789",
        country: "Australia",
        type: "Admission Letter",
        uploaded: "2026-07-05",
        expiry: "",
        status: "Verified",
        file: "admission-letter.pdf",
        notes: "University admission letter."
    },

    {
        id: "DOC-000005",
        customerId: "CUS-000004",
        customer: "Hassan Ahmed",
        application: "APP-000004",
        passport: "AB4567890",
        country: "USA",
        type: "Bank Statement",
        uploaded: "",
        expiry: "",
        status: "Pending",
        file: "",
        notes: "Customer needs to provide updated statement."
    },

    {
        id: "DOC-000006",
        customerId: "CUS-000005",
        customer: "Bilal Hussain",
        application: "APP-000005",
        passport: "AB5678901",
        country: "Germany",
        type: "IELTS / PTE",
        uploaded: "2026-06-10",
        expiry: "2028-06-10",
        status: "Verified",
        file: "ielts.pdf",
        notes: "Language certificate verified."
    },

    {
        id: "DOC-000007",
        customerId: "CUS-000006",
        customer: "Hamza Iqbal",
        application: "APP-000006",
        passport: "AB6789012",
        country: "UAE",
        type: "Employment Letter",
        uploaded: "2026-08-13",
        expiry: "",
        status: "Received",
        file: "employment-letter.pdf",
        notes: "Under review."
    },

    {
        id: "DOC-000008",
        customerId: "CUS-000007",
        customer: "Saad Malik",
        application: "APP-000007",
        passport: "AB7890123",
        country: "Canada",
        type: "Photograph",
        uploaded: "",
        expiry: "",
        status: "Pending",
        file: "",
        notes: "Passport size photograph required."
    },

    {
        id: "DOC-000009",
        customerId: "CUS-000008",
        customer: "Adeel Shah",
        application: "APP-000008",
        passport: "AB8901234",
        country: "United Kingdom",
        type: "CNIC",
        uploaded: "2026-08-08",
        expiry: "",
        status: "Verified",
        file: "cnic.pdf",
        notes: "CNIC verified."
    },

    {
        id: "DOC-000010",
        customerId: "CUS-000009",
        customer: "Waqas Ahmed",
        application: "APP-000009",
        passport: "AB9012345",
        country: "Australia",
        type: "Employment Letter",
        uploaded: "2026-07-02",
        expiry: "",
        status: "Rejected",
        file: "employment-letter.pdf",
        notes: "Incorrect employment details. Replacement required."
    }

];


/* =========================================
   ELEMENTS
========================================= */

const tableBody =
    document.getElementById(
        "documentTableBody"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const typeFilter =
    document.getElementById(
        "documentTypeFilter"
    );


const countryFilter =
    document.getElementById(
        "countryFilter"
    );


/* =========================================
   DATE FORMAT
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
   STATUS CLASS
========================================= */

function getStatusClass(status) {

    const classes = {

        "Pending":
            "status-pending",

        "Received":
            "status-received",

        "Verified":
            "status-verified",

        "Rejected":
            "status-rejected"

    };


    return (
        classes[status] ||
        "status-pending"
    );

}


/* =========================================
   DOCUMENT ICON
========================================= */

function getDocumentIcon(type) {

    const icons = {

        "Passport": "🛂",

        "CNIC": "🪪",

        "Photograph": "📷",

        "Educational": "🎓",

        "Bank Statement": "🏦",

        "Employment Letter": "💼",

        "Experience Letter": "📄",

        "IELTS / PTE": "📝",

        "Admission Letter": "🎓",

        "Other": "📁"

    };


    return icons[type] || "📁";

}


/* =========================================
   EXPIRY CHECK
========================================= */

function isExpiringSoon(date) {

    if (!date) {
        return false;
    }


    const expiry =
        new Date(date);


    const today =
        new Date();


    const difference =
        expiry - today;


    const days =
        difference /
        (1000 * 60 * 60 * 24);


    return (
        days >= 0 &&
        days <= 30
    );

}


/* =========================================
   RENDER
========================================= */

function renderDocuments(
    data = documents
) {

    tableBody.innerHTML = "";


    if (!data.length) {

        tableBody.innerHTML = `

            <tr>

                <td
                    colspan="9"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#718096;
                    "
                >
                    No documents found.
                </td>

            </tr>

        `;

        return;
    }


    data.forEach(
        function(documentItem) {


            const expiryClass =
                isExpiringSoon(
                    documentItem.expiry
                )
                ? "expiry-warning"
                : "expiry-normal";


            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>

                    <input
                        type="checkbox"
                        class="document-checkbox"
                        value="${documentItem.id}"
                    >

                </td>


                <td>

                    <div class="document-cell">

                        <div class="document-icon">

                            ${getDocumentIcon(
                                documentItem.type
                            )}

                        </div>


                        <div>

                            <strong>
                                ${documentItem.type}
                            </strong>

                            <small>
                                ${documentItem.id}
                            </small>

                        </div>

                    </div>

                </td>


                <td>

                    <div class="customer-cell">

                        <strong>
                            ${documentItem.customer}
                        </strong>

                        <small>
                            ${documentItem.customerId}
                        </small>

                    </div>

                </td>


                <td>
                    ${documentItem.application}
                </td>


                <td>
                    ${documentItem.country}
                </td>


                <td>
                    ${formatDate(
                        documentItem.uploaded
                    )}
                </td>


                <td>

                    <span
                        class="${expiryClass}"
                    >
                        ${formatDate(
                            documentItem.expiry
                        )}
                    </span>

                </td>


                <td>

                    <span
                        class="
                            document-status
                            ${getStatusClass(
                                documentItem.status
                            )}
                        "
                    >
                        ${documentItem.status}
                    </span>

                </td>


                <td>

                    <div class="action-buttons">

                        <button
                            class="action-button"
                            title="View"
                            onclick="viewDocument('${documentItem.id}')"
                        >
                            👁
                        </button>


                        <button
                            class="action-button"
                            title="Verify"
                            onclick="verifyDocument('${documentItem.id}')"
                        >
                            ✓
                        </button>


                        <button
                            class="action-button"
                            title="Delete"
                            onclick="deleteDocument('${documentItem.id}')"
                        >
                            ×
                        </button>

                    </div>

                </td>

            `;


            tableBody.appendChild(row);

        }
    );


    document.getElementById(
        "resultText"
    ).textContent =
        `Showing ${data.length} documents`;

}


/* =========================================
   FILTER
========================================= */

function filterDocuments() {


    const search =
        searchInput.value
            .toLowerCase()
            .trim();


    const type =
        typeFilter.value;


    const country =
        countryFilter.value;


    const activeStatus =
        document
            .querySelector(
                ".status-filter.active"
            )
            ?.dataset.status || "";


    const filtered =
        documents.filter(
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

                    item.passport
                        .toLowerCase()
                        .includes(search) ||

                    item.type
                        .toLowerCase()
                        .includes(search);


                const typeMatch =

                    !type ||

                    item.type === type;


                const countryMatch =

                    !country ||

                    item.country === country;


                const statusMatch =

                    !activeStatus ||

                    item.status ===
                        activeStatus;


                return (

                    searchMatch &&

                    typeMatch &&

                    countryMatch &&

                    statusMatch

                );

            }
        );


    renderDocuments(filtered);

}


/* =========================================
   EVENTS
========================================= */

searchInput.addEventListener(
    "input",
    filterDocuments
);


typeFilter.addEventListener(
    "change",
    filterDocuments
);


countryFilter.addEventListener(
    "change",
    filterDocuments
);


/* =========================================
   STATUS FILTER
========================================= */

document
    .querySelectorAll(
        ".status-filter"
    )
    .forEach(
        function(button) {


            button.addEventListener(
                "click",
                function() {


                    document
                        .querySelectorAll(
                            ".status-filter"
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


                    filterDocuments();

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

            typeFilter.value = "";

            countryFilter.value = "";


            document
                .querySelectorAll(
                    ".status-filter"
                )
                .forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


            document
                .querySelector(
                    '.status-filter[data-status=""]'
                )
                .classList.add(
                    "active"
                );


            renderDocuments();

        }
    );


/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStats() {


    const total =
        documents.length;


    const pending =
        documents.filter(
            item =>
                item.status === "Pending"
        ).length;


    const verified =
        documents.filter(
            item =>
                item.status === "Verified"
        ).length;


    const rejected =
        documents.filter(
            item =>
                item.status === "Rejected"
        ).length;


    document.getElementById(
        "totalDocuments"
    ).textContent = total;


    document.getElementById(
        "pendingDocuments"
    ).textContent = pending;


    document.getElementById(
        "verifiedDocuments"
    ).textContent = verified;


    document.getElementById(
        "rejectedDocuments"
    ).textContent = rejected;


    document.getElementById(
        "allCount"
    ).textContent = total;


    document.getElementById(
        "pendingCount"
    ).textContent =
        documents.filter(
            item =>
                item.status === "Pending"
        ).length;


    document.getElementById(
        "receivedCount"
    ).textContent =
        documents.filter(
            item =>
                item.status === "Received"
        ).length;


    document.getElementById(
        "verifiedCount"
    ).textContent =
        verified;


    document.getElementById(
        "rejectedCount"
    ).textContent =
        rejected;

}


/* =========================================
   MODAL
========================================= */

const uploadModal =
    document.getElementById(
        "uploadModal"
    );


document
    .getElementById(
        "uploadButton"
    )
    .addEventListener(
        "click",
        function() {

            uploadModal.classList.add(
                "show"
            );

            document.body.style.overflow =
                "hidden";

        }
    );


function closeModal() {

    uploadModal.classList.remove(
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
        closeModal
    );


document
    .getElementById(
        "cancelModal"
    )
    .addEventListener(
        "click",
        closeModal
    );


uploadModal.addEventListener(
    "click",
    function(event) {

        if (
            event.target ===
            uploadModal
        ) {

            closeModal();

        }

    }
);


/* =========================================
   SAVE DOCUMENT
========================================= */

document
    .getElementById(
        "documentForm"
    )
    .addEventListener(
        "submit",
        function(event) {


            event.preventDefault();


            const number =
                documents.length + 1;


            const fileInput =
                document.getElementById(
                    "documentFile"
                );


            const fileName =
                fileInput.files.length
                    ? fileInput.files[0].name
                    : "";


            const newDocument = {

                id:
                    "DOC-" +
                    String(number)
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

                application:
                    document
                        .getElementById(
                            "applicationId"
                        )
                        .value,

                passport:
                    document
                        .getElementById(
                            "passport"
                        )
                        .value,

                country:
                    document
                        .getElementById(
                            "country"
                        )
                        .value,

                type:
                    document
                        .getElementById(
                            "documentType"
                        )
                        .value,

                uploaded:
                    new Date()
                        .toISOString()
                        .split("T")[0],

                expiry:
                    document
                        .getElementById(
                            "expiryDate"
                        )
                        .value,

                status:
                    document
                        .getElementById(
                            "documentStatus"
                        )
                        .value,

                file:
                    fileName,

                notes:
                    document
                        .getElementById(
                            "notes"
                        )
                        .value

            };


            documents.unshift(
                newDocument
            );


            document
                .getElementById(
                    "documentForm"
                )
                .reset();


            closeModal();


            renderDocuments();

            updateStats();


            alert(
                `Document ${newDocument.id} saved successfully.`
            );

        }
    );


/* =========================================
   VIEW DOCUMENT
========================================= */

function viewDocument(id) {


    const item =
        documents.find(
            documentItem =>
                documentItem.id === id
        );


    if (!item) {
        return;
    }


    alert(

        "DOCUMENT DETAILS\n\n" +

        "Document ID: " +
        item.id +

        "\nCustomer: " +
        item.customer +

        "\nCustomer ID: " +
        item.customerId +

        "\nApplication: " +
        item.application +

        "\nCountry: " +
        item.country +

        "\nDocument: " +
        item.type +

        "\nUploaded: " +
        formatDate(item.uploaded) +

        "\nExpiry: " +
        formatDate(item.expiry) +

        "\nStatus: " +
        item.status +

        "\nFile: " +
        (item.file || "Not uploaded") +

        "\n\nNotes: " +
        item.notes

    );

}


/* =========================================
   VERIFY DOCUMENT
========================================= */

function verifyDocument(id) {


    const index =
        documents.findIndex(
            item =>
                item.id === id
        );


    if (index === -1) {
        return;
    }


    if (
        documents[index].status ===
        "Verified"
    ) {

        alert(
            "This document is already verified."
        );

        return;
    }


    documents[index].status =
        "Verified";


    renderDocuments();

    updateStats();


    alert(
        `${id} has been marked as Verified.`
    );

}


/* =========================================
   DELETE DOCUMENT
========================================= */

function deleteDocument(id) {


    const item =
        documents.find(
            documentItem =>
                documentItem.id === id
        );


    if (!item) {
        return;
    }


    const confirmed =
        confirm(
            `Delete ${id}? This action cannot be undone.`
        );


    if (!confirmed) {
        return;
    }


    documents =
        documents.filter(
            documentItem =>
                documentItem.id !== id
        );


    renderDocuments();

    updateStats();

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
                    ".document-checkbox"
                )
                .forEach(
                    checkbox => {

                        checkbox.checked =
                            this.checked;

                    }
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

                "Document ID,Customer ID,Customer,Application,Passport,Country,Document Type,Uploaded,Expiry,Status,File\n";


            documents.forEach(
                function(item) {


                    csv +=

                        `"${item.id}",` +

                        `"${item.customerId}",` +

                        `"${item.customer}",` +

                        `"${item.application}",` +

                        `"${item.passport}",` +

                        `"${item.country}",` +

                        `"${item.type}",` +

                        `"${item.uploaded}",` +

                        `"${item.expiry}",` +

                        `"${item.status}",` +

                        `"${item.file}"\n`;

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
                "polaris-documents.csv";


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
   INITIAL LOAD
========================================= */

renderDocuments();

updateStats();


console.log(
    "Polaris Consultants Document Management loaded."
);
