/* =========================================================
   POLARIS CONSULTANTS
   ADMIN LOGIN
   SUPABASE AUTHENTICATION
========================================================= */


document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const loginForm =
            document.getElementById(
                "loginForm"
            );

        const emailInput =
            document.getElementById(
                "email"
            );

        const passwordInput =
            document.getElementById(
                "password"
            );

        const rememberMe =
            document.getElementById(
                "rememberMe"
            );

        const togglePassword =
            document.getElementById(
                "togglePassword"
            );

        const loginButton =
            document.getElementById(
                "loginButton"
            );

        const loginButtonText =
            document.getElementById(
                "loginButtonText"
            );

        const loginLoader =
            document.getElementById(
                "loginLoader"
            );

        const loginMessage =
            document.getElementById(
                "loginMessage"
            );

        const emailError =
            document.getElementById(
                "emailError"
            );

        const passwordError =
            document.getElementById(
                "passwordError"
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
           PASSWORD SHOW / HIDE
        ================================================= */

        if (togglePassword) {

            togglePassword.addEventListener(
                "click",
                function () {

                    if (
                        passwordInput.type ===
                        "password"
                    ) {

                        passwordInput.type =
                            "text";

                        togglePassword.textContent =
                            "Hide";

                        togglePassword.setAttribute(
                            "aria-label",
                            "Hide password"
                        );

                    }
                    else {

                        passwordInput.type =
                            "password";

                        togglePassword.textContent =
                            "Show";

                        togglePassword.setAttribute(
                            "aria-label",
                            "Show password"
                        );

                    }

                }
            );

        }


        /* =================================================
           MESSAGE
        ================================================= */

        function showMessage(
            message,
            type = ""
        ) {

            loginMessage.textContent =
                message;

            loginMessage.className =
                "login-message";

            if (type) {

                loginMessage.classList.add(
                    type
                );

            }

        }


        function clearErrors() {

            emailError.textContent =
                "";

            passwordError.textContent =
                "";

            emailInput.classList.remove(
                "input-error"
            );

            passwordInput.classList.remove(
                "input-error"
            );

        }


        /* =================================================
           VALIDATION
        ================================================= */

        function validateForm() {

            clearErrors();

            let valid = true;


            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value;


            /* EMAIL */

            if (!email) {

                emailError.textContent =
                    "Please enter your email.";

                emailInput.classList.add(
                    "input-error"
                );

                valid = false;

            }
            else if (
                !email.includes("@")
            ) {

                emailError.textContent =
                    "Please enter a valid email.";

                emailInput.classList.add(
                    "input-error"
                );

                valid = false;

            }


            /* PASSWORD */

            if (!password) {

                passwordError.textContent =
                    "Please enter your password.";

                passwordInput.classList.add(
                    "input-error"
                );

                valid = false;

            }


            return valid;

        }


        /* =================================================
           LOADING STATE
        ================================================= */

        function setLoading(
            loading
        ) {

            loginButton.disabled =
                loading;


            if (loading) {

                loginButtonText.classList.add(
                    "hidden"
                );

                loginLoader.classList.remove(
                    "hidden"
                );

            }
            else {

                loginButtonText.classList.remove(
                    "hidden"
                );

                loginLoader.classList.add(
                    "hidden"
                );

            }

        }


        /* =================================================
           CHECK SUPABASE
        ================================================= */

        if (
            typeof supabaseClient ===
            "undefined"
        ) {

            showMessage(
                "Supabase configuration is missing.",
                "error"
            );

            return;

        }


        /* =================================================
           CHECK EXISTING SESSION
        ================================================= */

        async function checkExistingSession() {

            try {

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .auth
                        .getSession();


                if (error) {

                    console.error(
                        "Session Error:",
                        error
                    );

                    return;

                }


                if (
                    data &&
                    data.session
                ) {

                    window.location.href =
                        "admin.html";

                }

            }
            catch (error) {

                console.error(
                    "Session Check Error:",
                    error
                );

            }

        }


        checkExistingSession();


        /* =================================================
           LOGIN
        ================================================= */

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                showMessage("");

                clearErrors();


                if (
                    !validateForm()
                ) {

                    return;

                }


                setLoading(true);


                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value;


                try {

                    /* =====================================
                       SUPABASE LOGIN
                    ====================================== */

                    const {
                        data,
                        error
                    } =
                        await supabaseClient
                            .auth
                            .signInWithPassword({

                                email:
                                    email,

                                password:
                                    password

                            });


                    /* =====================================
                       LOGIN ERROR
                    ====================================== */

                    if (error) {

                        console.error(
                            "Login Error:",
                            error
                        );

                        showMessage(
                            getLoginErrorMessage(
                                error
                            ),
                            "error"
                        );

                        setLoading(false);

                        return;

                    }


                    /* =====================================
                       SUCCESS
                    ====================================== */

                    if (
                        data &&
                        data.user
                    ) {

                        /*
                           Remember me is handled by
                           Supabase session storage.
                        */

                        if (
                            rememberMe &&
                            rememberMe.checked
                        ) {

                            localStorage.setItem(
                                "polarisRememberAdmin",
                                "true"
                            );

                        }
                        else {

                            localStorage.removeItem(
                                "polarisRememberAdmin"
                            );

                        }


                        showMessage(
                            "Login successful. Opening dashboard...",
                            "success"
                        );


                        setTimeout(
                            function () {

                                window.location.href =
                                    "admin.html";

                            },
                            700
                        );

                    }

                }
                catch (error) {

                    console.error(
                        "Unexpected Login Error:",
                        error
                    );

                    showMessage(
                        "Something went wrong. Please try again.",
                        "error"
                    );

                    setLoading(false);

                }

            }
        );


        /* =================================================
           LOGIN ERROR MESSAGE
        ================================================= */

        function getLoginErrorMessage(
            error
        ) {

            if (!error) {

                return "Login failed.";

            }


            const message =
                (
                    error.message ||
                    ""
                ).toLowerCase();


            if (
                message.includes(
                    "invalid login credentials"
                )
            ) {

                return "Incorrect email or password.";

            }


            if (
                message.includes(
                    "email not confirmed"
                )
            ) {

                return "Please confirm your admin email before logging in.";

            }


            if (
                message.includes(
                    "too many requests"
                )
            ) {

                return "Too many login attempts. Please wait and try again.";

            }


            return (
                error.message ||
                "Login failed. Please try again."
            );

        }


        /* =================================================
           AUTH STATE LISTENER
        ================================================= */

        supabaseClient
            .auth
            .onAuthStateChange(
                function (
                    event,
                    session
                ) {

                    console.log(
                        "Auth Event:",
                        event
                    );


                    if (
                        event ===
                        "SIGNED_OUT"
                    ) {

                        console.log(
                            "Admin signed out."
                        );

                    }


                    if (
                        event ===
                        "SIGNED_IN" &&
                        session
                    ) {

                        console.log(
                            "Admin signed in."
                        );

                    }

                }
            );


    }
);
