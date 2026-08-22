/* =========================================
   POLARIS CONSULTANTS
   LEAD MANAGEMENT
========================================= */


/* =========================================
   DEMO LEAD DATA
========================================= */

let leads = [

    {
        id: "POL-000001",
        name: "Muhammad Ali",
        cnic: "35202-1234567-1",
        passport: "AB1234567",
        phone: "+92 300 1111111",
        whatsapp: "+92 300 1111111",
        country: "United Kingdom",
        visa: "Study",
        assigned: "Asad",
        status: "New",
        followup: "2026-08-24",
        source: "Website",
        priority: "High"
    },

    {
        id: "POL-000002",
        name: "Ahmed Khan",
        cnic: "35202-2345678-2",
        passport: "AB2345678",
        phone: "+92 301 2222222",
        whatsapp: "+92 301 2222222",
        country: "Canada",
        visa: "Work",
        assigned: "Bilal",
        status: "Contacted",
        followup: "2026-08-25",
        source: "WhatsApp",
        priority: "Normal"
    },

    {
        id: "POL-000003",
        name: "Usman Raza",
        cnic: "35202-3456789-3",
        passport: "AB3456789",
        phone: "+92 302 3333333",
        whatsapp: "+92 302 3333333",
        country: "Australia",
        visa: "Study",
        assigned: "Salman",
        status: "Counselling",
        followup: "2026-08-26",
        source: "Facebook",
        priority: "High"
    },

    {
        id: "POL-000004",
        name: "Hassan Ahmed",
        cnic: "35202-4567890-4",
        passport: "AB4567890",
        phone: "+92 303 4444444",
        whatsapp: "+92 303 4444444",
        country: "USA",
        visa: "Visit",
        assigned: "Asad",
        status: "Follow-up",
        followup: "2026-08-22",
        source: "Instagram",
        priority: "Urgent"
    },

    {
        id: "POL-000005",
        name: "Bilal Hussain",
        cnic: "35202-5678901-5",
        passport: "AB5678901",
        phone: "+92 304 5555555",
        whatsapp: "+92 304 5555555",
        country: "Germany",
        visa: "Study",
        assigned: "Bilal",
        status: "Converted",
        followup: "2026-08-29",
        source: "Referral",
        priority: "Normal"
    },

    {
        id: "POL-000006",
        name: "Hamza Iqbal",
        cnic: "35202-6789012-6",
        passport: "AB6789012",
        phone: "+92 305 6666666",
        whatsapp: "+92 305 6666666",
        country: "UAE",
        visa: "Work",
        assigned: "Asad",
        status: "New",
        followup: "2026-08-23",
        source: "Walk-in",
        priority: "Normal"
    },

    {
        id: "POL-000007",
        name: "Saad Malik",
        cnic: "35202-7890123-7",
        passport: "AB7890123",
        phone: "+92 306 7777777",
        whatsapp: "+92 306 7777777",
        country: "Canada",
        visa: "Study",
        assigned: "Salman",
        status: "Contacted",
        followup: "2026-08-27",
        source: "Website",
        priority: "Normal"
    },

    {
        id: "POL-000008",
        name: "Adeel Shah",
        cnic: "35202-8901234-8",
        passport: "AB8901234",
        phone: "+92 307 8888888",
        whatsapp: "+92 307 8888888",
        country: "United Kingdom",
        visa: "Work",
        assigned: "Bilal",
        status: "Counselling",
        followup: "2026-08-28",
        source: "WhatsApp",
        priority: "High"
    },

    {
        id: "POL-000009",
        name: "Waqas Ahmed",
        cnic: "35202-9012345-9",
        passport: "AB9012345",
        phone: "+92 308 9999999",
        whatsapp: "+92 308 9999999",
        country: "Australia",
        visa: "Visit",
        assigned: "Asad",
        status: "Lost",
        followup: "2026-09-01",
        source: "Facebook",
        priority: "Normal"
    },

    {
        id: "POL-000010",
        name: "Fahad Khan",
        cnic: "35202-0123456-0",
        passport: "AB0123456",
        phone: "+92 309 1010101",
        whatsapp: "+92 309 1010101",
        country: "Germany",
        visa: "Study",
        assigned: "Salman",
        status: "Converted",
        followup: "2026-09-02",
        source: "Referral",
        priority: "High"
    }

];


/* =========================================
   ELEMENTS
========================================= */

