import React, { Component } from 'react';
import axios from 'axios';

class LanguageSelector extends Component {
  constructor(props){
    super(props)
    this.state={
      languages: [],
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get(process.env.REST_PATH+'/user/languages');
      const languages = response.data;
      this.setState({ languages });
    } catch(err) {
      console.log('err from LanguageSelector', err);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
  }

  populateLanguages() {
    return (
      this.state.languages.map((language,i) => {
        return <option value={language.language} key={i}>{language.name}</option>
      })
    )
  }

  render() {
    return(
      <div>
        <select value={this.props.translateFrom} className="from" onChange={(e)=>{this.props.selectLanguage(e)}}>
          <option value="" disabled>Translate from...</option>
          {this.populateLanguages()}
        </select>
        <select value={this.props.translateTo} className="to" onChange={(e)=>{this.props.selectLanguage(e)}}>
          <option value="" disabled>Translate to...</option>
          {this.populateLanguages()}
        </select>
      </div>
    );
  }
}

export default LanguageSelector;