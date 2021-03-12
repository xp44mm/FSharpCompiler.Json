import { BehaviorSubject } from 'rxjs'
import { InsulationViewModel } from './InsulationViewModel'
import { ObservableArray } from '../../deep'

export class ProjectViewModel {
    constructor() {
        this.insulations = new ObservableArray()
        this.insulations.create = this.push.bind(this)

        this.ta = new BehaviorSubject(20)
        this.projectName = new BehaviorSubject('项目名称')

    }

    push() {
        let item = new InsulationViewModel()
        this.insulations.push(item)
    }

    remove(item) {
        let i = this.insulations.indexOf(item)
        if (i > -1) {
            this.insulations.splice(i, 1)
        }
    }
}
