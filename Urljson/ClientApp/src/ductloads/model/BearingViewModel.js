import { BehaviorSubject, combineLatest } from 'rxjs'
import { map, mapTo, mergeMap } from 'rxjs/operators'
import { ObservableArray } from '../../deep'
import { LoadViewModel } from './LoadViewModel'

export class BearingViewModel {
    constructor() {
        this.loads = new ObservableArray()
        this.loads.create = this.push.bind(this)

        this.pos = new BehaviorSubject('0')

        let loads$ = this.loads.action |> mapTo(this.loads)

        this.weight =
            loads$
            |> mergeMap(loads => combineLatest(loads.map(l => l.weight)))
            |> map(ws => ws.filter(w => w != null).reduce((a, b) => a + b, 0))

        this.ashWeight =
            loads$
            |> mergeMap(loads => combineLatest(loads.map(l => l.ashWeight)))
            |> map(aws => aws.filter(w => w != null).reduce((a, b) => a + b, 0))

        this.loadZ =
            loads$
            |> mergeMap(loads => combineLatest(loads.map(l => l.loadZ)))
            |> map(ls => ls.filter(l => l != null).reduce((a, b) => a + b, 0))

        this.loadX =
            loads$
            |> mergeMap(loads => combineLatest(loads.map(l => l.loadX)))
            |> map(ls => ls.filter(l => l != null).reduce((a, b) => a + b, 0))

        this.loadY =
            loads$
            |> mergeMap(loads => combineLatest(loads.map(l => l.loadY)))
            |> map(ls => ls.filter(l => l != null).reduce((a, b) => a + b, 0))
    }

    pickeys() {
        return ['pos', 'loads']
    }

    push() {
        this.loads.push(new LoadViewModel())
    }

    remove(load) {
        let index = this.loads.indexOf(load)
        if (index > -1) {
            this.loads.splice(index, 1)
        }
    }
}

