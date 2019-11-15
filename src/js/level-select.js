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
            showCancelButton: true,
            preConfirm: () => {
                const password = document.querySelector('#password').value;
                const newUsername = document.querySelector('#new-username').value;
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
                        throw new Error(res.statusText);
                    }
                })
                .catch(err => {
                    Swal.showValidationMessage(err);
                })
            }
        });
    };
    document.querySelector('#change-password').onclick = e => {
        e.preventDefault();
        Swal.fire({
            title: 'Change Password',
            html: 
            `
            <input id='old-password' type='password' class='swal2-input' placeholder='enter current password'>
            <input id='new-password' type='password' class='swal2-input' placeholder='enter new password'>
            `,
            showLoaderOnConfirm: true,
            showCancelButton: true,
            preConfirm: () => {
                const oldPassword = document.querySelector('#old-password').value;
                const newPassword = document.querySelector('#new-password').value;
                return fetch(`/update-password?_csrf=${csrf}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        oldPassword,
                        newPassword
                    })
                })
                .then(res => {
                    if (res.status === 200) {
                        return Promise.resolve();
                    }
                    else {
                        throw new Error(res.statusText);
                    }
                })
                .catch(err => {
                    Swal.showValidationMessage(err);
                })
            }
        })
        .then(() => {
            Swal.fire({
                title: 'Password Updated'
            });
        })
    };
}

window.onload = init;