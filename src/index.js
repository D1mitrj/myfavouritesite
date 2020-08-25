import './app.scss';

// accordion dropdown
chayns.ui.initAll();

function init() {
    const button = document.querySelector('.btn');
    const more = document.querySelector('.more');
    more.addEventListener('click', changeBool);
    button.addEventListener('click', sendtoIntercom);

    let timeout = null;
    const textarea = document.getElementById('search');
    textarea.addEventListener('input', () => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            searchSite();
        }, 1000);
    });

    searchSite();
}

// set moreBool to true.
function changeBool(Data) {
    const list = document.querySelector('.list');
    list.innerHTML = '';
        
    let datalength = Data.length;

    Data.slice(0, 30).forEach((site) => {
        const div = document.createElement('div');
        const image = document.createElement('img');
        const p = document.createElement('div');

        // divs
        div.className = 'list__items';

        fetch(`https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`)
            .then(() => {
                image.src = `https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`;
            })
            .catch(() => {
                image.src = 'https://chayns.tobit.com/storage/77892-13928/Images/icon-57.png';
            });

        image.onclick = function openSite() { 
            window.open(`https://chayns.net/${site.siteId}/`);
        };
        // images
        image.className = 'site__img';
        p.innerHTML = site.appstoreName;
        p.className = 'site__name';

        list.appendChild(div);
        div.appendChild(image);
        // textnodes
        div.appendChild(p);
    });
}

// Creating the Elements
function buildElements(Data) {
    const list = document.querySelector('.list');
    list.innerHTML = '';
        
    let datalength = 20;

    Data.slice(0, datalength).forEach((site) => {
        const div = document.createElement('div');
        const image = document.createElement('img');
        const p = document.createElement('div');

        // divs
        div.className = 'list__items';

        fetch(`https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`)
            .then(() => {
                image.src = `https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`;
            })
            .catch(() => {
                image.src = 'https://chayns.tobit.com/storage/77892-13928/Images/icon-57.png';
            });

        image.onclick = function openSite() { 
            window.open(`https://chayns.net/${site.siteId}/`);
        };
        // images
        image.className = 'site__img';
        p.innerHTML = site.appstoreName;
        p.className = 'site__name';

        list.appendChild(div);
        div.appendChild(image);
        // textnodes
        div.appendChild(p);
    });
}
// Formulardata send via intercom.
// it check for login.
function sendtoIntercom() {

    if (!chayns.env.user.isAuthenticated) {
        login();
    } else if (chayns.env.parameters.login) {
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
}
    // Search for an site.
    function searchSite() {
        const searchedSite = document.querySelector('#search');
        // chayns.findSite(searchedSite.value)
        // .then((data) => buildElements(data.Value));
        // List of the sites.
        // fetch.
        fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchedSite.value}&Skip=0&Take=50`)
        .then(response => response.json())
        .then(data => buildElements(data.Data));
        .then(data => changeBool(data.Data)) // FIX THIS. it should be loaded all elements.
        }

function login() {
   // optional -> prevents site reload
   chayns.addAccessTokenChangeListener(() => {
     console.log('login successful');        
   });
   // no reload tapp after login
   chayns.login();
}

init();
