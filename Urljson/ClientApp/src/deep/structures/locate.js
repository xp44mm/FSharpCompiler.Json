///與immutable.getIn相同，只是可以是類實例也迭代。
export const locate = (obj, keyPath) => keyPath.reduce((p, c) => p[c], obj)
