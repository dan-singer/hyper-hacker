/**
 * Various utility functions used for the front end of hyper-hacker
 */

const test = () => {
    console.log('test');
}

function toggleProfile() {
    let navBar = document.querySelector('nav');
    let profile = document.querySelector('#profile');
    let container = document.querySelector('#levelContainer');
    if(profile.style.width == "0px" || profile.style.width == ""){
        profile.style.width = "300px";
        container.style.marginLeft = "300px";
        container.style.transition = "0.2s";
        navBar.style.width = "81vw";
        navBar.style.left = "350px";
        container.style.borderColor = "#33ff00";
        
    } else{
        profile.style.width = "0px";
        container.style.marginLeft = "0px";
        container.style.transition = "0.3s";
        navBar.style.width = "100vw";
        navBar.style.left = "0px";
        container.style.borderColor = "#111";
    }
}

export { toggleProfile, arrayBufferToBase64 };