/* =========================================
   POLARIS CONSULTANTS
   CUSTOMER MANAGEMENT
========================================= */

/* =========================================
   DEMO / INITIAL CUSTOMER DATA
========================================= */

const initialCustomers = [
    {
        id: "CUS-000001",
        name: "Muhammad Ali",
        father: "Muhammad Aslam",
        cnic: "35202-1234567-1",
        passport: "AB1234567",
        phone: "+92 300 1111111",
        whatsapp: "+92 300 1111111",
        email: "ali@example.com",
        city: "Lahore",
        address: "Gulberg III",
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
        city: "Karachi",
        address: "DHA Phase 5",
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
        city: "Islamabad",
        address: "F-8/2",
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
        city: "Rawalpindi",
        address: "Satellite Town",
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
        city: "Multan",
        address: "Cantt",
        country: "Germany",
        visa: "Study",
        assigned: "Bilal",
        applications: 1,
        totalFee: 400000,
        paid: 400000,
        status: "Completed"
    }
];

// LocalStorage سے ڈیٹا حاصل کریں
let customers = JSON.parse(localStorage.getItem("polaris_customers")) || initialCustomers;
let editingCustomerId = null;

/* =========================================
   ELEMENTS
========================================= */

const tableBody = document.getElementById("customerTableBody");
const searchInput = document.getElementById("searchInput");
const countryFilter = document.getElementById("countryFilter");
const visaFilter = document.getElementById("visaFilter");
const statusFilter = document.getElementById("statusFilter");
const resultText = document.getElementById("resultText");
const modal = document.getElementById("customerModal");
const addCustomerButton = document.getElementById("addCustomerButton");
const closeModal = document.getElementById("closeModal");
const cancelModal = document.getElementById("cancelModal");
const customerForm = document.getElementById("customerForm");
const menuButton = document.getElementById("menuButton");
const sidebar = document.getElementById("sidebar");

/* =========================================
   UTILITY FUNCTIONS
========================================= */

function saveData() {
    localStorage.setItem("polaris_customers", JSON.stringify(customers));
}

function formatMoney(amount) {
    return "Rs. " + Number(amount || 0).toLocaleString("en-PK");
}

function getStatusClass(status) {
    const statusClasses = {
        "Active": "status-active",
        "Pending": "status-pending",
        "Completed": "status-completed",
        "Closed": "status-closed"
    };
    return statusClasses[status] || "status-pending";
}

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
   RENDER CUSTOMERS
========================================= */

function renderCustomers(data = customers) {
    tableBody.innerHTML = "";

    if (!data.length) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="10" style="text-align:center; padding:40px; color:#718096;">
                    No customers found.
                </td>
            </tr>
        `;
        resultText.textContent = "Showing 0 customers";
        return;
    }

    data.forEach(function(customer) {
        const initials = customer.name
            .split(" ")
            .map(word => word.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();

        const remaining = Math.max(0, customer.totalFee - customer.paid);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <input type="checkbox" class="customer-checkbox" value="${customer.id}">
            </td>
            <td>
                <div class="customer-cell">
                    <div class="customer-avatar">${initials}</div>
                    <div class="customer-name">
                        <strong>${customer.name}</strong>
                        <small>${customer.id}</small>
                    </div>
                </div>
            </td>
            <td>
                <div class="contact-cell">
                    <span>${customer.phone}</span>
                    <small>${customer.email || "N/A"}</small>
                </div>
            </td>
            <td>
                ${getFlag(customer.country)} ${customer.country}
            </td>
            <td>${customer.visa}</td>
            <td>${customer.assigned || "Unassigned"}</td>
            <td><strong>${customer.applications || 1}</strong></td>
            <td>
                <div class="finance-cell">
                    <strong>Paid: ${formatMoney(customer.paid)}</strong>
                    <small>Due: ${formatMoney(remaining)}</small>
                </div>
            </td>
            <td>
                <span class="customer-status ${getStatusClass(customer.status)}">
                    ${customer.status}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-button" title="View" onclick="viewCustomer('${customer.id}')">👁</button>
                    <button class="action-button" title="Edit" onclick="editCustomer('${customer.id}')">✎</button>
                    <button class="action-button" title="WhatsApp" onclick="openWhatsApp('${customer.whatsapp}')">W</button>
                    <button class="action-button" title="Delete" onclick="deleteCustomer('${customer.id}')">🗑</button>
                </div>
            </td>
        `;

        tableBody.appendChild(row);
    });

    resultText.textContent = `Showing ${data.length} customers`;
}

