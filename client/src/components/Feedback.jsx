import React, { Component } from 'react';
import axios from 'axios';
import Button from 'material-ui/Button';
import styled from 'styled-components';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';


const StyleButton = styled(Button)`
width: 100%;
`;

const StyledDiv = styled.div`
margin-top: 10%;
margin-left: 40%;
margin-right: 35%;
`;

const styles = theme => ({
  root: {
    width: 150,
  },
  row: {
    display: 'flex',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      review: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitFeedback = this.submitFeedback.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }

  async submitFeedback() {
    try {
      let {student_id, teacher_id, id} = this.props.history.location.state; //id is lesson id
      let feedback = await axios.post(`http://localhost:3000/student/submitFeedback`, {
        teacher_id,
        student_id,
        lesson_id: id,
        rating: this.state.rating,
        review: this.state.review
      })
      this.props.history.push('/lessons');
    } catch (error) {
      console.log('Error with submitFeedback', error);
      return;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <StyledDiv>
        <Paper>
        <div>
          This is the Feedback Component
          <div>
          </div>

                <TextField
        label="RATING"
        id="margin-dense"
        onChange={this.handleChange}
        value={this.state.rating}
        className={classes.textField}
        helperText="Please submit your rating (1-5)"
        margin="dense"
      />
          <div>
          </div>

        <TextField
        label="REASONS"
        id="margin-dense"
        onChange={this.handleChange}
        value={this.state.review}
        className={classes.textField}
        helperText="Please state your reasons for your review"
        margin="dense"
      />
        <div>
          </div>

          <StyleButton onClick={this.submitFeedback} >Submit </StyleButton>
        </div>
        </Paper>
      </StyledDiv>
    );
  }
}
export default withStyles(styles)(Feedback);
