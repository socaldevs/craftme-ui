import React, { Component } from 'react';

class Popup extends React.Component {
  render() {
    return (
      <div className="popup">
        <div className="popup-inner">
          <div className="confirmation-container">
            <h1 className="confirmed-title">{this.props.text}</h1>
            <button className="card-button" onClick={this.props.closePopup}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
