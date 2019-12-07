import React from 'react';
import Swal from 'sweetalert2'

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            acceptingImages: false
        };
    }

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

    togglePictureForm() {
        let newAcceptState = !this.state.acceptingImages;
        this.setState({
            acceptingImages: newAcceptState
        });
    }

    uploadProfilePicture(e) {
        e.preventDefault();
        //https://stackoverflow.com/questions/5587973/javascript-upload-file
        let formData = new FormData(e.target);
        console.log(this.props.csrf);
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
    }

    render() {
        return (
            <div id="profile" style={this.props.style}>
                <div id="profileContent">
                    <img className='profile-img' alt="" src={this.props.profilePic}/>
                    <h1>{this.props.username}</h1>
                    <h3>Joined On: {this.props.dateJoined}</h3>

                    <div id="buttons">
                        <button id="change-username" onClick={this.changeUsername.bind(this)}>Change Username</button>
                        <button id="change-password" onClick={this.changePassword.bind(this)}>Change Password</button>
                        <button id="picture" onClick={this.togglePictureForm.bind(this)}>Change Picture</button>
                        <button><a href="/logout">Log Out</a></button>

                        <form id="uploadForm" ref='/uploadForm' onSubmit={e => this.uploadProfilePicture(e)} method="POST" encType="multipart/form-data">
                            <input id="_csrf" type="hidden" name="_csrf" value={this.props.csrf} />
                            {this.state.acceptingImages && 
                            <React.Fragment>
                                <input type="file" id="fileSelect" name="sampleFile" />
                                <input type="submit" value="Submit" style={{
                                    fontSize: '2rem', 
                                    borderRadius: '20px',
                                    border: '2px solid #33ff00'}}
                                />
                            </React.Fragment>
                            }
                        </form>
                        <button><a href="/leaderboard">Leaderboard</a></button>
                    </div>

                    {!this.props.isPremium && 
                        <button id="upgrade" onClick={this.upgrade.bind(this)}>Upgrade To Hacker Status</button>
                    }
                </div>
            </div>
        );
    }
}

export default Profile;