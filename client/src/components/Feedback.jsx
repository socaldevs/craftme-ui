import React, {Component} from 'react';
import axios from 'axios';

export default class Feedback extends Component {
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
    this.setState({ [e.target.name]: e.target.value });
  }

  async submitFeedback() {
    try {
      const { student_id, teacher_id, id } = this.props.history.location.state; //id is lesson id
      await axios.post(`http://localhost:3000/student/submitFeedback`, {
        teacher_id,
        student_id,
        lesson_id: id,
        rating: this.state.rating,
        review: this.state.review,
      })
      await axios.put(`http://localhost:3000/user/calculateAverageRatingForTeacher/`, {
        teacher_id,
      })
      this.props.history.push('/lessons');
    } catch (error) {
      console.log('Error with submitFeedback', error);
      return;
    }
  }

  render() {
    return (
      <div>
        Please review your lesson:
        <div> 
          Please submit your rating (1-5): <input name="rating" onChange={this.handleChange} value={this.state.rating}/>
        </div>
        <div>
          Please state your reasons for your review: <input name="review" onChange={this.handleChange} value={this.state.review}/>
        </div>
        <button onClick={this.submitFeedback} >Submit </button>
      </div>
    )
  }
}