import axios from "axios";
import type {SimxPlugin} from "@/entity/extension.ts";
import {error} from "@/tools/message.ts";

export const getExtensionInfo = async (): Promise<SimxPlugin[]> => {
    let res;
    try{
        res = (await axios.post(`/api/eraExtensionInfo/page`)).data;
    }catch (e) {
        error("获取插件信息失败");
    }

    return res.data.records.map((item: any) => {
        return {
            id: item.id,
            name: item.name,
            description: item.description,
            version: item.version,
            update_date: item.update_date,
            author: item.author,
            email: item.email,
            homepage: item.homepage,
            license: item.license,
        }
    });
}

export const addExtension = async (data: any) => {
    return (await axios.post(`/api/eraExtensionInfo/add`, data)).data;
}

export const getExtension = async (id: string) => {
    return (await axios.get(`/api/eraExtensionInfo?id=${id}`)).data;
}

// 修改
export const updateExtension = async (data: any) => {
    return (await axios.post(`/api/eraExtensionInfo/edit`, data)).data;
}

export const deleteExtension = async (id: string) => {
    return (await axios.delete(`/api/eraExtensionInfo?id=${id}`)).data;
}