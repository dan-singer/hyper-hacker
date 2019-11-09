import '../../scss/style.scss';
import {toggleProfile} from '../support/utils.js'

function init() {
    document.querySelector('#profile-toggle').onclick = toggleProfile;
    const csrf = document.querySelector('#_csrf').value;
    const urlParams = new URLSearchParams(window.location.search);
    const levelNum = parseInt(urlParams.get('num'));
    document.querySelector('#complete').onclick = e => {
        fetch(`/level?num=${levelNum}&_csrf=${csrf}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(() => {
            console.log('Got the OK.');
        })
        .catch(err => {
            console.log(err);
        })
    };
}

window.onload = init;