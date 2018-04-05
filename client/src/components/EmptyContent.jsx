import React, { Component } from 'react';
const EmptyContent = (props) => {
  return <div className="empty-content"><em>{props.warningMessage}</em></div>;
}
export default EmptyContent;