 //count的action对象
 import {ADDCOMP,REMOVECOMP,UPDATECOMPLIST,UPDATECOMP,UPDATECUR,CHANGEITEM,CHANGEVENT} from '../constant'
 export const addcomp=data=>({type:ADDCOMP,data})//data:Object
 export const removecomp=data=>({type:REMOVECOMP,data})//data:number(id)
 export const updatecomplist=data=>({type:UPDATECOMPLIST,data})//data:Array
 export const updatecomp=data=>({type:UPDATECOMP,data})//data:Object
 export const updatecur=data=>({type:UPDATECUR,data})//data:Object
 export const changeitem=data=>({type:CHANGEITEM,data})//data:Object={id,items}
 export const changevent=data=>({type:CHANGEVENT,data})//data:Object={id,event}