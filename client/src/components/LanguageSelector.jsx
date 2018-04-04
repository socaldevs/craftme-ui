import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class LanguageSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      languages: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await axios.get(`${process.env.REST_PATH}/user/languages`);
      const languages = response.data;
      this.setState({ languages });
    } catch(err) {
      console.log('err from LanguageSelector', err);
    }
  }

  populateLanguages() {
    return (
      this.state.languages.map((language, i) => {
        return <MenuItem value={language.language} key={i}>{language.name}</MenuItem>;
      })
    );
  }

  render() {
    const { classes, translateFrom, translateTo } = this.props;
    console.log('from', translateFrom, 'to', translateTo);
    return (
      <div className="select-container">
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel>Translate From</InputLabel>
            <Select value={translateFrom} inputProps={{ name: 'from' }} onChange={(e)=>{this.props.selectLanguage(e)}}>
              {this.populateLanguages()}
            </Select>
          </FormControl>
        </form>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel>Translate To</InputLabel>
            <Select value={translateTo} inputProps={{ name: 'to' }} onChange={(e)=>{this.props.selectLanguage(e)}}>
              {this.populateLanguages()}
            </Select>
          </FormControl>
        </form>
      </div>
    );
  }
}

LanguageSelector.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LanguageSelector);
