/* =========================================================
   POLARIS CONSULTANTS
   APPLY FORM
   DATABASE CONNECTED VERSION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        /* =================================================
           ELEMENTS
        ================================================= */

        const form =
            document.getElementById(
                "visaApplicationForm"
            );

        const submitButton =
            document.getElementById(
                "submitButton"
            );

        const buttonText =
            document.getElementById(
                "buttonText"
            );

        const buttonLoader =
            document.getElementById(
                "buttonLoader"
            );

        const formMessage =
            document.getElementById(
                "formMessage"
            );

        const cnicInput =
            document.getElementById(
                "cnic"
            );

        const currentYear =
            document.getElementById(
                "currentYear"
            );


        /* =================================================
           CURRENT YEAR
        ================================================= */

        if (currentYear) {

            currentYear.textContent =
                new Date().getFullYear();

        }


        /* =================================================
           CNIC FORMAT
        ================================================= */

        if (cnicInput) {

            cnicInput.addEventListener(
                "input",
                function () {

                    let value =
                        this.value.replace(
                            /\D/g,
                            ""
                        );

                    if (value.length > 13) {

                        value =
                            value.substring(
                                0,
                                13
                            );

                    }

                    if (value.length > 5) {

                        value =
                            value.substring(
                                0,
                                5
                            ) +
                            "-" +
                            value.substring(
                                5
                            );

                    }

                    if (value.length > 13) {

                        value =
                            value.substring(
                                0,
                                13
                            ) +
                            "-" +
                            value.substring(
                                13
                            );

                    }

                    this.value = value;

                }
            );

        }


        /* =================================================
           ERROR FUNCTIONS
        ================================================= */

        function showError(
            input,
            message
        ) {

            if (!input) {
                return;
            }

            input.classList.add(
                "input-error"
            );

            const parent =
                input.closest(
                    ".form-group"
                );

            if (!parent) {
                return;
            }

            const error =
                parent.querySelector(
                    ".error-message"
                );

            if (error) {

                error.textContent =
                    message;

            }

        }


        function clearError(
            input
        ) {

            if (!input) {
                return;
            }

            input.classList.remove(
                "input-error"
            );

            const parent =
                input.closest(
                    ".form-group"
                );

            if (!parent) {
                return;
            }

            const error =
                parent.querySelector(
                    ".error-message"
                );

            if (error) {

                error.textContent =
                    "";

            }

        }


        /* =================================================
           REQUIRED FIELD VALIDATION
        ================================================= */

        function validateRequired(
            input,
            message
        ) {

            if (
                !input ||
                !input.value.trim()
            ) {

                showError(
                    input,
                    message
                );

                return false;

            }

            clearError(input);

            return true;

        }


        /* =================================================
           FORM VALIDATION
        ================================================= */

        function validateForm() {

            let valid = true;


            const fullName =
                document.getElementById(
                    "fullName"
                );

            const cnic =
                document.getElementById(
                    "cnic"
                );

            const passportNumber =
                document.getElementById(
                    "passportNumber"
                );

            const phone =
                document.getElementById(
                    "phone"
                );

            const address =
                document.getElementById(
                    "address"
                );

            const country =
                document.getElementById(
                    "country"
                );

            const visaType =
                document.getElementById(
                    "visaType"
                );

            const consent =
                document.getElementById(
                    "consent"
                );


            /* FULL NAME */

            if (
                !validateRequired(
                    fullName,
                    "Please enter your full name."
                )
            ) {

                valid = false;

            }


            /* CNIC */

            if (
                !validateRequired(
                    cnic,
                    "Please enter your CNIC."
                )
            ) {

                valid = false;

            }
            else if (
                cnic.value.length !== 15
            ) {

                showError(
                    cnic,
                    "Please enter a valid CNIC."
                );

                valid = false;

            }


            /* PASSPORT */

            if (
                !validateRequired(
                    passportNumber,
                    "Please enter your passport number."
                )
            ) {

                valid = false;

            }


            /* PHONE */

            if (
                !validateRequired(
                    phone,
                    "Please enter your phone number."
                )
            ) {

                valid = false;

            }


            /* ADDRESS */

            if (
                !validateRequired(
                    address,
                    "Please enter your address."
                )
            ) {

                valid = false;

            }


            /* COUNTRY */

            if (
                !validateRequired(
                    country,
                    "Please select your destination country."
                )
            ) {

                valid = false;

            }


            /* VISA TYPE */

            if (
                !validateRequired(
                    visaType,
                    "Please select your visa type."
                )
            ) {

                valid = false;

            }


            /* CONSENT */

            const consentError =
                document.getElementById(
                    "consentError"
                );

            if (
                !consent.checked
            ) {

                if (consentError) {

                    consentError.textContent =
                        "Please confirm the information.";

                }

                valid = false;

            }
            else {

                if (consentError) {

                    consentError.textContent =
                        "";

                }

            }


            return valid;

        }


        /* =================================================
           GET FORM DATA
        ================================================= */

        function getFormData() {

            return {

                fullName:
                    document.getElementById(
                        "fullName"
                    ).value.trim(),

                cnic:
                    document.getElementById(
                        "cnic"
                    ).value.trim(),

                passportNumber:
                    document.getElementById(
                        "passportNumber"
                    ).value.trim(),

                passportExpiry:
                    document.getElementById(
                        "passportExpiry"
                    ).value || null,

                dateOfBirth:
                    document.getElementById(
                        "dateOfBirth"
                    ).value || null,

                gender:
                    document.getElementById(
                        "gender"
                    ).value || null,

                nationality:
                    document.getElementById(
                        "nationality"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "phone"
                    ).value.trim(),

                whatsappNumber:
                    document.getElementById(
                        "whatsappNumber"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "email"
                    ).value.trim(),

                city:
                    document.getElementById(
                        "city"
                    ).value.trim(),

                address:
                    document.getElementById(
                        "address"
                    ).value.trim(),

                country:
                    document.getElementById(
                        "country"
                    ).value,

                visaType:
                    document.getElementById(
                        "visaType"
                    ).value,

                courseName:
                    document.getElementById(
                        "courseName"
                    ).value.trim(),

                universityName:
                    document.getElementById(
                        "universityName"
                    ).value.trim(),

                intake:
                    document.getElementById(
                        "intake"
                    ).value.trim(),

                employerName:
                    document.getElementById(
                        "employerName"
                    ).value.trim(),

                jobTitle:
                    document.getElementById(
                        "jobTitle"
                    ).value.trim(),

                visitPurpose:
                    document.getElementById(
                        "visitPurpose"
                    ).value.trim(),

                source:
                    document.getElementById(
                        "source"
                    ).value || "Website",

                notes:
                    document.getElementById(
                        "notes"
                    ).value.trim()

            };

        }


        /* =================================================
           SAVE CUSTOMER
        ================================================= */

        async function createCustomer(
            data
        ) {

            const {
                data: customer,
                error
            } =
                await supabaseClient
                    .from("customers")
                    .insert([
                        {

                            full_name:
                                data.fullName,

                            cnic:
                                data.cnic,

                            passport_number:
                                data.passportNumber,

                            phone:
                                data.phone,

                            whatsapp_number:
                                data.whatsappNumber,

                            email:
                                data.email,

                            date_of_birth:
                                data.dateOfBirth,

                            gender:
                                data.gender,

                            nationality:
                                data.nationality,

                            city:
                                data.city,

                            address:
                                data.address

                        }
                    ])
                    .select()
                    .single();


            if (error) {

                console.error(
                    "Customer Error:",
                    error
                );

                throw error;

            }


            return customer;

        }


        /* =================================================
           SAVE LEAD
        ================================================= */

        async function createLead(
            data,
            customerId
        ) {

            const {
                data: lead,
                error
            } =
                await supabaseClient
                    .from("leads")
                    .insert([
                        {

                            customer_id:
                                customerId,

                            country:
                                data.country,

                            visa_type:
                                data.visaType,

                            source:
                                data.source,

                            status:
                                "New",

                            assigned_team:
                                null,

                            assigned_staff:
                                null,

                            notes:
                                data.notes

                        }
                    ])
                    .select()
                    .single();


            if (error) {

                console.error(
                    "Lead Error:",
                    error
                );

                throw error;

            }


            return lead;

        }


        /* =================================================
           SAVE APPLICATION
        ================================================= */

        async function createApplication(
            data,
            customerId,
            leadId
        ) {

            const {
                data: application,
                error
            } =
                await supabaseClient
                    .from("applications")
                    .insert([
                        {

                            customer_id:
                                customerId,

                            lead_id:
                                leadId,

                            full_name:
                                data.fullName,

                            cnic:
                                data.cnic,

                            passport_number:
                                data.passportNumber,

                            passport_expiry:
                                data.passportExpiry,

                            date_of_birth:
                                data.dateOfBirth,

                            gender:
                                data.gender,

                            nationality:
                                data.nationality,

                            phone:
                                data.phone,

                            whatsapp_number:
                                data.whatsappNumber,

                            email:
                                data.email,

                            city:
                                data.city,

                            address:
                                data.address,

                            country:
                                data.country,

                            visa_type:
                                data.visaType,

                            course_name:
                                data.courseName,

                            university_name:
                                data.universityName,

                            intake:
                                data.intake,

                            employer_name:
                                data.employerName,

                            job_title:
                                data.jobTitle,

                            visit_purpose:
                                data.visitPurpose,

                            source:
                                data.source,

                            notes:
                                data.notes,

                            status:
                                "New"

                        }
                    ])
                    .select()
                    .single();


            if (error) {

                console.error(
                    "Application Error:",
                    error
                );

                throw error;

            }


            return application;

        }


        /* =================================================
           WHATSAPP MESSAGE
        ================================================= */

        function createWhatsAppMessage(
            data
        ) {

            return `
*NEW VISA INQUIRY*

*POLARIS CONSULTANTS*

━━━━━━━━━━━━━━━━━━

*PERSONAL INFORMATION*

Name:
${data.fullName}

CNIC:
${data.cnic}

Passport:
${data.passportNumber}

Phone:
${data.phone}

WhatsApp:
${data.whatsappNumber || data.phone}

Email:
${data.email || "Not Provided"}

City:
${data.city || "Not Provided"}

Address:
${data.address}

━━━━━━━━━━━━━━━━━━

*VISA INFORMATION*

Country:
${data.country}

Visa Type:
${data.visaType}

Course:
${data.courseName || "N/A"}

University:
${data.universityName || "N/A"}

Intake:
${data.intake || "N/A"}

Employer:
${data.employerName || "N/A"}

Job Title:
${data.jobTitle || "N/A"}

Visit Purpose:
${data.visitPurpose || "N/A"}

━━━━━━━━━━━━━━━━━━

*LEAD SOURCE*

${data.source}

━━━━━━━━━━━━━━━━━━

*ADDITIONAL NOTES*

${data.notes || "None"}

━━━━━━━━━━━━━━━━━━

POLARIS CONSULTANTS
Website Application
            `.trim();

        }


        /* =================================================
           SUBMIT FORM
        ================================================= */

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                /* CLEAR MESSAGE */

                formMessage.textContent =
                    "";

                formMessage.className =
                    "form-message";


                /* VALIDATE */

                if (
                    !validateForm()
                ) {

                    formMessage.textContent =
                        "Please correct the highlighted fields.";

                    formMessage.classList.add(
                        "error"
                    );

                    return;

                }


                /* GET DATA */

                const data =
                    getFormData();


                /* BUTTON LOADING */

                submitButton.disabled =
                    true;

                buttonText.classList.add(
                    "hidden"
                );

                buttonLoader.classList.remove(
                    "hidden"
                );


                try {

                    /* =====================================
                       CHECK SUPABASE
                    ====================================== */

                    if (
                        typeof supabaseClient ===
                        "undefined"
                    ) {

                        throw new Error(
                            "Supabase is not configured."
                        );

                    }


                    /* =====================================
                       1. CUSTOMER
                    ====================================== */

                    const customer =
                        await createCustomer(
                            data
                        );


                    /* =====================================
                       2. LEAD
                    ====================================== */

                    const lead =
                        await createLead(
                            data,
                            customer.id
                        );


                    /* =====================================
                       3. APPLICATION
                    ====================================== */

                    const application =
                        await createApplication(
                            data,
                            customer.id,
                            lead.id
                        );


                    /* =====================================
                       WHATSAPP MESSAGE
                    ====================================== */

                    const whatsappMessage =
                        createWhatsAppMessage(
                            data
                        );


                    console.log(
                        "Customer:",
                        customer
                    );

                    console.log(
                        "Lead:",
                        lead
                    );

                    console.log(
                        "Application:",
                        application
                    );

                    console.log(
                        "WhatsApp Message:",
                        whatsappMessage
                    );


                    /* =====================================
                       SUCCESS
                    ====================================== */

                    formMessage.textContent =
                        "Application submitted successfully! Our team will contact you shortly.";

                    formMessage.classList.add(
                        "success"
                    );


                    /* RESET FORM */

                    form.reset();


                    /* DEFAULT NATIONALITY */

                    const nationality =
                        document.getElementById(
                            "nationality"
                        );

                    if (nationality) {

                        nationality.value =
                            "Pakistani";

                    }


                }
                catch (error) {

                    console.error(
                        "SUBMISSION ERROR:",
                        error
                    );


                    formMessage.textContent =
                        "We could not submit your application. Please try again or contact Polaris Consultants.";

                    formMessage.classList.add(
                        "error"
                    );

                }
                finally {

                    /* RESTORE BUTTON */

                    submitButton.disabled =
                        false;

                    buttonText.classList.remove(
                        "hidden"
                    );

                    buttonLoader.classList.add(
                        "hidden"
                    );

                }

            }
        );

    }
);
