async function fetchExhibitions() {
    const response = await fetch('/api/exhibitions');
    const exhibitions = await response.json();
    const mainContent = document.getElementById('content');
    mainContent.innerHTML = '<h2>Εκθέσεις</h2>';
    exhibitions.forEach(ex => {
      mainContent.innerHTML += `<p>${ex.title} - ${ex.date} (${ex.location})</p>`;
    });
  }
  
  async function fetchLinks() {
    const response = await fetch('/api/links');
    const links = await response.json();
    const mainContent = document.getElementById('content');
    mainContent.innerHTML = '<h2>Σύνδεσμοι</h2>';
    links.forEach(link => {
      mainContent.innerHTML += `<p><a href="${link.url}" target="_blank">${link.description}</a></p>`;
    });
  }
  