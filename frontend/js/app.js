import { login, isLoggedIn, logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginFormContainer = document.getElementById('loginFormContainer');
  const loggedInContainer = document.getElementById('loggedInContainer');

  // Έλεγχος σύνδεσης χρήστη κατά τη φόρτωση
  if (isLoggedIn()) {
    loginFormContainer.classList.add('hidden');
    loggedInContainer.classList.remove('hidden');
  } else {
    loginFormContainer.classList.remove('hidden');
    loggedInContainer.classList.add('hidden');
  }

  // Διαχείριση υποβολής φόρμας σύνδεσης
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const success = await login(username, password);
    if (success) {
      loginFormContainer.classList.add('hidden');
      loggedInContainer.classList.remove('hidden');
    } else {
      alert('Σφάλμα: Λανθασμένα στοιχεία σύνδεσης');
    }
  });

  // Διαχείριση αποσύνδεσης
  const logoutButton = document.getElementById('logoutButton');
  logoutButton.addEventListener('click', () => {
    logout();
    loginFormContainer.classList.remove('hidden');
    loggedInContainer.classList.add('hidden');
  });
});

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const asideSections = document.querySelectorAll('aside > div');
    const mainContent = document.getElementById('content');
  
    navLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        const section = event.target.dataset.section;
  
        // Εμφάνιση του σωστού περιεχομένου στο Aside
        asideSections.forEach(aside => aside.classList.add('hidden'));
        const asideToShow = document.getElementById(`aside-${section}`);
        if (asideToShow) asideToShow.classList.remove('hidden');
  
        // Ενημέρωση του Main
        switch (section) {
          case 'biography':
            mainContent.innerHTML = '<p>Ο Δομήνικος Θεοτοκόπουλος...</p>';
            break;
          case 'paintings':
            mainContent.innerHTML = '<p>Επιλέξτε κατηγορία πίνακα από το πλευρικό μενού.</p>';
            break;
          case 'exhibitions':
            mainContent.innerHTML = '<p>Φόρτωση εκθέσεων...</p>';
            fetchExhibitions();
            break;
          case 'links':
            mainContent.innerHTML = '<p>Φόρτωση συνδέσμων...</p>';
            fetchLinks();
            break;
          case 'management':
            mainContent.innerHTML = '<p>Επιλέξτε ενέργεια από το πλευρικό μενού.</p>';
            break;
          default:
            mainContent.innerHTML = '<p>Καλώς ήρθατε στην εφαρμογή.</p>';
        }
      });
    });
  });
  