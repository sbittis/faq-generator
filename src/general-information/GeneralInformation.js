import React from 'react';
import { TextField } from '@material-ui/core';
import './GeneralInformation.css';

class GeneralInformation extends React.Component {
    render() {
      return (
        <div id="GeneralInformation">
            <TextField id="title" label="Title of your FAQ" value={this.props.title} onChange={this.props.onChange} variant="outlined" fullWidth={true} />
        </div>
      );
    }
  }

export default GeneralInformation;