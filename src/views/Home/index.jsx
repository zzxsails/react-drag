import { Component, useState, useEffect, useCallback,createRef } from 'react'
import { connect } from 'react-redux'
import { useDrag, useDrop, DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ResizableBox } from 'react-resizable';
import './home.scss'
import 'react-resizable/css/styles.css';
import { CButton, CText, CSteps, CBreadcrumb } from '../../components/baseComp'
import { baseComps } from '../complist'
import Attr from '../../components/RightAttr'
// import imageUrl from '../../assets/map_bg.png'
import store from '../../redux/store'
import { updatecomp, addcomp, removecomp, updatecur, changeitem, changevent } from '../../redux/actions/comps'
import { updatescale } from '../../redux/actions/base'
import { DeleteOutlined, CopyOutlined, UnlockOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
// import PubSub from 'pubsub-js'
import CodeMirror from 'react-codemirror';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { Layout, Modal } from 'antd';

const { Content, Sider } = Layout;

// 左list
const ItemTypes = {
    BOX: 'box',
};

function Box({ id, label }) {
    const [, drag] = useDrag({
        type: ItemTypes.BOX,
        item: { id, label },
    })
    return <div ref={drag} className='lable'>{label}</div>
}
// 渲染组件
function Comp({ id, name, top, left, index, width, height, items, isdrag, getSize, comScale, event, itemschange }) {
    // isdrag 是否可以拖动,getSize 组件宽高,comScale 缩放比例,event 事件
    const [, drag] = useDrag({
        type: ItemTypes.BOX,
        item: { id, name, left, top, index, width, height, items, isdrag, getSize, event },
        canDrag: () => {
            return isdrag
        }
    })
    const onResize = (event, { size }) => {
        // console.log('Current size:',id, size);
        const { width, height } = size
        getSize(id, width, height)
    };

    return <div style={{ position: 'absolute', left: left * comScale, top: top * comScale, zIndex: index }}>
        {/* resize范围 minConstraints={[80, 80]}
            maxConstraints={[500, 500]} */ }
        <ResizableBox
            width={width}
            height={height + 20}
            onResize={onResize}
            className='cusResize'
            style={{ '--s': comScale }}
        >
            <div ref={drag} style={{ width: '100%', height: '100%', backgroundColor: '#f0f0f0', }}>
                {name === 'CButton' && <CButton width={width} height={height} items={items} event={event} />}
                {name === 'CSteps' && <CSteps id={id} items={items} event={event} />}
                {name === 'CText' && <CText id={id} height={height} items={items} event={event} itemschange={itemschange} />}
                {name === 'CBreadcrumb' && <CBreadcrumb width={width} height={height} items={items} event={event} />}
            </div>
        </ResizableBox>
    </div>
}
// 渲染容器
function Container({ comps, changeCur, itemschange }) {
    // const [chanval,setChanval]=useState({})
    const [boxes, setBoxes] = useState(comps.complists)
    const [selectID, setSelectID] = useState(null)
    const [secComp, setSecComp] = useState(comps.curcomp)

    const [secStyle, setsecStyle] = useState({
        position: 'absolute',
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        // border: '2px solid red',
    })
    const [showMenu, setShowMenu] = useState(false)
    const [menuStyle, setMenuStyle] = useState({})
    // setConStyle 整体背景样式 

    const [conStyle, setConStyle] = useState({})
    const [comScale, setComScale] = useState(1)


    const addBox = (label) => {
        const newbox = baseComps.find(item => item.label === label)
        newbox.id = boxes.length ? boxes[boxes.length - 1].id + 1 : 1
        store.dispatch(addcomp(newbox))
        setBoxes(comps.complists)
    }
    const moveBox = (id, top, left) => {
        const newBox = boxes.find(item => item.id === id)
        newBox.left = left
        newBox.top = top
        store.dispatch(updatecomp(newBox))
        setsecStyle({ ...secStyle, left, top })//move拖动触发的位置
    }

    const resizeBox = (id, width, height) => {
        const h = height - 20
        const newBox = boxes.find(item => item.id === id)
        newBox.width = width
        newBox.height = h
        store.dispatch(updatecomp(newBox))
        setsecStyle({ ...secStyle, width, height: h })
    }

    const [, drop] = useDrop({
        accept: 'box',
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset()
            const left = Math.round(item.left + delta.x)
            const top = Math.round(item.top + delta.y)
            // console.log(item,left,top)
            const newFlag = item.hasOwnProperty('name')
            if (newFlag) moveBox(item.id, top, left)
            else {
                addBox(item.label)
            }
            console.log('drop', boxes)
        },
    })

    const selectChange = (e, id) => {
        e.stopPropagation()
        console.log(e, id, selectID)
        setSelectID(id)
        setShowMenu(false)
    }

    const menuTool = (e) => {
        console.log('menutool', e)
        e.preventDefault()
        let left = e.clientX - 150, top = e.clientY - 110
        setMenuStyle({ left, top })
        setShowMenu(true)
    }
    const menutoolChange = (e, type) => {
        e.stopPropagation()
        var newcomp = JSON.parse(JSON.stringify(secComp))
        switch (type) {
            case 'del':
                console.log('delComp')
                store.dispatch(removecomp(selectID))
                break;
            case 'copy':
                console.log('copyComp')
                // newcomp = JSON.parse(JSON.stringify(secComp))
                newcomp.id = boxes.length ? boxes[boxes.length - 1].id + 1 : 1
                store.dispatch(addcomp(newcomp))
                break;
            case 'lock':
                console.log('lockComp')
                // let newcomp = JSON.parse(JSON.stringify(secComp))
                newcomp.isdrag = !newcomp.isdrag
                store.dispatch(updatecomp(newcomp))
                break;
            case 'hid':
                console.log('hidComp')
                // let newcomp = JSON.parse(JSON.stringify(secComp))
                newcomp.hidden = !newcomp.hidden
                store.dispatch(updatecomp(newcomp))
                break;
            default:
                break;
        }
        setBoxes(comps.complists)
        setTimeout(() => {
            setShowMenu(false)
            setSelectID(null)
        }, 300)
    }

    const updateScale = useCallback(() => {
        console.log('updateScale')
        let stoStyle = store.getState().base.conStyle
        let conDom = document.getElementById('container')
        setComScale(conDom.offsetWidth / stoStyle.width)

    }, [store.getState().base.areaScale])
    const updateConstyle = useCallback(() => {
        // store.dispatch(updatecon(conStyle))
        console.log('updateConstyle', conStyle)
        // setConStyle
        let stoStyle = store.getState().base.conStyle
        let conDom = document.getElementById('container')
        let scale = stoStyle.height / stoStyle.width
        stoStyle.backgroundImage ? setConStyle({
            height: conDom.offsetWidth * scale,
            marginTop: (window.innerHeight - conDom.offsetWidth * scale) / 2 + 'px',
            backgroundImage: `url(${stoStyle.backgroundImage})`,
            backgroundSize: 'cover',
        }) : setConStyle({
            height: conDom.offsetWidth * scale,
            marginTop: (window.innerHeight - conDom.offsetWidth * scale) / 2 + 'px',
            background: stoStyle.backgroundColor,

        })

    }, [store.getState().base.conStyle])
    // 父组件传递渲染数据列表
    const test = useCallback(() => {
        console.log('newcomp-1', comps.complists)
        setBoxes(comps.complists)
    }, [comps.complists])
    // 监听窗口变化
    useEffect(() => {
        let stoStyle = store.getState().base.conStyle
        console.log('constyle', stoStyle)
        let conDom = document.getElementById('container')
        // let scale = stoStyle.height / stoStyle.width
        store.dispatch(updatescale(conDom.offsetWidth / stoStyle.width))
        setsecStyle({ ...secStyle, '--s': conDom.offsetWidth / stoStyle.width })
        window.addEventListener('resize', () => {
            store.dispatch(updatescale(conDom.offsetWidth / stoStyle.width))
            setsecStyle({ ...secStyle, '--s': conDom.offsetWidth / stoStyle.width })
        })

    }, [])
    useEffect(() => {
        console.log('selectID改变了', comps.complists)
        let seComp = boxes.find(item => item.id === selectID)
        setSecComp(seComp)
        console.log(seComp)
        changeCur(seComp)
        if (seComp) {
            const { left, top, width, height } = seComp
            setsecStyle({
                ...secStyle, width, height, left: left * comScale, top: top * comScale
            })
        }
        updateConstyle()
        updateScale()
        test()
    }, [selectID, updateConstyle, updateScale, test])

    return <div ref={drop} id="container" className='container' style={conStyle} onClick={(e) => selectChange(e, null)}>
        {
            boxes.map((box) => {
                return <div key={box.id} onClick={(e) => selectChange(e, box.id)} onContextMenu={menuTool} style={{ cursor: 'move' }}>
                    <Comp {...box} getSize={resizeBox} comScale={comScale} itemschange={itemschange} />
                </div>//getsize子传父
            })
        }
        <div className='secBox' style={selectID ? secStyle : { display: 'none' }} ></div>
        <div className='menuDom' style={showMenu && secComp ? menuStyle : { display: 'none' }}>
            <ul>
                <li onClick={(e) => menutoolChange(e, 'del')}><DeleteOutlined /> <span>删除</span></li>
                <li onClick={(e) => menutoolChange(e, 'copy')}><CopyOutlined /> <span>复制</span></li>
                <li onClick={(e) => menutoolChange(e, 'lock')}>{secComp && secComp.isdrag ? <LockOutlined /> : <UnlockOutlined />}<span>{secComp && secComp.isdrag ? '锁定' : '解锁'}</span></li>
                <li onClick={(e) => menutoolChange(e, 'hid')}>{secComp && secComp.hidden ? <EyeInvisibleOutlined /> : <EyeOutlined />} <span>{secComp && secComp.hidden ? '显示' : '隐藏'}</span></li>
            </ul>
        </div>
    </div>
}



