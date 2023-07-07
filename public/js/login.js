
const togglePasswordVisibility = () => {
  const passwordInput = document.querySelector('#password');
  const toggleIcon = document.querySelector('.toggle-password');

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
  } else {
    passwordInput.type = 'password';
  }
};

document.querySelector('.toggle-password').addEventListener('click', togglePasswordVisibility);

const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert('Failed to log in');
    }
  }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
