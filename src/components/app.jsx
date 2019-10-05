import React, {Component} from 'react'
import Search from "./search";
import Main from "./main";

export default class App extends Component{
    state = {
        searchName:''
    }

    // 设置改变searchName的方法，set方法的固定语句
    setSearchName = (searchName) =>{
        // 更新状态
        this.setState({searchName})
    }

    render() {
        return (
            <div className="container">
                <Search setSearchName={this.setSearchName}/>
                <Main searchName={this.state.searchName} />

            </div>
        )
    }
}