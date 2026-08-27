/* =========================================
   POLARIS CONSULTANTS
   APPLICATION MANAGEMENT JAVASCRIPT
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

document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("applicationTableBody");
    const searchInput = document.getElementById("searchInput");
    const countryFilter = document.getElementById("countryFilter");
    const visaFilter = document.getElementById("visaFilter");
    const officerFilter = document.getElementById("officerFilter");
    const resultText = document.getElementById("resultText");
    const modal = document.getElementById("applicationModal");
    const menuButton = document.getElementById("menuButton");
    const sidebar = document.getElementById("sidebar");

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

    function getStatusClass(status) {
        const classes = {
            "Draft": "status-draft",
            "Documents Pending": "status-documents",
            "Submitted": "status-submitted",
            "Processing": "status-processing",
            "Approved": "status-approved",
            "Rejected": "status-rejected"
        };
        return classes[status] || "status-draft";
    }

    function getDocumentClass(status) {
        const classes = {
            "Pending": "document-pending",
            "Partial": "document-partial",
            "Complete": "document-complete"
        };
        return classes[status] || "document-pending";
    }

    function formatDate(date) {
        if (!date) return "-";
        const parts = date.split("-");
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    function renderApplications(data = applications) {
        if (!tableBody) return;
        tableBody.innerHTML = "";

        if (!data.length) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="10" style="text-align:center; padding:40px; color:#718096;">
                        No applications found.
                    </td>
                </tr>
            `;
            if (resultText) resultText.textContent = "Showing 0 applications";
            return;
        }

        data.forEach(function(application) {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>
                    <input type="checkbox" class="application-checkbox" value="${application.id}">
                </td>
                <td>
                    <div class="application-cell">
                        <strong>${application.id}</strong>
                        <small>${application.priority} Priority</small>
                    </div>
                </td>
                <td>
                    <div class="customer-cell">
                        <strong>${application.customer}</strong>
                        <small>${application.customerId}</small>
                    </div>
                </td>
                <td>
                    <div class="country-cell">
                        ${getFlag(application.country)} ${application.country}
                    </div>
                </td>
                <td>${application.visa}</td>
                <td>${application.officer}</td>
                <td>${formatDate(application.submission)}</td>
                <td>
                    <span class="document-status ${getDocumentClass(application.documents)}">
                        ${application.documents}
                    </span>
                </td>
                <td>
                    <span class="application-status ${getStatusClass(application.status)}">
                        ${application.status}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-button view-btn" title="View" data-id="${application.id}">👁</button>
                        <button class="action-button edit-btn" title="Edit" data-id="${application.id}">✎</button>
                        <button class="action-button wa-btn" title="WhatsApp" data-phone="${application.phone}">W</button>
                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });

        if (resultText) resultText.textContent = `Showing ${data.length} applications`;
    }

    function filterApplications() {
        const search = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const country = countryFilter ? countryFilter.value : "";
        const visa = visaFilter ? visaFilter.value : "";
        const officer = officerFilter ? officerFilter.value : "";
        const activeStatus = document.querySelector(".pipeline-item.active")?.dataset.status || "";

        const filtered = applications.filter(function(application) {
            const searchMatch = !search ||
                application.id.toLowerCase().includes(search) ||
                application.customer.toLowerCase().includes(search) ||
                application.passport.toLowerCase().includes(search) ||
                application.phone.toLowerCase().includes(search);

            const countryMatch = !country || application.country === country;
            const visaMatch = !visa || application.visa === visa;
            const officerMatch = !officer || application.officer === officer;
            const statusMatch = !activeStatus || application.status === activeStatus;

            return searchMatch && countryMatch && visaMatch && officerMatch && statusMatch;
        });

        renderApplications(filtered);
    }

    if (searchInput) searchInput.addEventListener("input", filterApplications);
    if (countryFilter) countryFilter.addEventListener("change", filterApplications);
    if (visaFilter) visaFilter.addEventListener("change", filterApplications);
    if (officerFilter) officerFilter.addEventListener("change", filterApplications);

    document.querySelectorAll(".pipeline-item").forEach(function(button) {
        button.addEventListener("click", function() {
            document.querySelectorAll(".pipeline-item").forEach(item => item.classList.remove("active"));
            this.classList.add("active");
            filterApplications();
        });
    });

    const resetBtn = document.getElementById("resetFilters");
    if (resetBtn) {
        resetBtn.addEventListener("click", function() {
            if (searchInput) searchInput.value = "";
            if (countryFilter) countryFilter.value = "";
            if (visaFilter) visaFilter.value = "";
            if (officerFilter) officerFilter.value = "";

            document.querySelectorAll(".pipeline-item").forEach(item => item.classList.remove("active"));
            const allPipeline = document.querySelector('.pipeline-item[data-status=""]');
            if (allPipeline) allPipeline.classList.add("active");

            renderApplications();
        });
    }

    function updateStats() {
        const total = applications.length;
        const processing = applications.filter(app => app.status === "Processing").length;
        const approved = applications.filter(app => app.status === "Approved").length;
        const rejected = applications.filter(app => app.status === "Rejected").length;

        const totalEl = document.getElementById("totalApplications");
        const procEl = document.getElementById("processingApplications");
        const appEl = document.getElementById("approvedApplications");
        const rejEl = document.getElementById("rejectedApplications");

        if (totalEl) totalEl.textContent = total;
        if (procEl) procEl.textContent = processing;
        if (appEl) appEl.textContent = approved;
        if (rejEl) rejEl.textContent = rejected;

        updatePipelineCounts();
    }

    function updatePipelineCounts() {
        const count = function(status) {
            if (!status) return applications.length;
            return applications.filter(app => app.status === status).length;
        };

        const elements = {
            "allCount": "",
            "draftCount": "Draft",
            "documentsCount": "Documents Pending",
            "submittedCount": "Submitted",
            "processingCount": "Processing",
            "approvedCount": "Approved",
            "rejectedCount": "Rejected"
        };

        Object.keys(elements).forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = count(elements[id]);
        });
    }

    function toggleModal(show) {
        if (!modal) return;
        if (show) {
            modal.classList.add("active", "show");
            document.body.style.overflow = "hidden";
        } else {
            modal.classList.remove("active", "show");
            document.body.style.overflow = "";
        }
    }

    const addAppBtn = document.getElementById("addApplicationButton");
    const closeBtn = document.getElementById("closeModal");
    const cancelBtn = document.getElementById("cancelModal");

    if (addAppBtn) addAppBtn.addEventListener("click", () => toggleModal(true));
    if (closeBtn) closeBtn.addEventListener("click", () => toggleModal(false));
    if (cancelBtn) cancelBtn.addEventListener("click", () => toggleModal(false));

    if (modal) {
        modal.addEventListener("click", function(event) {
            if (event.target === modal) toggleModal(false);
        });
    }

    const appForm = document.getElementById("applicationForm");
    if (appForm) {
        appForm.addEventListener("submit", function(event) {
            event.preventDefault();

            const newNumber = applications.length + 1;
            const newApplication = {
                id: "APP-" + String(newNumber).padStart(6, "0"),
                customerId: document.getElementById("customerId")?.value || "",
                customer: document.getElementById("customerName")?.value || "",
                passport: document.getElementById("passport")?.value || "",
                phone: document.getElementById("phone")?.value || "",
                country: document.getElementById("country")?.value || "",
                visa: document.getElementById("visa")?.value || "",
                officer: document.getElementById("officer")?.value || "",
                submission: document.getElementById("submissionDate")?.value || "",
                appointment: document.getElementById("appointmentDate")?.value || "",
                decision: document.getElementById("decisionDate")?.value || "",
                documents: document.getElementById("documentsStatus")?.value || "Pending",
                status: document.getElementById("applicationStatus")?.value || "Draft",
                priority: document.getElementById("priority")?.value || "Normal",
                fee: Number(document.getElementById("fee")?.value) || 0,
                paid: Number(document.getElementById("paid")?.value) || 0,
                notes: document.getElementById("notes")?.value || ""
            };

            applications.unshift(newApplication);
            appForm.reset();
            toggleModal(false);
            renderApplications();
            updateStats();
            alert(`Application ${newApplication.id} created successfully.`);
        });
    }

    if (tableBody) {
        tableBody.addEventListener("click", function(e) {
            const btn = e.target.closest(".action-button");
            if (!btn) return;

            if (btn.classList.contains("view-btn")) {
                const id = btn.getAttribute("data-id");
                const app = applications.find(item => item.id === id);
                if (app) {
                    const remaining = app.fee - app.paid;
                    alert(
                        "APPLICATION DETAILS\n\n" +
                        "Application ID: " + app.id +
                        "\nCustomer: " + app.customer +
                        "\nCustomer ID: " + app.customerId +
                        "\nCountry: " + app.country +
                        "\nVisa: " + app.visa +
                        "\nOfficer: " + app.officer +
                        "\nStatus: " + app.status +
                        "\nDocuments: " + app.documents +
                        "\nPriority: " + app.priority +
                        "\nSubmission: " + formatDate(app.submission) +
                        "\nAppointment: " + formatDate(app.appointment) +
                        "\nDecision: " + formatDate(app.decision) +
                        "\n\nFee: PKR " + app.fee.toLocaleString() +
                        "\nPaid: PKR " + app.paid.toLocaleString() +
                        "\nRemaining: PKR " + remaining.toLocaleString()
                    );
                }
            } else if (btn.classList.contains("edit-btn")) {
                alert("Application editing will be connected to the secure CRM database.");
            } else if (btn.classList.contains("wa-btn")) {
                const phone = btn.getAttribute("data-phone");
                const cleanPhone = phone ? phone.replace(/[^0-9]/g, "") : "";
                if (!cleanPhone) {
                    alert("Customer WhatsApp number is not available.");
                } else {
                    window.open("https://wa.me/" + cleanPhone, "_blank");
                }
            }
        });
    }

    const selectAll = document.getElementById("selectAll");
    if (selectAll) {
        selectAll.addEventListener("change", function() {
            document.querySelectorAll(".application-checkbox").forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }

    const exportBtn = document.getElementById("exportButton");
    if (exportBtn) {
        exportBtn.addEventListener("click", function() {
            let csv = "Application ID,Customer ID,Customer,Passport,Phone,Country,Visa,Officer,Submission,Appointment,Documents,Status,Priority,Fee,Paid,Remaining\n";

            applications.forEach(function(app) {
                const remaining = app.fee - app.paid;
                csv += `"${app.id}","${app.customerId}","${app.customer}","${app.passport}","${app.phone}","${app.country}","${app.visa}","${app.officer}","${app.submission}","${app.appointment}","${app.documents}","${app.status}","${app.priority}","${app.fee}","${app.paid}","${remaining}"\n`;
            });

            const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "polaris-applications.csv";
            link.click();
            URL.revokeObjectURL(url);
        });
    }

    if (menuButton && sidebar) {
        menuButton.addEventListener("click", function() {
            sidebar.classList.toggle("mobile-open");
        });
    }

    const logoutBtn = document.getElementById("logoutButton");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", function() {
            alert("Secure logout will be connected with Supabase Authentication.");
        });
    }

    renderApplications();
    updateStats();
});
