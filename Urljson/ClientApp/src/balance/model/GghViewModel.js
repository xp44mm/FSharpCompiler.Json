import { BehaviorSubject } from 'rxjs'
import { GasViewModel } from './GasViewModel'
import { GghSideViewModel } from './GghSideViewModel'
import { SootblowViewModel } from './SootblowViewModel'

export class GghViewModel {
    constructor() {
        this.dirty = new GghSideViewModel()
        this.clean = new GghSideViewModel()

        this.sootblow = new SootblowViewModel()

        this.outlet = new GasViewModel() //净烟气出口

        this.outlet.pickeys = () => ['temperature']

        this.inlet = new GasViewModel() //原烟气入口

        this.enth = new BehaviorSubject(0)
    }
    pickeys() {
        return ['dirty', 'clean', 'sootblow', 'outlet']
    }
}
