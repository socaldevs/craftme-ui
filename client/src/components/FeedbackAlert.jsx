import React, { Component } from 'react';

const FeedbackAlert = (props) => {
  return(
    <p className={`alert ${props.alertType} ${props.alertVisibility}`}>
      {props.alertMessage || 'A'}
    </p>
  );
};

export default FeedbackAlert;
