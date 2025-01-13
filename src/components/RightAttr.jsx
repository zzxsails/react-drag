import { InputNumber, ColorPicker, Collapse, Image, Upload, message, Button, Tag, Input } from 'antd'
import { CloseCircleOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { CButtonAttr, CTextAttr, CStepsAttr, CBreadcrumbAttr } from './baseAttr';
import { useCallback, useEffect, useState } from 'react';
import store from '../redux/store'
// import imgUrl from '../assets/back.jpg'
import { updatecon } from '../redux/actions/base'
import type { GetProp, UploadProps } from 'antd';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
const { TextArea } = Input;
const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
};

function PropG({ id, name, items, itemschange }) {
    // const [value, setValue] = useState()
    useEffect(() => {
        console.log('PropG', items)
    }, [items])
    const changeValue = (e) => {
        if (e.key === 'Enter') {
            console.log('onchange', e.target.value)
            let newvalue = e.target.value
            // 子组件向父组件传递数据
            itemschange(id, newvalue, 'items')

        }
    }
    const changeValue0 = (e, index, key) => {
        console.log('onchange', e.target.value, index, key)
        // setValue(value.map((item, i) => i === index ? { ...item, [key]: e.target.value } : item))
    }

    return <div>
        {
            name === 'CButton' && <ul>
                <li><span>内容:</span>
                    <Input className='val' placeholder="Basic usage" defaultValue={items} onKeyDown={changeValue} />
                </li>
            </ul>
        }
        {
            name === 'CText' && <ul>
                <li><span>内容:</span>
                    <Input className='val' placeholder="Basic usage" defaultValue={items} onKeyDown={changeValue} />
                </li>
            </ul>
        }
        {
            name === 'CSteps' && <div style={{ marginBottom: '10px' }}>
                {items.map(({ title, description }, index) => (
                    <ul key={index}>
                        <li>
                            <span className='lab'>title:</span>
                            <Input className='val' placeholder="Basic usage" defaultValue={title} onInput={(e) => changeValue0(e, index, 'title')} />
                        </li>
                        <li>
                            <span className='lab'>description:</span>
                            <TextArea className='val' rows={3} defaultValue={description} onInput={(e) => changeValue0(e, index, 'description')} />
                        </li>
                    </ul>
                ))}
                <Button type='primary' onClick={changeValue}>修改</Button>
            </div>
        }
        {
            name === 'CBreadcrumb' && <div>
                {items.map(({ title }, index) => (
                    <ul key={index}>
                        <li>
                            <span className='lab'>title:</span>
                            <Input className='val' placeholder="" defaultValue={title} onInput={(e) => changeValue0(e, index, 'title')} />
                        </li>
                    </ul>
                ))}
                <Button type='primary' onClick={changeValue}>修改</Button>
            </div>
        }
    </div>
}

function EventG({ id, event, emodalChange,changeEve }) {
    const delEvent = (val) => {
        console.log('删除事件', val, event)
        let events = { ...event,[val]:undefined }
        changeEve(id,events)
        // console.log('events', events)
    }
    const changeShow = (val) => {
        console.log('changeShow', val)
        switch (val) {
            case 'change':
                console.log('change事件', JSON.stringify(event.change))
                emodalChange('change', '编辑change事件', true, event.change)
                break;
            case 'hover':
                console.log('hover事件', JSON.stringify(event.hover))
                emodalChange('hover', '编辑悬浮事件', true, event.hover)
                break;
            default:
                console.log('click事件', JSON.stringify(event.click))
                emodalChange('click', '编辑点击事件', true, event.click)
                break;
        }
    }
    const addClick = () => {
        console.log('addclick', event)
        emodalChange('click', '编辑点击事件', true, `console.log('click事件')`)
        // setEvents({ ...event, 'click': `console.log('click事件')` })
    }
    // input change 事件
    const addChange = () => {
        console.log('addchange', event)
        emodalChange('change', '编辑change事件', true, `console.log('change事件')`)
    }
    return <div>
        {
            event && Object.keys(event).map(key => { if (event[key] !== undefined) return key }).map(item => {
                return item !== undefined ? <Tag style={{ cursor: 'pointer' }} closeIcon key={item} onClick={() => changeShow(item)} onClose={() => delEvent(item)}>
                    {item}
                </Tag> : null
            })
        }
        <br />
        {
            event && Object.keys(event).includes('change') ? <Button type="primary" style={{ margin: '10px 0 5px' }} onClick={addChange}>添加change事件</Button> : <Button type="primary" style={{ margin: '10px 0 5px' }} onClick={addClick}>添加点击事件</Button>
        }
    </div>
}