const tableBody =
    document.getElementById(
        "leadTableBody"
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

const assignedFilter =
    document.getElementById(
        "assignedFilter"
    );

const resetFilters =
    document.getElementById(
        "resetFilters"
    );

const resultText =
    document.getElementById(
        "resultText"
    );


/* =========================================
   STATUS CLASS
========================================= */

function getStatusClass(status) {

    const classes = {

        "New": "status-new",

        "Contacted": "status-contacted",

        "Counselling": "status-counselling",

        "Follow-up": "status-followup",

        "Converted": "status-converted",

        "Lost": "status-lost"

    };

    return classes[status] || "status-new";
}


/* =========================================
   INITIAL
========================================= */

function renderLeads(data = leads) {

    tableBody.innerHTML = "";


    if (data.length === 0) {

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
                    No leads found.
                </td>

            </tr>

        `;

        resultText.textContent =
            "Showing 0 leads";

        return;
    }


    data.forEach(function (lead) {

        const initials =
            lead.name
                .split(" ")
                .map(word => word.charAt(0))
                .slice(0, 2)
                .join("")
                .toUpperCase();


        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <input
                    type="checkbox"
                    class="lead-checkbox"
                    value="${lead.id}"
                >
            </td>


            <td>

                <strong>
                    ${lead.id}
                </strong>

            </td>


            <td>

                <div class="customer-cell">

                    <div class="customer-avatar">
                        ${initials}
                    </div>

                    <div>

                        <strong>
                            ${lead.name}
                        </strong>

                        <small>
                            ${lead.priority} Priority
                        </small>

                    </div>

                </div>

            </td>


            <td>

                <div class="contact-cell">

                    <span>
                        ${lead.phone}
                    </span>

                    <small>
                        ${lead.whatsapp}
                    </small>

                </div>

            </td>


            <td>
                ${getFlag(lead.country)}
                ${lead.country}
            </td>


            <td>
                ${lead.visa}
            </td>


            <td>
                ${lead.assigned}
            </td>


            <td>

                <span
                    class="lead-status ${getStatusClass(lead.status)}"
                >
                    ${lead.status}
                </span>

            </td>


            <td>
                ${formatDate(lead.followup)}
            </td>


            <td>

                <div class="action-buttons">

                    <button
                        class="action-button"
                        title="View"
                        onclick="viewLead('${lead.id}')"
                    >
                        👁
                    </button>

                    <button
                        class="action-button"
                        title="Edit"
                        onclick="editLead('${lead.id}')"
                    >
                        ✎
                    </button>

                    <button
                        class="action-button"
                        title="WhatsApp"
                        onclick="openWhatsApp('${lead.whatsapp}')"
                    >
                        W
                    </button>

                </div>

            </td>

        `;


        tableBody.appendChild(row);

    });


    resultText.textContent =
        `Showing ${data.length} leads`;

}


/* =========================================
   COUNTRY FLAGS
========================================= */

function getFlag(country) {

    const flags = {

        "United Kingdom": "🇬🇧",

        "Canada": "🇨🇦",

        "Australia": "🇦🇺",

        "USA": "🇺🇸",

        "Germany": "🇩🇪",

        "UAE": "🇦🇪",

        "Turkey": "🇹🇷"

    };

    return flags[country] || "🌍";

}


/* =========================================
   DATE
========================================= */

function formatDate(dateString) {

    if (!dateString) {
        return "-";
    }

    const date =
        new Date(dateString);

    return date.toLocaleDateString(
        "en-GB",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================
   FILTER
========================================= */

function filterLeads() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const country =
        countryFilter.value;

    const visa =
        visaFilter.value;

    const assigned =
        assignedFilter.value;


    const activePipeline =
        document.querySelector(
            ".pipeline-card.active"
        );


    const pipelineStatus =
        activePipeline
            ? activePipeline.dataset.status
            : "all";


    const filtered =
        leads.filter(function (lead) {


            const searchMatch =

                !search ||

                lead.id
                    .toLowerCase()
                    .includes(search) ||

                lead.name
                    .toLowerCase()
                    .includes(search) ||

                lead.phone
                    .toLowerCase()
                    .includes(search) ||

                lead.cnic
                    .toLowerCase()
                    .includes(search) ||

                lead.passport
                    .toLowerCase()
                    .includes(search);


            const countryMatch =

                !country ||
                lead.country === country;


            const visaMatch =

                !visa ||
                lead.visa === visa;


            const assignedMatch =

                !assigned ||
                lead.assigned === assigned;


            const pipelineMatch =

                pipelineStatus === "all" ||

                lead.status === pipelineStatus;


            return (

                searchMatch &&

                countryMatch &&

                visaMatch &&

                assignedMatch &&

                pipelineMatch

            );

        });


    renderLeads(filtered);

}


/* =========================================
   INPUT EVENTS
========================================= */

searchInput.addEventListener(
    "input",
    filterLeads
);


countryFilter.addEventListener(
    "change",
    filterLeads
);


visaFilter.addEventListener(
    "change",
    filterLeads
);


assignedFilter.addEventListener(
    "change",
    filterLeads
);


/* =========================================
   RESET
========================================= */

resetFilters.addEventListener(
    "click",
    function () {

        searchInput.value = "";

        countryFilter.value = "";

        visaFilter.value = "";

        assignedFilter.value = "";


        document
            .querySelectorAll(
                ".pipeline-card"
            )
            .forEach(function (card) {

                card.classList.remove(
                    "active"
                );

            });


        document
            .querySelector(
                '.pipeline-card[data-status="all"]'
            )
            .classList.add("active");


        renderLeads();

    }
);


/* =========================================
   PIPELINE FILTER
========================================= */

document
    .querySelectorAll(".pipeline-card")
    .forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                document
                    .querySelectorAll(
                        ".pipeline-card"
                    )
                    .forEach(function (item) {

                        item.classList.remove(
                            "active"
                        );

                    });


                card.classList.add(
                    "active"
                );


                filterLeads();

            }
        );

    });


