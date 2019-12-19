import '../scss/style.scss';
import Swal from "sweetalert2";
const serialize = require('form-serialize');
import React from 'react';
import ReactDOM from 'react-dom';

let csrfToken;

const Signup = (props) => {
    return (
        <div id="login">
            <div id="loginDiv">
                <h1>Sign Up</h1>
                <form id="loginForm" name="loginForm" action="/signup" method="POST" className="mainForm">
                    <input id="user" type="text" name="username" placeholder="username"/>
                    <input className="pass" type="password" name="pass" placeholder="password"/>
                    <input className="pass" type="password" name="pass2" placeholder="retype password"/>
                    <input type="hidden" name="_csrf" value={csrfToken} />
                    <input className="formSubmit" type="image" value="Sign Up" src="assets/media/submit.png" />

                </form>
                <p>Returning Hacker? Log in <a href="/">here</a></p>
            </div>
        </div>   
    )
}

const init = () => {

    let csrfTok = document.querySelector('#_csrf');

    csrfToken = csrfTok.value;

    ReactDOM.render(
        <Signup />,
        document.querySelector('#app')
    );

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
                window.location.href = '/tutorial';
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