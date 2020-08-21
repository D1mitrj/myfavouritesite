// import login from './utils/login';
 import './app.scss';
// import { data } from 'autoprefixer';

// const handleUserIsLoggedIn = ($introElement, $loginBtn) => {
//     $introElement.innerText = `Hallo ${chayns.env.user.firstName}`;
//     $loginBtn.innerText = 'Abmelden';
//     $loginBtn.addEventListener('click', async () => {
//         await chayns.logout();
//         window.location.reload();
//     });
// };

// const handleUserIsLoggedOut = ($introElement, $loginBtn) => {
//     $introElement.innerText = 'Bitte melde dich an';
//     $loginBtn.innerText = 'Anmelden';
//     $loginBtn.addEventListener('click', () => {
//         login(() => handleUserIsLoggedIn($introElement, $loginBtn));
//     });
// };

// const init = async () => {
//     try {
//         await chayns.ready;

//         const $introElement = document.querySelector('#intro');
//         const $loginBtn = document.querySelector('#loginBtn');

//         if (chayns.env.user.isAuthenticated) {
//             handleUserIsLoggedIn($introElement, $loginBtn);
//         } else {
//             handleUserIsLoggedOut($introElement, $loginBtn);
//         }
//     } catch (err) {
//         console.error('No chayns environment found', err);
//     }
// };

// init();

// accordion dropdown
chayns.ui.initAll();

// List of the sites.
// fetch.
fetch('https://chayns1.tobit.com/TappApi/Site/SlitteApp?SearchString=love&Skip=0&Take=50')
.then(response => response.json())
//   .then(data => console.log(data));
.then(data => buildElements(data.Data));

// Creating the Elements
function buildElements(Data) {
    Data.forEach((site) => {
        const image = document.createElement('img');
        const div = document.createElement('div');
        const p = document.createTextNode(site.appstoreName);

        // divs
        div.className = 'list__items';

        // images
        image.src = `https://chayns.tobit.com/storage/${site.siteId}/Images/icon-57.png`;
        image.className = 'site__img';
        image.onclick = function openSite() { 
            window.open(`https://chayns.net/${site.siteId}/`);
        };

        const list = document.querySelector('.list');
        list.appendChild(div);

        // textnodes
        div.appendChild(image);
        div.appendChild(p);
    });
}
// Formulardata send via intercom.
function sendtoIntercom () {
    let name = doc
}