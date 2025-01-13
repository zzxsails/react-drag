import {
    ADDCOMP,
    REMOVECOMP,
    UPDATECOMPLIST,
    UPDATECOMP,
    UPDATECUR,
    CHANGEITEM,
    CHANGEVENT
} from '../constant'

const init = {
    complists: [],
    curComp: {},
}
export default function Complists(preState = init, action) {
    const {
        type,
        data
    } = action
    console.log(data, preState)
    var {
        complists,
        curComp
    } = JSON.parse(JSON.stringify(preState))
    switch (type) {
        case ADDCOMP:
            console.log('add')
            preState.complists = [...complists, data]
            return preState
        case REMOVECOMP:
            console.log('remove')
            preState.complists = complists.filter(item => item.id !== data)
            // console.log(preState.complists)
            return preState
        case UPDATECOMPLIST:
            console.log('updatelist')
            preState.complists = data
            // console.log(preState.complists)
            return preState
        case UPDATECOMP:
            console.log('update', data)
            preState.complists = complists.map((box) => (box.id === data.id ? data : box))
            // console.log(preState.complists)
            return preState
        case UPDATECUR:
            console.log('updatecur', data)
            preState.curComp = data
            return preState
        case CHANGEITEM:
            console.log('changeItem', data)
            // let items=data
            preState.complists = complists.map((box) => (box.id === data.id ? {
                ...box,
                items: data.items
            } : box))
            preState.curComp = {
                ...curComp,
                items: data.items
            }
            // console.log(preState.complists)
            return preState
        case CHANGEVENT:
            console.log('changeEvent', data)
            preState.complists = complists.map((box) => (box.id === data.id ? {
                ...box,
                event: data.event
            } : box))
            preState.curComp = {
                ...curComp,
                event: data.event
            }
            return preState
        default:
            console.log('default')
            preState = JSON.parse(JSON.stringify(preState))
            return preState
    }
}