function showLogin() {
  document.getElementById("registerForm").classList.remove("active");
  document.getElementById("loginForm").classList.add("active");
}

function showRegister() {
  document.getElementById("loginForm").classList.remove("active");
  document.getElementById("registerForm").classList.add("active");
}

window.addEventListener('DOMContentLoaded', () => {
  const regForm = document.getElementById("registerForm");

  if (regForm) {
    regForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // alert("Registered successfully!");

      // Password ko validate karna
      const password = document.getElementById("registration-password").value;

      if (password.length < 7) {
        // Agar password 7 characters se kam hai to error dikhana
        document.getElementById("password-error").style.display = 'block';
        return; // Form submit nahi hoga
      } else {
        // Agar password valid hai, to error hide karenge
        document.getElementById("password-error").style.display = 'none';
      }

      // Rest of the registration code
      const name = document.getElementById("name").value;
      const email = document.getElementById("registration-email").value;
      fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message) {
            alert("Registration successful");
            showLogin();
            // startCamera();
          } else {
            alert(data.error || "Error occurred");
          }
        });
    });

    document.getElementById("loginForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value;
      const password = document.getElementById("login-password").value;

      fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            alert(data.error);
          } else if (data.message) {
            alert(data.message);
            window.location.href = data.redirect;
          } else {
            alert("Something went wrong!");
          }
        })
        .catch(() => alert("Something went wrong!"));
    });
  }

  
  

  
  
});
