import '../scss/style.scss';
import Swal from "sweetalert2";
const serialize = require('form-serialize');
import React from 'react';
import ReactDOM from 'react-dom';

let csrfToken;

const Login = (props) => {
    return (
        <div id="login">
        <div id="loginDiv">
            <h1>Hyper Hacker</h1>
            <form id="loginForm" name="loginForm" action="/login" method="POST" className="mainForm">
                <input id="user" type="text" name="username" placeholder="username"/>
                <input id="pass" type="password" name="pass" placeholder="password"/>
                <input type="hidden" name="_csrf" value={csrfToken} />
                <input className="formSubmit" type="image" value="Sign In" src="assets/media/submit.png" />
            </form>
            <p>New? Sign up <a href="signup">here</a></p>
        </div>
    </div>    
    )
}

const init = () => {

    let csrfTok = document.querySelector('#_csrf');

    csrfToken = csrfTok.value;

    ReactDOM.render(
        <Login />,
        document.querySelector('#app')
    );

    const form = document.querySelector('#loginForm');
    form.onsubmit = e => {
        e.preventDefault();
        const body = serialize(form);
        fetch(`/login`, {
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