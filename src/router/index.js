import React, { Component } from 'react'
import { HashRouter as Router,Route,Switch } from "react-router-dom"
import App from "../pages/App"
import SignUpPage from "../pages/SignUp/SignUpPage"
import SignInPage from "../pages/SignIn/SignInPage"
import HeaderNav from "../components/HeaderNav"
import FlashMessageList from "../components/Flash/FlashMessageList"
import FileChunkerAndMerkleTree from "../components/zkp/pt4-zkp"
import InputComponent from "../pages/zkppage/datazkp"
import TextInput from "../components/zkp/ceshi"
import Zkp_verify from "../components/zkp/zkp_verify"

export default class index extends Component {
    render() {
        return (
            <Router>
                <HeaderNav />
                <FlashMessageList />
                
                <Switch>
                    <Route exact path="/" component={ App }></Route>
                    <Route path="/signup" component={ SignUpPage }></Route>
                    <Route path="/signin" component={ SignInPage }></Route>
                    <Route path="/zkp" component={ FileChunkerAndMerkleTree }></Route>
                    <Route path="/datazkp" component={ TextInput }></Route>
                    <Route path="/zkp_verify" component={ Zkp_verify }></Route>
                    {/* <Route path="/blockstate" component={ blockstate }></Route> */}
                </Switch>
            </Router>
        )
    }
}
