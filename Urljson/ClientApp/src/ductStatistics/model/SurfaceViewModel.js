import { BehaviorSubject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { SectionViewModel } from './SectionViewModel'
import { TubeViewModel } from './TubeViewModel'

/** 表面積 */
export class SurfaceViewModel {
    constructor() {
        this.tube = new TubeViewModel()
        this.section = new SectionViewModel()

        this.kind = new BehaviorSubject('tube')

        //表面积
        this.surface = this.kind |> mergeMap(kind => this[kind].surface)

        this.dimension = this.kind |> mergeMap(kind => this[kind].dimension)
    }

    pickeys() {
        return ['kind', this.kind.value]
    }

    //根据基准向外偏移另外一个SurfaceViewModel
    offset(ext) {
        let vm = new SurfaceViewModel(
            this.tube.offset(ext),
            this.section.offset(ext)
        )
        this.kind.subscribe(vm.kind)
        return vm
    }
}
