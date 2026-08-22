/* =========================================================
   POLARIS CONSULTANTS
   RECEIPTS / INVOICES / QR MANAGEMENT
   FRONTEND DEMO VERSION
========================================================= */


/* =========================================================
   DEMO RECEIPT DATA
========================================================= */

let receipts = [

    {
        id: "RCP-000001",
        paymentId: "PAY-000021",
        customerId: "CUS-000001",
        customer: "Ali Raza",
        applicationId: "APP-000001",
        country: "United Kingdom",
        visa: "Study Visa",
        type: "Payment Receipt",
        totalFee: 450000,
        amountPaid: 150000,
        remaining: 300000,
        method: "Bank Transfer",
        date: "2026-08-18",
        receivedBy: "Admin",
        status: "Verified",
        notes: "Initial consultancy payment."
    },

    {
        id: "RCP-000002",
        paymentId: "PAY-000022",
        customerId: "CUS-000002",
        customer: "Ahmed Khan",
        applicationId: "APP-000002",
        country: "Canada",
        visa: "Study Visa",
        type: "Payment Receipt",
        totalFee: 520000,
        amountPaid: 200000,
        remaining: 320000,
        method: "Cash",
        date: "2026-08-17",
        receivedBy: "Finance",
        status: "Verified",
        notes: "First installment."
    },

    {
        id: "RCP-000003",
        paymentId: "PAY-000023",
        customerId: "CUS-000003",
        customer: "Usman Ali",
        applicationId: "APP-000003",
        country: "Australia",
        visa: "Study Visa",
        type: "Payment Receipt",
        totalFee: 600000,
        amountPaid: 250000,
        remaining: 350000,
        method: "EasyPaisa",
        date: "2026-08-16",
        receivedBy: "Finance",
        status: "Pending",
        notes: "Payment awaiting verification."
    },

    {
        id: "RCP-000004",
        paymentId: "PAY-000024",
        customerId: "CUS-000004",
        customer: "Hassan Ahmed",
        applicationId: "APP-000004",
        country: "USA",
        visa: "Visit Visa",
        type: "Payment Receipt",
        totalFee: 300000,
        amountPaid: 100000,
        remaining: 200000,
        method: "Cash",
        date: "2026-08-15",
        receivedBy: "Admin",
        status: "Verified",
        notes: "Visit visa consultancy fee."
    },

    {
        id: "RCP-000005",
        paymentId: "PAY-000025",
        customerId: "CUS-000005",
        customer: "Bilal Hussain",
        applicationId: "APP-000005",
        country: "Germany",
        visa: "Study Visa",
        type: "Invoice",
        totalFee: 480000,
        amountPaid: 0,
        remaining: 480000,
        method: "Bank Transfer",
        date: "2026-08-14",
        receivedBy: "Admin",
        status: "Pending",
        notes: "Invoice generated."
    },

    {
        id: "RCP-000006",
        paymentId: "PAY-000026",
        customerId: "CUS-000006",
        customer: "Hamza Tariq",
        applicationId: "APP-000006",
        country: "UAE",
        visa: "Work Visa",
        type: "Payment Receipt",
        totalFee: 350000,
        amountPaid: 175000,
        remaining: 175000,
        method: "Bank Transfer",
        date: "2026-08-13",
        receivedBy: "Finance",
        status: "Verified",
        notes: "Work visa payment."
    },

    {
        id: "RCP-000007",
        paymentId: "PAY-000027",
        customerId: "CUS-000007",
        customer: "Saad Malik",
        applicationId: "APP-000007",
        country: "Turkey",
        visa: "Study Visa",
        type: "Application Slip",
        totalFee: 250000,
        amountPaid: 125000,
        remaining: 125000,
        method: "Card",
        date: "2026-08-12",
        receivedBy: "Admin",
        status: "Verified",
        notes: "Application processing slip."
    }

];


/* =========================================================
   CURRENT RECEIPT
========================================================= */

let currentReceiptId = null;


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    renderReceipts();
    updateStats();

    const dateInput = document.getElementById("paymentDate");

    if (dateInput) {
        dateInput.value = new Date().toISOString().split("T")[0];
    }

});


/* =========================================================
   FORMAT CURRENCY
========================================================= */

