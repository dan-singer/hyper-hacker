import '../scss/style.scss';
import '../scss/levels.scss';
import {toggleProfile} from './support/utils.js'

const init = () => {
    document.querySelector('#profile-toggle').onclick = toggleProfile;
}

window.onload = init;