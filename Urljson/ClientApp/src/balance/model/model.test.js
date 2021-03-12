import { pickout, restore } from '../../deep'
import { inputs } from '../json'
import { AbsInletViewModel } from './AbsInletViewModel'
import { AbsorberViewModel } from './AbsorberViewModel'
import { AtmosphereViewModel } from './AtmosphereViewModel'
import { BalanceViewModel } from './BalanceViewModel'
import { CoalViewModel } from './CoalViewModel'
import { CombustionViewModel } from './CombustionViewModel'
import { ConcentrationViewModel } from './ConcentrationViewModel'
import { DewateringViewModel } from './DewateringViewModel'
import { EffectViewModel } from './EffectViewModel'
import { GasParametersViewModel } from './GasParametersViewModel'
import { GasVolumesViewModel } from './GasVolumesViewModel'
import { GghSideViewModel } from './GghSideViewModel'
import { GghViewModel } from './GghViewModel'
import { LimestoneViewModel } from './LimestoneViewModel'
import { NozzleViewModel } from './NozzleViewModel'
import { OxiairViewModel } from './OxiairViewModel'
import { PerformanceViewModel } from './PerformanceViewModel'
import { PHViewModel } from './PHViewModel'
import { SHViewModel } from './SHViewModel'
import { SootblowViewModel } from './SootblowViewModel'
import { TerminalViewModel } from './TerminalViewModel'
import { TowerViewModel } from './TowerViewModel'
import { TrayViewModel } from './TrayViewModel'
import { VacuumFilterViewModel } from './VacuumFilterViewModel'

