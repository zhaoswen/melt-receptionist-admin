export interface SimxPlugin {
    id: string;
    name: string;
    description: string;
    version: string;
    update_date: string;
    author: string;
    email: string;
    homepage: string;
    license?: string;
}

export interface SimxPluginHandlers {
    id: string;
    extensionId: string;
    name: string;
    func: SimxPluginHandler[];
}

export interface SimxPluginHandler {
    id: string;
    groupId: string;
    handler: string;
    name: string;
    description: string;
    params: SimxPluginParam[];
}

export interface SimxPluginParam {
    id: string;
    key: string;
    name: string;
    desc: string;
    type: string;
    // handler_id: string;
    default_value: string;
    require: boolean;
    options?: string;
}
