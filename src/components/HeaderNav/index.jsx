import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import * as authActions from "../../actions/auth"
import { withRouter } from "react-router-dom"
import { REACT_REDUX_LOCAL } from "../../constants"


class HeaderNav extends Component {

    logoutHandle = () =>{
        /**
         * 清空redux数据
         */
        this.props.authActions.logOut()
        localStorage.removeItem(REACT_REDUX_LOCAL)
        this.props.history.push("/signin")
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">首页</Link>
                    <div className="navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            {
                                this.props.auth.user.token ?
                                    <>
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link">{this.props.auth.user.nick}</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/zkp">生成文件证明</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/datazkp">生成数据证明</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/zkp_verify">验证证明</Link>
                                        </li>
                                        {/* <li className="nav-item">
                                            <Link className="nav-link" to="/blockstate">区块链状态</Link>
                                        </li> */}
                                        <li className="nav-item">
                                            <button onClick={ this.logoutHandle }>退出登陆</button>
                                        </li>

                                    </>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signup">注册</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link" to="/signin">登陆</Link>
                                        </li>                                       
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        authActions:bindActionCreators(authActions,dispatch)
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(HeaderNav))