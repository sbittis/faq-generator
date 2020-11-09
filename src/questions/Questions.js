import { Button } from '@material-ui/core';
import React from 'react';
import Question from '../question/Question';
import './Questions.css';

class Questions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: props.questions ?? []
        };
        this.handleChangeQuestion.bind(this);
        this.handleChangeAnswer.bind(this);
    }
  
    addQuestion() {
        const newList = this.state.questions;
        newList.push({question: "", answer: "", tags: ""});
        this.setState({ questions: newList });
    }

    setQuestions(questions) {
        this.setState({
            questions: questions
        });
    }

    handleChangeQuestion(index, event) {
        this.handleChange(index, "question", event.target.value);
    }

    handleChangeAnswer(index, event) {
        this.handleChange(index, "answer", event.target.value); 
    }

    handleChangeTags(index, event) {
        this.handleChange(index, "tags", event.target.value);
    }

    handleChange(index, propName, value) {
        const newList = this.state.questions.map((question, i) => {
            if (i === index) {
                question[propName] = value;
            }
            return question;
        });
        this.setState({ questions: newList });
        this.props.onChange(this.state);
    }

    handleRemoveQuestion(index, event) {
        const newList = this.state.questions;
        newList.splice(index, 1);
        this.setState({ questions: newList });
    }
  
    render() {
        return (
            <div className="questions">
                <h2>Questions</h2>
                {this.state.questions.map((question, i) => {
                    return (<Question key={i}
                                question={question.question}
                                answer={question.answer}
                                tags={question.tags}
                                onChangeQuestion={(event) => this.handleChangeQuestion(i, event)}
                                onChangeAnswer={(event) => this.handleChangeAnswer(i, event)}
                                onChangeTags={(event) => this.handleChangeTags(i, event)}
                                onRemoveQuestion={(event) => this.handleRemoveQuestion(i, event)} />);
                })}
                <Button variant="outlined" color="primary" onClick={() => { this.addQuestion() }}>Add Question</Button>
            </div>
        );
    }
}

export default Questions;