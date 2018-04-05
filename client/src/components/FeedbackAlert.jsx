import React, { Component } from 'react';

const FeedbackAlert = (props) => {
  return(
    <p style={props.customStyle} className={`alert ${props.alertType} ${props.alertVisibility}`}>
      {props.alertMessage || 'A'}
    </p>
  );
};

export default FeedbackAlert;
