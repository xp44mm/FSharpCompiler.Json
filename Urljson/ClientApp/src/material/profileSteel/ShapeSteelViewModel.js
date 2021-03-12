import { BehaviorSubject, combineLatest } from 'rxjs'
import { distinctUntilChanged, map } from 'rxjs/operators'
import { shapeSteels } from './shapeSteels'

export class ShapeSteelViewModel {
    constructor() {
        this.shape = new BehaviorSubject('工字钢')
        this.specification = new BehaviorSubject('I10')

        this.specifications = 
            this.shape
            |> distinctUntilChanged()
            |> map(shape => Object.keys(shapeSteels[shape]))

        this.specifications
            |> map(a => a[0])
            |> (o=>o.subscribe(this.specification))

        //每米重量
        this.weight =
            combineLatest(this.shape, this.specification)
            |> map(([shape, spec]) => shapeSteels[shape][spec])
    }
}
