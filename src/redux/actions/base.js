import {UPDATECON,UPDATESCALE} from '../constant'

export const updatecon=data=>({type:UPDATECON,data})//data:Object
export const updatescale=data=>({type:UPDATESCALE,data})//data:number