import { BehaviorSubject } from 'rxjs'

//烟道材料的性质
export class SteelViewModel {
    constructor() {
        this.name = new BehaviorSubject('Q235')
        this.xigma = new BehaviorSubject(0)
        this.ela = new BehaviorSubject(0)
    }

    pickeys() {
        return ['name']
    }

}
