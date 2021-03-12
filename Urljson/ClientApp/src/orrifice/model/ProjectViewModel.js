import { BehaviorSubject } from 'rxjs'
import { observableArray } from '../../deep'
import { PipelineViewModel } from './PipelineViewModel'

export class ProjectViewModel {
    constructor() {
        this.pipelines = observableArray()
        this.pipelines.create = this.push.bind(this)

        this.p0 = new BehaviorSubject(101.325)
        this.projectName = new BehaviorSubject('项目名称')

    }

    push() {
        let item = new PipelineViewModel()
        item.subscription = this.p0.subscribe(item.p0)
        this.pipelines.push(item)
    }

    remove(pipeline) {
        let i = this.pipelines.indexOf(pipeline)
        if (i > -1) {
            this.pipelines.splice(i, 1)
            pipeline.subscription.unsubscribe()
        }
    }
}
