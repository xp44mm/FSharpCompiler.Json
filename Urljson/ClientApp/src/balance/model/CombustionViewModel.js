import { BehaviorSubject } from 'rxjs'
import { AirViewModel } from './AirViewModel'
import { CoalViewModel } from './CoalViewModel'
import { CombusGasViewModel, CombusGasWithBaseo2ViewModel } from './CombusGasViewModel'
import { GasQualityViewModel } from './GasViewModel'
import { GasVolumesViewModel } from './GasVolumesViewModel'

export class CombustionViewModel {
    constructor() {
        this.coal = new CoalViewModel()

        this.product = new CombusGasViewModel()

        this.idealAir = new AirViewModel()
        this.idealGas = new CombusGasWithBaseo2ViewModel()

        this.exessAir = new BehaviorSubject(0)
        this.realAir = new AirViewModel()
        this.realGas = new CombusGasWithBaseo2ViewModel()
        this.realGasPercent = new CombusGasViewModel()
        this.realGasDryPercent = new CombusGasViewModel()

        this.target_realO2 = new BehaviorSubject(0)
        this.target_dryO2 = new BehaviorSubject(0)

        this.gasState = new GasVolumesViewModel()
        this.fluegas = new GasQualityViewModel()
    }
    pickeys() {
        return ['coal', 'exessAir', 'gasState']
    }
}
