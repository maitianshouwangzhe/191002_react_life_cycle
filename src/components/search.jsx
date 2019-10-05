import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Search extends Component{
    static propTypes= {
        setSearchName:PropTypes.func.isRequired
}
    search = ()=>{
        // 得到输入的关键字，并且取出首尾部的空格
        const searchName = this.input.value.trim()
        if (searchName){
            // 将setSearchName方法传递过来调用，并传入参数searchName，
            // 功能：一旦点击输入的值后，即可改变父组件中的searchName
            this.props.setSearchName(searchName)
        }

    }

    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input type="text" placeholder="enter the name you search" ref={input => this.input= input}/>
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}