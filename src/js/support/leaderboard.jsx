import React from 'react';
import HighscoreBox from './highscore-box.jsx';

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levelScores: null
        };
        fetch('/highscores')
        .then(res => res.json())
        .then(data => {
            this.setState({
                levelScores: data
            });
        });
    }
    render() {
        if (!this.state.levelScores) {
            return (<section className="leaderboard"></section>);
        }
        return (
            <section id="leaderboard">
                {this.state.levelScores.map((levelScore, i) => {
                    return (
                        <HighscoreBox key={i} levelName={levelScore.levelName} scores={levelScore.scores} />
                    );
                })}
            </section>
        );
    }
}

export default Leaderboard;