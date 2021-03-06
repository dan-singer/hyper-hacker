import React from 'react';
import Swal from 'sweetalert2';

class LevelContainer extends React.Component {

    showLockedMessage(e) {
        e.preventDefault();
        Swal.fire('This level is locked. Upgrade to Hacker Status to access it!');
    }

    render() {
        const mappedLevels = this.props.levels.map((level, i) => {
            let hasLink = (level.isPremium && this.props.isPremium) || !level.isPremium;
            return (    
                <a 
                href={hasLink ? `/level?num=${i}` : ''} 
                className={hasLink ? '' : 'locked-level'}
                onClick={hasLink ? null : e => this.showLockedMessage(e)} 
                key={i}>
                    <div className="levelSelect">
                        <div className="highscore">
                            <h5>
                                {this.props.highscores[i]}
                            </h5>
                            <img src="assets/media/medal.png" alt="high score" />
                        </div>
                        <div className="levelText">
                            <h3>Level {i}</h3>
                            <h4>{level.name}</h4>
                        </div>
                    </div>
                </a>
            )
            });

        return (
            <div id="levelContainer">
                <div id="levelGrid">
                    {mappedLevels}
                </div>
            </div>
        );     
    }
}

export default LevelContainer;