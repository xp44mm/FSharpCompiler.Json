import { httpGetJson, jzonQueryData } from '../../http'

//Node.js root `global` arm with XMLHttpRequest
//global.XMLHttpRequest || (global.XMLHttpRequest = XMLHttpRequest)

//运行测试前，需要启动desulfurization服务器端。

describe('Ajax test', () => {
    test('wetAir', done => {
        const wetAir = {
            press: 100760,
            temp: 40.2,
            humid: 6.2,
        }
        let result = {
            H2O: 0.28725592751177875,
            O2: 23.22484420997048,
            N2: 76.48789986251775,
            CO2: 0,
            SO2: 0,
            SO3: 0,
            HCl: 0,
            HF: 0,
            ash: 0,
        }

        httpGetJson('desulphur/wetAir?' + jzonQueryData(wetAir))
            |> (o=>o.subscribe(
                response => {
                    expect(response).toEqual(result)
                },
                0,
                done
            ))
    })

    test('airVol', done => {
        let result = {
            H2O: 0.4592288468337155,
            O2: 20.90356194216492,
            N2: 78.63720921100138,
            CO2: 0,
            SO2: 0,
            SO3: 0,
            HCl: 0,
            HF: 0,
            ash: 0,
        }

        const airVol = {
            press: 100760,
            temp: 40.2,
            humid: 6.2,
        }

        httpGetJson('desulphur/airVol?' + jzonQueryData(airVol))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('oxiair', done => {
        let result = {
            H2O: 31.345671554590226,
            N2: 8346.440777597383,
            compressTemp: 100.10842183196479,
            saturTemp: 42.43372920495008,
            saturWater: 322.0221989821269,
            nvolume: 8853.9780540765,
        }
        const oxiair = {
            air: {
                H2O: 0.28725592751177875,
                O2: 23.22484420997048,
                N2: 76.48789986251775,
                temperature: 40.2,
                pressure: 100760,
            },
            O2: 2534.319639,
            cp: 185760,
        }

        httpGetJson('desulphur/oxiair?' + jzonQueryData(oxiair))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('sootblow', done => {
        let result = {
            H2O: 0.06514855278714678,
            O2: 5.267306412413295,
            N2: 17.347165034799556,
            CO2: 0,
            SO2: 0,
            SO3: 0,
            HCl: 0,
            HF: 0,
            ash: 0,
        }
        const sootblow = {
            H2O: 0.287255927511778,
            O2: 23.2248442099704,
            N2: 76.4878998625177,
            total: 22.67962,
        }

        httpGetJson('desulphur/sootblow?' + jzonQueryData(sootblow))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('removal', done => {
        let result = {
            H2O: 0,
            O2: 0,
            N2: 0,
            CO2: 0,
            SO2: 4102.1856,
            SO3: 13.607772,
            HCl: 47.3005,
            HF: 36.556,
            ash: 273.18149999999997,
        }
        const removal = {
            inlet: {
                SO2: 4273.11,
                SO3: 45.35924,
                HCl: 49.79,
                HF: 38.48,
                ash: 321.39,
            },
            effect: {
                SO2: 96,
                SO3: 30,
                HCl: 95,
                HF: 95,
                ash: 85,
            },
            dirtyLeakage: -1,
            cleanLeakage: -1,
        }

        httpGetJson('desulphur/removal?' + jzonQueryData(removal))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('react', done => {
        let result = {
            limestone: {
                'CaSO4*2H2O': 0,
                'CaSO3*(1/2)H2O': 0,
                CaCO3: 6600.369973699361,
                MgSO4: 0,
                MgCO3: 366.68722076107565,
                inerts: 366.68722076107565,
                ash: 0,
                CaF2: 0,
                MgF2: 0,
                'Cl-': 0,
                'F-': 0,
                'Mg++': 0,
                'Ca++': 0,
                'SO4--': 0,
                H2O: 385.98654816955326,
            },
            removal: {
                H2O: -28.144487098515274,
                O2: 1021.4843347455095,
                N2: 0,
                CO2: -2894.2863782058675,
                SO2: 4102.1856,
                SO3: 13.607772,
                HCl: 47.3005,
                HF: 36.556,
                ash: 273.181499999999,
            },
            productA: {
                'CaSO4*2H2O': 10766.385008447176,
                'CaSO3*(1/2)H2O': 24.235060076732797,
                CaCO3: 322.85092538285147,
                MgSO4: 3.567921853359905,
                MgCO3: 110.0061662283227,
                inerts: 366.68722076107565,
                ash: 273.181499999999,
                CaF2: 0,
                MgF2: 55.78117689351725,
                'Cl-': 45.992907108264355,
                'F-': 0.6942854278129148,
                'Mg++': 51.511299478832086,
                'Ca++': 0,
                'SO4--': 139.52632304455665,
                H2O: 0,
            },
            reactHeat: 22159591.471252136,
            tss: 11922.694979643034,
            rtuSr: 0.9407599999999998,
            rtuGrind: 0.9611310000000001,
        }
        const react = {
            removal: {
                SO2: 4102.1856,
                SO3: 13.607772,
                HCl: 47.3005,
                HF: 36.556,
                ash: 273.181499999999,
            },
            limestone: {
                availableMgCO3: 70,
                CaCO3: 90,
                MgCO3: 5,
                stoich: 1.03,
                solids: 95,
                grind: 90,
            },
        }

        httpGetJson('desulphur/react?' + jzonQueryData(react))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('absorberOutlet', done => {
        let result = {
            absOutlet: {
                H2O: 256338.3260317102,
                O2: 223750.91530425448,
                N2: 2261773.0607775976,
                CO2: 602927.6263782058,
                SO2: 170.92439999999988,
                SO3: 31.751468,
                HCl: 2.4894999999999996,
                HF: 1.9239999999999995,
                ash: 48.20850000000098,
                temperature: 50.21548592021981,
                pressure: 101560,
            },
            absOutletVolume: 3061979.6479478264,
            ppmSO2: 659.8102488997475,
        }

        const absorberOutlet = {
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
                temperature: 125.3195261,
                pressure: 101560,
            },
            oxiair: {
                H2O: 322.022198982126,
                O2: 2534.319639,
                N2: 8346.44077759738,
                temperature: 42.43372920495,
                pressure: 185760,
            },
            removal: {
                H2O: -28.1444870985152,
                O2: 1021.4843347455,
                CO2: -2894.28637820586,
                SO2: 4102.1856,
                SO3: 13.607772,
                HCl: 47.3005,
                HF: 36.556,
                ash: 273.181499999999,
            },
        }

        httpGetJson(
                'desulphur/absorberOutlet?' + jzonQueryData(absorberOutlet)
            )
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('gghOutlet', done => {
        let result = {
            gghEnth: 115146127.60269403,
            absInlet: {
                H2O: 135375.2060843304,
                O2: 223444.32933523163,
                N2: 2265561.1610859465,
                CO2: 603265.5217040115,
                SO2: 4260.8847488145975,
                SO3: 45.48472454303104,
                HCl: 49.65177400395168,
                HF: 38.3731725983543,
                ash: 320.77053443140005,
                temperature: 90.72763418768724,
                pressure: 0,
            },
            absOutlet: {
                H2O: 211229.2245003531,
                O2: 224960.0870823201,
                N2: 2273907.601863544,
                CO2: 606151.5755307679,
                SO2: 170.43538995258768,
                SO3: 31.839307180121743,
                HCl: 2.4825887001975815,
                HF: 1.9186586299178003,
                ash: 48.115580164710025,
                temperature: 46.76724634124608,
                pressure: 102260,
            },
            gghOutlet: {
                H2O: 209862.60356457543,
                O2: 223759.1050535009,
                N2: 2261790.407942632,
                CO2: 602919.3938267564,
                SO2: 182.6606411379907,
                SO3: 31.71382263709071,
                HCl: 2.620814696245902,
                HF: 2.0254860315634993,
                ash: 48.73504573330999,
                temperature: 80,
                pressure: 101560,
            },
            absOutletVolume: 2957615.6261888472,
            ppmSO2: 654.4003164229068,
        }

        const gghOutlet = {
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
                temperature: 125.3195261,
                pressure: 101560,
            },
            oxiair: {
                H2O: 322.022198982126,
                O2: 2534.319639,
                N2: 8346.44077759738,
                temperature: 42.43372920495,
                pressure: 185760,
            },
            removal: {
                H2O: -28.0663529397994,
                O2: 1018.56189191151,
                CO2: -2886.05382675645,
                SO2: 4090.44935886201,
                SO3: 13.6454173629093,
                HCl: 47.1691853037541,
                HF: 36.4545139684365,
                ash: 272.65495426669,
            },
            effect: {
                SO2: 96,
                SO3: 30,
                HCl: 95,
                HF: 95,
                ash: 85,
            },
            ggh: {
                dirtyPressureDrop: 700,
                cleanPressureDrop: 700,
                dirtyLeakage: 0.32,
                cleanLeakage: 0.85,
                temperature: 80,
            },
            sootblow: {
                H2O: 0.0651485527871468,
                O2: 5.2673064124133,
                N2: 17.3471650347995,
                temperature: 40.2,
                pressure: 105760,
            },
        }

        httpGetJson('desulphur/gghOutlet?' + jzonQueryData(gghOutlet))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('absorberWithUnderspray', done => {
        let result = {
            operatingHeaders: 3,
            totalFlow: 36600,
            flux: 134.6992928006329,
            lg: 11.953051361569242,
            stdLg: 12.2757448236214,
            spraysDp: 472.79543441654516,
            spraysStdDp: 456.0476369050476,
            trayMaxVel: 11.53854758445197,
            trayPressureDrop: 485.4078711543813,
            trayStdPressureDrop: 480.91509290821045,
            trayNg: 0.736544689417284,
            undersprayPressureDrop: 0,
            inletPressureDrop: 167.52024485382807,
            stdDp: 936.9627298132581,
        }

        const absorberWithUnderspray = {
            flow: 3061979.64794782,
            diameter: 18.6,
            pumpFlow: 12200,
            sprays: ['Std on', 'Std on', 'Std on', 'None', 'None', 'None'],
            openArea: 40,
            undersprayFlow: 0,
            inletVelocity: 12.5,
            saturTemperature: 50.2154859202198,
            inletTemperature: 125.3195261,
        }

        httpGetJson(
                'desulphur/absorberWithUnderspray?' +
                    jzonQueryData(absorberWithUnderspray)
            )
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('tower', done => {
        let result = {
            dll: 8.465556002018305,
            slurryVolume: 2787.571927153254,
            solidsMass: 500706.06475244067,
            minO2: 2026.7918288349736,
            injectPressure: 187480.34339106604,
            retentionTime: 4.569790044513531,
            residenceTime: 41.996047504977206,
            pH: 5.364546560854443,
        }
        const tower = {
            size: {
                diameter: 18.6,
                high: 9,
                injectElevation: 1.5,
                flare: 1,
                flareHeight: 2,
            },

            slurry: {
                temperature: 50.2154859202198,
                tds: 7146.68701133084,
                fw: 69133.9084146004,
                solids: 15,
                density: 1197.47239494259,
                totalPumpFlow: 36600,
                productAtss: 11922.694979643,
                stoich: 1.03,
                velocity: 3.13028607429039,
            },

            absInlet: {
                pressure: 102985.723550424,
                SO2: 4273.11,
                O2: 222238.08,
            },

            airVolume: 8853.9780540765,
            reactO2: 1021.4843347455,
        }

        httpGetJson('desulphur/tower?' + jzonQueryData(tower))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('ionBalance', done => {
        let result = {
            gypsumBleed: {
                'CaSO4*2H2O': 12196.250420121249,
                'CaSO3*(1/2)H2O': 49.07775934822823,
                CaCO3: 469.0653122127321,
                MgSO4: 7.225301259335207,
                MgCO3: 222.77048770999576,
                inerts: 742.5682923666525,
                ash: 1724.8206904805772,
                CaF2: 0,
                MgF2: 352.19269256994215,
                'Cl-': 1786.5833750211204,
                'F-': 26.96934985931984,
                'Mg++': 2000.943994646492,
                'Ca++': 0,
                'SO4--': 5419.866340313145,
                H2O: 80094.80569121595,
            },
            phof: {
                'CaSO4*2H2O': 1219.6250420121246,
                'CaSO3*(1/2)H2O': 24.538879674114114,
                CaCO3: 140.7195936638196,
                MgSO4: 3.6126506296676033,
                MgCO3: 111.38524385499788,
                inerts: 371.28414618332624,
                ash: 1491.2433942018877,
                CaF2: 0,
                MgF2: 304.49833375709767,
                'Cl-': 1544.6421015791734,
                'F-': 23.31712800385334,
                'Mg++': 1729.9737477946953,
                'Ca++': 0,
                'SO4--': 4685.901509679363,
                H2O: 69248.27059190159,
            },
            phuf: {
                'CaSO4*2H2O': 10976.625378109124,
                'CaSO3*(1/2)H2O': 24.538879674114114,
                CaCO3: 328.34571854891254,
                MgSO4: 3.6126506296676033,
                MgCO3: 111.38524385499788,
                inerts: 371.28414618332624,
                ash: 233.57729627868957,
                CaF2: 0,
                MgF2: 47.69435881284447,
                'Cl-': 241.94127344194712,
                'F-': 3.652221855466501,
                'Mg++': 270.9702468517966,
                'Ca++': 0,
                'SO4--': 733.9648306337823,
                H2O: 10846.535099314366,
            },
            vffeed: {
                'CaSO4*2H2O': 10976.625378109124,
                'CaSO3*(1/2)H2O': 24.538879674114114,
                CaCO3: 328.34571854891254,
                MgSO4: 3.6126506296676033,
                MgCO3: 111.38524385499788,
                inerts: 371.28414618332624,
                ash: 233.57729627868957,
                CaF2: 0,
                MgF2: 47.69435881284447,
                'Cl-': 241.94127344194712,
                'F-': 3.652221855466501,
                'Mg++': 270.9702468517966,
                'Ca++': 0,
                'SO4--': 733.9648306337823,
                H2O: 10846.535099314366,
            },
            gypsum: {
                'CaSO4*2H2O': 10757.092870546941,
                'CaSO3*(1/2)H2O': 24.048102080631832,
                CaCO3: 321.77880417793426,
                MgSO4: 3.5403976170742513,
                MgCO3: 109.15753897789793,
                inerts: 363.8584632596597,
                ash: 228.9057503531158,
                CaF2: 0,
                MgF2: 46.740471636587586,
                'Cl-': 0.13172358220722044,
                'F-': 0.001988431899086383,
                'Mg++': 0.14752824550813107,
                'Ca++': 0,
                'SO4--': 0.39960307445598264,
                H2O: 1316.554978738134,
            },
            wash: 3275.86078292178,
            filtrate: {
                'CaSO4*2H2O': 219.53250756218222,
                'CaSO3*(1/2)H2O': 0.49077759348228156,
                CaCO3: 6.566914370978282,
                MgSO4: 0.07225301259335204,
                MgCO3: 2.227704877099953,
                inerts: 7.425682923666557,
                ash: 4.671545925573781,
                CaF2: 0,
                MgF2: 0.9538871762568846,
                'Cl-': 241.8095498597399,
                'F-': 3.6502334235674145,
                'Mg++': 270.8227186062885,
                'Ca++': 0,
                'SO4--': 733.5652275593263,
                H2O: 12805.840903498012,
            },
            shff: {
                'CaSO4*2H2O': 46.460689501174805,
                'CaSO3*(1/2)H2O': 0.934789980504821,
                CaCO3: 5.360606024586049,
                MgSO4: 0.13762118142826849,
                MgCO3: 4.24313625212383,
                inerts: 14.143787507079434,
                ash: 56.80778429605511,
                CaF2: 0,
                MgF2: 11.599632715784274,
                'Cl-': 58.84196748987272,
                'F-': 0.8882482787159829,
                'Mg++': 65.9020357673781,
                'Ca++': 0,
                'SO4--': 178.505858419505,
                H2O: 2637.9602645381647,
            },
            shof: {
                'CaSO4*2H2O': 9.292137900234959,
                'CaSO3*(1/2)H2O': 0.18695799610096417,
                CaCO3: 1.0721212049172095,
                MgSO4: 0.027524236285653692,
                MgCO3: 0.8486272504247659,
                inerts: 2.828757501415886,
                ash: 44.275749646884215,
                CaF2: 0,
                MgF2: 9.04070525692967,
                'Cl-': 45.861183526086265,
                'F-': 0.6922969959142682,
                'Mg++': 51.36377123335658,
                'Ca++': 0,
                'SO4--': 139.12671997018904,
                H2O: 2056.015204578767,
            },
            shuf: {
                'CaSO4*2H2O': 37.16855160093984,
                'CaSO3*(1/2)H2O': 0.7478319844038568,
                CaCO3: 4.28848481966884,
                MgSO4: 0.11009694514261478,
                MgCO3: 3.394509001699064,
                inerts: 11.315030005663548,
                ash: 12.532034649170894,
                CaF2: 0,
                MgF2: 2.5589274588546043,
                'Cl-': 12.980783963786456,
                'F-': 0.19595128280171473,
                'Mg++': 14.538264534021504,
                'Ca++': 0,
                'SO4--': 39.37913844931595,
                H2O: 581.9450599593972,
            },
            reclaimWater: {
                'CaSO4*2H2O': 1392.6968600731325,
                'CaSO3*(1/2)H2O': 24.094867287091574,
                CaCO3: 141.92590201021181,
                MgSO4: 3.547282460832687,
                MgCO3: 109.36981247997402,
                inerts: 364.5660415999133,
                ash: 1439.1071558314063,
                CaF2: 0,
                MgF2: 293.8525882175703,
                'Cl-': 1727.741407531248,
                'F-': 26.08110158060386,
                'Mg++': 1935.041958879114,
                'Ca++': 0,
                'SO4--': 5241.36048189364,
                H2O: 77456.84542667778,
            },
        }
        const ionBalance = {
            productA: {
                'CaSO4*2H2O': 10766.385008447176,
                'CaSO3*(1/2)H2O': 24.235060076732797,
                CaCO3: 322.85092538285147,
                MgSO4: 3.567921853359905,
                MgCO3: 110.0061662283227,
                inerts: 366.68722076107565,
                ash: 273.18149999999997,
                CaF2: 0,
                MgF2: 55.78117689351725,
                'Cl-': 45.992907108264355,
                'F-': 0.6942854278129148,
                'Mg++': 51.511299478832086,
                'Ca++': 0,
                'SO4--': 139.52632304455665,
            },
            opt: {
                ext: 'Primary + Secondary',
                phof: 'to Filtrate Tank',
                bleed: 'SH OF',
                shuf: 'to Absorber',
                solids: 15,
                concCl: 20000,
            },
            ph: {
                'CaSO4*2H2O': 90,
                'CaSO3*(1/2)H2O': 50,
                CaCO3: 70,
                MgSO4: 50,
                MgCO3: 50,
                inerts: 50,
                solids: 50,
            },
            vf: {
                'CaSO4*2H2O': 98,
                'CaSO3*(1/2)H2O': 98,
                CaCO3: 98,
                MgSO4: 98,
                MgCO3: 98,
                inerts: 98,
                ash: 98,
                CaF2: 98,
                MgF2: 98,
                solids: 90,
                concCl: 100,
            },
            sh: {
                'CaSO4*2H2O': 80,
                'CaSO3*(1/2)H2O': 80,
                CaCO3: 80,
                MgSO4: 80,
                MgCO3: 80,
                inerts: 80,
                solids: 10,
            },
        }

        httpGetJson('desulphur/ionBalance?' + jzonQueryData(ionBalance))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('phofChlorideBleed', done => {
        let result = {
            gypsumBleed: {
                'CaSO4*2H2O': 11007.549652281925,
                'CaSO3*(1/2)H2O': 24.97288672035039,
                CaCO3: 331.3762640685481,
                MgSO4: 3.676545797242017,
                MgCO3: 113.35525965530371,
                inerts: 377.8508655176808,
                ash: 283.44343934397097,
                CaF2: 0,
                MgF2: 57.87657154438721,
                'Cl-': 1382.6781682919996,
                'F-': 20.872203214736412,
                'Mg++': 1548.5768064644508,
                'Ca++': 0,
                'SO4--': 4194.559833359596,
                H2O: 61987.2214032692,
            },
            phof: {
                'CaSO4*2H2O': 1100.7549652281923,
                'CaSO3*(1/2)H2O': 12.486443360175196,
                CaCO3: 99.4128792205644,
                MgSO4: 1.8382728986210084,
                MgCO3: 56.677629827651856,
                inerts: 188.9254327588404,
                ash: 240.59813652012505,
                CaF2: 0,
                MgF2: 49.12795051451049,
                'Cl-': 1173.6725727999853,
                'F-': 17.717161526680304,
                'Mg++': 1314.49397719693,
                'Ca++': 0,
                'SO4--': 3560.510279455694,
                H2O: 52617.23464901998,
            },
            phuf: {
                'CaSO4*2H2O': 9906.794687053733,
                'CaSO3*(1/2)H2O': 12.486443360175196,
                CaCO3: 231.9633848479837,
                MgSO4: 1.8382728986210084,
                MgCO3: 56.677629827651856,
                inerts: 188.9254327588404,
                ash: 42.84530282384591,
                CaF2: 0,
                MgF2: 8.748621029876729,
                'Cl-': 209.00559549201435,
                'F-': 3.1550416880561096,
                'Mg++': 234.0828292675207,
                'Ca++': 0,
                'SO4--': 634.0495539039022,
                H2O: 9369.986754249225,
            },
            vffeed: {
                'CaSO4*2H2O': 9906.794687053733,
                'CaSO3*(1/2)H2O': 12.486443360175196,
                CaCO3: 231.9633848479837,
                MgSO4: 1.8382728986210084,
                MgCO3: 56.677629827651856,
                inerts: 188.9254327588404,
                ash: 42.84530282384591,
                CaF2: 0,
                MgF2: 8.748621029876729,
                'Cl-': 209.00559549201435,
                'F-': 3.1550416880561096,
                'Mg++': 234.0828292675207,
                'Ca++': 0,
                'SO4--': 634.0495539039022,
                H2O: 9369.986754249225,
            },
            gypsum: {
                'CaSO4*2H2O': 9708.658793312658,
                'CaSO3*(1/2)H2O': 12.236714492971691,
                CaCO3: 227.324117151024,
                MgSO4: 1.8015074406485883,
                MgCO3: 55.54407723109882,
                inerts: 185.1469241036636,
                ash: 41.988396767369,
                CaF2: 0,
                MgF2: 8.573648609279195,
                'Cl-': 0.11379193532343011,
                'F-': 0.001717744919052772,
                'Mg++': 0.12744509593453915,
                'Ca++': 0,
                'SO4--': 0.3452047571254581,
                H2O: 1137.3311937009985,
            },
            wash: 2829.9149787194533,
            filtrate: {
                'CaSO4*2H2O': 198.13589374107505,
                'CaSO3*(1/2)H2O': 0.24972886720350473,
                CaCO3: 4.639267696959678,
                MgSO4: 0.036765457972420146,
                MgCO3: 1.133552596553038,
                inerts: 3.7785086551768075,
                ash: 0.856906056476916,
                CaF2: 0,
                MgF2: 0.17497242059753404,
                'Cl-': 208.89180355669092,
                'F-': 3.1533239431370568,
                'Mg++': 233.95538417158616,
                'Ca++': 0,
                'SO4--': 633.7043491467767,
                H2O: 11062.57053926768,
            },
            bleed: {
                'CaSO4*2H2O': 43.02875009375089,
                'CaSO3*(1/2)H2O': 0.4880977764141845,
                CaCO3: 3.8860709887373845,
                MgSO4: 0.07185848590969643,
                MgCO3: 2.215540830428672,
                inerts: 7.385136101428941,
                ash: 9.405033287495064,
                CaF2: 0,
                MgF2: 1.920422230272481,
                'Cl-': 45.87911517294946,
                'F-': 0.692567682893991,
                'Mg++': 51.38385438290708,
                'Ca++': 0,
                'SO4--': 139.1811182874566,
                H2O: 2056.819103121266,
            },
            reclaimWater: {
                'CaSO4*2H2O': 241.1646438348257,
                'CaSO3*(1/2)H2O': 0.7378266436176887,
                CaCO3: 8.525338685697061,
                MgSO4: 0.10862394388211663,
                MgCO3: 3.34909342698171,
                inerts: 11.163644756605752,
                ash: 10.261939343971978,
                CaF2: 0,
                MgF2: 2.0953946508700145,
                'Cl-': 254.8847106649638,
                'F-': 3.8476093709501002,
                'Mg++': 285.46668365042774,
                'Ca++': 0,
                'SO4--': 773.2306721913587,
                H2O: 11426.80585737049,
            },
        }
        const phofChlorideBleed = {
            productA: {
                'CaSO4*2H2O': 10766.3850084471,
                'CaSO3*(1/2)H2O': 24.2350600767327,
                CaCO3: 322.850925382851,
                MgSO4: 3.5679218533599,
                MgCO3: 110.006166228322,
                inerts: 366.687220761075,
                ash: 273.181499999999,
                CaF2: 0,
                MgF2: 55.7811768935172,
                'Cl-': 45.9929071082643,
                'F-': 0.694285427812914,
                'Mg++': 51.511299478832,
                'Ca++': 0,
                'SO4--': 139.526323044556,
            },
            opt: {
                ext: 'Primary + Secondary',
                phof: 'to Filtrate Tank',
                bleed: 'PH OF',
                solids: 15,
                concCl: 20000,
            },
            ph: {
                'CaSO4*2H2O': 90,
                'CaSO3*(1/2)H2O': 50,
                CaCO3: 70,
                MgSO4: 50,
                MgCO3: 50,
                inerts: 50,
                solids: 50,
            },
            vf: {
                'CaSO4*2H2O': 98,
                'CaSO3*(1/2)H2O': 98,
                CaCO3: 98,
                MgSO4: 98,
                MgCO3: 98,
                inerts: 98,
                ash: 98,
                CaF2: 98,
                MgF2: 98,
                solids: 90,
                concCl: 100,
            },
        }

        httpGetJson(
                'desulphur/phofChlorideBleed?' +
                    jzonQueryData(phofChlorideBleed)
            )
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('makeup', done => {
        let result = 127120.11984926909
        const makeup = {
            gasInlet: 134008.52,
            oxifeed: 31.3456715545902,
            sootblow: 0,
            limestone: 385.986548169553,
            removal: -28.1444870985152,
            gasOutlet: 256338.32603171,
            gypsum: {
                H2O: 1137.331193701,
                'CaSO4*2H2O': 9708.65879331272,
                'CaSO3*(1/2)H2O': 12.2367144929717,
            },
            cl: {
                H2O: 2056.81910312126,
                'CaSO4*2H2O': 43.0287500937509,
                'CaSO3*(1/2)H2O': 0.488097776414183,
            },
        }

        httpGetJson('desulphur/makeup?' + jzonQueryData(makeup))
            .subscribe(data => {
                //console.log(data)
                expect(data).toBeCloseTo(result)
                done()
            })
    })

    test('toprep', done => {
        let result = [
            {
                'CaSO4*2H2O': 600.0608033998624,
                'CaSO3*(1/2)H2O': 1.8358447635561614,
                CaCO3: 21.212568723378222,
                MgSO4: 0.2702758165455064,
                MgCO3: 8.333143948879396,
                inerts: 27.777146496264656,
                ash: 25.533542020371307,
                CaF2: 0,
                MgF2: 5.213716976282774,
                'Cl-': 634.1987856259432,
                'F-': 9.573540854033556,
                'Mg++': 710.2922087223195,
                'Ca++': 0,
                'SO4--': 1923.9363241253104,
                H2O: 28431.93842196945,
            },
            {
                'CaSO4*2H2O': 600.0608033998624,
                'CaSO3*(1/2)H2O': 1.8358447635561614,
                CaCO3: 6621.582542422739,
                MgSO4: 0.2702758165455064,
                MgCO3: 375.02036470995444,
                inerts: 394.4643672573397,
                ash: 25.533542020371307,
                CaF2: 0,
                MgF2: 5.213716976282774,
                'Cl-': 634.1987856259432,
                'F-': 9.573540854033556,
                'Mg++': 710.2922087223195,
                'Ca++': 0,
                'SO4--': 1923.9363241253104,
                H2O: 28817.924970139004,
            },
        ]
        const toprep = {
            limestone: {
                CaCO3: 6600.36997369936,
                MgCO3: 366.687220761075,
                inerts: 366.687220761075,
                H2O: 385.986548169553,
            },
            reclaim: {
                'CaSO4*2H2O': 241.164643834827,
                'CaSO3*(1/2)H2O': 0.737826643617688,
                CaCO3: 8.52533868569705,
                MgSO4: 0.108623943882116,
                MgCO3: 3.34909342698171,
                inerts: 11.1636447566057,
                ash: 10.2619393439719,
                CaF2: 0,
                MgF2: 2.09539465087,
                'Cl-': 254.884710664965,
                'F-': 3.84760937095012,
                'Mg++': 285.466683650429,
                'Ca++': 0,
                'SO4--': 773.230672191366,
                H2O: 11426.8058573705,
            },

            solids: 20,
        }

        httpGetJson('desulphur/toprep?' + jzonQueryData(toprep))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('gasVolume', done => {
        let result = {
            nvolume: 2432581.6254747123,
            volume: 3491410.5369153935,
            dnvolume: 2265852.772674201,
            dvolume: 3252109.677540563,
        }
        const gasVolume = {
            H2O: 134008.52,
            O2: 222238.08,
            N2: 2253426.62,
            CO2: 600033.34,
            SO2: 4273.11,
            SO3: 45.35924,
            HCl: 49.79,
            HF: 38.48,
            temperature: 125.3195261,
            pressure: 102985.723550424,
        }

        httpGetJson('desulphur/gasVolume?' + jzonQueryData(gasVolume))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('liquidVolume', done => {
        let result = {
            tss: 12200.101484929482,
            tds: 7146.687011330827,
            fw: 69133.90841460033,
            tf: 81334.0098995298,
            concCl: 19999.9999999999,
            solids: 15.000000000000014,
            sgSolution: 1.1033745549068585,
            sgSolid: 2.31737709283726,
            sg: 1.1974723949425978,
            density: 1197.472394942598,
            volume: 67.92140699279221,
        }
        const liquidVolume = {
            'CaSO4*2H2O': 11007.549652282,
            'CaSO3*(1/2)H2O': 24.9728867203504,
            CaCO3: 331.376264068548,
            MgSO4: 3.67654579724202,
            MgCO3: 113.355259655304,
            inerts: 377.850865517681,
            ash: 283.443439343971,
            CaF2: 0,
            MgF2: 57.8765715443872,
            'Cl-': 1382.678168292,
            'F-': 20.8722032147365,
            'Mg++': 1548.57680646446,
            'Ca++': 0,
            'SO4--': 4194.55983335963,
            H2O: 61987.2214032695,
        }

        httpGetJson('desulphur/liquidVolume?' + jzonQueryData(liquidVolume))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })

    test('idealCombus', done => {
        let result = {
            H2O: 2.6709050653286437,
            O2: -5.156557055808755,
            N2: 0.031056565786373662,
            CO2: 4.310323295061903,
            SO2: 0.029106162045844382,
            SO3: 0,
            HCl: 0,
            HF: 0,
            ash: 0,
        }
        const idealCombus = {
            C: 51.77,
            H: 4.31,
            O: 8.06,
            N: 0.87,
            S: 0.933289086,
            H2O: 9.6,
            A: 24.4567109139999,
        }

        httpGetJson('desulphur/idealCombus?' + jzonQueryData(idealCombus))
            .subscribe(data => {
                //console.log(data)
                expect(data).toEqual(result)
                done()
            })
    })
})
