import '../scss/style.scss';
import {toggleProfile} from './support/utils.js'
import Swal from "sweetalert2";

function init() {
    const csrf = document.querySelector('#_csrf').value;
    document.querySelector('#profile-toggle').onclick = toggleProfile;
    document.querySelector('#change-username').onclick = e => {
        e.preventDefault();
        Swal.fire({
            title: 'Change Username',
            html: 
            `
            <input id='password' type='password' class='swal2-input' placeholder='enter password'>
            <input id='new-username' class='swal2-input' placeholder='enter new username'>
            `,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                const password = document.querySelector('#password').value;
                const newUsername = document.querySelector('#new-username').value;
                console.log(password);
                return fetch(`/update-username?_csrf=${csrf}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        password,
                        newUsername
                    })
                })
                .then(res => {
                    if (res.status === 200) {
                        window.location.href = '/level-select';
                    }
                    else {
                        throw new Error(res.error);
                    }
                })
                .catch(err => {
                    Swal.showValidationMessage(`Failed: ${err}`);
                })
            }
        })
        .then(() => {
            console.log('Wut');
        })
    };
}

window.onload = init;