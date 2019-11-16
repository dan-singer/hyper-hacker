import '../scss/style.scss';
import Swal from "sweetalert2";
const serialize = require('form-serialize');

const init = () => {
    const form = document.querySelector('#loginForm');
    form.onsubmit = e => {
        e.preventDefault();
        const body = serialize(form);
        fetch(`/signup`, {
            method: 'POST',
            body,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json()
            }
            else {
                window.location.href = '/level-select';
            }
        })
        .then(data => {
            if (data.error) {
                Swal.fire(`Error: ${data.error}`);
            }
        })
        .catch(err => {
            console.log(err);
        })
    };
}

window.onload = init;