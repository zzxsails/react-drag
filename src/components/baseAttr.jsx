import { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
// import PubSub from 'pubsub-js';
const { TextArea } = Input;
export const CButtonAttr = (props) => {
    // console.log(props)
    const { id, items, itemschange } = props
    const [value, setValue] = useState(items)
    const changeValue = (e) => {
        if (e.key === 'Enter') {
            console.log('onchange', e.target.value)
            let newvalue = e.target.value
            // 子组件向父组件传递数据
            itemschange(id,newvalue, 'items')
            // 消息发布
            // PubSub.publish('items', {msg:'传递数据',items:newvalue})

            // store.dispatch(changeitem({id,items:newvalue}))
        }
    }
    useEffect(() => {
        setValue(items) 
    }, [items])
    return <ul>
        <li>
            <span className='lab'>内容</span>
            <Input className='val' placeholder="Basic usage" defaultValue={value} onKeyDown={changeValue} />
        </li>
    </ul>
};

export const CTextAttr = (props) => {
    const { id, items, itemschange } = props
    const [value, setValue] = useState(items)
    const changeValue = (e) => {
        if (e.key === 'Enter') {
            console.log('onchange', e.target.value)
            let newvalue = e.target.value
            itemschange(id,newvalue, 'items')
            // store.dispatch(changeitem({id,items:newvalue}))
        }
    }
    useEffect(() => {
        setValue(items)
    }, [items])
    return <ul>
        <li>
            <span className='lab'>内容</span>
            <TextArea className='val' rows={4} defaultValue={value} onKeyDown={changeValue} />
        </li>
    </ul>

};

export const CStepsAttr = (props) => {
    const { id, items, itemschange } = props
    const [value, setValue] = useState(items)
    const changeValue0 = (e, index, key) => {
        console.log('onchange', e.target.value, index, key)
        setValue(value.map((item, i) => i === index ? { ...item, [key]: e.target.value } : item))
    }
    const changeValue = () => {
        console.log('1111', value)
        let newvalue = JSON.parse(JSON.stringify(value))
        itemschange(id,newvalue, 'items')
        // store.dispatch(changeitem({id,items:newvalue}))
    }
    useEffect(() => {
        setValue(items)
    }, [items])
    return (
        <div style={{ marginBottom: '10px' }}>
            {value.map(({ title, description }, index) => (
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
    )
};

export const CBreadcrumbAttr = (props) => {
    const { id, items, itemschange } = props
    const [value, setValue] = useState(items)
    const changeValue0 = (e, index, key) => {
        console.log('onchange', e.target.value, index, key)
        setValue(value.map((item, i) => i === index ? { ...item, [key]: e.target.value } : item))
    }

    const changeValue = () => {
        let newvalue = JSON.parse(JSON.stringify(value))
        itemschange(id,newvalue, 'items')
        // store.dispatch(changeitem({id,items:newvalue}))

    }
    useEffect(() => {
        setValue(items)
        // console.log(items)
    }, [items])
    return (
        <div>
            {value.map(({ title }, index) => (
                <ul key={index}>
                    <li>
                        <span className='lab'>title:</span>
                        <Input className='val' placeholder="" defaultValue={title} onInput={(e) => changeValue0(e, index, 'title')} />
                    </li>
                </ul>
            ))}
            <Button type='primary' onClick={changeValue}>修改</Button>
        </div>
    )
} 