import React, { Component } from 'react';
import axios from 'axios';

class TextToTranslate extends Component {
  constructor(props) {
    super(props);
    this.state = { translation: '' };
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  async translateText(text) {
    const { translateFrom, translateTo } = this.props;
    try {
      const response = await axios.post(`${process.env.REST_PAT}/user/translate`, {
        text,
        translateFrom,
        translateTo,
      });
      this.setState({ translation: response.data });
    } catch (err) {
      console.log('err from TranslateText', err);
    }
  }

  render() {
    const { handle, message } = this.props;
    const { translation } = this.state;
    return (
      <div>
        <strong>{handle}</strong>: <span onClick={()=>{this.translateText(message)}}>{message}</span>
        <br />
        <small><i>{translation.slice(1, -1)}</i></small>
      </div>
    );
  }
}

export default TextToTranslate;
