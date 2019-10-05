import React, {Component} from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Main extends Component{
    state = {
        initView: true,
        loading: false,
        users: null,
        errMsg:null
    }


    componentDidMount() {
        // 订阅消息
        // 指定了新的searchName，需要请求
        // 一旦是回调函数，都写箭头函数（终极解决办法），
        // 即：将回调函数function (msg, searchName) {}  改为 (msg, searchName) => {}
        // 这样就解决了setState没有定义的出错的问题
        PubSub.subscribe('search', (msg, searchName) => {
            // 发起请求之前需要更新状态
            this.setState({
                initView: false,
                loading: true,
            })
            //    发起ajax请求
            const url =`https://api.github.com/search/users?q=${searchName}`
            axios.get(url)
                .then(response => {
                    //    得到相应数据
                    const result = response.data
                    //    若不知道数据结构，可以先打印输出
                    console.log(result)
                    // result.items 相当于users，即多个用户
                    // 使用map方法拆分数据
                    const users = result.items.map((item) => {
                        return {name:item.login, url:item.html_url, avatarUrl:item.avatar_url}
                    })
                    //    更新状态（成功时）
                    this.setState({loading:false, users})
                })
                .catch(error => {
                    //    更新状态（）
                    this.setState({loading:true, errorMsg: error.message})
                })
        })
    }

    render() {
        const {initView, loading, users, errMsg} = this.state
        //
        const {searchName} = this.props
        console.log('render()', searchName)
        if (initView){
            return <h2>请输入关键字搜索:{searchName}</h2>
        } else if (loading){
            return <h2>正在请求中.....</h2>
        } else if (errMsg){
            return <h2>{errMsg}</h2>
        } else {
            return (
                <div className="row">
                    {/*  可能搜索结果为多个，则users是一个数组，此处的箭头函数返回一个标签 */}
                    {
                        users.map((user, index) => (
                            <div className="card" key={index}>
                                <a href={user.url} target="_blank">
                                    <img src={user.avatarUrl} style={{width: 100}}/>
                                </a>
                                <p className="card-text">{user.name}</p>
                            </div>
                        ))
                    }
                </div>
            )
        }
    }
}