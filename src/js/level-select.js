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
        .then((res) => {
            if (res.dismiss !== 'cancel') {
                Swal.fire({
                    title: 'Password Updated'
                });
            }

        });
    };
    const upgrade = document.querySelector('#upgrade');
    if (upgrade) {
        upgrade.onclick = e => {
            e.preventDefault();
            fetch(`/upgrade?_csrf=${csrf}`, {
                method: 'POST'
            })
            .then(res => {
                if (res.status === 200) {
                    Swal.fire('Congrats, you now have Hacker Status and can access levels 4 & 5')
                    .then(() => {
                        window.location.href = '/level-select';
                    });
                } else {
                    Swal.fire('Sorry, something went wrong');
                }
            });
        }
    }

    //from Austin's demo
    document.querySelector('#picture').onclick = () =>{
        let buttonDiv = document.querySelector('#buttons');

        let newForm = document.createElement('form');
        newForm.setAttribute('ref', '/uploadForm');
        newForm.setAttribute('id', 'uploadForm');
        newForm.setAttribute('action', '/upload');
        newForm.setAttribute('method', 'post');
        newForm.setAttribute('encType', 'multipart/form-data');

        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('id', 'fileSelect');
        input.setAttribute('name', 'sampleFile');


        let sub = document.createElement('input');
        sub.setAttribute('type', 'submit');  
        sub.setAttribute('value', 'Submit');

        newForm.appendChild(input);
        newForm.appendChild(sub);

        buttonDiv.appendChild(newForm);
        
    };

    document.querySelectorAll('.locked-level').forEach(el => {
        el.onclick = e => {
            e.preventDefault();
            Swal.fire('This level is locked. Upgrade to Hacker Status to access it!');
        };
    })
}

window.onload = init;