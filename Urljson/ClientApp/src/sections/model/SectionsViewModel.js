import { BehaviorSubject } from 'rxjs'
import { ObservableArray } from '../../deep'
import { SectionViewModel } from './SectionViewModel'

export class SectionsViewModel {
    constructor() {
        //项目名称
        this.projectName = new BehaviorSubject('项目名称')
        this.sections = new ObservableArray()
        this.sections.create = this.push.bind(this)
    }

    push() {
        let item = new SectionViewModel()
        this.sections.push(item)
    }

    remove(item) {
        let i = this.sections.indexOf(item)
        if (i > -1) {
            this.sections.splice(i, 1) //刪除i索引开始的1個元素。
        }
    }
}
