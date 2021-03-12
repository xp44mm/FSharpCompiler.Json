export const json = {
    snow: 0.35,
    w0: 0.3,
    topography: 'B',
    ribs: [
        {
            title: '加固肋选型1',
            ash: 1.33,
            frequency: 20,
            temperature: 150,
            ribMaterial: {
                name: 'Q235',
            },
            pipeMaterial: {
                name: 'Q235',
            },
            elevation: 10,
            barotropy: 2,
            vaccum: -6.83,
            span: 900,
            latitude: {
                length: 5000,
                pipeNumber: 1,
                pipe: {
                    dw: 50,
                    t: 3,
                },
            },
            longitude: {
                length: 6000,
                pipeNumber: 1,
                pipe: {
                    dw: 90,
                    t: 4,
                },
            },
            kind: 'horizon',
            type: 'fixed',
            horizon: {
                top: {
                    thick: 5,
                    ribSpec: 'I12.6',
                },
                bottom: {
                    thick: 5,
                    ribSpec: '[20a',
                },
                side: {
                    thick: 5,
                    ribSpec: 'L63×6',
                },
            },
        },
        {
            title: '加固肋选型2',
            ash: 1.33,
            frequency: 20,
            temperature: 150,
            ribMaterial: {
                name: 'Q235',
            },
            pipeMaterial: {
                name: 'Q235',
            },
            elevation: 10,
            barotropy: 2,
            vaccum: -6.83,
            span: 900,
            latitude: {
                length: 5000,
                pipeNumber: 1,
                pipe: {
                    dw: 50,
                    t: 3,
                },
            },
            longitude: {
                length: 6000,
                pipeNumber: 1,
                pipe: {
                    dw: 90,
                    t: 4,
                },
            },
            kind: 'horizon',
            type: 'fixed',
            horizon: {
                top: {
                    thick: 5,
                    ribSpec: '[20a',
                },
                bottom: {
                    thick: 5,
                    ribSpec: '[20a',
                },
                side: {
                    thick: 5,
                    ribSpec: '[20a',
                },
            },
        },
    ],
}
