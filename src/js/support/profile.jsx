import React from 'react';
import Swal from 'sweetalert2'

class Profile extends React.Component {

    changeUsername() {
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
                return fetch(`/update-username?_csrf=${this.props.csrf}`, {
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
    }

    changePassword() {
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
                return fetch(`/update-password?_csrf=${this.props.csrf}`, {
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
    }

    upgrade() {
        fetch(`/upgrade?_csrf=${this.props.csrf}`, {
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

    uploadProfilePicture() {
        let buttonDiv = document.querySelector('#buttons');

        let newForm = document.querySelector('#uploadForm');

        const fileUpload = (e) => {
            e.preventDefault();
            //https://stackoverflow.com/questions/5587973/javascript-upload-file
            let formData = new FormData();
            let picture = document.querySelector('#fileSelect').files[0];

            formData.append("sampleFile", picture);
            formData.append('_csrf', csrf);
            fetch(`/upload`, {method: "POST", body: formData})
            .then(
                function(response){
                    if(response.status === 200){
                        response.json().then(function(data){
                            window.location = data.redirect;
                        });
                    }
                }
            );
            return false;
        };


        if(document.querySelector('#fileSelect')===null){
            newForm.setAttribute('ref', '/uploadForm');
            newForm.setAttribute('id', 'uploadForm');
            newForm.setAttribute('action', `/upload`);
            //only accepts pngs and jpegs bc if unsupported file types were uploaded it crashed
            newForm.setAttribute('accept', 'image/png, image/jpeg');
            newForm.setAttribute('method', 'post');
            newForm.setAttribute('encType', 'multipart/form-data');
    
            let input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('id', 'fileSelect');
            input.setAttribute('name', 'sampleFile');
    
            let sub = document.createElement('input');
            sub.setAttribute('type', 'submit');  
            sub.setAttribute('value', 'Submit');
            sub.innerHTML="Submit";
            

            sub.style.fontSize = '2rem';
            sub.style.borderRadius = '20px';
            sub.style.border = '2px solid #33ff00';
    
            newForm.appendChild(input);
            newForm.appendChild(sub);

            sub.onclick = fileUpload;
        }
    }

    render() {
        return (
            <div id="profile" style={this.props.style}>
                <div id="profileContent">
                    <img className='profile-img' alt="" />
                    <h1>{this.props.username}</h1>
                    <h3>Joined On: {this.props.dateJoined}</h3>

                    <div id="buttons">
                        <button id="change-username" onClick={this.changeUsername.bind(this)}>Change Username</button>
                        <button id="change-password" onClick={this.changePassword.bind(this)}>Change Password</button>
                        <button id="picture">Change Picture</button>
                        <button><a href="/logout">Log Out</a></button>

                        <form id="uploadForm" ref='/uploadForm' action={`/upload?_csrf=${this.props.csrf}`} method="POST" encType="multipart/form-data">
                            <input id="_csrf" type="hidden" name="_csrf" value={this.props.csrf} />
                        </form>
                    </div>

                    {!this.props.premium && 
                        <button id="upgrade" onClick={this.upgrade.bind(this)}>Upgrade To Hacker Status</button>
                    }
                </div>
            </div>
        );
    }
}

export default Profile;