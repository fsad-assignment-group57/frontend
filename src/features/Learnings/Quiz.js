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
      totalQuestions: 0,
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
   

    // fetch("http://localhost:8081/FSAD/getQuiz/"+this.props.level+"/"+this.props.language)
    fetch(
      "http://localhost:8080/api/v1/languages_quiz/" + this.props.level + "/" +  this.props.language,
      {
        method: "GET",
        headers: { "Content-Type": "application/json",         Authorization : this.props.token},
      }
    )
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
    this.setState({ totalQuestions: this.state.totalQuestions + 1 });
    if (currentQuestion + 1 < questionBank.length) {
      this.setState((prevState) => ({
        currentQuestion: prevState.currentQuestion + 1,
        selectedOption: "",
      }));
    } else {
      this.setState({
        quizEnd: true,
      });
      if (
        questionBank.length == score + 1 &&
        selectedOption === questionBank[currentQuestion].answer
      )
        this.props.submitQuiz(this.props.level);
    }
  };

  

  render() {
    const { questionBank, currentQuestion, selectedOption, score, quizEnd } =
      this.state;
    return (
      <div className="App d-flex flex-column align-items-center justify-content-center">
        {/* Hi {this.props.user} , Welcome to Quiz {this.props.level} for language {this.props.language} "/}
        {/*Hi :::{this.state.questionBank} <br/>
                Bye :::: {this.state.sampleQ}*/}
        {!quizEnd && questionBank ? (
          <div>
            Answer all questions to clear quiz
            <Question
              question={questionBank[currentQuestion]}
              selectedOption={selectedOption}
              onOptionChange={this.handleOptionChange}
              onSubmit={this.handleFormSubmit}
            />
          </div>
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
