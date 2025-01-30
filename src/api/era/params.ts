// 创建新的参数
import axios from "axios";
import type {SimxPluginParam} from "@/entity/extension.ts";

export const addParam = async (data: SimxPluginParam, handlerId: string) => {
    console.log(data);
    return (await axios.post(`/api/eraExtensionHandlerParam/add`, {
        paramKey: data.key,
        paramName: data.name,
        paramDescription: data.desc,
        paramType: data.type,
        paramDefaultValue: data.default_value,
        paramRequire: data.require,
        paramOptions: data.options,
        paramHandlerId: handlerId
    })).data;
}

// 获取所有的参数
export const getParamsByHandlerId = async (handlerId: string) => {
    return (await axios.get(`/api/eraExtensionHandlerParam/getParamsByHandlerId?handlerId=${handlerId}`)).data;
}

export const getParamById = async (id: number) => {
    return (await axios.get(`/api/eraExtensionHandlerParam/${id}`)).data;
}

// 修改指定参数
export const updateParam = async (data: any, handlerId: number) => {
    return (await axios.put(`/api/eraExtensionHandlerParam/edit`, {
        id: data.id,
        paramKey: data.key,
        paramName: data.name,
        paramDescription: data.desc,
        paramType: data.type,
        paramDefaultValue: data.default_value,
        paramRequire: data.require,
        paramOptions: data.options,
        paramHandlerId: handlerId
    })).data;
}

// 删除指定参数
export const deleteParam = async (id: string) => {
    return (await axios.delete(`/api/eraExtensionHandlerParam?id=${id}`)).data;
}