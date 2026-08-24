/* =========================================================
   POLARIS CONSULTANTS
   DATABASE FUNCTIONS
========================================================= */


/*
   Save customer application
*/

async function saveCustomerApplication(
    application
) {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("applications")
                .insert([
                    application
                ])
                .select()
                .single();


        if (error) {

            console.error(
                "Application Save Error:",
                error
            );

            throw error;

        }


        return data;

    }
    catch (error) {

        console.error(
            "Database Error:",
            error
        );

        throw error;

    }

}


/*
   Save lead
*/

async function saveLead(
    lead
) {

    try {

        const {
            data,
            error
        } =
            await supabaseClient
                .from("leads")
                .insert([
                    lead
                ])
                .select()
                .single();


        if (error) {

            console.error(
                "Lead Save Error:",
                error
            );

            throw error;

        }


        return data;

    }
    catch (error) {

        console.error(
            "Lead Database Error:",
            error
        );

        throw error;

    }

}


/*
   Get applications
*/

async function getApplications() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("applications")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Get Applications Error:",
            error
        );

        throw error;

    }


    return data;

}


/*
   Get leads
*/

async function getLeads() {

    const {
        data,
        error
    } =
        await supabaseClient
            .from("leads")
            .select("*")
            .order(
                "created_at",
                {
                    ascending: false
                }
            );


    if (error) {

        console.error(
            "Get Leads Error:",
            error
        );

        throw error;

    }


    return data;

}
