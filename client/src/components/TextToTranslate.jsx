import React, { Component } from 'react';
import axios from 'axios';

class TextToTranslate extends Component {
  constructor(props) {
    super(props);
    this.state = { translation: '' };
  }

  async translateText(text) {
    const { translateFrom, translateTo } = this.props;
    try {
      const response = await axios.post(`${process.env.REST_PATH}/user/translate`, {
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
        <strong className={this.props.setColor(handle)}>{handle}</strong>: <span className="text-to-translate" onClick={() => { this.translateText(message); }}>{message}</span>
        <br />
        <i classNmae="translated">{translation.slice(1, -1)}</i>
      </div>
    );
  }
}

export default TextToTranslate;
