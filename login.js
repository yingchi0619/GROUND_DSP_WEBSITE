const loginForm = document.querySelector("#loginForm");
const loginButton = document.querySelector("#loginButton");
const loginMessage = document.querySelector("#loginMessage");

async function checkExistingSession() {
  const response = await fetch("/api/session");
  if (!response.ok) {
    return;
  }

  const session = await response.json();
  if (session.authenticated) {
    window.location.href = "/crm.html";
  }
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  loginButton.disabled = true;
  loginMessage.hidden = true;

  const payload = Object.fromEntries(new FormData(loginForm).entries());

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || "Unable to log in");
    }

    window.location.href = "/crm.html";
  } catch (error) {
    loginMessage.textContent = error.message;
    loginMessage.hidden = false;
  } finally {
    loginButton.disabled = false;
  }
});

checkExistingSession();
