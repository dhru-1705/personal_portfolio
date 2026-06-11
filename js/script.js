document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. FORM VALIDATION HANDLING ENGINE
    // ==========================================
    const form = document.getElementById("portfolio-contact-form");
    const successMsg = document.getElementById("form-success-msg");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); 
            
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            let isValid = true;

            // Name Verification
            if (name.value.trim() === "") {
                document.getElementById("name-error").style.display = "block";
                name.style.borderColor = "#e74c3c";
                isValid = false;
            } else {
                document.getElementById("name-error").style.display = "none";
                name.style.borderColor = "#232936";
            }

            // Email Address Verification
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                document.getElementById("email-error").style.display = "block";
                email.style.borderColor = "#e74c3c";
                isValid = false;
            } else {
                document.getElementById("email-error").style.display = "none";
                email.style.borderColor = "#232936";
            }

            // Message Validation
            if (message.value.trim() === "") {
                document.getElementById("message-error").style.display = "block";
                message.style.borderColor = "#e74c3c";
                isValid = false;
            } else {
                document.getElementById("message-error").style.display = "none";
                message.style.borderColor = "#232936";
            }

            // Valid form handling confirmation status action routine
            if (isValid) {
                successMsg.style.display = "block";
                form.reset();
                
                setTimeout(() => {
                    successMsg.style.display = "none";
                }, 4000);
            }
        });
    }

    // ==========================================
    // 2. THEME SWITCHER CONTROLLER STATE
    // ==========================================
    const toggleButtons = document.querySelectorAll("#theme-toggle");
    
    // Check user preferences cached locally in the browser
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    
    // Set initial application load theme state
    document.documentElement.setAttribute("data-theme", savedTheme);
    syncIcons(savedTheme);

    toggleButtons.forEach(button => {
        button.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            let newTheme = "dark";

            if (currentTheme === "dark") {
                newTheme = "light";
            }

            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("portfolio-theme", newTheme);
            syncIcons(newTheme);
        });
    });

    // Helper utility to sync icons across separate layouts natively
    function syncIcons(theme) {
        const icons = document.querySelectorAll("#theme-icon");
        icons.forEach(icon => {
            if (theme === "light") {
                icon.classList.replace("fa-moon", "fa-sun");
            } else {
                icon.classList.replace("fa-sun", "fa-moon");
            }
        });
    }
});