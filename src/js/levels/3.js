import '../../scss/style.scss';
import '../../scss/levels.scss';
import {toggleProfile} from '../support/utils.js'

const init = () => {
    document.querySelector('#profile-toggle').onclick = toggleProfile;
    const csrf = document.querySelector('#_csrf').value;
    const urlParams = new URLSearchParams(window.location.search);
    const levelNum = parseInt(urlParams.get('num'));

    const completeButton = document.querySelector('#complete');

    if (completeButton) {
        completeButton.onclick = e => {
            fetch(`/level?num=${levelNum}&_csrf=${csrf}`, {
                method: 'POST',
            })
            .then(res => {
                if (res.status === 200) {
                    window.location.href = '/level-select';
                }
            })
            .catch(err => {
                console.log(err);
            });
        }
    }

}

window.onload = init;