import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import { Input } from 'antd'
class TestChild extends Component {
    constructor(props) {
        super(props)
        this.state = {
            msg: '获取父元素数据'
        }
    }
    componentDidMount(){
        
    }
    changeInput=(e)=>{
        if(e.key === 'Enter'){
            console.log('onchange', e.target.value)
            PubSub.publish('changeInput', e.target.value)
        }
    }
    render() {
        const { msg } = this.props
        return (
            <div>
                <span >{ msg }</span>
                <Input defaultValue={msg} onKeyDown={(e)=> this.changeInput(e)} />
            </div>
        )
    }
}

class TestParent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            show: false,
            msg: '我是原数据',
            items: [{
                title: '标题1',
                content: '这里是内容'
            },
            {
                title: '标题2',
                content: '这里是内容'
            }
            ]
        }
    }
    render() {
        return (
            <div>
                <TestChild msg={this.state.msg} />
            </div>
        )
    }
}

export default TestParent