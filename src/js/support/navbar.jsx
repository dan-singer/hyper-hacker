import React from 'react';

class Navbar extends React.Component {

    toggleProfile() {
        let navBar = document.querySelector('nav');
        let profile = document.querySelector('#profile');
        let container = document.querySelector('#levelContainer');
    }


    render() {
        return (
            <nav style={this.props.style}>
                <div>
                    <h2>Welcome Back, {this.props.username}</h2>
                </div>
                <img id="profile-toggle" onClick={this.props.onClick} className='profile-img' src={this.props.profilePic} alt="" />
            </nav>
        );
    }
}

export default Navbar;