
// Score.js
 
import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

 
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
                {level != 3 ? <div> Sucessfully Unlocked next level</div> : <div> <Navigator/></div>}
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

const Navigator = () => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      // Navigate to a different route when a button is clicked
      navigate('/home');
    };
  
    return (
      <div>
        Sucessfully completed course<br/>
        <p  style={{ textDecoration: 'underline', color: 'blue' }} onClick={handleClick}> Explore More languages</p>
      </div>
    );
  };
 
export default Score;