function formatCurrency(amount) {

    return "PKR " + Number(amount || 0).toLocaleString("en-PK");

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date) {

    if (!date) return "-";

    const d = new Date(date);

    if (isNaN(d.getTime())) {
        return date;
    }

    return d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

}


/* =========================================================
   UPDATE STATS
========================================================= */

function updateStats() {

    const total = receipts.length;

    const collected = receipts.reduce(function (sum, receipt) {

        return sum + Number(receipt.amountPaid || 0);

    }, 0);

    const verified = receipts.filter(function (receipt) {

        return receipt.status === "Verified";

    }).length;

    const pending = receipts.filter(function (receipt) {

        return receipt.status === "Pending";

    }).length;


    document.getElementById("totalReceipts").textContent = total;

    document.getElementById("totalCollected").textContent =
        formatCurrency(collected);

    document.getElementById("verifiedReceipts").textContent = verified;

    document.getElementById("pendingReceipts").textContent = pending;

}


/* =========================================================
   RENDER RECEIPTS
========================================================= */

function renderReceipts() {

    const tbody = document.getElementById("receiptsTableBody");

    if (!tbody) return;

    const search =
        document.getElementById("receiptSearch").value
            .trim()
            .toLowerCase();

    const type =
        document.getElementById("receiptTypeFilter").value;

    const status =
        document.getElementById("receiptStatusFilter").value;

    const country =
        document.getElementById("countryFilter").value;


    const filtered = receipts.filter(function (receipt) {

        const searchable = [

            receipt.id,
            receipt.customer,
            receipt.customerId,
            receipt.applicationId,
            receipt.paymentId

        ]
            .join(" ")
            .toLowerCase();


        const matchesSearch =
            !search || searchable.includes(search);

        const matchesType =
            !type || receipt.type === type;

        const matchesStatus =
            !status || receipt.status === status;

        const matchesCountry =
            !country || receipt.country === country;


        return (
            matchesSearch &&
            matchesType &&
            matchesStatus &&
            matchesCountry
        );

    });


    if (filtered.length === 0) {

        tbody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="empty-state">
                        <strong>No receipts found</strong>
                        Try changing your search or filters.
                    </div>
                </td>
            </tr>
        `;

        return;
    }


    tbody.innerHTML = filtered.map(function (receipt) {

        return `

            <tr>

                <td>
                    <span class="receipt-id">
                        ${escapeHtml(receipt.id)}
                    </span>
                </td>

                <td>
                    <span class="customer-name">
                        ${escapeHtml(receipt.customer)}
                    </span>
                </td>

                <td>
                    ${escapeHtml(receipt.applicationId || "-")}
                </td>

                <td>
                    <span class="type-badge">
                        ${escapeHtml(receipt.type)}
                    </span>
                </td>

                <td>
                    <span class="amount">
                        ${formatCurrency(receipt.amountPaid)}
                    </span>
                </td>

                <td>
                    ${formatDate(receipt.date)}
                </td>

                <td>
                    <span class="status ${receipt.status === "Verified" ? "verified" : "pending"}">
                        ${escapeHtml(receipt.status)}
                    </span>
                </td>

                <td>

                    <div class="action-buttons">

                        <button
                            class="action-btn"
                            onclick="viewReceipt('${receipt.id}')"
                            title="View"
                        >
                            View
                        </button>

                        <button
                            class="action-btn"
                            onclick="printReceiptById('${receipt.id}')"
                            title="Print"
                        >
                            Print
                        </button>

                        <button
                            class="action-btn verify"
                            onclick="verifyReceiptById('${receipt.id}')"
                            title="Verify"
                        >
                            ✓
                        </button>

                    </div>

                </td>

            </tr>

        `;

    }).join("");

}


/* =========================================================
   OPEN CREATE RECEIPT MODAL
========================================================= */

function openReceiptModal() {

    document.getElementById("receiptModal")
        .classList.add("show");

}


/* =========================================================
   CLOSE CREATE RECEIPT MODAL
========================================================= */

function closeReceiptModal() {

    document.getElementById("receiptModal")
        .classList.remove("show");

}


/* =========================================================
   CREATE RECEIPT
========================================================= */

function createReceipt(event) {

    event.preventDefault();


    const type =
        document.getElementById("receiptType").value;

    const customer =
        document.getElementById("customerName").value.trim();

    const customerId =
        document.getElementById("customerId").value.trim();

    const paymentId =
        document.getElementById("paymentId").value.trim();

    const applicationId =
        document.getElementById("applicationId").value.trim();

    const country =
        document.getElementById("country").value;

    const visa =
        document.getElementById("visaType").value;

    const totalFee =
        Number(document.getElementById("totalFee").value || 0);

    const amountPaid =
        Number(document.getElementById("amountPaid").value || 0);

    const method =
        document.getElementById("paymentMethod").value;

    const date =
        document.getElementById("paymentDate").value;

    const receivedBy =
        document.getElementById("receivedBy").value.trim();

    const notes =
        document.getElementById("receiptNotes").value.trim();


    if (!type || !customer || !date) {

        alert("Please complete all required fields.");

        return;
    }


    if (amountPaid > totalFee && totalFee > 0) {

        alert("Amount paid cannot be greater than the total fee.");

        return;
    }


    const nextNumber = receipts.length + 1;

    const receiptId =
        "RCP-" +
        String(nextNumber).padStart(6, "0");


    const receipt = {

        id: receiptId,

        paymentId:
            paymentId ||
            "PAY-" +
            String(nextNumber).padStart(6, "0"),

        customerId:
            customerId || "CUS-PENDING",

        customer,

        applicationId:
            applicationId || "APP-PENDING",

        country:
            country || "Not Selected",

        visa:
            visa || "Not Selected",

        type,

        totalFee,

        amountPaid,

        remaining:
            Math.max(totalFee - amountPaid, 0),

        method,

        date,

        receivedBy:
            receivedBy || "Admin",

        status: "Pending",

        notes

    };


    receipts.unshift(receipt);


    document.getElementById("receiptForm").reset();

    document.getElementById("paymentDate").value =
        new Date().toISOString().split("T")[0];

    document.getElementById("receivedBy").value = "Admin";


    closeReceiptModal();

    updateStats();

    renderReceipts();

    viewReceipt(receipt.id);


    alert(
        "Receipt created successfully.\n\nReceipt ID: " +
        receipt.id
    );

}


/* =========================================================
   VIEW RECEIPT
========================================================= */

function viewReceipt(id) {

    const receipt =
        receipts.find(function (item) {
            return item.id === id;
        });


    if (!receipt) {

        alert("Receipt not found.");

        return;
    }


    currentReceiptId = id;


    const preview =
        document.getElementById("receiptPreview");


    preview.innerHTML = generateReceiptHTML(receipt);


    document.getElementById("viewModal")
        .classList.add("show");

}


/* =========================================================
   GENERATE RECEIPT HTML
========================================================= */

function generateReceiptHTML(receipt) {

    const remaining =
        Number(receipt.remaining || 0);


    return `

        <div class="receipt-paper">

            <div class="receipt-company-header">

                <div class="company-brand">

                    <div class="company-logo">
                        ✦
                    </div>

                    <div class="company-name">

                        <h2>POLARIS</h2>

                        <span>
                            CONSULTANTS
                        </span>

                    </div>

                </div>


                <div class="receipt-title">

                    <h1>
                        ${escapeHtml(receipt.type)}
                    </h1>

                    <p>
                        ${escapeHtml(receipt.id)}
                    </p>

                </div>

            </div>


            <div class="receipt-meta">

                ${metaItem("Receipt ID", receipt.id)}

                ${metaItem("Payment ID", receipt.paymentId)}

                ${metaItem("Customer ID", receipt.customerId)}

                ${metaItem("Application ID", receipt.applicationId)}

                ${metaItem("Customer", receipt.customer)}

                ${metaItem("Country", receipt.country)}

                ${metaItem("Visa Type", receipt.visa)}

                ${metaItem("Payment Date", formatDate(receipt.date))}

                ${metaItem("Payment Method", receipt.method)}

                ${metaItem("Received By", receipt.receivedBy)}

            </div>


            <div class="receipt-amount-box">

                <div class="amount-row">

                    <span>
                        Total Consultancy Fee
                    </span>

                    <strong>
                        ${formatCurrency(receipt.totalFee)}
                    </strong>

                </div>


                <div class="amount-row">

                    <span>
                        Amount Paid
                    </span>

                    <strong>
                        ${formatCurrency(receipt.amountPaid)}
                    </strong>

                </div>


                <div class="amount-row total">

                    <span>
                        Remaining Balance
                    </span>

                    <strong>
                        ${formatCurrency(remaining)}
                    </strong>

                </div>

            </div>


            <div class="qr-section">

                <div>

                    <strong>
                        Secure Receipt Verification
                    </strong>

                    <p style="font-size:11px;color:#718096;margin-top:6px;">
                        Scan or verify using Receipt ID.
                    </p>

                    <p style="font-size:10px;color:#718096;margin-top:6px;">
                        Sensitive CNIC/passport data is not encoded.
                    </p>

                </div>


                <div class="qr-box">

                    <div class="qr-content">

                        <strong>QR</strong>

                        <span>
                            ${escapeHtml(receipt.id)}
                        </span>

                    </div>

                </div>

            </div>


            <div class="receipt-watermark">

                POLARIS CONSULTANTS • OFFICIAL PAYMENT DOCUMENT

            </div>


            <div class="receipt-footer">

                <div>
                    ${escapeHtml(receipt.notes || "Thank you for choosing Polaris Consultants.")}
                </div>

                <div>
                    This receipt is generated by Polaris Consultants.
                </div>

                <div>
                    For verification, use the Receipt ID shown above.
                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   META ITEM
========================================================= */

function metaItem(label, value) {

    return `

        <div class="meta-item">

            <span>
                ${escapeHtml(label)}
            </span>

            <span>
                ${escapeHtml(value || "-")}
            </span>

        </div>

    `;

}


/* =========================================================
   CLOSE VIEW MODAL
========================================================= */

function closeViewModal() {

    document.getElementById("viewModal")
        .classList.remove("show");

    currentReceiptId = null;

}


/* =========================================================
   PRINT CURRENT RECEIPT
========================================================= */

function printReceipt() {

    if (!currentReceiptId) {

        alert("No receipt selected.");

        return;
    }


    window.print();

}


/* =========================================================
   PRINT BY ID
========================================================= */

function printReceiptById(id) {

    viewReceipt(id);

    setTimeout(function () {

        window.print();

    }, 300);

}


/* =========================================================
   DOWNLOAD RECEIPT
========================================================= */

function downloadReceipt() {

    alert(
        "PDF download will be connected to the backend/PDF generator in the next integration stage.\n\nFor now, use Print → Save as PDF."
    );

}


/* =========================================================
   VERIFY CURRENT RECEIPT
========================================================= */

function verifyCurrentReceipt() {

    if (!currentReceiptId) {

        alert("No receipt selected.");

        return;
    }


    verifyReceiptById(currentReceiptId);

}


/* =========================================================
   VERIFY RECEIPT BY ID
========================================================= */

function verifyReceiptById(id) {

    document.getElementById("verifyReceiptId").value = id;

    openVerifyModal();

    verifyReceipt();

}


/* =========================================================
   VERIFY RECEIPT
========================================================= */

function verifyReceipt() {

    const id =
        document.getElementById("verifyReceiptId")
            .value
            .trim()
            .toUpperCase();


    const result =
        document.getElementById("verificationResult");


    if (!id) {

        result.className =
            "verification-result error";

        result.innerHTML =
            "Please enter a Receipt ID.";

        return;
    }


    const receipt =
        receipts.find(function (item) {

            return item.id.toUpperCase() === id;

        });


    if (!receipt) {

        result.className =
            "verification-result error";

        result.innerHTML = `
            <strong>Receipt Not Found</strong><br>
            No receipt was found for ID:
            ${escapeHtml(id)}
        `;

        return;
    }


    if (receipt.status === "Verified") {

        result.className =
            "verification-result success";

        result.innerHTML = `

            <strong>✓ Receipt Verified</strong><br><br>

            Receipt ID:
            <strong>${escapeHtml(receipt.id)}</strong><br>

            Customer:
            ${escapeHtml(receipt.customer)}<br>

            Application:
            ${escapeHtml(receipt.applicationId)}<br>

            Amount:
            ${formatCurrency(receipt.amountPaid)}<br>

            Date:
            ${formatDate(receipt.date)}<br>

            Status:
            <strong>Verified</strong>

        `;

    } else {

        result.className =
            "verification-result error";

        result.innerHTML = `

            <strong>⚠ Verification Pending</strong><br><br>

            Receipt ID:
            <strong>${escapeHtml(receipt.id)}</strong><br>

            Customer:
            ${escapeHtml(receipt.customer)}<br>

            Amount:
            ${formatCurrency(receipt.amountPaid)}<br>

            Status:
            <strong>Pending Verification</strong>

        `;

    }

}


/* =========================================================
   OPEN VERIFY MODAL
========================================================= */

function openVerifyModal() {

    document.getElementById("verifyModal")
        .classList.add("show");

}


/* =========================================================
   CLOSE VERIFY MODAL
========================================================= */

function closeVerifyModal() {

    document.getElementById("verifyModal")
        .classList.remove("show");

}


/* =========================================================
   WHATSAPP RECEIPT
========================================================= */

function whatsappReceipt() {

    if (!currentReceiptId) {

        alert("No receipt selected.");

        return;
    }


    const receipt =
        receipts.find(function (item) {

            return item.id === currentReceiptId;

        });


    if (!receipt) return;


    const message =

        "POLARIS CONSULTANTS%0A%0A" +

        "Payment Receipt: " +
        receipt.id +

        "%0ACustomer: " +
        receipt.customer +

        "%0AApplication: " +
        receipt.applicationId +

        "%0ACountry: " +
        receipt.country +

        "%0AAmount Paid: " +
        formatCurrency(receipt.amountPaid) +

        "%0ARemaining: " +
        formatCurrency(receipt.remaining) +

        "%0A%0AThank you for choosing Polaris Consultants.";


    window.open(
        "https://wa.me/?text=" + message,
        "_blank"
    );

}


/* =========================================================
   EXPORT CSV
========================================================= */

function exportReceiptsCSV() {

    if (receipts.length === 0) {

        alert("No receipts available.");

        return;
    }


    const headers = [

        "Receipt ID",
        "Payment ID",
        "Customer ID",
        "Customer",
        "Application ID",
        "Country",
        "Visa Type",
        "Receipt Type",
        "Total Fee",
        "Amount Paid",
        "Remaining",
        "Payment Method",
        "Date",
        "Received By",
        "Status",
        "Notes"

    ];


    const rows = receipts.map(function (receipt) {

        return [

            receipt.id,
            receipt.paymentId,
            receipt.customerId,
            receipt.customer,
            receipt.applicationId,
            receipt.country,
            receipt.visa,
            receipt.type,
            receipt.totalFee,
            receipt.amountPaid,
            receipt.remaining,
            receipt.method,
            receipt.date,
            receipt.receivedBy,
            receipt.status,
            receipt.notes

        ];

    });


    let csv = headers.join(",") + "\n";


    rows.forEach(function (row) {

        csv += row
            .map(csvEscape)
            .join(",") + "\n";

    });


    const blob =
        new Blob([csv], {
            type: "text/csv;charset=utf-8;"
        });


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "polaris-receipts.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

}


/* =========================================================
   CSV ESCAPE
========================================================= */

function csvEscape(value) {

    const text =
        String(value ?? "");

    return '"' +
        text.replace(/"/g, '""') +
        '"';

}


/* =========================================================
   RESET FILTERS
========================================================= */

function resetFilters() {

    document.getElementById("receiptSearch").value = "";

    document.getElementById("receiptTypeFilter").value = "";

    document.getElementById("receiptStatusFilter").value = "";

    document.getElementById("countryFilter").value = "";

    renderReceipts();

}


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

function toggleSidebar() {

    const sidebar =
        document.querySelector(".sidebar");

    sidebar.classList.toggle("open");

}


/* =========================================================
   LOGOUT
========================================================= */

function logoutUser() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;


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


/* =========================================================
   CLOSE MODALS WHEN CLICKING OUTSIDE
========================================================= */

window.addEventListener("click", function (event) {

    const receiptModal =
        document.getElementById("receiptModal");

    const viewModal =
        document.getElementById("viewModal");

    const verifyModal =
        document.getElementById("verifyModal");


    if (event.target === receiptModal) {
        closeReceiptModal();
    }


    if (event.target === viewModal) {
        closeViewModal();
    }


    if (event.target === verifyModal) {
        closeVerifyModal();
    }

});
