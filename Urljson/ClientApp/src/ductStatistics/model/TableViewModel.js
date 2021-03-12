import { BehaviorSubject } from 'rxjs'
import { ObservableArray } from '../../deep'
import { DuctViewModel } from './DuctViewModel'


export class TableViewModel {
    constructor() {
        this.lines = new ObservableArray()
        this.lines.create = this.push.bind(this)

        this.projectName = new BehaviorSubject('')
    }

    push() {
        let vm = new DuctViewModel()
        this.lines.push(vm)
    }

    remove(line) {
        let i = this.lines.indexOf(line)
        if (i > -1) {
            this.lines.splice(i, 1)
        }
    }
}
