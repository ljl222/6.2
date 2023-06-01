import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import validator from "../../utils/validator"
import classnames from "classnames"
import Captcha from "../yanzheng"
class SignInForm extends Component {


    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        let validatorLogin = validator({
            username: this.state.username,
            password: this.state.password
        })
        if (validatorLogin.isValid) {
            this.setState({
                errors: validatorLogin.errors
            })
        } else {
            // 还原errors的提示
            this.setState({
                errors:{}
            })
            this.props.authActions.asyncSetUserObj({
                username: this.state.username,
                password: this.state.password
            }).then(res => {
                if (res.data.status === 200) {
                    // 成功
                    this.props.flashActions.addFlashMessage({
                        id: Math.random().toString().slice(2),
                        msg: "登陆成功",
                        type: "success"
                    })
                    this.props.history.replace("/")
                } else {
                    this.props.flashActions.addFlashMessage({
                        id: Math.random().toString().slice(2),
                        msg: "登陆失败",
                        type: "danger"
                    })
                }
            })
        }
    }

    changeHandle = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const { username, password,errors } = this.state
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <h1>欢迎来到基于零知识证明的数据安全认证平台</h1>
                    <div className="form-group">
                        <label className="control-label">Username</label>
                        <input
                            className={ classnames('form-control',{ 'is-invalid':errors.username }) }
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.changeHandle}
                        />
                        {errors.username ? <span style={{ color: 'red', fontSize: '10px' }}>{errors.username}</span> : ''}
                    </div>
                    <div className="form-group">
                        <label className="control-label">PassWord</label>
                        <input
                             className={ classnames('form-control',{ 'is-invalid':errors.password }) }
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.changeHandle}
                        />
                        {errors.password ? <span style={{ color: 'red', fontSize: '10px' }}>{errors.password}</span> : ''}
                    </div>
                    <Captcha />
                    <div className="form-group">
                        <button className="btn btn-primary btn-lg">登陆</button>
                    </div>
                   
                </form>
            </div>
        )
    }
}

export default withRouter(SignInForm)