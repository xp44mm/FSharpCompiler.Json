import { BehaviorSubject } from 'rxjs'
import { AbsInletViewModel } from './AbsInletViewModel'
import { GasViewModel } from './GasViewModel'
import { TrayViewModel } from './TrayViewModel'

export const availableHeaders = [
    'Std on',
    'Std off',
    'IS on-on',
    'IS on-off',
    'IS off-off',
    'None',
]
export const towerTypes = ['Tray Tower', 'Open Spray Tower']

export class AbsorberViewModel {
    constructor() {
        this.outlet = new GasViewModel()
        this.outletDp = new BehaviorSubject(0)

        this.mistDp = new BehaviorSubject(0)
        this.diameter = new BehaviorSubject(0)

        this.area = new BehaviorSubject(0)
        this.velocity = new BehaviorSubject(0)

        this.nozzleNumber = new BehaviorSubject(0)
        this.nozzleDensity = new BehaviorSubject(0)

        this.nozzleFlow = new BehaviorSubject(0)

        this.pumpFlow = new BehaviorSubject(0)

        this.sprays = [
            new BehaviorSubject('None'),
            new BehaviorSubject('None'),
            new BehaviorSubject('None'),
            new BehaviorSubject('None'),
            new BehaviorSubject('None'),
            new BehaviorSubject('None'),
        ]

        this.towerType = new BehaviorSubject('Tray Tower')
        this.tray = new TrayViewModel()

        this.hasUndertrayHeader = new BehaviorSubject(false)
        this.undertrayPumpFlow = new BehaviorSubject(0)
        this.undersprayPressureDrop = new BehaviorSubject(0)

        this.inlet = new AbsInletViewModel()
        this.operatingHeaders = new BehaviorSubject(0)

        this.flux = new BehaviorSubject(0)
        this.lg = new BehaviorSubject(0)

        this.stdLg = new BehaviorSubject(0)
        this.spraysDp = new BehaviorSubject(0)
        this.spraysStdDp = new BehaviorSubject(0)

        this.stdDp = new BehaviorSubject(0)

        this.headerType = new BehaviorSubject('Standard')
        this.pressureDrop = new BehaviorSubject(0)
        this.totalPumpFlow = new BehaviorSubject(0)
    }
    pickeys() {
        return [
            'mistDp',
            'outletDp',
            'diameter',
            'nozzleNumber',
            'nozzleFlow',
            'sprays',
            'towerType',
            'tray',
            'inlet',
        ]
    }
}
