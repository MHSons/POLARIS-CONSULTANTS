/* =========================================================
   POLARIS CONSULTANTS
   WHATSAPP FUNCTIONS
========================================================= */


/*
   Create WhatsApp message
*/

function createWhatsAppMessage(
    data
) {

    const message = `
*NEW VISA APPLICATION*

*POLARIS CONSULTANTS*

━━━━━━━━━━━━━━━━━━

*CUSTOMER*

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

*VISA DETAILS*

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

*LEAD INFORMATION*

Source:
${data.source || "Website"}

Status:
New

━━━━━━━━━━━━━━━━━━

*NOTES*

${data.notes || "None"}

━━━━━━━━━━━━━━━━━━

Polaris Consultants
New Website Application
`;

    return message.trim();

}


/*
   Open WhatsApp manually

   This is a temporary browser-based method.

   It does NOT send a background/API message.
*/

function openWhatsAppManually(
    data,
    phoneNumber
) {

    const message =
        createWhatsAppMessage(
            data
        );


    const encodedMessage =
        encodeURIComponent(
            message
        );


    const cleanNumber =
        phoneNumber
            .replace(
                /\D/g,
                ""
            );


    if (!cleanNumber) {

        console.error(
            "WhatsApp number is missing."
        );

        return false;

    }


    const url =
        "https://wa.me/" +
        cleanNumber +
        "?text=" +
        encodedMessage;


    window.open(
        url,
        "_blank"
    );


    return true;

}


/*
   Future API function

   Actual automatic WhatsApp sending
   will be connected through backend.
*/

async function sendWhatsAppNotification(
    data
) {

    if (
        typeof WHATSAPP_CONFIG ===
        "undefined"
    ) {

        throw new Error(
            "WhatsApp configuration is missing."
        );

    }


    if (
        !WHATSAPP_CONFIG.enabled
    ) {

        console.log(
            "WhatsApp API is currently disabled."
        );

        return {

            success: false,

            mode:
                "disabled"

        };

    }


    if (
        !WHATSAPP_CONFIG.backendEndpoint
    ) {

        throw new Error(
            "WhatsApp backend endpoint is missing."
        );

    }


    const response =
        await fetch(
            WHATSAPP_CONFIG.backendEndpoint,
            {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body:
                    JSON.stringify({

                        customer:
                            data,

                        message:
                            createWhatsAppMessage(
                                data
                            )

                    })

            }
        );


    if (
        !response.ok
    ) {

        throw new Error(
            "WhatsApp notification failed."
        );

    }


    return await response.json();

}
