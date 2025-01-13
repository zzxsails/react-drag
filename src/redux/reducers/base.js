import {UPDATECON,UPDATESCALE} from '../constant'
// import backImg from '../../assets/back.jpg'backImg
const init={
    conStyle:{width:1920,height:1080,backgroundColor:'black',backgroundImage:''},
    areaScale:1
}
export default function BaseAttr(preState=init,action){
    const {type,data}=action
    switch(type){
        case UPDATECON:
            console.log('conStyle',data)
            preState.conStyle=data
            return preState
        case UPDATESCALE:
            console.log('scale',data)
            preState.areaScale=data
            return preState
        default:
            return preState
    }
}