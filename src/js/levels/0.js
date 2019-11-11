import '../../scss/style.scss';
import '../../scss/level0.scss';
import {toggleProfile} from '../support/utils.js'

function init() {
    document.querySelector('#profile-toggle').onclick = toggleProfile;
    const csrf = document.querySelector('#_csrf').value;
    const urlParams = new URLSearchParams(window.location.search);
    const levelNum = parseInt(urlParams.get('num'));
    const links = document.querySelectorAll(".finish-link");
    for(let finish of links){
        finish.onclick = e => {
            e.preventDefault();
            fetch(`/level?num=${levelNum}&_csrf=${csrf}`, {
                method: 'POST',
            })
            .then(res => {
                if (res.status === 200) {
                    window.location.href = '/level-select';
                }
            })
            .catch(err => {
                console.log(err);
            });
        };
    }
    

    setTimeout(reset, 1000);
}

function reset() {

    if(document.querySelector('#overhead')){
        let overhead = document.querySelector('#overhead');

        if(overhead.style.display !== 'block'){
            overhead.style.display = 'block';
        }
    } else{
        console.log('HERE');
        let overhead = document.createElement('div');
        overhead.style.position = 'fixed';
        overhead.style.width = '99vw';
        overhead.style.height= '100vh';
        overhead.style.textAlign= 'center';
        overhead.style.backgroundColor='#111';
        overhead.setAttribute("id", "overhead");

        let title = document.createElement('h1');
        title.innerHTML = 'Level 1: Overflowing with Secrets';
        let subTitle = document.createElement('h2');
        subTitle.innerHTML= 'There are six buttons hiding in the space outside of your reach. One of them completes the level. Find it.<br><br>And if you think you can get rid of the overlay that easy, you are in for a nasty surprise.';

        overhead.appendChild(title);
        overhead.appendChild(subTitle);
        document.body.appendChild(overhead);
    }
    


    setTimeout(reset, 2000);
}

window.onload = init;

/*
position: fixed;
  width:99vw;
  height:100vh;
  text-align: center;
  background-color: $defaultBackground;

  h1{
    margin-top: 35vh;
    font-size: 4rem;
  }

  h2{
    font-size: 3rem;
    width:50%;
    margin:auto;
  }

*/