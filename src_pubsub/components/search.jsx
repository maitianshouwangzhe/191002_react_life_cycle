import React, {Component} from 'react'
import PubSub from 'pubsub-js'

export default class Search extends Component{

    search = ()=>{
        // 得到输入的关键字，并且取出首尾部的空格
        const searchName = this.input.value.trim()
        if (searchName){
        //    发布消息给兄弟组件Main
        //    向Main组件发布搜索的消息
        //    第一个参数为事件名，第二个参数为 需要传递的数据
            PubSub.publish('search', searchName)
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