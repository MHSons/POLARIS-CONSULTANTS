/* =========================================
   POLARIS CONSULTANTS
   MAIN WEBSITE JAVASCRIPT
========================================= */


/* =========================================
   CURRENT YEAR
========================================= */

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}



/* =========================================
   MOBILE MENU
========================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileMenu =
    document.getElementById("mobileMenu");


if (mobileMenuButton && mobileMenu) {

    mobileMenuButton.addEventListener("click", function () {

        mobileMenu.classList.toggle("active");

    });


    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    mobileLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            mobileMenu.classList.remove("active");

        });

    });

}



/* =========================================
   APPLICATION FORM
========================================= */

const applicationForm =
    document.getElementById("applicationForm");

const formSuccess =
    document.getElementById("formSuccess");


if (applicationForm) {

    applicationForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const fullName =
            document.getElementById("fullName").value.trim();

        const phone =
            document.getElementById("phone").value.trim();

        const country =
            document.getElementById("country").value;

        const visaType =
            document.getElementById("visaType").value;


        if (
            !fullName ||
            !phone ||
            !country ||
            !visaType
        ) {

            alert(
                "Please complete all required fields."
            );

            return;

        }


        /*
            TEMPORARY FRONTEND ACTION

            Later this form will connect to:
            Supabase Database
            CRM
            WhatsApp
            Lead ID generation
        */


        if (formSuccess) {

            formSuccess.classList.add("show");

        }


        /*
            Temporary WhatsApp message

            Replace this number with the
            official Polaris WhatsApp number.
        */


        const whatsappNumber =
            "923018067889";


        const message =
            `New Visa Inquiry - Polaris Consultants

Name: ${fullName}
Phone: ${phone}
Country: ${country}
Visa Type: ${visaType}

Please contact this customer.`;


        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;


        /*
            Open WhatsApp after a short delay.
        */

        setTimeout(function () {

            window.open(
                whatsappURL,
                "_blank"
            );

        }, 700);


        /*
            Reset form after submission.
        */

        applicationForm.reset();

    });

}



/* =========================================
   SMOOTH INTERNAL LINKS
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(
    function (link) {

        link.addEventListener("click", function (event) {

            const targetID =
                this.getAttribute("href");

            if (
                targetID &&
                targetID !== "#"
            ) {

                const target =
                    document.querySelector(targetID);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    }
);



/* =========================================
   CONSOLE MESSAGE
========================================= */

console.log(
    "POLARIS CONSULTANTS website loaded successfully."
);

console.log(
    "CRM, Finance, Applications and Admin modules will be connected in later steps."
);
