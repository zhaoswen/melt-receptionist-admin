import axios from "axios";
import type {SimxPluginHandler} from "@/entity/extension.ts";
import {error} from "@/tools/message.ts";

export const getHandlerPage = async (): Promise<SimxPluginHandler[]> => {
    let res;
    try{
        res = (await axios.post(`/api/eraExtensionHandler/page`)).data;
    }catch (e) {
        error("获取插件信息失败");
    }

    return res.data.records.map((item: any) => {
        return {
            id: item.id,
            handler: item.handler,
            groupId: item.groupId,
            name: item.name,
            desc: item.description,
            params :[]
        }
    });
}

export const addHandler = async (data: any) => {
    return (await axios.post(`/api/eraExtensionHandler/add`, data)).data;
}

export const getHandler = async (id: string) => {
    return (await axios.get(`/api/eraExtensionHandler?id=${id}`)).data;
}

// 修改
export const updateHandler = async (data: any) => {
    return (await axios.post(`/api/eraExtensionHandler/edit`, data)).data;
}

export const deleteHandler = async (id: string) => {
    return (await axios.delete(`/api/eraExtensionHandler?id=${id}`)).data;
}

// 尝试获取所有的组
export const getGroups = async () => {
    return (await axios.post(`/api/eraExtensionGroup/page`)).data;
}

// 创建新组
export const addGroup = async (data: any) => {
    return (await axios.post(`/api/eraExtensionGroup/add`, data)).data;
}
