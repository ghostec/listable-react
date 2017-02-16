import React from 'react';

const Toast = props => {
  const { message } = props;

  return (
    <toast><toast-message>{message}</toast-message></toast>
  )
}

export default Toast;
