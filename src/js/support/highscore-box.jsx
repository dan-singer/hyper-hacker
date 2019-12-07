import React from 'react';

class HighscoreBox extends React.Component {
    render() {
        return (
            <section className="highscore-box">
                <h2>{this.props.levelName}</h2>
                {this.props.scores.length > 0 
                ? 
                    this.props.scores.map((scoreInfo, i) => {
                        return (
                            <div key={i} className="highscore-entry">
                                <p>{scoreInfo.username}: {scoreInfo.score}</p>
                            </div>
                        )
                    })
                :
                    <div className="highscore-entry">
                        <p>No one has completed this level yet!</p>
                    </div>
                }
            </section>
        );
    }
}

export default HighscoreBox;