/* =========================================
   FILTER CUSTOMERS
========================================= */

function filterCustomers() {
    const search = searchInput.value.toLowerCase().trim();
    const country = countryFilter.value;
    const visa = visaFilter.value;
    const status = statusFilter.value;

    const filtered = customers.filter(function(customer) {
        const searchMatch = !search ||
            customer.id.toLowerCase().includes(search) ||
            customer.name.toLowerCase().includes(search) ||
            (customer.cnic && customer.cnic.toLowerCase().includes(search)) ||
            (customer.passport && customer.passport.toLowerCase().includes(search)) ||
            customer.phone.toLowerCase().includes(search);

        const countryMatch = !country || customer.country === country;
        const visaMatch = !visa || customer.visa === visa;
        const statusMatch = !status || customer.status === status;

        return searchMatch && countryMatch && visaMatch && statusMatch;
    });

    renderCustomers(filtered);
}

// Filter Event Listeners
searchInput.addEventListener("input", filterCustomers);
countryFilter.addEventListener("change", filterCustomers);
visaFilter.addEventListener("change", filterCustomers);
statusFilter.addEventListener("change", filterCustomers);

// Reset Filters
document.getElementById("resetFilters").addEventListener("click", function() {
    searchInput.value = "";
    countryFilter.value = "";
    visaFilter.value = "";
    statusFilter.value = "";
    renderCustomers();
});

/* =========================================
   UPDATE STATISTICS
========================================= */

function updateStats() {
    const total = customers.length;
    const active = customers.filter(c => c.status === "Active").length;
    const applications = customers.reduce((sum, c) => sum + (c.applications || 1), 0);
    const receivable = customers.reduce((sum, c) => sum + Math.max(0, c.totalFee - c.paid), 0);

    document.getElementById("totalCustomers").textContent = total;
    document.getElementById("activeCustomers").textContent = active;
    document.getElementById("totalApplications").textContent = applications;
    document.getElementById("totalReceivable").textContent = formatMoney(receivable);
}

/* =========================================
   MODAL CONTROLS
========================================= */

function openCustomerModal(isEdit = false) {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
    if (!isEdit) {
        editingCustomerId = null;
        customerForm.reset();
        document.querySelector("#customerModal h2").textContent = "Add New Customer";
    }
}

function closeCustomerModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    customerForm.reset();
    editingCustomerId = null;
}

addCustomerButton.addEventListener("click", () => openCustomerModal(false));
closeModal.addEventListener("click", closeCustomerModal);
cancelModal.addEventListener("click", closeCustomerModal);

modal.addEventListener("click", function(event) {
    if (event.target === modal) {
        closeCustomerModal();
    }
});

/* =========================================
   ADD / EDIT CUSTOMER FORM SUBMIT
========================================= */

customerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const totalFee = Number(document.getElementById("totalFee").value) || 0;
    const paidAmount = Number(document.getElementById("paidAmount").value) || 0;

    const formData = {
        name: document.getElementById("customerName").value,
        father: document.getElementById("fatherName").value,
        cnic: document.getElementById("customerCnic").value,
        passport: document.getElementById("customerPassport").value,
        dob: document.getElementById("dob") ? document.getElementById("dob").value : "",
        gender: document.getElementById("gender") ? document.getElementById("gender").value : "",
        phone: document.getElementById("customerPhone").value,
        whatsapp: document.getElementById("customerWhatsapp").value || document.getElementById("customerPhone").value,
        email: document.getElementById("customerEmail").value,
        city: document.getElementById("customerCity") ? document.getElementById("customerCity").value : "",
        address: document.getElementById("customerAddress") ? document.getElementById("customerAddress").value : "",
        country: document.getElementById("customerCountry").value,
        visa: document.getElementById("customerVisa").value,
        education: document.getElementById("education") ? document.getElementById("education").value : "",
        occupation: document.getElementById("occupation") ? document.getElementById("occupation").value : "",
        assigned: document.getElementById("assigned").value,
        totalFee: totalFee,
        paid: paidAmount,
        status: document.getElementById("customerStatus").value,
        notes: document.getElementById("customerNotes") ? document.getElementById("customerNotes").value : ""
    };

    if (editingCustomerId) {
        // Edit Customer
        const index = customers.findIndex(c => c.id === editingCustomerId);
        if (index !== -1) {
            customers[index] = { ...customers[index], ...formData };
        }
    } else {
        // New Customer
        const newId = "CUS-" + String(customers.length + 1).padStart(6, "0");
        customers.unshift({
            id: newId,
            applications: 1,
            ...formData
        });
    }

    saveData();
    closeCustomerModal();
    renderCustomers();
    updateStats();
});

