/// 用于hyperscript重构参数
export function hyperscriptArgs(args) {
    let props = {}
    let children = []

    if (args.length > 0) {
        let [first, ...rest] = args

        if (first === undefined || first === null || Object.getPrototypeOf(first) === Object.prototype) {
            if (first) props = first
            if (rest.length > 0) children = rest
        } else {
            children = args
        }
    }

    return { props, children }
}
