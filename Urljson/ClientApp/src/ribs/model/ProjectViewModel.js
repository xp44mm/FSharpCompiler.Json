import { BehaviorSubject } from 'rxjs'
import { ObservableArray } from '../../deep'
import { ribBinding } from '../bindings'
import { RibViewModel } from './RibViewModel'
import { projectReady, createRibReady } from '../ajax/ProjectReady'
import { distinctUntilChanged, filter, mergeMap, withLatestFrom, map } from 'rxjs/operators'
import { deepMerge } from '../../deep'

export class ProjectViewModel {
    constructor() {
        this.projectName = new BehaviorSubject('项目名称')
        this.snow = new BehaviorSubject(0.35)
        this.w0 = new BehaviorSubject(0.3)
        this.topography = new BehaviorSubject('B')

        this.ribs = new ObservableArray()

        //create用于restore
        this.ribs.create = this.push.bind(this)

    }

    pickeys() {
        return ['snow', 'w0', 'topography', 'ribs']
    }

    push() {
        let item = new RibViewModel()

        projectReady.ribs.set(item, createRibReady())

        deepMerge(projectReady.ribs.get(item))
            |> distinctUntilChanged()
            |> filter(([keyPath, completed]) => completed)
            |> map(([keyPath]) => keyPath)
            |> withLatestFrom(item.title)
            |> (o => o.subscribe(([key, title]) => {
                console.log(`${key}@${title} completed`)
            }))

        ribBinding(this, item)
        this.ribs.push(item)
    }

    //删除指定key的管线
    remove(item) {
        let i = this.ribs.indexOf(item)
        //this.ribs.splice(i, 1)[0].subscription.unsubscribe()
        if (i > -1) {
            this.ribs.splice(i, 1)
        }
    }
}
