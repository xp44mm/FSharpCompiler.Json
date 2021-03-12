import { BehaviorSubject } from 'rxjs'
import { PlaneInsulationViewModel } from './PlaneInsulationViewModel'
import { PipeInsulationViewModel } from './PipeInsulationViewModel'

export class InsulationViewModel {
    constructor() {
        this.plane = new PlaneInsulationViewModel()
        this.pipe = new PipeInsulationViewModel()

        this.kind = new BehaviorSubject('plane')

        this.title = new BehaviorSubject('保温')
    }

    pickeys() {
        return ['title', 'kind', this.kind.value]
    }
}
