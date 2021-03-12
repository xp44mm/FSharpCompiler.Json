import { BehaviorSubject } from 'rxjs'
import { PHViewModel } from './PHViewModel'
import { SHViewModel } from './SHViewModel'
import { VacuumFilterViewModel } from './VacuumFilterViewModel'

export const chlorideBleeds = [
    'PH OF',
    'SH OF',
    //'Filtrate', 吸收塔直排？
]

export class DewateringViewModel {
    constructor() {
        this.chlorideBleed = new BehaviorSubject(chlorideBleeds[0])
        this.primaryHydrocyclone = new PHViewModel()
        this.vacuumFilter = new VacuumFilterViewModel()
        this.secondHydrocyclone = new SHViewModel()
    }
}