// 右侧attr
function Attr({ seComp, itemschange, emodalChange, changeEve }) {
    const [loading, setLoading] = useState(false);
    const { id, name, items, event } = seComp ? seComp : {}
    // const [curId, setCurId] = useState(id)
    const [events, setEvents] = useState(event)
    var { width, height, backgroundColor, backgroundImage } = store.getState().base.conStyle
    const text = `A dog is a type of domesticated animal.`;

    useEffect(() => {
        setEvents(event)
        console.log('111111111111event', event, events)
        // events && setVakey(Object.keys(events).map(key => { if (events[key] !== undefined) return key }))
        // events && setVakey(Object.keys(events).map(key => { if (events[key] !== undefined) return key }))
        // console.log(vakey)
        // changeEve(id, events)
        // setVakey([])
        // events
    }, [event])
    const changeValue = (e, key) => {
        console.log('111111111111event', event, events)
        if (e.key === 'Enter') {
            switch (key) {
                case 'width':
                    console.log('width', e.target.value)
                    break;
                case 'height':
                    console.log('width', e.target.value)
                    break;
                case 'backCor':
                    console.log('width', e.target.value)
                    break;
                case 'backImg':
                    console.log('width', e.target.value)
                    break;
                default:
                    break;
            }
        }
    }
    // 删除背景图片
    const delBackimg = () => {
        console.log('delBackimg')
        backgroundImage = ''
        let data = { width, height, backgroundColor, backgroundImage: '' }
        store.dispatch(updatecon(data))
    }

    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };
    const handleChange: UploadProps['onChange'] = (info) => {
        console.log('info', info)
        info.file.status = 'done'
        getBase64(info.file.originFileObj, (url) => {
            setLoading(false);
            backgroundImage = url
            let data = { width, height, backgroundColor, backgroundImage: url }
            store.dispatch(updatecon(data))
        });
    };
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    const delEvent = (val) => {
        console.log('删除事件', val, events)
        setEvents({ ...events, [val]: undefined })
        console.log('events', events)
    }
    const changeShow = (val) => {
        console.log('changeShow', val)
        switch (val) {
            case 'click':
                console.log('click事件', JSON.stringify(events.click))
                emodalChange('click', '编辑点击事件', true, events.click)
                break;
            default:
                console.log('hover事件', JSON.stringify(events.hover))
                emodalChange('hover', '编辑悬浮事件', true, events.hover)
                break;
        }
    }
    const addClick = () => {
        console.log('addclick', events)
        emodalChange('click', '编辑点击事件', true, `console.log('click事件')`)
        setEvents({ ...events, 'click': `console.log('click事件')` })
    }
    // input change 事件
    const addChange = () => {
        console.log('addchange', events)
    }
    // const addHover = () => {
    //     console.log('addhover', events)
    //     emodalChange('hover','编辑悬浮事件',true,`console.log('hover事件')`)
    //     setEvents({ ...events, 'hover': `console.log('hover事件')` })
    // }
    const itemlist = [
        {
            key: '1',
            label: '基础设置',
            children: <ul className='base_attr'>
                <li>
                    <span className='lab'>宽：</span>
                    <span className='val'>
                        <InputNumber className='input' min={1} defaultValue={width} onKeyDown={(e) => changeValue(e, 'width')} />
                    </span>
                </li>
                <li>
                    <span className='lab'>高：</span>
                    <span className='val'>
                        <InputNumber className='input' min={1} defaultValue={height} onKeyDown={(e) => changeValue(e, 'height')} />
                    </span>
                </li>
                <li>
                    <span className='lab'>背景颜色：</span>
                    <span className='val'>
                        <ColorPicker className='cor' defaultValue={backgroundColor} showText allowClear onChange={(e) => changeValue(e, 'backCor')} />
                    </span>
                </li>
                <li>
                    <span className='lab'>背景图片：<CloseCircleOutlined style={{ color: '#6d73fe' }} onClick={delBackimg} /></span>
                    <span className='val'>
                        {
                            backgroundImage ?
                                <Image src={backgroundImage} alt="avatar" width={100} /> :
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {uploadButton}
                                </Upload>
                        }


                    </span>
                </li>
            </ul>,
        },
        {
            key: '2',
            label: '组件属性',
            children: <div>
                <PropG className="attr_comp" id={id} name={name} items={items} itemschange={itemschange} />
            </div>
        },
        {
            key: '3',
            label: '组件事件',
            children: <div>
                <EventG id={id} event={event} changeEve={changeEve} emodalChange={emodalChange} />

            </div>

        },
        {
            key: '4',
            label: '组件交互',
            children:
                <p>{text}</p>
        },
    ];

    return <div>
        <Collapse accordion defaultActiveKey={['2']} items={itemlist} className='attr_cols' />
    </div>
}
export default Attr