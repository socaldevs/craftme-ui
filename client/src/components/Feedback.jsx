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
margin-right: 40%;
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
    width: '90%',
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
    this.handleStar = this.handleStar .bind(this);
    this.submitFeedback = this.submitFeedback.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleStar(e, value) {
    console.log('num: ', value)
    this.setState({ rating: value.toString() });
  }

  async submitFeedback() {
    try {
      const { student_id, teacher_id, id } = this.props.history.location.state; //id is lesson id
      await axios.post(`${process.env.REST_PATH}/student/submitFeedback`, {
        teacher_id,
        student_id,
        lesson_id: id,
        rating: this.state.rating,
        review: this.state.review,
      })
      await axios.put(`${process.env.REST_PATH}/user/calculateAverageRatingForTeacher/`, {
        teacher_id,
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
        name="rating"
        label="RATING"
        id="margin-dense"
        
        value={this.state.rating}
        className={classes.textField}
        helperText="Please submit your rating (1-5)"
        margin="dense"
      />
          <fieldset className="rating">
    <input type="radio" id="star5" name="rating" value="5" onClick={e => this.handleStar(e, 5)} /><label className="full" htmlFor="star5" title="Awesome - 5 stars"></label>
    <input type="radio" id="star4half" name="rating" value="4 and a half" onClick={e => this.handleStar(e, 4.5)} /><label className="half" htmlFor="star4half" title="Pretty good - 4.5 stars"></label>
    <input type="radio" id="star4" name="rating" value="4" onClick={e => this.handleStar(e, 4)} /><label className="full" htmlFor="star4" title="Pretty good - 4 stars"></label>
    <input type="radio" id="star3half" name="rating" value="3 and a half" onClick={e => this.handleStar(e, 3.5)} /><label className="half" htmlFor="star3half" title="Meh - 3.5 stars"></label>
    <input type="radio" id="star3" name="rating" value="3" onClick={e => this.handleStar(e, 3)} /><label className="full" htmlFor="star3" title="Meh - 3 stars"></label>
    <input type="radio" id="star2half" name="rating" value="2 and a half" onClick={e => this.handleStar(e, 2.5)} /><label className="half" htmlFor="star2half" title="Kinda bad - 2.5 stars"></label>
    <input type="radio" id="star2" name="rating" value="2" onClick={e => this.handleStar(e, 2)} /><label className="full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
    <input type="radio" id="star1half" name="rating" value="1 and a half" onClick={e => this.handleStar(e, 1.5)} /><label className="half" htmlFor="star1half" title="Meh - 1.5 stars"></label>
    <input type="radio" id="star1" name="rating" value="1" onClick={e => this.handleStar(e, 1)} /><label className="full" htmlFor="star1" title="Sucks big time - 1 star"></label>
    <input type="radio" id="starhalf" name="rating" value="half" onClick={e => this.handleStar(e, 0.5)} /><label className="half" htmlFor="starhalf" title="Sucks big time - 0.5 stars"></label>
</fieldset>
          <div>
          </div>

        <TextField
        name="review"
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
