/* =========================================
   POLARIS CONSULTANTS
   ADMIN DASHBOARD JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // DOM ELEMENTS
    const menuButton = document.getElementById("menuButton") || document.getElementById("mobileMenuButton");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const logoutButton = document.getElementById("logoutButton");
    const notificationButton = document.querySelector(".notification-button") || document.getElementById("notificationButton");
    const navItems = document.querySelectorAll(".nav-item, .sidebar-link");
    const quickActions = document.querySelectorAll(".quick-action, .quick-card");
    const pageSections = document.querySelectorAll(".page-section");
    const pageTitle = document.getElementById("pageTitle");

    /* =========================================
       MOBILE SIDEBAR TOGGLE
    ========================================= */
    function toggleSidebar() {
        if (sidebar) {
            sidebar.classList.toggle("mobile-open");
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.toggle("active");
        }
    }

    function closeSidebar() {
        if (sidebar) {
            sidebar.classList.remove("mobile-open");
        }
        if (sidebarOverlay) {
            sidebarOverlay.classList.remove("active");
        }
    }

    if (menuButton) {
        menuButton.addEventListener("click", toggleSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", closeSidebar);
    }

    /* =========================================
       SECTION SWITCHING & NAVIGATION
    ========================================= */
    function switchSection(targetSectionId) {
        if (!targetSectionId) return;

        // Hide all sections
        pageSections.forEach(section => {
            section.classList.remove("active-section");
            section.classList.add("hidden");
        });

        // Show target section
        const targetSection = document.getElementById(`${targetSectionId}Section`);
        if (targetSection) {
            targetSection.classList.remove("hidden");
            targetSection.classList.add("active-section");
        }

        // Update Nav Active State
        navItems.forEach(item => {
            if (item.getAttribute("data-section") === targetSectionId) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        // Update Page Title
        if (pageTitle) {
            pageTitle.textContent = targetSectionId.charAt(0).toUpperCase() + targetSectionId.slice(1);
        }

        // Close sidebar on mobile after selection
        if (window.innerWidth <= 900) {
            closeSidebar();
        }
    }

    // Attach click handlers to Nav Items
    navItems.forEach(item => {
        item.addEventListener("click", function () {
            const section = this.getAttribute("data-section");
            if (section) switchSection(section);
        });
    });

    // Attach click handlers to Quick Actions
    quickActions.forEach(button => {
        button.addEventListener("click", function () {
            const section = this.getAttribute("data-section");
            if (section) switchSection(section);
        });
    });

    /* =========================================
       LOGOUT HANDLER
    ========================================= */
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            const confirmLogout = confirm("Are you sure you want to logout?");
            if (confirmLogout) {
                alert("Authentication module will handle redirect upon Supabase integration.");
            }
        });
    }

    /* =========================================
       NOTIFICATIONS
    ========================================= */
    if (notificationButton) {
        notificationButton.addEventListener("click", function () {
            alert("No new notifications.");
        });
    }

    /* =========================================
       DASHBOARD INITIAL DATA POPULATION
    ========================================= */
    const dashboardData = {
        totalCustomers: 48,
        totalLeads: 124,
        totalApplications: 75,
        totalCountries: 12,
        totalReceived: 1980000,
        totalPaid: 450000,
        netBalance: 1530000
    };

    function populateDashboardStats() {
        const totalCustEl = document.getElementById("totalCustomers");
        const totalLeadsEl = document.getElementById("totalLeads");
        const totalAppsEl = document.getElementById("totalApplications");
        const totalCountEl = document.getElementById("totalCountries");
        
        // Financial Elements
        const totalRecEl = document.getElementById("totalReceived");
        const totalPaidEl = document.getElementById("totalPaid") || document.getElementById("totalExpenses");
        const netBalEl = document.getElementById("netBalance");

        if (totalCustEl) totalCustEl.textContent = dashboardData.totalCustomers;
        if (totalLeadsEl) totalLeadsEl.textContent = dashboardData.totalLeads;
        if (totalAppsEl) totalAppsEl.textContent = dashboardData.totalApplications;
        if (totalCountEl) totalCountEl.textContent = dashboardData.totalCountries;

        const formatPKR = (num) => "PKR " + num.toLocaleString("en-PK");

        if (totalRecEl) totalRecEl.textContent = formatPKR(dashboardData.totalReceived);
        if (totalPaidEl) totalPaidEl.textContent = formatPKR(dashboardData.totalPaid);
        if (netBalEl) netBalEl.textContent = formatPKR(dashboardData.netBalance);
    }

    populateDashboardStats();

    console.log("Polaris Consultants Admin Dashboard loaded successfully.");
});
