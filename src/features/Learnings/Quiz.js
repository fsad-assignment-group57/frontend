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
      "languages_quiz/" + this.props.level + "/" +  this.props.language,
      {
        method: "GET",
        headers: { "Content-Type": "application/json",         
        Authorization : this.props.token,
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Host": "localhost:8080",
        "Connection": "keep-alive",
        "Access-Control-Request-Method": "*",
        "Origin": "http://localhost:3000",
        "Access-Control-Request-Headers": "access-control-allow-credentials,access-control-allow-methods,access-control-allow-origin,allow,content-type",
        "Accept": "*/*",
        "Accept-Language": "en-GB,en;q=0.9,en-US;q=0.8,da;q=0.7",
        "Accept-Encoding": "gzip, deflate, br"
        },
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
