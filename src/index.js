import './app.scss';

// accordion dropdown
chayns.ui.initAll();

// All functions that are not able to run, will be run from the init function.
function init() {
    const button = document.querySelector('.btn');
    const buttonMore = document.getElementById('btnMore');
    const textarea = document.getElementById('search');
    // const more = document.querySelector('.more');
    let timeout = null;
    // more.addEventListener('click', showAll);
    button.addEventListener('click', sendtoIntercom);
    buttonMore.addEventListener('click', () => {
        if (flag === true) {
            showAll();
            flag = false;
        } else if(flag === false) {
            showLess();
            flag = true;
        }
    });
    // buttonMore.addEventListener('click', showLess);
    textarea.addEventListener('input', () => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            searchSite();
        }, 500);
    });
//hotfix
    searchSite();
}
// Search for an site.
async function searchSite() {
    chayns.showWaitCursor();
    const searchedSite = document.querySelector('#search');
    let searchedSitefiltered = '';
    if (searchedSite.value === '') {
        searchedSitefiltered = 'Ahaus';
    } else {
        searchedSitefiltered = searchedSite.value;
    }

    // List of the sites.
    fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchedSitefiltered}&Skip=0&Take=20`)
    .then(response => response.json())
    .then(data => buildElements(data.Data, 1));
}
let counter = 0;
let flag = true;

function showAll() {
    if (flag === true) {
        const searchedSite = document.querySelector('#search');
        let searchedSitefiltered = '';
        if (searchedSite.value === '') {
        searchedSitefiltered = 'Ahaus';
        } else {
        searchedSitefiltered = searchedSite.value;
        }

        const less = document.querySelector('.more');
        less.innerHTML = 'weniger...';

        counter += 1;
        // List of the sites.
        fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchedSitefiltered}&Skip=${20 * counter}&Take=20`)
        .then(response => response.json())
        .then(data => buildElements(data.Data));
    }
    flag = false;
}
function showLess() {
    if (flag === false) {
    const searchedSite = document.querySelector('#search');
    const list = document.querySelector('.list');
    const less = document.querySelector('.more');

    let searchedSitefiltered = '';
    if (searchedSite.value === '') {
    searchedSitefiltered = 'Ahaus';
    } else {
    searchedSitefiltered = searchedSite.value;
    }

    list.innerHTML = '';
    less.innerHTML = 'Mehr...';

    counter -= 1;
    // List of the sites.
    fetch(`https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=${searchedSitefiltered}&Skip=${20 * counter}&Take=20`)
    .then(response => response.json())
    .then(data => buildElements(data.Data));
    }
    flag = true;
}
// Creating the Elements
function buildElements(Data, search) {
    // when ever the elements were created, they first disapear.
    const list = document.querySelector('.list');
    if (search) {
        list.innerHTML = '';
    }

    Data.forEach((site) => {
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
    chayns.hideWaitCursor();
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


function login() {
   // optional -> prevents site reload
   chayns.addAccessTokenChangeListener(() => {
    //  console.log('login successful');
   });
   // no reload tapp after login
   chayns.login();
}

init();
