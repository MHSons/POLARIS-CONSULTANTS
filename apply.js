/* =========================================================
   POLARIS CONSULTANTS
   APPLY FORM JAVASCRIPT
========================================================= */


/*
    IMPORTANT:

    Supabase connection hum STEP 17 mein connect karenge.

    Abhi ye file:
    - Form validation
    - CNIC formatting
    - Form data collection
    - Success/error handling
    - WhatsApp message preparation

    handle karti hai.
*/


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
           YEAR
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
           VALIDATION
        ================================================= */

        function showError(
            input,
            message
        ) {

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


        function clearError(input) {

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

                error.textContent = "";

            }

        }


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


            if (
                !validateRequired(
                    fullName,
                    "Please enter your full name."
                )
            ) {

                valid = false;

            }


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


            if (
                !validateRequired(
                    passportNumber,
                    "Please enter your passport number."
                )
            ) {

                valid = false;

            }


            if (
                !validateRequired(
                    phone,
                    "Please enter your phone number."
                )
            ) {

                valid = false;

            }


            if (
                !validateRequired(
                    address,
                    "Please enter your address."
                )
            ) {

                valid = false;

            }


            if (
                !validateRequired(
                    country,
                    "Please select your destination country."
                )
            ) {

                valid = false;

            }


            if (
                !validateRequired(
                    visaType,
                    "Please select your visa type."
                )
            ) {

                valid = false;

            }


            if (
                !consent.checked
            ) {

                const consentError =
                    document.getElementById(
                        "consentError"
                    );


                if (consentError) {

                    consentError.textContent =
                        "Please confirm the information.";

                }


                valid = false;

            }
            else {

                const consentError =
                    document.getElementById(
                        "consentError"
                    );


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
                    ).value,

                dateOfBirth:
                    document.getElementById(
                        "dateOfBirth"
                    ).value,

                gender:
                    document.getElementById(
                        "gender"
                    ).value,

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
                    ).value,

                notes:
                    document.getElementById(
                        "notes"
                    ).value.trim()

            };

        }


        /* =================================================
           WHATSAPP MESSAGE
        ================================================= */

        function createWhatsAppMessage(
            data
        ) {

            return `
*NEW VISA INQUIRY*
*Polaris Consultants*

━━━━━━━━━━━━━━━━━━

*PERSONAL INFORMATION*

Name:
${data.fullName}

CNIC:
${data.cnic}

Passport:
${data.passportNumber}

Passport Expiry:
${data.passportExpiry || "Not provided"}

Date of Birth:
${data.dateOfBirth || "Not provided"}

Gender:
${data.gender || "Not provided"}

Nationality:
${data.nationality || "Not provided"}

━━━━━━━━━━━━━━━━━━

*CONTACT INFORMATION*

Phone:
${data.phone}

WhatsApp:
${data.whatsappNumber || data.phone}

Email:
${data.email || "Not provided"}

City:
${data.city || "Not provided"}

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

${data.source || "Website"}

━━━━━━━━━━━━━━━━━━

*ADDITIONAL INFORMATION*

${data.notes || "None"}

━━━━━━━━━━━━━━━━━━

Polaris Consultants
New Website Application
            `.trim();

        }


        /* =================================================
           SUBMIT
        ================================================= */

        form.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                formMessage.textContent =
                    "";

                formMessage.className =
                    "form-message";


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


                const data =
                    getFormData();


                submitButton.disabled =
                    true;


                buttonText.classList.add(
                    "hidden"
                );


                buttonLoader.classList.remove(
                    "hidden"
                );


                try {


                    /*
                        STEP 17 MEIN:
                        Supabase database insert
                        yahan connect hoga.
                    */


                    console.log(
                        "Application Data:",
                        data
                    );


                    /*
                        WhatsApp message
                        currently prepared.
                    */

                    const whatsappMessage =
                        createWhatsAppMessage(
                            data
                        );


                    console.log(
                        "WhatsApp Message:",
                        whatsappMessage
                    );


                    /*
                        Temporary success.

                        STEP 17 mein:
                        1. Lead database mein save hoga.
                        2. Customer record create hoga.
                        3. Application create hogi.
                        4. WhatsApp integration connect hogi.
                    */


                    await new Promise(
                        function (resolve) {

                            setTimeout(
                                resolve,
                                700
                            );

                        }
                    );


                    formMessage.textContent =
                        "Your application has been received. Our team will contact you shortly.";

                    formMessage.classList.add(
                        "success"
                    );


                    form.reset();


                    /*
                        Restore default nationality
                    */

                    document.getElementById(
                        "nationality"
                    ).value =
                        "Pakistani";


                }
                catch (error) {

                    console.error(
                        error
                    );


                    formMessage.textContent =
                        "Something went wrong. Please try again.";

                    formMessage.classList.add(
                        "error"
                    );

                }
                finally {

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
