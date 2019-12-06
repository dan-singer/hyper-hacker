import '../scss/style.scss';
import '../scss/levels.scss';
import React from 'react';
import ReactDOM from 'react-dom';

const LeaderboardPage = (props) => {
    return (
        <div id="overhead">
            <h1 class="tight">Leaderboard</h1>
        </div>
    );
};

const init = () => {
    ReactDOM.render(<LeaderboardPage />, document.querySelector('#app'));
};

window.onload = init;