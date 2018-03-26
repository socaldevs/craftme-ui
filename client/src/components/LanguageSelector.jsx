import React, { Component } from 'react';
import axios from 'axios';

class LanguageSelector extends Component {
  constructor(props){
    super(props)
    this.state={
      languages: [],
      from: '',
      to: '',
    }
  }

  async componentDidMount() {
    try {
      const response = await axios.get('http://localhost:3000/user/languages');
      const languages = response.data;
      this.setState({ languages });
    } catch(err) {
      console.log('err from LanguageSelector', err);
    }
  }

  populateLanguages() {
    return (
      this.state.languages.map((language,i) => {
        return <option value={language.language} key={i}>{language.name}</option>
      })
    )
  }

  makeSelection(e) {
    e.target.className === 'from' ? this.setState({ from: e.target.value}) : this.setState({ to: e.target.value});
    this.props.selectLanguage(e);
  }

  render() {
    return(
      <div>
        <select value={this.state.from} className="from" onChange={(e)=>{this.makeSelection(e)}}>
          <option value="" disabled>Translate from...</option>
          {this.populateLanguages()}
        </select>
        <select value={this.state.to} className="to" onChange={(e)=>{this.makeSelection(e)}}>
          <option value="" disabled>Translate to...</option>
          {this.populateLanguages()}
        </select>
      </div>
    );
  }
}

export default LanguageSelector;