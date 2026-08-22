/* =========================================
   POLARIS CONSULTANTS
   ADMIN DASHBOARD JAVASCRIPT
========================================= */


/* =========================================
   MOBILE SIDEBAR
========================================= */

const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.getElementById("sidebar");


if (menuButton && sidebar) {

    menuButton.addEventListener(
        "click",
        function () {

            sidebar.classList.toggle(
                "mobile-open"
            );

        }
    );

}


/* =========================================
   CLOSE SIDEBAR WHEN LINK IS CLICKED
========================================= */

const sidebarLinks =
    document.querySelectorAll(
        ".sidebar-link"
    );


sidebarLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function () {

            if (
                window.innerWidth <= 900 &&
                sidebar
            ) {

                sidebar.classList.remove(
                    "mobile-open"
                );

            }

        }
    );

});


/* =========================================
   LOGOUT
========================================= */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                /*
                    Real authentication logout
                    will be connected with
                    Supabase in a later step.
                */

                alert(
                    "Authentication will be connected in the next security phase."
                );

            }

        }
    );

}


/* =========================================
   QUICK ACTIONS
========================================= */

const quickCards =
    document.querySelectorAll(
        ".quick-card"
    );


quickCards.forEach(function (card) {

    card.addEventListener(
        "click",
        function (event) {

            const target =
                card.getAttribute("href");


            if (
                target &&
                target.startsWith("#")
            ) {

                event.preventDefault();

                const actionName =
                    card
                        .querySelector("strong")
                        ?.textContent ||
                    "Action";


                alert(
                    `${actionName} module will be connected to the CRM system.`
                );

            }

        }
    );

});


/* =========================================
   NOTIFICATION BUTTON
========================================= */

const notificationButton =
    document.querySelector(
        ".notification-button"
    );


if (notificationButton) {

    notificationButton.addEventListener(
        "click",
        function () {

            alert(
                "Notifications will appear here."
            );

        }
    );

}


/* =========================================
   DASHBOARD DEMO DATA
========================================= */

const dashboardData = {

    totalLeads: 124,

    activeApplications: 75,

    totalRevenue: 1980000,

    pendingFollowups: 17

};


/* =========================================
   UPDATE DASHBOARD STATS
========================================= */

const totalLeads =
    document.getElementById(
        "totalLeads"
    );


if (totalLeads) {

    totalLeads.textContent =
        dashboardData.totalLeads;

}


const activeApplications =
    document.getElementById(
        "activeApplications"
    );


if (activeApplications) {

    activeApplications.textContent =
        dashboardData.activeApplications;

}


const totalRevenue =
    document.getElementById(
        "totalRevenue"
    );


if (totalRevenue) {

    totalRevenue.textContent =
        "Rs. " +
        dashboardData.totalRevenue.toLocaleString(
            "en-PK"
        );

}


const pendingFollowups =
    document.getElementById(
        "pendingFollowups"
    );


if (pendingFollowups) {

    pendingFollowups.textContent =
        dashboardData.pendingFollowups;

}


/* =========================================
   CONSOLE
========================================= */

console.log(
    "Polaris Consultants Admin Dashboard loaded."
);

console.log(
    "Database and authentication will be connected in the next phases."
);
