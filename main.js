async function getSynonyms() {
    if (document.getElementById('searchQuery').value == 0) {
        alert('Enter Synonym please!');
        location.reload();
    }
    let query = document.getElementById('searchQuery').value;
    let url = `https://www.openthesaurus.de/synonyme/search?q=${query}&format=application/json`;
    let response = await fetch(url);
    let responseAsJson = await response.json();
    let synsets = responseAsJson['synsets'];
    renderSynsets(synsets);
}


function renderSynsets(synsets) {
    let container = document.getElementById('container');
    container.innerHTML = /*html*/`
        <div class="searchvalue">Es wurden <b>${synsets.length}</b> Synoym-sets geladen.</div>
    `;
    synLength(synsets);
}


function synLength(synsets) {
    for (let i = 0; i < synsets.length; i++) {
        const synset = synsets[i];
        let terms = synset['terms'];
        container.innerHTML += /*html*/`
              <h2 class="synonymtitle">Ergebnis Synonym-Set mit ID ${synset['id']}</h2>
            `;
        for (let x = 0; x < terms.length; x++) {
            const term = terms[x];
            container.innerHTML += /*html*/`
              <div class="synonymtext">${term['term']}</div>
            `;
        }
    }
}


function key(e) {
    if (e.keyCode == 13) {
        getSynonyms();
    }
}


function renderByScroll() {
    if (window.scrollY == 0) {
        document.getElementById('goupcontainer').classList.add('d-none');
    } else if (userDidScroll()) {
        document.getElementById('goupcontainer').classList.remove('d-none');
    }
}
window.addEventListener('scroll', () => {
    renderByScroll();
})


function userDidScroll() {
    return (window.innerHeight + window.scrollY) > (window.innerHeight);
}


function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}