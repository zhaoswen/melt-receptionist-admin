import {ElMessage} from "element-plus";

function info(message: string) {
    ElMessage({
        message: message,
        showClose: true,
        type: "info",
        plain: true,
    });
}

function warn(message: string) {
    ElMessage({
        message: message,
        showClose: true,
        type: "warning",
        plain: true,
    });
}

function error(message: string, code: number = 1001) {
    ElMessage({
        message: "[ " + code + " ] " + message,
        showClose: true,
        type: "error",
        plain: true,
    });
}

function success(message: string) {
    ElMessage({
        message: message,
        showClose: true,
        type: "success",
        plain: true,
    });
}

export {info, warn, error, success};
