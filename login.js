async function handleLogin(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("email")
            .value
            .trim();


    const password =
        document
            .getElementById("password")
            .value;


    const button =
        document
            .getElementById("loginButton");


    clearMessage();


    if (!email) {

        showMessage(
            "Please enter your email address.",
            "error"
        );

        return;

    }


    if (!isValidEmail(email)) {

        showMessage(
            "Please enter a valid email address.",
            "error"
        );

        return;

    }


    if (!password) {

        showMessage(
            "Please enter your password.",
            "error"
        );

        return;

    }


    button.classList.add(
        "loading"
    );


    button.textContent =
        "Signing In...";


    try {

        /*
           Wait for Supabase.
        */

        let attempts = 0;


        while (
            (
                typeof polarisSupabase ===
                    "undefined" ||
                !polarisSupabase
            ) &&
            attempts < 30
        ) {

            await new Promise(
                resolve =>
                    setTimeout(
                        resolve,
                        100
                    )
            );


            attempts++;

        }


        if (
            typeof loginWithSupabase !==
            "function"
        ) {

            throw new Error(
                "Authentication system is not loaded."
            );

        }


        const result =
            await loginWithSupabase(
                email,
                password
            );


        if (!result.success) {

            showMessage(
                result.message,
                "error"
            );


            button.classList.remove(
                "loading"
            );


            button.textContent =
                "Sign In";


            return;

        }


        showMessage(
            "Login successful. Opening Polaris Dashboard...",
            "success"
        );


        setTimeout(
            function () {

                window.location.href =
                    "admin.html";

            },
            700
        );


    } catch (error) {

        console.error(
            error
        );


        showMessage(
            "Unable to login. Please try again.",
            "error"
        );


        button.classList.remove(
            "loading"
        );


        button.textContent =
            "Sign In";

    }

}
