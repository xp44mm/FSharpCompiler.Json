import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'

export function coalBinding(coal) {
    let { C, H, O, N, S, H2O, A } = coal

    combineLatest(C, H, O, N, S, H2O)
        |> map(arr => 100 - arr.map(Number).reduce((x, y) => x + y, 0))
        |> (o => o.subscribe(A))
}
