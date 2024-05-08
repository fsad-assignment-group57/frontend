
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