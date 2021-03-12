import { BehaviorSubject } from 'rxjs'
import { AbsorberViewModel } from './AbsorberViewModel'
import { AtmosphereViewModel } from './AtmosphereViewModel'
import { CombustionViewModel } from './CombustionViewModel'
import { DewateringViewModel } from './DewateringViewModel'
import { EffectViewModel } from './EffectViewModel'
import { GasParametersViewModel } from './GasParametersViewModel'
import { GghViewModel } from './GghViewModel'
import { LimestoneViewModel } from './LimestoneViewModel'
import { LiquidViewModel } from './LiquidViewModel'
import { NozzleViewModel } from './NozzleViewModel'
import { OxiairViewModel } from './OxiairViewModel'
import { PerformanceViewModel } from './PerformanceViewModel'
import { RemovalViewModel } from './RemovalViewModel'
import { TerminalViewModel } from './TerminalViewModel'
import { TowerViewModel } from './TowerViewModel'

export const acidTypes = ['None', 'Dibasic', 'Adiptic', 'Formic']

export class BalanceViewModel {
    constructor() {
        this.atmosphere = new AtmosphereViewModel()
        this.gasParameters = new GasParametersViewModel()

        this.combustion = new CombustionViewModel()

        this.terminal = new TerminalViewModel()
        this.effect = new EffectViewModel()
        this.oxiair = new OxiairViewModel()
        this.ratioSO = new BehaviorSubject(0)
        this.hasGGH = new BehaviorSubject(false)
        this.ggh = new GghViewModel()
        this.removal = new RemovalViewModel()
        this.limestone = new LimestoneViewModel()

        this.productA = new LiquidViewModel()
        this.absorber = new AbsorberViewModel()
        this.nozzle = new NozzleViewModel()
        this.tower = new TowerViewModel()
        this.hasQuench = new BehaviorSubject(false)

        this.acidType = new BehaviorSubject('None')
        this.acidConc = new BehaviorSubject(0)
        this.meq = new BehaviorSubject(0)

        this.performance = new PerformanceViewModel()
        this.dewatering = new DewateringViewModel()

        ////浆液
        this.gypsumBleed = new LiquidViewModel()
        this.phof = new LiquidViewModel()
        this.phuf = new LiquidViewModel()
        this.vffeed = new LiquidViewModel()
        this.gypsum = new LiquidViewModel()
        this.filtrate = new LiquidViewModel()
        this.shff = new LiquidViewModel()
        this.shof = new LiquidViewModel()
        this.shuf = new LiquidViewModel()
        this.bleed = new LiquidViewModel()
        this.reclaimWater = new LiquidViewModel()
        this.toprep = new LiquidViewModel()
        this.makeup = new BehaviorSubject(0)
        this.wash = new BehaviorSubject(0)
        this.mistElim = new BehaviorSubject(0)
        this.inletGasPressureg = new BehaviorSubject(0)
    }

    pickeys() {
        return [
            'atmosphere',
            'gasParameters',
            'combustion',
            'terminal',
            'effect',
            'limestone',
            'oxiair',
            'hasGGH',
            'ggh',
            'absorber',
            'nozzle',
            'tower',
            'performance',
            'hasQuench',
            'acidType',
            'acidConc',
            'dewatering',
        ]
    }
}