/* =========================================
   ADD LEAD MODAL
========================================= */

const modal =
    document.getElementById(
        "leadModal"
    );

const addLeadButton =
    document.getElementById(
        "addLeadButton"
    );

const closeModal =
    document.getElementById(
        "closeModal"
    );

const cancelModal =
    document.getElementById(
        "cancelModal"
    );


function openModal() {

    modal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function closeLeadModal() {

    modal.classList.remove("show");

    document.body.style.overflow =
        "";

}


addLeadButton.addEventListener(
    "click",
    openModal
);


closeModal.addEventListener(
    "click",
    closeLeadModal
);


cancelModal.addEventListener(
    "click",
    closeLeadModal
);


modal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === modal
        ) {

            closeLeadModal();

        }

    }
);


/* =========================================
   ADD NEW LEAD
========================================= */

const leadForm =
    document.getElementById(
        "leadForm"
    );


leadForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const newNumber =
            leads.length + 1;


        const newLead = {

            id:
                "POL-" +
                String(newNumber)
                    .padStart(6, "0"),

            name:
                document
                    .getElementById("fullName")
                    .value,

            cnic:
                document
                    .getElementById("cnic")
                    .value,

            passport:
                document
                    .getElementById("passport")
                    .value,

            phone:
                document
                    .getElementById("phone")
                    .value,

            whatsapp:
                document
                    .getElementById("whatsapp")
                    .value,

            country:
                document
                    .getElementById("country")
                    .value,

            visa:
                document
                    .getElementById("visaType")
                    .value,

            assigned:
                document
                    .getElementById("assignedEmployee")
                    .value,

            status:
                "New",

            followup:
                document
                    .getElementById("followupDate")
                    .value,

            source:
                document
                    .getElementById("leadSource")
                    .value,

            priority:
                document
                    .getElementById("priority")
                    .value

        };


        leads.unshift(newLead);


        leadForm.reset();


        closeLeadModal();


        renderLeads();


        alert(
            `Lead ${newLead.id} created successfully.`
        );

    }
);


/* =========================================
   VIEW LEAD
========================================= */

function viewLead(id) {

    const lead =
        leads.find(
            item => item.id === id
        );


    if (!lead) {
        return;
    }


    alert(

        "LEAD DETAILS\n\n" +

        "Lead ID: " +
        lead.id +

        "\nName: " +
        lead.name +

        "\nPhone: " +
        lead.phone +

        "\nCountry: " +
        lead.country +

        "\nVisa: " +
        lead.visa +

        "\nAssigned: " +
        lead.assigned +

        "\nStatus: " +
        lead.status

    );

}


/* =========================================
   EDIT LEAD
========================================= */

function editLead(id) {

    const lead =
        leads.find(
            item => item.id === id
        );


    if (!lead) {
        return;
    }


    alert(
        "Edit Lead module will be connected to the full CRM database."
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

const selectAll =
    document.getElementById(
        "selectAll"
    );


selectAll.addEventListener(
    "change",
    function () {

        document
            .querySelectorAll(
                ".lead-checkbox"
            )
            .forEach(function (checkbox) {

                checkbox.checked =
                    selectAll.checked;

            });

    }
);


/* =========================================
   EXPORT
========================================= */

const exportButton =
    document.getElementById(
        "exportButton"
    );


exportButton.addEventListener(
    "click",
    function () {

        let csv =
            "Lead ID,Name,Phone,Country,Visa,Assigned,Status,Follow-up\n";


        leads.forEach(function (lead) {

            csv +=

                `"${lead.id}",` +

                `"${lead.name}",` +

                `"${lead.phone}",` +

                `"${lead.country}",` +

                `"${lead.visa}",` +

                `"${lead.assigned}",` +

                `"${lead.status}",` +

                `"${lead.followup}"\n`;

        });


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
            "polaris-leads.csv";


        link.click();


        URL.revokeObjectURL(url);

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
    function () {

        sidebar.classList.toggle(
            "mobile-open"
        );

    }
);


/* =========================================
   LOGOUT
========================================= */

document
    .getElementById("logoutButton")
    .addEventListener(
        "click",
        function () {

            alert(
                "Secure logout will be connected with Supabase Authentication."
            );

        }
    );


/* =========================================
   INITIAL RENDER
========================================= */

renderLeads();


console.log(
    "Polaris Consultants Lead CRM loaded."
);