class Home extends Component {
    state = {
        key:0,
        secComp: null,
        eveModal: {
            key: '',
            title: '',
            show: false
        },
        code: ''
        // pubsubmsg:''
    }
    itemsChange = (id, value, key) => {
        console.log('items', id, value)
        this.props.changeitem({ id, [key]: value })
        // 传递到container
        this.setState({ secComp: this.props.comps.curComp })
        console.log(this.props.comps)
    }
    // 接收rightarr数据event
    emShow = (key, title, flag, value) => {
        console.log('eveModal', title, value)
        this.handleEditorChange(value)
        // this.setState({key:this.state.key+1})
        this.setState({code:value, eveModal: { key, title, show: flag } })
        console.log('eveModal-1',this.state.key)
    }
    handleOk = () => {
        console.log('modal 确定', this.state.secComp)
        let { id, event } = this.state.secComp
        let key = this.state.eveModal.key
        let code = this.state.code
        event[key] = code
        console.log(key, event, this.state.code)
        // this.props.changevent({id,event})
        this.setState({ eveModal: { show: false } })
    };
    eventsChange = (id, events) => {
        console.log('events', id, events)
        let newcomp = this.props.comps.complists.find(item => item.id === id)
        this.props.updatecomp({ ...newcomp, event: events })
        this.changeCur({ ...newcomp, event: events })
        console.log('newcomp-0', this.props.comps.curComp)
    }
    changeCur = (val) => {
        console.log(val)
        store.dispatch(updatecur(val))
        this.setState({ secComp: val })
    }
    handleEditorChange = (editor, data, value) => {
        // console.log('handleEditorChange', editor, data, value);
        this.setState({ code: editor })
    };
    componentDidMount() {
        this.setState({ seComp: this.props.comps.curComp })
        console.log(this.props.comps.complists)
        // pubsub使用
        // this.token=PubSub.subscribe('changeInput', (topic,data) => {
        //     this.setState({pubsubmsg:data})
        // })
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.state.itemval !== prevState.itemval) {
            console.log('comps改变了', this.state.itemval, prevState.itemval)
        }
        // pubsub验证结果
        // console.log('111111111',this.state.pubsubmsg)
    }

    render() {
        const { comps } = this.props
        return (
            <div>
                <Layout className='home'>
                    <Layout className='content'>
                        <DndProvider backend={HTML5Backend}>
                            <Sider width="150" className='sider'>
                                {
                                    baseComps.map((box) => {
                                        return <Box key={box.id} {...box} />
                                    })
                                }

                            </Sider>
                            <Content className='midle'>
                                <Container comps={comps} changeCur={this.changeCur} itemschange={this.itemsChange} />
                            </Content>
                        </DndProvider>
                        <Sider width="240" className='sider'>
                            <Attr seComp={comps.curComp} itemschange={this.itemsChange} emodalChange={this.emShow} changeEve={this.eventsChange} />
                        </Sider>
                    </Layout>
                    <Modal title={this.state.eveModal.title} open={this.state.eveModal.show} onOk={this.handleOk} onCancel={() => { this.setState({ eveModal: { show: false } }) }}>
                        {/*强制渲染 key={this.state.key} */}
                        <CodeMirror
                            value={this.state.code}
                            options={{
                                mode: 'javascript',
                                theme: 'material',
                                lineNumbers: true
                            }}
                            onChange={this.handleEditorChange}
                        />
                    </Modal>

                </Layout>
            </div>
        )
    }
}

export default connect(
    state => ({ comps: state.comps, base: state.base }),
    {
        updatecomp, updatecur, changeitem, changevent
    }
)(Home)