import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Question";
import qBank from "./QuestionBank";
import Score from "./Score";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      selectedOption: "",
      score: 0,
      quizEnd: false,
      sampleQ: "",
      totalQuestions: 0
    };
  }

  handleOptionChange = (e) => {
    this.setState({ selectedOption: e.target.value });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.checkAnswer();
    this.handleNextQuestion();
  };

  componentDidMount() {
    this.UserList();
  }

  UserList() {
    fetch("https://catfact.ninja/fact")
      .then((response) => response.json())
      .then((json) => this.setState({ sampleQ: json }))
      .catch((error) => console.error(error));

   // fetch("http://localhost:8081/FSAD/getQuiz/"+this.props.level+"/"+this.props.language)
   fetch("http://localhost:8080/api/v1/languages_quiz/"+this.props.level+"/"+this.props.language)
      .then((response) => response.json())
      .then((json) => this.setState({ questionBank: json }))
      .catch((error) => console.error(error));
    // this.setState({ questionBank :qBank });
  }

  checkAnswer = () => {
    const { questionBank, currentQuestion, selectedOption, score } = this.state;
    if (selectedOption === questionBank[currentQuestion].answer) {
      this.setState((prevState) => ({ score: prevState.score + 1 }));
    }
  };

  handleNextQuestion = () => {
    const { questionBank, currentQuestion, selectedOption, score } = this.state;
    this.setState({totalQuestions : this.state.totalQuestions + 1});
    if (currentQuestion + 1 < questionBank.length) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        selectedOption: "",
      }));
    } else {
      this.setState({
        quizEnd: true,
      });
      if(questionBank.length==score+1 && selectedOption === questionBank[currentQuestion].answer)
        this.submitQuiz();
    }
  };

  submitQuiz = () => {
    fetch('http://localhost:8080/api/v1/userlevel/'+this.props.user+"/"+this.props.level+"/"+this.props.language, {
        method: 'post',
        headers: {'Content-Type':'application/json'}
       });
  }

  render() {
    const { questionBank, currentQuestion, selectedOption, score, quizEnd } =
      this.state;
    return (
      <div className="App d-flex flex-column align-items-center justify-content-center">
       {/* Hi {this.props.user} , Welcome to Quiz {this.props.level} for language {this.props.language} "/}
        {/*Hi :::{this.state.questionBank} <br/>
                Bye :::: {this.state.sampleQ}*/}
        {!quizEnd && questionBank ? (
          <Question
            question={questionBank[currentQuestion]}
            selectedOption={selectedOption}
            onOptionChange={this.handleOptionChange}
            onSubmit={this.handleFormSubmit}
          />
        ) : (
          <Score
            score={score}
            onNextQuestion={this.handleNextQuestion}
            totalQuestions={this.state.totalQuestions}
            level={this.props.level}
            className="score"
          />
        )}
      </div>
    );
  }
}

export default Quiz;
