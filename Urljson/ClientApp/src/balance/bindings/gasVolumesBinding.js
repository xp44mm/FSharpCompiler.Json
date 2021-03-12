import { combineLatest } from 'rxjs'
import { map, withLatestFrom } from 'rxjs/operators'

//计算`gasState`
export function gasVolumesBinding(balance) {
    let {
        gasParameters: { vcorrect },
        combustion: {
            realGas: { baseFactor, dry, total },
            gasState: {
                dryVolume0,
                volume0,
                baseVolume,
                volume,
            },
        },
    } = balance

    combineLatest(volume0, vcorrect)
        |> map(([v0, c]) => v0 * c)
        |> (o => o.subscribe(volume))

    combineLatest(dryVolume0, total, dry)
        |> map(([v, t, d]) => v * t / d)
        |> map(v => (v ? v : 0))
        |> (o => o.subscribe(volume0))

    combineLatest(dryVolume0, baseFactor)
        |> map(([dv, fac]) => dv / fac)
        |> map(v => (v ? v : 0))
        |> (o => o.subscribe(baseVolume))

}

