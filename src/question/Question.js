import React from 'react';
import { Button, TextField } from '@material-ui/core';
import './Question.css';

class Question extends React.Component {
    render() {
      return (
        <div className="question-block">
          <TextField className="question" label="Question*" value={this.props.question} onChange={this.props.onChangeQuestion} variant="outlined" fullWidth={true} />
          <TextField className="answer" label="Answer*" multiline rows={4} value={this.props.answer} onChange={this.props.onChangeAnswer} variant="outlined" fullWidth={true} />
          <TextField className="tags" label="Tags (additional keywords for searching, comma-separated)" value={this.props.tags} onChange={this.props.onChangeTags} variant="outlined" fullWidth={true} />
          <Button variant="outlined" color="primary" className="removeButton" onClick={this.props.onRemoveQuestion}>Remove this question</Button>
        </div>
      );
    }
  }

export default Question;