// auth.js

//const API_URL = "http://localhost:5000/api"; // Τροποποίησε το αν έχεις διαφορετικό backend URL
const API_URL = "http://localhost:5000/api";
// Είσοδος χρήστη
async function login(username, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Σφάλμα κατά την είσοδο");
        }

        const data = await response.json();
        // Αποθήκευση του JWT στο localStorage
        localStorage.setItem("token", data.token);
        alert("Επιτυχής σύνδεση!");
        window.location.href = "/"; // Ανακατεύθυνση στην κύρια σελίδα
    } catch (error) {
        console.error("Σφάλμα σύνδεσης:", error.message);
        alert(error.message);
    }
}

// Έλεγχος αν ο χρήστης είναι συνδεδεμένος
function isLoggedIn() {
    const token = localStorage.getItem("token");
    return token !== null;
}

// Λήψη του token
function getToken() {
    return localStorage.getItem("token");
}

// Αποσύνδεση χρήστη
function logout() {
    localStorage.removeItem("token");
    alert("Έχετε αποσυνδεθεί!");
    window.location.href = "/login.html"; // Ανακατεύθυνση στη σελίδα σύνδεσης
}

// Προσθήκη του token στα αιτήματα (Authorization Header)
async function fetchWithAuth(url, options = {}) {
    const token = getToken();
    if (!token) {
        alert("Παρακαλώ συνδεθείτε πρώτα!");
        window.location.href = "/login.html";
        return;
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    return fetch(url, {
        ...options,
        headers,
    });
}

// Εξαγωγή λειτουργιών
export { login, isLoggedIn, logout, fetchWithAuth };
