import { tilde, tildeKey } from './tilde'

export function urljsonStringify(value) {
    if (value === null) {
        return "null"
    } else if (typeof value === "boolean" && value === true) {
        return "true"
    } else if (typeof value === "boolean" && value === false) {
        return "false"
    } else if (typeof value === "number") {
        return isFinite(value) ? value.toString() : 'null'
    } else if (typeof value === "string") {
        return tilde(value)
    } else if (Array.isArray(value)) {
        let elems = value.map(e => urljsonStringify(e)).join("*")
        return `(${elems})`
    } else if (typeof value === "object") {
        let fields = Object.entries(value)
            .map(([k, v]) => `${tildeKey(k)}!${urljsonStringify(v)}`).join("*")
        return fields.length === 0 ? '(!)': '(' + fields + ')'
    } else if (typeof value === "function") {
        throw new Error("stringify `function` member in obj.")
    } else if (typeof value === "undefined") {
        throw new Error("stringify `undefined` member in obj.")
    } else {
        throw new Error("stringify")
    }

}
