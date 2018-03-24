import React from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Menu, { MenuItem } from 'material-ui/Menu';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import { Switch, Route, Link } from 'react-router-dom';



const StyledDiv = styled.div`
margin-top: 20%;
margin-left: 40%;
margin-right: 40%;
`;

var suggestions = [];

function renderInput(inputProps) {
  const { classes, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: ref,
        ...other,
      }}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </span>
          ) : (
              <strong key={String(index)} style={{ fontWeight: 500 }}>
                {part.text}
              </strong>
            );
        })}
      </div>
    </MenuItem>
  );
}

function renderSuggestionsContainer(options) {
  const { containerProps, children } = options;

  return (
    <Paper {...containerProps} square>
      {children}
    </Paper>
  );
}

function getSuggestionValue(suggestion) {
  return suggestion.label;
}

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;
  let count = 0;

  return inputLength === 0
    ? []
    : suggestions.filter(suggestion => {
      const keep =
        count < 5 && suggestion.label.toLowerCase().slice(0, inputLength) === inputValue;

      if (keep) {
        count += 1;
      }

      return keep;
    });
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
    height: 250,
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
});

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      anchorEl: null,
      showModal: false
    }
    this.handleSuggestionsFetchRequested = this.handleSuggestionsFetchRequested.bind(this);
    this.handleSuggestionsClearRequested= this.handleSuggestionsClearRequested.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.search = async () => {
      try {
        let data = await axios.get(process.env.REST_PATH +'/user/getAllCrafts');
        if (data) {
          let newPull = [];
          for(var element of data.data){
            newPull.push({label: element.name})
          }
          suggestions = newPull;
        }
      } catch (error) {
        console.log('error with search data:', error);
        return;
      }
      }
      this.handleClick = this.handleClick.bind(this);
      this.handleClose= this.handleClose.bind(this);
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleClick(event){
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose(){
    this.setState({ anchorEl: null });
  };

  handleOpenModal () {
    this.setState({ showModal: true });
  };
  
  handleCloseModal () {
    this.setState({ showModal: false });
  };


  handleSuggestionsFetchRequested({ value }){
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested(){
    this.setState({
      suggestions: [],
    });
  };

  handleChange(event, { newValue }){
    this.setState({
      value: newValue,
    });
  };

  componentDidMount(){
    this.search();
  }

  render() {
    const { classes } = this.props;
    const anchorEl  = this.state.anchorEl;
      return (
        <div>
          <Grid container spacing={40}>
          <Grid item xs={12}>
            <Paper >
            <Button
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                Open Menu
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
              >
                <MenuItem onClick={this.handleClose}>
                  <Link to="/login">Login</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/signup">Signup</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/chatrooms">ChatRooms</Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/testtranslate">Test Translate Component </Link>
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/lessons">Lessons</Link>
                </MenuItem>
                <MenuItem onClick={() => this.handleLogoutClick()}>
                  Logout
                </MenuItem>
                <MenuItem onClick={this.handleClose}>
                  <Link to="/feedback">Feedback</Link>
                </MenuItem>
              </Menu>


            </Paper>
          </Grid>
          </Grid>
        <StyledDiv >
        <Grid container spacing={40}>
          <Grid item xs={12}>
            <Paper >xs=12</Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper ></Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper ></Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper ></Paper>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Paper ></Paper>
          </Grid>        
          <Grid item xs={12}>
            <Autosuggest 
            theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
            }}
          renderInputComponent={renderInput}
          suggestions={this.state.suggestions}
          onSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.handleSuggestionsClearRequested}
          renderSuggestionsContainer={renderSuggestionsContainer}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={{
            classes,
            placeholder: 'Search a Skill',
            value: this.state.value,
            onChange: this.handleChange,
          }}
        />
          </Grid>
        </Grid>
      </StyledDiv>
      </div>
  
      );
    }
}

export default withStyles(styles)(Search);
