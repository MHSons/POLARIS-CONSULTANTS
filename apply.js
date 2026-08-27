/* =========================================================
   POLARIS CONSULTANTS - APPLY FORM
   DATABASE CONNECTED VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =================================================
       ELEMENTS
    ================================================= */
    const form = document.getElementById("visaApplicationForm");
    const submitButton = document.getElementById("submitButton");
    const buttonText = document.getElementById("buttonText");
    const buttonLoader = document.getElementById("buttonLoader");
    const formMessage = document.getElementById("formMessage");
    const cnicInput = document.getElementById("cnic");
    const currentYear = document.getElementById("currentYear");
    const visaTypeSelect = document.getElementById("visaType");

    // Dynamic Field Wrappers
    const studyFields = document.getElementById("studyFields");
    const universityInput = document.getElementById("universityName")?.parentElement;
    const intakeInput = document.getElementById("intake")?.parentElement;
    const employerInput = document.getElementById("employerName")?.parentElement;
    const jobTitleInput = document.getElementById("jobTitle")?.parentElement;
    const visitPurposeInput = document.getElementById("visitPurpose")?.parentElement;

    /* =================================================
       CURRENT YEAR
    ================================================= */
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /* =================================================
       DYNAMIC VISA FIELDS VISIBILITY
    ================================================= */
    function updateVisaFields() {
        const selectedVisa = visaTypeSelect ? visaTypeSelect.value : "";

        if (studyFields) studyFields.style.display = "none";
        if (universityInput) universityInput.style.display = "none";
        if (intakeInput) intakeInput.style.display = "none";
        if (employerInput) employerInput.style.display = "none";
        if (jobTitleInput) jobTitleInput.style.display = "none";
        if (visitPurposeInput) visitPurposeInput.style.display = "none";

        if (selectedVisa === "Study Visa") {
            if (studyFields) studyFields.style.display = "block";
            if (universityInput) universityInput.style.display = "block";
            if (intakeInput) intakeInput.style.display = "block";
        } else if (selectedVisa === "Work Visa" || selectedVisa === "Business Visa") {
            if (employerInput) employerInput.style.display = "block";
            if (jobTitleInput) jobTitleInput.style.display = "block";
        } else if (selectedVisa === "Visit Visa" || selectedVisa === "Family Visa" || selectedVisa === "Transit Visa") {
            if (visitPurposeInput) visitPurposeInput.style.display = "block";
        }
    }

    if (visaTypeSelect) {
        visaTypeSelect.addEventListener("change", updateVisaFields);
        updateVisaFields();
    }

    /* =================================================
       CNIC AUTO FORMAT (XXXXX-XXXXXXX-X)
    ================================================= */
    if (cnicInput) {
        cnicInput.addEventListener("input", function () {
            let value = this.value.replace(/\D/g, "");

            if (value.length > 13) {
                value = value.substring(0, 13);
            }

            if (value.length > 12) {
                value = value.substring(0, 5) + "-" + value.substring(5, 12) + "-" + value.substring(12);
            } else if (value.length > 5) {
                value = value.substring(0, 5) + "-" + value.substring(5);
            }

            this.value = value;
        });
    }

    /* =================================================
       ERROR FUNCTIONS
    ================================================= */
    function showError(input, message) {
        if (!input) return;

        input.classList.add("input-error");
        const parent = input.closest(".form-group");
        if (!parent) return;

        const error = parent.querySelector(".error-message");
        if (error) {
            error.textContent = message;
        }
    }

    function clearError(input) {
        if (!input) return;

        input.classList.remove("input-error");
        const parent = input.closest(".form-group");
        if (!parent) return;

        const error = parent.querySelector(".error-message");
        if (error) {
            error.textContent = "";
        }
    }

    // Clear error automatically on field typing/selection
    if (form) {
        form.querySelectorAll("input, select, textarea").forEach((input) => {
            input.addEventListener("input", () => clearError(input));
            input.addEventListener("change", () => clearError(input));
        });
    }

    /* =================================================
       REQUIRED FIELD VALIDATION
    ================================================= */
    function validateRequired(input, message) {
        if (!input || !input.value.trim()) {
            showError(input, message);
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

        const fullName = document.getElementById("fullName");
        const cnic = document.getElementById("cnic");
        const passportNumber = document.getElementById("passportNumber");
        const phone = document.getElementById("phone");
        const address = document.getElementById("address");
        const country = document.getElementById("country");
        const visaType = document.getElementById("visaType");
        const consent = document.getElementById("consent");

        if (!validateRequired(fullName, "Please enter your full name.")) valid = false;

        if (!validateRequired(cnic, "Please enter your CNIC.")) {
            valid = false;
        } else if (cnic.value.length !== 15) {
            showError(cnic, "Please enter a valid CNIC (e.g. 12345-1234567-1).");
            valid = false;
        }

        if (!validateRequired(passportNumber, "Please enter your passport number.")) valid = false;
        if (!validateRequired(phone, "Please enter your phone number.")) valid = false;
        if (!validateRequired(address, "Please enter your address.")) valid = false;
        if (!validateRequired(country, "Please select your destination country.")) valid = false;
        if (!validateRequired(visaType, "Please select your visa type.")) valid = false;

        const consentError = document.getElementById("consentError");
        if (!consent || !consent.checked) {
            if (consentError) consentError.textContent = "Please confirm the information.";
            valid = false;
        } else {
            if (consentError) consentError.textContent = "";
        }

        return valid;
    }

    /* =================================================
       GET FORM DATA
    ================================================= */
    function getFormData() {
        return {
            fullName: document.getElementById("fullName")?.value.trim() || "",
            cnic: document.getElementById("cnic")?.value.trim() || "",
            passportNumber: document.getElementById("passportNumber")?.value.trim() || "",
            passportExpiry: document.getElementById("passportExpiry")?.value || null,
            dateOfBirth: document.getElementById("dateOfBirth")?.value || null,
            gender: document.getElementById("gender")?.value || null,
            nationality: document.getElementById("nationality")?.value.trim() || "Pakistani",
            phone: document.getElementById("phone")?.value.trim() || "",
            whatsappNumber: document.getElementById("whatsappNumber")?.value.trim() || "",
            email: document.getElementById("email")?.value.trim() || "",
            city: document.getElementById("city")?.value.trim() || "",
            address: document.getElementById("address")?.value.trim() || "",
            country: document.getElementById("country")?.value || "",
            visaType: document.getElementById("visaType")?.value || "",
            courseName: document.getElementById("courseName")?.value.trim() || "",
            universityName: document.getElementById("universityName")?.value.trim() || "",
            intake: document.getElementById("intake")?.value.trim() || "",
            employerName: document.getElementById("employerName")?.value.trim() || "",
            jobTitle: document.getElementById("jobTitle")?.value.trim() || "",
            visitPurpose: document.getElementById("visitPurpose")?.value.trim() || "",
            source: document.getElementById("source")?.value || "Website",
            notes: document.getElementById("notes")?.value.trim() || ""
        };
    }

    /* =================================================
       GET OR CREATE CUSTOMER (HANDLES DUPLICATES)
    ================================================= */
    async function getOrCreateCustomer(data) {
        // Check for existing customer record by CNIC or Passport
        const { data: existing } = await supabaseClient
            .from("customers")
            .select("*")
            .or(`cnic.eq.${data.cnic},passport_number.eq.${data.passportNumber}`)
            .maybeSingle();

        if (existing) {
            return existing;
        }

        // Insert new customer if record doesn't exist
        const { data: customer, error } = await supabaseClient
            .from("customers")
            .insert([{
                full_name: data.fullName,
                cnic: data.cnic,
                passport_number: data.passportNumber,
                phone: data.phone,
                whatsapp_number: data.whatsappNumber,
                email: data.email,
                date_of_birth: data.dateOfBirth,
                gender: data.gender,
                nationality: data.nationality,
                city: data.city,
                address: data.address
            }])
            .select()
            .single();

        if (error) {
            console.error("Customer Error:", error);
            throw error;
        }

        return customer;
    }

    /* =================================================
       SAVE LEAD
    ================================================= */
    async function createLead(data, customerId) {
        const { data: lead, error } = await supabaseClient
            .from("leads")
            .insert([{
                customer_id: customerId,
                country: data.country,
                visa_type: data.visaType,
                source: data.source,
                status: "New",
                assigned_team: null,
                assigned_staff: null,
                notes: data.notes
            }])
            .select()
            .single();

        if (error) {
            console.error("Lead Error:", error);
            throw error;
        }

        return lead;
    }

    /* =================================================
       SAVE APPLICATION
    ================================================= */
    async function createApplication(data, customerId, leadId) {
        const { data: application, error } = await supabaseClient
            .from("applications")
            .insert([{
                customer_id: customerId,
                lead_id: leadId,
                full_name: data.fullName,
                cnic: data.cnic,
                passport_number: data.passportNumber,
                passport_expiry: data.passportExpiry,
                date_of_birth: data.dateOfBirth,
                gender: data.gender,
                nationality: data.nationality,
                phone: data.phone,
                whatsapp_number: data.whatsappNumber,
                email: data.email,
                city: data.city,
                address: data.address,
                country: data.country,
                visa_type: data.visaType,
                course_name: data.courseName,
                university_name: data.universityName,
                intake: data.intake,
                employer_name: data.employerName,
                job_title: data.jobTitle,
                visit_purpose: data.visitPurpose,
                source: data.source,
                notes: data.notes,
                status: "New"
            }])
            .select()
            .single();

        if (error) {
            console.error("Application Error:", error);
            throw error;
        }

        return application;
    }

    /* =================================================
       WHATSAPP MESSAGE GENERATOR
    ================================================= */
    function createWhatsAppMessage(data) {
        return `
*NEW VISA INQUIRY*
*POLARIS CONSULTANTS*
━━━━━━━━━━━━━━━━━━
*PERSONAL INFORMATION*
Name: ${data.fullName}
CNIC: ${data.cnic}
Passport: ${data.passportNumber}
Phone: ${data.phone}
WhatsApp: ${data.whatsappNumber || data.phone}
Email: ${data.email || "Not Provided"}
City: ${data.city || "Not Provided"}
Address: ${data.address}
━━━━━━━━━━━━━━━━━━
*VISA INFORMATION*
Country: ${data.country}
Visa Type: ${data.visaType}
Course: ${data.courseName || "N/A"}
University: ${data.universityName || "N/A"}
Intake: ${data.intake || "N/A"}
Employer: ${data.employerName || "N/A"}
Job Title: ${data.jobTitle || "N/A"}
Visit Purpose: ${data.visitPurpose || "N/A"}
━━━━━━━━━━━━━━━━━━
*LEAD SOURCE*
${data.source}
━━━━━━━━━━━━━━━━━━
*ADDITIONAL NOTES*
${data.notes || "None"}
━━━━━━━━━━━━━━━━━━
POLARIS CONSULTANTS
Website Application`.trim();
    }

    /* =================================================
       SUBMIT FORM
    ================================================= */
    if (form) {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();

            formMessage.textContent = "";
            formMessage.className = "form-message";

            if (!validateForm()) {
                formMessage.textContent = "Please correct the highlighted fields.";
                formMessage.classList.add("error");
                return;
            }

            const data = getFormData();

            submitButton.disabled = true;
            if (buttonText) buttonText.classList.add("hidden");
            if (buttonLoader) buttonLoader.classList.remove("hidden");

            try {
                if (typeof supabaseClient === "undefined") {
                    throw new Error("Supabase is not configured.");
                }

                // 1. CUSTOMER (Get existing or create new)
                const customer = await getOrCreateCustomer(data);

                // 2. LEAD
                const lead = await createLead(data, customer.id);

                // 3. APPLICATION
                const application = await createApplication(data, customer.id, lead.id);

                // WhatsApp Dispatch Message
                const whatsappMessage = createWhatsAppMessage(data);

                formMessage.textContent = "Application submitted successfully! Redirecting to WhatsApp...";
                formMessage.classList.add("success");

                // Auto-open WhatsApp chat with pre-filled message
                const targetPhone = "923000000000"; // Replace with your company WhatsApp number
                const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(whatsappMessage)}`;
                
                setTimeout(() => {
                    window.open(waUrl, "_blank");
                }, 1000);

                form.reset();

                const nationality = document.getElementById("nationality");
                if (nationality) {
                    nationality.value = "Pakistani";
                }
                updateVisaFields();

            } catch (error) {
                console.error("SUBMISSION ERROR:", error);
                formMessage.textContent = "We could not submit your application. Please try again or contact Polaris Consultants.";
                formMessage.classList.add("error");
            } finally {
                submitButton.disabled = false;
                if (buttonText) buttonText.classList.remove("hidden");
                if (buttonLoader) buttonLoader.classList.add("hidden");
            }
        });
    }

});
