import React, { Component } from 'react';
import NumericInput from 'react-numeric-input';

class Captcha extends Component {
  constructor(props) {
    super(props);
    this.state = {
      captcha: this.generateCaptcha(),
      input: '',
    };
  }

  generateCaptcha() {
    let captcha = '';
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 4; i++) {
      captcha += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return captcha;
  }

  handleInputChange = (value) => {
    this.setState({ input: value });
  };

  handleSubmit = () => {
    if (this.state.input === this.state.captcha) {
      // 验证码正确，继续后续操作
      console.log('验证码正确');
    } else {
      // 验证码错误，提示重新输入
      console.log('验证码错误，请重新输入');
      this.setState({ captcha: this.generateCaptcha(), input: '' });
    }
  };

  render() {
    return (
      <div>
        <img src={`http://dummyimage.com/120x40/000/fff&text=${this.state.captcha}`} alt="captcha" />
        <NumericInput
          className="form-control"
          min={0}
          max={9999}
          value={this.state.input}
          onChange={this.handleInputChange}
        />
      </div>
    );
  }
}

export default Captcha;