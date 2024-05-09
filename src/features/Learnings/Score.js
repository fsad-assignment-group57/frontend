
// Score.js
 
import React, { Component } from 'react';
 
class Score extends Component {


    
    render() {
        const { score, onNextQuestion, totalQuestions, level } = this.props;
 
        return (
            <div>
            { score===totalQuestions ?(
            <div>
                <h2>Results</h2>
                <h4>Your score: {score}</h4>
                <h4>Congrats!! You have earned {level * 5} points</h4>
                {level != 3 ? <div> Sucessfully Unlocked next level</div> : <div>Sucessfully completed course</div>}
            </div>) : (
                <div>
                    Please retry again!! Your score is {score}
                </div>

            )
        }
            </div>
        );
    }
}
 
export default Score;