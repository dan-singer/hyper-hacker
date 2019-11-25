import React from 'react';

class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <div>
                    <h2>Welcome Back, {this.props.username}</h2>
                </div>
                <img id="profile-toggle" className='profile-img' src={this.props.profileImg} alt="" />
            </nav>
        );
    }
}

export default Navbar;