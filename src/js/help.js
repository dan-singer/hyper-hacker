import '../scss/style.scss';
import '../scss/levels.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const Help = (props) => {
    return (
        <div id="overhead">
            <h1>Help?</h1>
            <h2>This isn't really a help page. But maybe it saved something for use in a different level...</h2>
        </div>
    );
}

const init = () => {
    ReactDOM.render(<Help />, document.querySelector('#app'));
}

window.onload = init;