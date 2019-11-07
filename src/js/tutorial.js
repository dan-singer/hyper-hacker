import '../scss/style.scss';

/*Taken from: https://www.w3schools.com/howto/howto_js_typewriter.asp*/
let i = 0;

let tutorialText = ["Welcome to Hyper Hacker", "The goal is simple. Click the green button to win.", "In order to click the green button, you have to access it first.", "You must manipulate elements of the page in order to access the button.", "The faster you get to the button, the better your score.", "Let's try an example."];

let tutorialIndex = -1;

function runTypeWriter(){
    document.querySelector("#text").innerHTML = "";
    if(tutorialIndex == tutorialText.length-1){
        loadTutorial();
    } else{
        tutorialIndex++;
        i=0;
        setTimeout(typeWriter, 200);
    }
    
}

function typeWriter() {
    if (i < tutorialText[tutorialIndex].length) {
        document.querySelector("#text").innerHTML += tutorialText[tutorialIndex].charAt(i);
        i++;
        setTimeout(typeWriter, 40);
    }
}

function loadTutorial(){
    document.querySelector("#example").style.display = 'block';
    document.querySelector("#tutorial").style.display="none";
}

function init() {
    runTypeWriter();
    const finish = document.querySelector("#finish-link");
    const _csrf = document.querySelector("#_csrf");
    finish.onclick = e => {
        e.preventDefault();
        fetch(`/tutorial?_csrf=${_csrf.value}`, {
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

document.onkeypress = runTypeWriter;

window.onload = init;