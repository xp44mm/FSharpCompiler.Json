import { BehaviorSubject } from 'rxjs'
import { ObservableArray } from '../../deep'
import { ClusterViewModel } from './ClusterViewModel'

export class ProjectViewModel {
    constructor() {
        this.clusters = new ObservableArray()
        this.clusters.create = this.push.bind(this)

        this.spec = new BehaviorSubject('')
    }

    pickeys() {
        return ['spec', 'clusters']
    }

    push() {
        let cluster = new ClusterViewModel()
        this.clusters.push(cluster)
    }

    remove(cluster) {
        let i = this.clusters.indexOf(cluster)
        if (i > -1) {
            this.clusters.splice(i, 1)
        }
    }
}
