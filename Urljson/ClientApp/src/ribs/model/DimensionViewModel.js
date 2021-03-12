import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { PipeViewModel } from './PipeViewModel'

export class DimensionViewModel {
    constructor() {
        this.length = new BehaviorSubject(0)
        this.pipeNumber = new BehaviorSubject(0)

        this.designLength =
            combineLatest(this.length, this.pipeNumber)
            |> map(([len, num]) => len / (num + 1))

        //垂直于维度的管道
        this.pipe = new PipeViewModel()
    }
    pickeys() {
        return ['length', 'pipeNumber', 'pipe']
    }
}
