import '../scss/style.scss';
import '../scss/leaderboard.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import Leaderboard from './support/leaderboard.jsx';

const LeaderboardPage = (props) => {
    return (
        <React.Fragment>
            <nav>
                <a id="home" href='/level-select'>Hyper Hacker</a>
            </nav>
            <section id="leaderboard-container">
                <h1>Leaderboard</h1>
                <Leaderboard />
            </section>
        </React.Fragment>
    );
};

const init = () => {
    ReactDOM.render(<LeaderboardPage />, document.querySelector('#app'));
};

window.onload = init;