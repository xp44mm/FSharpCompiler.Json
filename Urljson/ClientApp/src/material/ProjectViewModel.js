import { BehaviorSubject } from 'rxjs'
import { observableArray } from '../deep'
import { PartViewModel } from './PartViewModel'

export class ProjectViewModel {
    constructor() {
        this.parts = observableArray()
        this.parts.create = this.push.bind(this)
        this.projectName = new BehaviorSubject('项目名称')
    }

    push() {
        let item = new PartViewModel()
        this.parts.push(item)
    }

    //删除
    remove(line) {
        let i = this.parts.indexOf(line)
        if (i > -1) {
            this.parts.splice(i, 1)
        }
    }
}
