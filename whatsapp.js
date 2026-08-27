/* =========================================================
   POLARIS CONSULTANTS - WHATSAPP MANAGEMENT
========================================================= */

// Global Configuration Object
const WHATSAPP_CONFIG = {
    enabled: true,
    backendEndpoint: "/api/send-whatsapp", // Set to your backend API route when active
    defaultRecipient: "923018067880"       // Office default notification number
};

/**
 * Normalizes customer data payload to handle both Supabase (snake_case) 
 * and frontend form input (camelCase) formats smoothly.
 */
function normalizeCustomerData(data) {
    return {
        fullName: data.full_name || data.fullName || data.name || "N/A",
        cnic: data.cnic || "N/A",
        passportNumber: data.passport_number || data.passportNumber || data.passport || "N/A",
        phone: data.phone || "",
        whatsappNumber: data.whatsapp_number || data.whatsappNumber || data.whatsapp || data.phone || "",
        email: data.email || "Not Provided",
        city: data.city || "Not Provided",
        address: data.address || "Not Provided",
        country: data.country || "N/A",
        visaType: data.visa_type || data.visaType || data.visa || "N/A",
        courseName: data.course_name || data.courseName || "N/A",
        universityName: data.university_name || data.universityName || "N/A",
        intake: data.intake || "N/A",
        employerName: data.employer_name || data.employerName || "N/A",
        jobTitle: data.job_title || data.jobTitle || "N/A",
        visitPurpose: data.visit_purpose || data.visitPurpose || "N/A",
        source: data.source || "Website",
        status: data.status || "New",
        notes: data.notes || "None",
        // Financial Details
        totalFee: data.total_fee || data.totalFee || 0,
        paidAmount: data.paid_amount || data.paidAmount || data.paid || 0,
        receiptNumber: data.receipt_number || data.receiptNumber || `REC-${Date.now().toString().slice(-6)}`
    };
}

/**
 * Clean phone numbers to international standard (digit only)
 */
function formatWhatsAppNumber(phone) {
    if (!phone) return "";
    let cleaned = String(phone).replace(/\D/g, "");
    
    // Convert local Pakistan number starting with 03xx to 923xx
    if (cleaned.startsWith("03") && cleaned.length === 11) {
        cleaned = "92" + cleaned.substring(1);
    }
    return cleaned;
}

/* =========================================================
   MESSAGE TEMPLATE GENERATORS
========================================================= */

/**
 * Generate formatted WhatsApp message based on template type
 * Types: 'visa_application' (default), 'payment_receipt', 'status_update'
 */
function createWhatsAppMessage(data, type = "visa_application") {
    const c = normalizeCustomerData(data);

    if (type === "payment_receipt") {
        const remaining = Math.max(0, c.totalFee - c.paidAmount);
        return `
*PAYMENT RECEIPT*

*POLARIS CONSULTANTS*
━━━━━━━━━━━━━━━━━━
*Receipt No:* ${c.receiptNumber}
*Date:* ${new Date().toLocaleDateString("en-PK")}

*CUSTOMER DETAILS*
Name: ${c.fullName}
CNIC: ${c.cnic}
Passport: ${c.passportNumber}

*PAYMENT SUMMARY*
Total Fee: Rs. ${Number(c.totalFee).toLocaleString("en-PK")}
Paid Amount: Rs. ${Number(c.paidAmount).toLocaleString("en-PK")}
Balance Due: Rs. ${Number(remaining).toLocaleString("en-PK")}

━━━━━━━━━━━━━━━━━━
Thank you for choosing Polaris Consultants!
`.trim();
    }

    if (type === "status_update") {
        return `
*APPLICATION STATUS UPDATE*

*POLARIS CONSULTANTS*
━━━━━━━━━━━━━━━━━━
*Customer Name:* ${c.fullName}
*Country:* ${c.country}
*Visa Type:* ${c.visaType}

*New Status:* *${c.status.toUpperCase()}*

━━━━━━━━━━━━━━━━━━
Notes: ${c.notes}

For further inquiries, reply directly to this message.
`.trim();
    }

    // Default: Visa Application
    return `
*NEW VISA APPLICATION*

*POLARIS CONSULTANTS*
━━━━━━━━━━━━━━━━━━
*CUSTOMER*
Name: ${c.fullName}
CNIC: ${c.cnic}
Passport: ${c.passportNumber}
Phone: ${c.phone}
WhatsApp: ${c.whatsappNumber}
Email: ${c.email}
City: ${c.city}
Address: ${c.address}

━━━━━━━━━━━━━━━━━━
*VISA DETAILS*
Country: ${c.country}
Visa Type: ${c.visaType}
Course: ${c.courseName}
University: ${c.universityName}
Intake: ${c.intake}
Employer: ${c.employerName}
Job Title: ${c.jobTitle}
Visit Purpose: ${c.visitPurpose}

━━━━━━━━━━━━━━━━━━
*LEAD INFORMATION*
Source: ${c.source}
Status: ${c.status}

━━━━━━━━━━━━━━━━━━
*NOTES*
${c.notes}

━━━━━━━━━━━━━━━━━━
Polaris Consultants System
`.trim();
}

/* =========================================================
   SEND / OPEN HANDLERS
========================================================= */

/**
 * Open WhatsApp manually via URL scheme (wa.me)
 */
function openWhatsAppManually(data, targetPhone = null, templateType = "visa_application") {
    const customer = normalizeCustomerData(data);
    const rawNumber = targetPhone || customer.whatsappNumber || customer.phone || WHATSAPP_CONFIG.defaultRecipient;
    const cleanNumber = formatWhatsAppNumber(rawNumber);

    if (!cleanNumber) {
        alert("Invalid or missing WhatsApp phone number.");
        console.error("WhatsApp number format invalid:", rawNumber);
        return false;
    }

    const message = createWhatsAppMessage(customer, templateType);
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${cleanNumber}?text=${encodedMessage}`;

    window.open(url, "_blank");
    return true;
}

/**
 * Sends automated WhatsApp notification via API / Server Endpoint
 */
async function sendWhatsAppNotification(data, targetPhone = null, templateType = "visa_application") {
    if (!WHATSAPP_CONFIG.enabled) {
        console.log("WhatsApp API functionality is currently disabled in WHATSAPP_CONFIG.");
        return { success: false, mode: "disabled" };
    }

    if (!WHATSAPP_CONFIG.backendEndpoint) {
        throw new Error("WhatsApp backend endpoint configuration is missing.");
    }

    const customer = normalizeCustomerData(data);
    const recipient = formatWhatsAppNumber(targetPhone || customer.whatsappNumber || WHATSAPP_CONFIG.defaultRecipient);
    const message = createWhatsAppMessage(customer, templateType);

    try {
        const response = await fetch(WHATSAPP_CONFIG.backendEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                recipient: recipient,
                customer: customer,
                message: message,
                templateType: templateType
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        // Optional: Log message dispatch to Supabase if client instance is available
        if (typeof getPolarisSupabase === "function") {
            const supabase = getPolarisSupabase();
            if (supabase) {
                await supabase.from("whatsapp_logs").insert([{
                    recipient: recipient,
                    customer_name: customer.fullName,
                    template_type: templateType,
                    status: "sent",
                    created_at: new Date()
                }]);
            }
        }

        return result;
    } catch (error) {
        console.error("WhatsApp Notification Error:", error.message);
        throw error;
    }
}
