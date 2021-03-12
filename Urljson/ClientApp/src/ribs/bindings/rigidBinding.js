import { combineLatest } from "rxjs";
import { map, filter } from 'rxjs/operators';

/// 刚度
export function rigidBinding({ dimension, wall, allow }) {
    let { designLength } = dimension

    combineLatest(allow, designLength, wall.ix)
        |> filter(([allow]) => allow)
        |> map(([_, ...rest]) => rest)
        |> map(([len, ix]) => len === 0 ? 0 : ix / len)
        |> (o => o.subscribe(wall.rigid))

}
