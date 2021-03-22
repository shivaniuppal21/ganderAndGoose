import React, { useState } from 'react';
import emailjs from 'emailjs-com';

export default function ContactUs(props) {
  debugger;
    let productInfo = props.location.myCustomProps;
    const [msg,setMsg] = useState({
        name: "",
        email: "",
        feedback: 'Ask about ' + productInfo.title + ' (' + productInfo.id +')',
    });
    function handleInputChange(event) {
      event.preventDefault();
      const target = event.target;
      const name = target.name;
      const value = target.value;
      setMsg({...msg, [name]: value });
    }
    function sendMessage() {
      const templateId = 'template_ycmwbt2';
      const finalData =  'Regarding ' + productInfo.title + ' (' + productInfo.id +')\n' + msg.feedback;
      sendFeedback(templateId, {message_html: finalData, from_name: msg.name, reply_to: msg.email})
    }   
    function sendFeedback (templateId, variables) {
      emailjs.send(
        "service_teq7p9i","template_uckwhxc",
        variables
        ).then(res => {
          console.log('Email successfully sent!')
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
    }
    return (
        <div>
          <form
            className="ui form"
          >
            <textarea
              id="name"
              name="name"
              onChange={handleInputChange.bind(this)}
              placeholder="Your name"
              required
              value={msg.name}
              style={{ width: "100%" }}
              rows={1}
            />
            <br />
            <textarea
              id="email"
              name="email"
              onChange={handleInputChange.bind(this)}
              placeholder="your email address"
              required
              value={msg.email}
              style={{ width: "100%" }}
              rows={1}
            />
            <br />
            <textarea
              id="feedback"
              name="feedback"
              onChange={handleInputChange.bind(this)}
              placeholder="what would you like to chat about?"
              required
              value={msg.feedback}
              style={{ width: "100%", height: "250px" }}
            />
            <br />
            <input
              type="button"
              value="Send"
              className="ui button"
              style={{
                fontFamily: "Amatic SC",
                fontSize: "20px",
                color: "blue"
              }}
              onClick={sendMessage.bind(this)}
            />
          </form>
        </div>
    );
}