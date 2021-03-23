import React from 'react';
import { render } from 'react-dom';
import FlashMessage from 'react-flash-message';
export default function FlashMsg(props) {
    const Message = () => (
        <FlashMessage duration={5000}>
          <strong>{props}</strong>
        </FlashMessage>
    );
    render(Message,document.body);
}

