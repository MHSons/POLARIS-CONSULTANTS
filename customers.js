/* =========================================================
   POLARIS CONSULTANTS - CUSTOMER MANAGEMENT
========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
    // State management
    let customers = [];
    let editingCustomerId = null;

    // DOM Elements
    const customerTableBody = document.getElementById("customersTableBody");
    const searchInput = document.getElementById("searchInput");
    const filterStatus = document.getElementById("filterStatus");
    const filterGender = document.getElementById("filterGender");
    const resetFiltersBtn = document.getElementById("resetFilters");

    const customerModal = document.getElementById("customerModal");
    const openAddModalBtn = document.getElementById("openAddCustomerModal");
    const closeModalBtn = document.getElementById("closeModalButton");
    const cancelModalBtn = document.getElementById("cancelModalButton");
    const customerForm = document.getElementById("customerForm");
    const modalTitle = document.getElementById("modalTitle");

    const menuToggleBtn = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");

    // Initialize Supabase Client
    const supabase = typeof getPolarisSupabase === "function" ? getPolarisSupabase() : null;

    // =========================================
    // DATA FETCHING & SYNC
    // =========================================
    async function loadCustomers() {
        if (!supabase) {
            renderError("Supabase connection not established.");
            return;
        }

        try {
            renderLoading();
            const { data, error } = await supabase
                .from("customers")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;

            customers = data || [];
            render();
        } catch (error) {
            console.error("Error fetching customers:", error.message);
            renderError("Failed to fetch customer data.");
        }
    }

    // =========================================
    // UI CORE FUNCTIONS
    // =========================================
    function render() {
        renderStats();
        renderTable();
    }

    function renderLoading() {
        customerTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 30px; color: var(--muted);">
                    <i class="fa-solid fa-circle-notch fa-spin"></i> Loading customer records...
                </td>
            </tr>`;
    }

    function renderError(message) {
        customerTableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 30px; color: var(--red);">
                    <i class="fa-solid fa-triangle-exclamation"></i> ${message}
                </td>
            </tr>`;
    }

    // 1. Stats Calculation
    function renderStats() {
        const total = customers.length;
        const active = customers.filter(c => (c.status || "").toLowerCase() === "active").length;
        const pending = customers.filter(c => (c.status || "").toLowerCase() === "pending").length;
        const completed = customers.filter(c => (c.status || "").toLowerCase() === "completed").length;

        document.getElementById("statTotalCustomers").innerText = total;
        document.getElementById("statActiveCustomers").innerText = active;
        document.getElementById("statPendingCustomers").innerText = pending;
        document.getElementById("statCompletedCustomers").innerText = completed;
    }

    // 2. Table Rendering & Filtering
    function renderTable() {
        const query = (searchInput.value || "").toLowerCase().trim();
        const selectedStatus = filterStatus.value;
        const selectedGender = filterGender.value;

        const filtered = customers.filter(c => {
            const matchesSearch =
                (c.full_name || "").toLowerCase().includes(query) ||
                (c.cnic || "").includes(query) ||
                (c.passport_number || "").toLowerCase().includes(query) ||
                (c.phone || "").includes(query);

            const matchesStatus = !selectedStatus || c.status === selectedStatus;
            const matchesGender = !selectedGender || c.gender === selectedGender;

            return matchesSearch && matchesStatus && matchesGender;
        });

        customerTableBody.innerHTML = "";

        if (filtered.length === 0) {
            customerTableBody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align: center; padding: 30px; color: var(--muted);">
                        No matching customer profiles found.
                    </td>
                </tr>`;
            updatePaginationInfo(0, customers.length);
            return;
        }

        filtered.forEach(c => {
            const tr = document.createElement("tr");
            const statusClass = getStatusBadgeClass(c.status);

            tr.innerHTML = `
                <td>
                    <div class="customer-cell">
                        <div class="customer-avatar">${getInitials(c.full_name)}</div>
                        <div class="customer-name">
                            <strong>${escapeHtml(c.full_name)}</strong>
                            <small>${escapeHtml(c.gender || "N/A")}</small>
                        </div>
                    </div>
                </td>
                <td>${escapeHtml(c.cnic || "N/A")}</td>
                <td>${escapeHtml(c.passport_number || "N/A")}</td>
                <td>
                    <div class="contact-cell">
                        <span>${escapeHtml(c.phone || "N/A")}</span>
                        <small>${escapeHtml(c.email || "No Email")}</small>
                    </div>
                </td>
                <td>${escapeHtml(c.city || "N/A")}</td>
                <td>
                    <span class="customer-status ${statusClass}">${escapeHtml(c.status || "Active")}</span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="action-button edit-btn" data-id="${c.id}" title="Edit"><i class="fa-solid fa-pen"></i></button>
                        <button class="action-button delete-btn" data-id="${c.id}" title="Delete"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </td>
            `;
            customerTableBody.appendChild(tr);
        });

        updatePaginationInfo(filtered.length, customers.length);
    }

    function updatePaginationInfo(showingCount, totalCount) {
        const info = document.getElementById("paginationInfo");
        if (info) {
            info.innerText = `Showing 1 to ${showingCount} of ${totalCount} entries`;
        }
    }

    function getInitials(name) {
        if (!name) return "C";
        const parts = name.trim().split(" ");
        return parts.length >= 2
            ? (parts[0][0] + parts[1][0]).toUpperCase()
            : parts[0][0].toUpperCase();
    }

    function getStatusBadgeClass(status) {
        switch ((status || "").toLowerCase()) {
            case "active": return "status-active";
            case "pending": return "status-pending";
            case "completed": return "status-completed";
            case "closed": return "status-closed";
            default: return "status-active";
        }
    }

    function escapeHtml(str) {
        return String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;");
    }

    // =========================================
    // MODAL & FORM HANDLING
    // =========================================
    function openModal(isEdit = false) {
        customerModal.classList.add("show");
        if (!isEdit) {
            editingCustomerId = null;
            customerForm.reset();
            document.getElementById("customerId").value = "";
            modalTitle.innerText = "Add New Customer";
        }
    }

    function closeModal() {
        customerModal.classList.remove("show");
        customerForm.reset();
        editingCustomerId = null;
    }

    function populateEditForm(customer) {
        editingCustomerId = customer.id;
        modalTitle.innerText = "Edit Customer Profile";

        document.getElementById("customerId").value = customer.id || "";
        document.getElementById("fullName").value = customer.full_name || "";
        document.getElementById("cnic").value = customer.cnic || "";
        document.getElementById("passportNumber").value = customer.passport_number || "";
        document.getElementById("dateOfBirth").value = customer.date_of_birth || "";
        document.getElementById("gender").value = customer.gender || "Male";
        document.getElementById("nationality").value = customer.nationality || "Pakistani";
        document.getElementById("phone").value = customer.phone || "";
        document.getElementById("whatsappNumber").value = customer.whatsapp_number || "";
        document.getElementById("email").value = customer.email || "";
        document.getElementById("city").value = customer.city || "";
        document.getElementById("address").value = customer.address || "";

        openModal(true);
    }

    // Handle Form Submit (Insert/Update)
    customerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const payload = {
            full_name: document.getElementById("fullName").value.trim(),
            cnic: document.getElementById("cnic").value.trim(),
            passport_number: document.getElementById("passportNumber").value.trim(),
            date_of_birth: document.getElementById("dateOfBirth").value || null,
            gender: document.getElementById("gender").value,
            nationality: document.getElementById("nationality").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            whatsapp_number: document.getElementById("whatsappNumber").value.trim(),
            email: document.getElementById("email").value.trim(),
            city: document.getElementById("city").value.trim(),
            address: document.getElementById("address").value.trim(),
            status: "Active"
        };

        const saveButton = document.getElementById("saveCustomerButton");
        const originalBtnText = saveButton.innerHTML;
        saveButton.disabled = true;
        saveButton.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Saving...`;

        try {
            if (editingCustomerId) {
                const { error } = await supabase
                    .from("customers")
                    .update(payload)
                    .eq("id", editingCustomerId);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("customers")
                    .insert([payload]);

                if (error) throw error;
            }

            closeModal();
            await loadCustomers();
        } catch (error) {
            console.error("Error saving customer:", error.message);
            alert(`Failed to save customer record: ${error.message}`);
        } finally {
            saveButton.disabled = false;
            saveButton.innerHTML = originalBtnText;
        }
    });

    // Delete Customer Record
    async function deleteCustomer(id) {
        if (!confirm("Are you sure you want to delete this customer record?")) return;

        try {
            const { error } = await supabase
                .from("customers")
                .delete()
                .eq("id", id);

            if (error) throw error;

            await loadCustomers();
        } catch (error) {
            console.error("Error deleting customer:", error.message);
            alert(`Unable to delete record: ${error.message}`);
        }
    }

    // =========================================
    // EVENT LISTENERS
    // =========================================
    if (openAddModalBtn) openAddModalBtn.addEventListener("click", () => openModal(false));
    if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
    if (cancelModalBtn) cancelModalBtn.addEventListener("click", closeModal);

    // Dynamic Delegate for Edit / Delete Buttons
    customerTableBody.addEventListener("click", (e) => {
        const btn = e.target.closest(".action-button");
        if (!btn) return;

        const id = btn.getAttribute("data-id");
        if (btn.classList.contains("edit-btn")) {
            const customer = customers.find(c => String(c.id) === String(id));
            if (customer) populateEditForm(customer);
        } else if (btn.classList.contains("delete-btn")) {
            deleteCustomer(id);
        }
    });

    // Filter Controls
    searchInput.addEventListener("input", renderTable);
    filterStatus.addEventListener("change", renderTable);
    filterGender.addEventListener("change", renderTable);

    resetFiltersBtn.addEventListener("click", () => {
        searchInput.value = "";
        filterStatus.value = "";
        filterGender.value = "";
        renderTable();
    });

    // Mobile Sidebar Toggle
    if (menuToggleBtn && sidebar) {
        menuToggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("mobile-open");
        });
    }

    // Initial Load
    await loadCustomers();
});
