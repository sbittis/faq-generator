import React from 'react';
import { Button } from '@material-ui/core';

import './App.css';
import GeneralInformation from './general-information/GeneralInformation';
import Questions from './questions/Questions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      questions: []
    };

    this.handleChangeQuestions.bind(this);
    this.handleChangeGeneralInformation.bind(this);
    this.import.bind(this);

    this.questions = React.createRef();
  }

  handleChangeQuestions(result) {
    const state = this.state;
    state.questions = result.questions;
    this.setState(state);
  }

  handleChangeGeneralInformation(event) {
    const state = this.state;
    state.title = event.target.value;
    this.setState(state);
  }

  save() {
    console.log(this.state);
    const myData = this.state;
    const filename = this.state.title.toLowerCase().replace(" ", "_") + ".faq";
    const json = JSON.stringify(myData);
    const blob = new Blob([json],{type:'application/json'});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  openImportDialog() {
    document.getElementById("import").click();
  }

  import(event) {
    if (event.target.files) {
      var reader = new FileReader();
      reader.onload = async e => { 
        var newState = JSON.parse(e.target.result);
        this.setState(newState);
        this.questions.current.setQuestions(newState.questions);
      };
      reader.readAsText(event.target.files[0]);
    }
  }

  setNewState() {
    this.setState("newState");
  }

  prepareOutput(htmlText) {
    return htmlText
      .replace("\"##questions##\"", JSON.stringify(this.state.questions))
      .replaceAll("##title##", this.state.title);
  }

  generate() {
    fetch('/template.html')
    .then((response) => response.text())
    .then(htmlText => {
      const htmlOutputText = this.prepareOutput(htmlText);
      const filename = this.state.title.toLowerCase().replace(" ", "_") + ".html";
      const blob = new Blob([htmlOutputText],{type:'text/html'});
      const href = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = href;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })  
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>FAQ Generator</h1>
        </header>
        <br/>
        <Button variant="outlined" color="primary" onClick={() => { this.generate() }}>Generate FAQ page</Button> &nbsp;
        <Button variant="outlined" color="secondary" onClick={() => { this.save() }}>Save work</Button> &nbsp;
        <Button variant="outlined" color="secondary" onClick={() => { this.openImportDialog() }}>Import...</Button>
        <input id="import" type="file" name="file" accept=".faq" onChange={(event) => this.import(event)}/>
        <GeneralInformation title={this.state.title} onChange={(event) => this.handleChangeGeneralInformation(event)} />
        <br/>
        <Questions ref={this.questions} onChange={(result) => this.handleChangeQuestions(result)} />
      </div>
    );
  }
}

export default App;
