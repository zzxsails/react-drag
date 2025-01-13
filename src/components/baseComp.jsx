import { Button, Steps, Breadcrumb,Input } from 'antd';
import { useEffect,useState } from 'react';
// 监控areaScale，实时变化left，top
export const CButton = (props) => {

    // console.log(props)
    const { width, height, items, event } = props
    useEffect(() => {
        console.log('basecomp',props)
    }, [props])
    // event:{'click':()=>{},'hover':()=>{}}
    const changeClick=(e)=>{
        e.stopPropagation()
        console.log('chufa click')
       event&&eval(event.click)
    }
    const changeHover=(e)=>{
        // e.stopPropagation()
        console.log('chufa hover')
        event&&eval(event.hover)
    }//onHover={(e)=>changeHover(e)}
    return <Button type="primary" style={{ width, height }} onClick={(e)=>changeClick(e)} >{items}</Button>
};

export const CText = (props) => {
    const {id, width, height, items, event,itemschange } = props
    const [input,SetInput]=useState(false)
    const changeClick=(e)=>{
        e.stopPropagation()
        console.log('chufa click')
        event&&event.click()
    }
    const changeInput=(e)=>{
        console.log(e.target.value)
        itemschange(id,e.target.value,'items')
    }
    return <div onDoubleClick={()=>SetInput(!input)}>
        {
            input?
            <Input style={{width,height}} defaultValue={items} onChange={(e)=>changeInput(e)}/>:
            <p style={{ width, height, margin: '0', border: '1px solid black', whiteSpace: 'wrap' }} onClick={(e)=>changeClick(e)}>{items}</p>
        }
    </div>
    
};

export const CSteps = (props) => {
    const { items } = props
    return <Steps
        current={1}
        items={items}

    />
};

export const CBreadcrumb = (props) => {
    const { width, height, items } = props
    return <Breadcrumb style={{ width, height }} items={items} />
} 