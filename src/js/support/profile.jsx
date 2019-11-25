import React from 'react';

class Profile extends React.Component {
    render() {
        return (
            <div id="profile">
                <div id="profileContent">
                    <img className='profile-img' alt="" />
                    <h1>{this.props.username}</h1>
                    <h3>Joined On: {this.props.dateJoined}</h3>

                    <div id="buttons">
                        <button id="change-username">Change Username</button>
                        <button id="change-password">Change Password</button>
                        <button id="picture">Change Picture</button>
                        <button><a href="/logout">Log Out</a></button>

                        <form id="uploadForm" ref='/uploadForm' action="/upload?_csrf={{csrfToken}}" method="POST" encType="multipart/form-data">
                            <input id="_csrf" type="hidden" name="_csrf" value={this.props.csrfToken} />
                        </form>
                    </div>

                    {this.props.premium && 
                        <button id="upgrade">Upgrade To Hacker Status</button>
                    }
                </div>
            </div>
        );
    }
}

export default Profile;