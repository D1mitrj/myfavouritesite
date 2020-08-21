import './app.scss';

// accordion dropdown
chayns.ui.initAll();

function init() {
    const button = document.querySelector('.btn');
    button.addEventListener('click', sendtoIntercom);

    const textarea = document.getElementById('search');
    textarea.addEventListener('input', searchSite);
}

// List of the sites.
// fetch.
fetch('https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=50')
.then(response => response.json())
.then(data => buildElements(data.Data));

// Creating the Elements
function buildElements(Data) {
    const list = document.querySelector('.list');
    list.innerHTML = '';

    Data.forEach((site) => {
        const div = document.createElement('div');
        const image = document.createElement('img');
        const p = document.createTextNode(site.appstoreName);

        // divs
        div.className = 'list__items';

        // images
        image.src = `https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`;
        image.className = 'site__img';
        image.onclick = function openSite() { 
            window.open(`https://chayns.net/${site.siteId}/`);
        };

        list.appendChild(div);

        // textnodes
        div.appendChild(image);
        div.appendChild(p);
    });
}
// Formulardata send via intercom.
function sendtoIntercom() {
    const name = document.querySelector('.name').value;
    const email = document.querySelector('.e_mail').value;
    const adresse = document.querySelector('.adresse').value;
    const kommentar = document.querySelector('.kommentar').value;
    const linkderseite = document.querySelector('.link_der_seite').value;

    chayns.intercom.sendMessageToPage({ 
       text: `Name: ${name} E-Mail: ${email} Adresse: ${adresse} Kommentar: ${kommentar} Link der Seite: ${linkderseite}`
    }).then((data) => {
        if (data.status === 200)chayns.dialog.alert('', 'thank you');
    });
}
// Search for an site.
function searchSite() {
    const searchedSite = document.querySelector('search'); 
    chayns.findSite(searchedSite, 0, 5)
    .then(console.log);
}

init();
