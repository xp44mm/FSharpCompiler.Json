import { BehaviorSubject } from 'rxjs'

export class RibSectionViewModel {
    constructor() {
        this.thick = new BehaviorSubject(5) //板厚
        //this.ribKind = new BehaviorSubject('槽钢')
        this.ribSpec = new BehaviorSubject('[20a') //型钢名称

        this.ribWeight = new BehaviorSubject(0)
        this.area = new BehaviorSubject(0)
        this.weight = new BehaviorSubject(0)
        this.center = new BehaviorSubject(0)
        this.ix = new BehaviorSubject(0)
        this.zmin = new BehaviorSubject(0)
    }

    pickeys() {
        return ['thick', 'ribSpec']
    }
}
