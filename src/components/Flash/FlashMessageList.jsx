import React, { Component } from 'react'
import FlashMessage from "./FlashMessage"
import { connect } from "react-redux"

class FlashMessageList extends Component {

    /**
     * FlashMessage的数据保存，存入到Redux中
     */

    render() {
        return (
            <div>
                {
                    this.props.flashs.map((ele,index) =>{
                        return  <FlashMessage item={ ele } key={index}/>
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        flashs:state.flash
    }
}

export default connect(mapStateToProps)(FlashMessageList)
