import React from 'react';
import Navbar from './navbar.jsx';
import Profile from './profile.jsx';

class NavProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showingProfile: false
        };
    }

    toggleProfile() {
        let newShowingProfile = !this.state.showingProfile;
        this.setState({
            showingProfile: newShowingProfile
        });
    }

    render() {
        let profileStyle, containerStyle, navbarStyle;
        if (!this.state.showingProfile) {
            profileStyle = { width: '0px' };
            containerStyle = {
                marginLeft: '0px',
                transition: '0.3s',
                borderColor: '#111'
            };
            navbarStyle = {
                width: '100vw',
                left: '0px'
            }
        }
        else {
            profileStyle = { width: '300px' };
            containerStyle = {
                marginLeft: '300px',
                transition: '0.2s',
                borderColor: '#33ff00'
            };
            navbarStyle = {
                width: '81vw',
                left: '350px'
            }
        }
        return (
            <section>
                <Profile 
                    style={profileStyle} 
                    csrf={this.props.csrf} 
                    username={this.props.username} 
                    dateJoined={this.props.dateJoined} 
                    isPremium={this.props.isPremium}
                    profilePic={this.props.profilePic}/>
                <Navbar 
                    style={navbarStyle}
                    onClick={this.toggleProfile.bind(this)} 
                    csrf={this.props.csrf} 
                    username={this.props.username}
                    profilePic={this.props.profilePic} />
            </section>
        );
    }
}

export default NavProfile;