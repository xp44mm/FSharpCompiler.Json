export const json = {
    atmosphere: {
        pressure: 100760,
        temperature: 40.2,
        humidity: 6.2,
    },
    gasParameters: {
        temperature: 125.3195261,
        pressureg: 3000,
        baseO2: 6,
        concentration: {
            SO2: 2500,
            SO3: 0,
            HCl: 100,
            HF: 100,
            ash: 50,
        },
    },
    combustion: {
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
    },
    terminal: {
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
    },
    effect: {
        SO2: 96,
        SO3: 30,
        HCl: 95,
        HF: 95,
        ash: 85,
    },
    limestone: {
        availableMgCO3: 70,
        CaCO3: 90,
        MgCO3: 5,
        solids: 95,
        stoich: 1.03,
        grind: 90,
        slurrySolids: 20,
    },
    oxiair: {
        feed: {
            O2: 2534.319639,
        },
        compress: {
            pressureg: 85e3,
        },
    },

    hasGGH: false,
    ggh: {
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
    },

    absorber: {
        mistDp: 200,
        outletDp: 100,
        diameter: 18.6,
        nozzleNumber: 244,
        nozzleFlow: 50,
        sprays: [
            'Std on',
            'Std on',
            'Std on',
            'None',
            'None',
            'None',
        ],

        towerType: 'Tray Tower',

        tray: {
            openArea: 40,
        },

        inlet: {
            velocity: 12.5,
        },
    },

    nozzle: {
        pressureDrop: 0.07,
        angle: 90,
    },

    tower: {
        high: 9,
        isFlare: true,
        flare: 1,
        flareHeight: 2,
        injectElevation: 1.5,
        solids: 15,
        concCl: 20000,
    },

    performance: {
        margin: 15,
    },

    hasQuench: false,
    acidType: 'None',
    acidConc: 0,

    dewatering: {
        primaryHydrocyclone: {
            solids: 50,
            'CaSO4*2H2O': 90,
            'CaSO3*(1/2)H2O': 50,
            'CaCO3': 70,
            'MgSO4': 50,
            'MgCO3': 50,
            'inerts': 50,
            overflow: 'to Filtrate Tank',
        },
        vacuumFilter: {
            solids: 90,
            concCl: 100,
            'CaSO4*2H2O': 98,
            'CaSO3*(1/2)H2O': 98,
            'CaCO3': 98,
            'MgSO4': 98,
            'MgCO3': 98,
            'inerts': 98,
            'ash': 98,
            'CaF2': 98,
            'MgF2': 98,
        },

        chlorideBleed: 'PH OF',

        secondHydrocyclone: {
            solids: 10,
            'CaSO4*2H2O': 80,
            'CaSO3*(1/2)H2O': 80,
            'CaCO3': 80,
            'MgSO4': 80,
            'MgCO3': 80,
            'inerts': 80,
            underflow: 'to Filter Feed Tank',
        },
    },
}
