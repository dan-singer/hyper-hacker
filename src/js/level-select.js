import '../scss/style.scss';
import {toggleProfile} from './support/utils.js'

function init() {
    document.querySelector('#profile-toggle').onclick = toggleProfile;
}

window.onload = init;