describe('balance model tests', () => {
    test('AtmosphereViewModel', () => {
        let model = new AtmosphereViewModel()
        let src = {
            pressure: 100760,
            temperature: 40.2,
            humidity: 6.2,
        }

        restore(model, src)

        Object.entries(src).forEach(([k, v]) => {
            expect(model[k].value).toBe(v)
        })
        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('ConcentrationViewModel', () => {
        let model = new ConcentrationViewModel()
        let src = {
            SO2: 2500,
            SO3: 0,
            HCl: 100,
            HF: 100,
            ash: 50,
        }

        restore(model, src)

        Object.entries(src).forEach(([k, v]) => {
            expect(model[k].value).toBe(v)
        })

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('GasParametersViewModel', () => {
        let model = new GasParametersViewModel()
        let src = {
            temperature: 125,
            pressureg: 3000,
            baseO2: 6,
            concentration: {
                SO2: 2500,
                SO3: 0,
                HCl: 100,
                HF: 100,
                ash: 50,
            },
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('CoalViewModel', () => {
        let model = new CoalViewModel()
        let src = {
            C: 51.77,
            H: 4.31,
            O: 8.06,
            N: 0.87,
            S: 0.933289086,
            H2O: 9.6,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('GasVolumesViewModel', () => {
        let model = new GasVolumesViewModel()
        let src = {
            dryVolume0: 100,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('CombustionViewModel', () => {
        let model = new CombustionViewModel()
        let src = {
            coal: {
                C: 51.77,
                H: 4.31,
                O: 8.06,
                N: 0.87,
                S: 0.933289086,
                H2O: 9.6,
            },
            exessAir: 1.4,
            gasState: {
                dryVolume0: 100,
            },
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('TerminalViewModel', () => {
        let model = new TerminalViewModel()
        let src = {
            H2O: 134008.52,
            O2: 222238.08,
            N2: 2253426.62,
            CO2: 600033.34,
            SO2: 4273.11,
            SO3: 45.35924,
            HCl: 49.79,
            HF: 38.48,
            ash: 321.39,
            pressureg: 800,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('EffectViewModel', () => {
        let model = new EffectViewModel()
        let src = {
            SO2: 96,
            SO3: 30,
            HCl: 95,
            HF: 95,
            ash: 85,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('LimestoneViewModel', () => {
        let model = new LimestoneViewModel()
        let src = {
            availableMgCO3: 70,
            CaCO3: 90,
            MgCO3: 5,
            solids: 95,
            stoich: 1.03,
            grind: 90,
            slurrySolids: 20,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('OxiairViewModel', () => {
        let model = new OxiairViewModel()
        let src = {
            feed: {
                O2: 2534.319639,
            },
            compress: {
                pressureg: 85e3,
            },
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('GghSideViewModel', () => {
        let model = new GghSideViewModel()
        let src = {
            leakage: 0.32,
            gghPressureDrop: 500,
            ductPressureDrop: 200,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('SootblowViewModel', () => {
        let model = new SootblowViewModel()
        let src = {
            total: 22.67962,
            pressureg: 5000,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('GghViewModel', () => {
        let model = new GghViewModel()
        let src = {
            dirty: {
                leakage: 0.32,
                gghPressureDrop: 500,
                ductPressureDrop: 200,
            },
            clean: {
                leakage: 0.85,
                gghPressureDrop: 500,
                ductPressureDrop: 200,
            },

            sootblow: {
                total: 22.67962,
                pressureg: 5000,
            },

            outlet: {
                temperature: 80,
            },
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('AbsInletViewModel', () => {
        let model = new AbsInletViewModel()
        let src = {
            velocity: 12.5,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })
    test('TrayViewModel', () => {
        let model = new TrayViewModel()
        let src = {
            openArea: 40,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('AbsorberViewModel', () => {
        let model = new AbsorberViewModel()
        let src = {
            mistDp: 200,
            outletDp: 100,
            diameter: 18.6,
            nozzleNumber: 244,
            nozzleFlow: 50,
            sprays: ['Std on', 'Std on', 'Std on', 'None', 'None', 'None'],

            towerType: 'Tray Tower',

            tray: {
                openArea: 40,
            },

            inlet: {
                velocity: 12.5,
            },
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('NozzleViewModel', () => {
        let model = new NozzleViewModel()
        let src = {
            pressureDrop: 0.07,
            angle: 90,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('TowerViewModel', () => {
        let model = new TowerViewModel()
        let src = {
            high: 9,
            isFlare: true,
            flare: 1,
            flareHeight: 2,
            injectElevation: 1.5,
            solids: 15,
            concCl: 20000,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('PerformanceViewModel', () => {
        let model = new PerformanceViewModel()
        let src = {
            margin: 15,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('PHViewModel', () => {
        let model = new PHViewModel()
        let src = {
            solids: 50,
            'CaSO4*2H2O': 90,
            'CaSO3*(1/2)H2O': 50,
            CaCO3: 70,
            MgSO4: 50,
            MgCO3: 50,
            inerts: 50,
            overflow: 'to Filtrate Tank',
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('SHViewModel', () => {
        let model = new SHViewModel()
        let src = {
            solids: 10,
            'CaSO4*2H2O': 80,
            'CaSO3*(1/2)H2O': 80,
            CaCO3: 80,
            MgSO4: 80,
            MgCO3: 80,
            inerts: 80,
            underflow: 'to Filter Feed Tank',
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('VacuumFilterViewModel', () => {
        let model = new VacuumFilterViewModel()
        let src = {
            solids: 90,
            concCl: 100,
            'CaSO4*2H2O': 98,
            'CaSO3*(1/2)H2O': 98,
            CaCO3: 98,
            MgSO4: 98,
            MgCO3: 98,
            inerts: 98,
            ash: 98,
            CaF2: 98,
            MgF2: 98,
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('DewateringViewModel', () => {
        let model = new DewateringViewModel()
        let src = {
            primaryHydrocyclone: {
                solids: 50,
                'CaSO4*2H2O': 90,
                'CaSO3*(1/2)H2O': 50,
                CaCO3: 70,
                MgSO4: 50,
                MgCO3: 50,
                inerts: 50,
                overflow: 'to Filtrate Tank',
            },
            vacuumFilter: {
                solids: 90,
                concCl: 100,
                'CaSO4*2H2O': 98,
                'CaSO3*(1/2)H2O': 98,
                CaCO3: 98,
                MgSO4: 98,
                MgCO3: 98,
                inerts: 98,
                ash: 98,
                CaF2: 98,
                MgF2: 98,
            },

            chlorideBleed: 'PH OF',

            secondHydrocyclone: {
                solids: 10,
                'CaSO4*2H2O': 80,
                'CaSO3*(1/2)H2O': 80,
                CaCO3: 80,
                MgSO4: 80,
                MgCO3: 80,
                inerts: 80,
                underflow: 'to Filter Feed Tank',
            },
        }

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })

    test('BalanceViewModel', () => {
        let model = new BalanceViewModel()
        let src = inputs

        restore(model, src)

        let oral = pickout(model)
        expect(oral).toEqual(src)
    })
})
