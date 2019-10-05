import React, {Component} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class Main extends Component{
    static propTypes = {
        searchName: PropTypes.string.isRequired
    }

    state = {
        initView: true,
        loading: false,
        users: null,
        errMsg:null
    }
    // 因为状态在这里，可以很容易使用setState改变状态，则在此处发起请求
    // 父子组件可以使用props传递数据，同级（兄弟）组件如何进行数据传输？？？？ 需要引入父组件

    // 组件生命周期
    // 当组件接收到新的属性（属性发生变化时）时，回调
    componentWillReceiveProps (newProps) {
        // 指定了新的searchName，需要请求
        const {searchName} = newProps
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