/* =========================================
   CUSTOMER ACTIONS (VIEW, EDIT, DELETE, WHATSAPP)
========================================= */

function viewCustomer(id) {
    const customer = customers.find(item => item.id === id);
    if (!customer) return;

    const remaining = customer.totalFee - customer.paid;

    alert(
        "CUSTOMER PROFILE\n\n" +
        "Customer ID: " + customer.id +
        "\nName: " + customer.name +
        "\nPhone: " + customer.phone +
        "\nCountry: " + customer.country +
        "\nVisa: " + customer.visa +
        "\nAssigned: " + customer.assigned +
        "\nStatus: " + customer.status +
        "\n\nTotal Fee: " + formatMoney(customer.totalFee) +
        "\nPaid: " + formatMoney(customer.paid) +
        "\nRemaining: " + formatMoney(remaining)
    );
}

function editCustomer(id) {
    const customer = customers.find(item => item.id === id);
    if (!customer) return;

    editingCustomerId = id;
    document.querySelector("#customerModal h2").textContent = "Edit Customer";

    document.getElementById("customerName").value = customer.name || "";
    document.getElementById("fatherName").value = customer.father || "";
    document.getElementById("customerCnic").value = customer.cnic || "";
    document.getElementById("customerPassport").value = customer.passport || "";
    if (document.getElementById("dob")) document.getElementById("dob").value = customer.dob || "";
    if (document.getElementById("gender")) document.getElementById("gender").value = customer.gender || "";
    document.getElementById("customerPhone").value = customer.phone || "";
    document.getElementById("customerWhatsapp").value = customer.whatsapp || "";
    document.getElementById("customerEmail").value = customer.email || "";
    if (document.getElementById("customerCity")) document.getElementById("customerCity").value = customer.city || "";
    if (document.getElementById("customerAddress")) document.getElementById("customerAddress").value = customer.address || "";
    document.getElementById("customerCountry").value = customer.country || "";
    document.getElementById("customerVisa").value = customer.visa || "";
    if (document.getElementById("education")) document.getElementById("education").value = customer.education || "";
    if (document.getElementById("occupation")) document.getElementById("occupation").value = customer.occupation || "";
    document.getElementById("assigned").value = customer.assigned || "Asad";
    document.getElementById("customerStatus").value = customer.status || "Active";
    document.getElementById("totalFee").value = customer.totalFee || 0;
    document.getElementById("paidAmount").value = customer.paid || 0;
    if (document.getElementById("customerNotes")) document.getElementById("customerNotes").value = customer.notes || "";

    openCustomerModal(true);
}

function deleteCustomer(id) {
    if (confirm(`Are you sure you want to delete customer ID: ${id}?`)) {
        customers = customers.filter(c => c.id !== id);
        saveData();
        renderCustomers();
        updateStats();
    }
}

function openWhatsApp(phone) {
    if (!phone) {
        alert("WhatsApp number not available.");
        return;
    }
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    window.open("https://wa.me/" + cleanPhone, "_blank");
}

/* =========================================
   SELECT ALL & EXPORT CSV
========================================= */

document.getElementById("selectAll").addEventListener("change", function() {
    document.querySelectorAll(".customer-checkbox").forEach(checkbox => {
        checkbox.checked = this.checked;
    });
});

document.getElementById("exportButton").addEventListener("click", function() {
    if (!customers.length) {
        alert("No customers to export!");
        return;
    }

    let csv = "Customer ID,Name,Phone,Country,Visa,Assigned,Applications,Total Fee,Paid,Remaining,Status\n";

    customers.forEach(function(customer) {
        const remaining = customer.totalFee - customer.paid;
        csv += `"${customer.id}","${customer.name}","${customer.phone}","${customer.country}","${customer.visa}","${customer.assigned}","${customer.applications || 1}","${customer.totalFee}","${customer.paid}","${remaining}","${customer.status}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "polaris-customers.csv";
    link.click();
    URL.revokeObjectURL(url);
});

/* =========================================
   MOBILE SIDEBAR & NAVIGATION
========================================= */

if (menuButton) {
    menuButton.addEventListener("click", function() {
        sidebar.classList.toggle("mobile-open");
    });
}

document.getElementById("logoutButton").addEventListener("click", function() {
    alert("Secure logout will be connected with Authentication.");
});

/* =========================================
   INITIAL LOAD
========================================= */

renderCustomers();
updateStats();

console.log("Polaris Consultants Customer Management loaded successfully.");
