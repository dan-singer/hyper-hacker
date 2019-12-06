import React from 'react';

class HighscoreBox extends React.Component {
    render() {
        <section className="highscore-box">
            <h2>{this.props.levelName}</h2>
            {this.props.scores.map(scoreInfo => {
                return (
                    <div class="highscore">
                        <p>{scoreInfo.username}: {scoreInfo.score}</p>
                    </div>
                )
            })}
        </section>
    }
}

export default HighscoreBox;