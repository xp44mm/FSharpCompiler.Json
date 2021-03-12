import { BehaviorSubject, merge } from 'rxjs'
import { filter, map, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators'
import { ObservableArray, deepCombineLatest, Deep } from '../../deep'
import { SupportViewModel } from './SupportViewModel'

/** 一组支架 */
export class ClusterViewModel {
    constructor() {
        this.supports =  new ObservableArray()
        this.supports.create = this.push.bind(this)

        this.spec = new BehaviorSubject('分組')

        this.supports$ = this.supports.action |> map(() => this.supports)

        //每組支架只能有一個固定支架
        this.supports$
            |> mergeMap(supports => {
                let entries = supports.map(
                    (support, i) => support.isFixed |> map(k => [i, k])
                )
                return merge(...entries)
            })
            |> filter(([i, k]) => k )
            |> map(([i]) => i)
            |> (obs =>
                obs.subscribe(i => {
                    this.supports.forEach((support, ii) => {
                        if (ii !== i && support.isFixed.value) {
                            support.isFixed.next(false)
                        }
                    })
                }))

        let combinedSupports =
            this.supports$
            |> switchMap(sps => {
                let deep = Deep.fromObject(
                    sps.map(sp => ({
                        isFixed: sp.isFixed,
                        weightFrictionX: sp.slip.weightFrictionX,
                        weightFrictionY: sp.slip.weightFrictionY,
                        ashWeightFrictionX: sp.slip.ashWeightFrictionX,
                        ashWeightFrictionY: sp.slip.ashWeightFrictionY,
                    }))
                )
                return deepCombineLatest(deep)
            })
            |> map(deep => deep.toObject())
            |> map(arr => {
                return arr
                    .filter(({ isFixed }) => !isFixed)
                    .reduce(
                        (acc, item) =>
                            Object.fromEntries(
                                Object.entries(acc).map(([k, v]) => [
                                    k,
                                    v - item[k],
                                ])
                            ),
                        {
                            weightFrictionX: 0,
                            weightFrictionY: 0,
                            ashWeightFrictionX: 0,
                            ashWeightFrictionY: 0,
                        }
                    )
            })

        this.weightFrictionX =
            combinedSupports |> map(({ weightFrictionX }) => weightFrictionX)

        this.weightFrictionY =
            combinedSupports |> map(({ weightFrictionY }) => weightFrictionY)

        this.ashWeightFrictionX =
            combinedSupports
            |> map(({ ashWeightFrictionX }) => ashWeightFrictionX)

        this.ashWeightFrictionY =
            combinedSupports
            |> map(({ ashWeightFrictionY }) => ashWeightFrictionY)
    }

    pickeys() {
        return ['spec', 'supports']
    }

    push() {
        let item = new SupportViewModel(this)
        this.supports.push(item)
    }

    remove(support) {
        let index = this.supports.indexOf(support)
        if (index > -1) {
            this.supports.splice(index, 1)
        }
    }
}
