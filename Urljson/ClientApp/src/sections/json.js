export const json = {
    projectName: '某某项目管道流速计算',
    sections: [
        {
            name: '原烟道',
            volume: 3516958.21,
            kind: 'rectangle',
            rectangle: {
                width: 7000,
                height: 9000,
            },
        },
        {
            name: '净烟道',
            volume: 3335087.75,
            kind: 'rectangle',
            rectangle: {
                width: 7000,
                height: 8800,
            },
        },
        {
            name: '脉冲悬浮泵管道',
            volume: 2100,
            kind: 'circle',
            circle: {
                diameter: 610,
            },
        },
        {
            name: '氧化空气管道',
            volume: 7400,
            kind: 'circle',
            circle: {
                diameter: 468,
            },
        },
        {
            name: '循环泵',
            volume: 7700,
            kind: 'circle',
            circle: {
                diameter: 996,
            },
        },
        {
            name: '吸收塔排出泵',
            volume: 107,
            kind: 'circle',
            circle: {
                diameter: 142,
            },
        },
    ],
}
