import { Observable, from } from 'rxjs'
import { distinct, map, bufferCount } from 'rxjs/operators'
import { colorRgbNames } from './colorRgbNames'

let getColorKeys = () => {
    let alias = [
        ['aqua', 'cyan'],
        ['fuchsia', 'magenta'],
        ['darkgray', 'darkgrey'],
        ['darkslategray', 'darkslategrey'],
        ['dimgray', 'dimgrey'],
        ['lightgray', 'lightgrey'],
        ['lightslategray', 'lightslategrey'],
        ['gray', 'grey'],
        ['slategray', 'slategrey'],
    ]

    let colorkeys = [
        ['00', '00', '00', 'black'],
        ['00', '00', '80', 'navy'],
        ['00', '00', '8b', 'darkblue'],
        ['00', '00', 'cd', 'mediumblue'],
        ['00', '00', 'ff', 'blue'],
        ['00', '64', '00', 'darkgreen'],
        ['00', '80', '00', 'green'],
        ['00', '80', '80', 'teal'],
        ['00', '8b', '8b', 'darkcyan'],
        ['00', 'bf', 'ff', 'deepskyblue'],
        ['00', 'ce', 'd1', 'darkturquoise'],
        ['00', 'fa', '9a', 'mediumspringgreen'],
        ['00', 'ff', '00', 'lime'],
        ['00', 'ff', '7f', 'springgreen'],
        ['00', 'ff', 'ff', 'aqua'],
        ['00', 'ff', 'ff', 'cyan'],
        ['19', '19', '70', 'midnightblue'],
        ['1e', '90', 'ff', 'dodgerblue'],
        ['20', 'b2', 'aa', 'lightseagreen'],
        ['22', '8b', '22', 'forestgreen'],
        ['2e', '8b', '57', 'seagreen'],
        ['2f', '4f', '4f', 'darkslategray'],
        ['2f', '4f', '4f', 'darkslategrey'],
        ['32', 'cd', '32', 'limegreen'],
        ['3c', 'b3', '71', 'mediumseagreen'],
        ['40', 'e0', 'd0', 'turquoise'],
        ['41', '69', 'e1', 'royalblue'],
        ['46', '82', 'b4', 'steelblue'],
        ['48', '3d', '8b', 'darkslateblue'],
        ['48', 'd1', 'cc', 'mediumturquoise'],
        ['4b', '00', '82', 'indigo'],
        ['55', '6b', '2f', 'darkolivegreen'],
        ['5f', '9e', 'a0', 'cadetblue'],
        ['64', '95', 'ed', 'cornflowerblue'],
        ['66', '33', '99', 'rebeccapurple'],
        ['66', 'cd', 'aa', 'mediumaquamarine'],
        ['69', '69', '69', 'dimgray'],
        ['69', '69', '69', 'dimgrey'],
        ['6a', '5a', 'cd', 'slateblue'],
        ['6b', '8e', '23', 'olivedrab'],
        ['70', '80', '90', 'slategray'],
        ['70', '80', '90', 'slategrey'],
        ['77', '88', '99', 'lightslategray'],
        ['77', '88', '99', 'lightslategrey'],
        ['7b', '68', 'ee', 'mediumslateblue'],
        ['7c', 'fc', '00', 'lawngreen'],
        ['7f', 'ff', '00', 'chartreuse'],
        ['7f', 'ff', 'd4', 'aquamarine'],
        ['80', '00', '00', 'maroon'],
        ['80', '00', '80', 'purple'],
        ['80', '80', '00', 'olive'],
        ['80', '80', '80', 'gray'],
        ['80', '80', '80', 'grey'],
        ['87', 'ce', 'eb', 'skyblue'],
        ['87', 'ce', 'fa', 'lightskyblue'],
        ['8a', '2b', 'e2', 'blueviolet'],
        ['8b', '00', '00', 'darkred'],
        ['8b', '00', '8b', 'darkmagenta'],
        ['8b', '45', '13', 'saddlebrown'],
        ['8f', 'bc', '8f', 'darkseagreen'],
        ['90', 'ee', '90', 'lightgreen'],
        ['93', '70', 'db', 'mediumpurple'],
        ['94', '00', 'd3', 'darkviolet'],
        ['98', 'fb', '98', 'palegreen'],
        ['99', '32', 'cc', 'darkorchid'],
        ['9a', 'cd', '32', 'yellowgreen'],
        ['a0', '52', '2d', 'sienna'],
        ['a5', '2a', '2a', 'brown'],
        ['a9', 'a9', 'a9', 'darkgray'],
        ['a9', 'a9', 'a9', 'darkgrey'],
        ['ad', 'd8', 'e6', 'lightblue'],
        ['ad', 'ff', '2f', 'greenyellow'],
        ['af', 'ee', 'ee', 'paleturquoise'],
        ['b0', 'c4', 'de', 'lightsteelblue'],
        ['b0', 'e0', 'e6', 'powderblue'],
        ['b2', '22', '22', 'firebrick'],
        ['b8', '86', '0b', 'darkgoldenrod'],
        ['ba', '55', 'd3', 'mediumorchid'],
        ['bc', '8f', '8f', 'rosybrown'],
        ['bd', 'b7', '6b', 'darkkhaki'],
        ['c0', 'c0', 'c0', 'silver'],
        ['c7', '15', '85', 'mediumvioletred'],
        ['cd', '5c', '5c', 'indianred'],
        ['cd', '85', '3f', 'peru'],
        ['d2', '69', '1e', 'chocolate'],
        ['d2', 'b4', '8c', 'tan'],
        ['d3', 'd3', 'd3', 'lightgray'],
        ['d3', 'd3', 'd3', 'lightgrey'],
        ['d8', 'bf', 'd8', 'thistle'],
        ['da', '70', 'd6', 'orchid'],
        ['da', 'a5', '20', 'goldenrod'],
        ['db', '70', '93', 'palevioletred'],
        ['dc', '14', '3c', 'crimson'],
        ['dc', 'dc', 'dc', 'gainsboro'],
        ['dd', 'a0', 'dd', 'plum'],
        ['de', 'b8', '87', 'burlywood'],
        ['e0', 'ff', 'ff', 'lightcyan'],
        ['e6', 'e6', 'fa', 'lavender'],
        ['e9', '96', '7a', 'darksalmon'],
        ['ee', '82', 'ee', 'violet'],
        ['ee', 'e8', 'aa', 'palegoldenrod'],
        ['f0', '80', '80', 'lightcoral'],
        ['f0', 'e6', '8c', 'khaki'],
        ['f0', 'f8', 'ff', 'aliceblue'],
        ['f0', 'ff', 'f0', 'honeydew'],
        ['f0', 'ff', 'ff', 'azure'],
        ['f4', 'a4', '60', 'sandybrown'],
        ['f5', 'de', 'b3', 'wheat'],
        ['f5', 'f5', 'dc', 'beige'],
        ['f5', 'f5', 'f5', 'whitesmoke'],
        ['f5', 'ff', 'fa', 'mintcream'],
        ['f8', 'f8', 'ff', 'ghostwhite'],
        ['fa', '80', '72', 'salmon'],
        ['fa', 'eb', 'd7', 'antiquewhite'],
        ['fa', 'f0', 'e6', 'linen'],
        ['fa', 'fa', 'd2', 'lightgoldenrodyellow'],
        ['fd', 'f5', 'e6', 'oldlace'],
        ['ff', '00', '00', 'red'],
        ['ff', '00', 'ff', 'fuchsia'],
        ['ff', '00', 'ff', 'magenta'],
        ['ff', '14', '93', 'deeppink'],
        ['ff', '45', '00', 'orangered'],
        ['ff', '63', '47', 'tomato'],
        ['ff', '69', 'b4', 'hotpink'],
        ['ff', '7f', '50', 'coral'],
        ['ff', '8c', '00', 'darkorange'],
        ['ff', 'a0', '7a', 'lightsalmon'],
        ['ff', 'a5', '00', 'orange'],
        ['ff', 'b6', 'c1', 'lightpink'],
        ['ff', 'c0', 'cb', 'pink'],
        ['ff', 'd7', '00', 'gold'],
        ['ff', 'da', 'b9', 'peachpuff'],
        ['ff', 'de', 'ad', 'navajowhite'],
        ['ff', 'e4', 'b5', 'moccasin'],
        ['ff', 'e4', 'c4', 'bisque'],
        ['ff', 'e4', 'e1', 'mistyrose'],
        ['ff', 'eb', 'cd', 'blanchedalmond'],
        ['ff', 'ef', 'd5', 'papayawhip'],
        ['ff', 'f0', 'f5', 'lavenderblush'],
        ['ff', 'f5', 'ee', 'seashell'],
        ['ff', 'f8', 'dc', 'cornsilk'],
        ['ff', 'fa', 'cd', 'lemonchiffon'],
        ['ff', 'fa', 'f0', 'floralwhite'],
        ['ff', 'fa', 'fa', 'snow'],
        ['ff', 'ff', '00', 'yellow'],
        ['ff', 'ff', 'e0', 'lightyellow'],
        ['ff', 'ff', 'f0', 'ivory'],
        ['ff', 'ff', 'ff', 'white'],
    ]

    let colors = []

    from(colorkeys)
        .pipe(
            map(([r, g, b, key]) => {
                let keys = alias.find(x => x.includes(key))
                if (keys) {
                    return [r, g, b, ...keys]
                } else return [r, g, b, key]
            }),
            distinct(([r, g, b]) => r + g + b),
            map(([r, g, b, ...keys]) => [
                parseInt(r, 16),
                parseInt(g, 16),
                parseInt(b, 16),
                ...keys,
            ])
        )
        .subscribe(i => colors.push(i))

    return colors
}

test('singleToDouble', () => {
    expect('F'.repeat(2)).toEqual('FF')
})

test('colorRgbNames', () => {
    expect(getColorKeys()).toEqual(colorRgbNames)
})

test('to fsharp', () => {
    let fs = colorRgbNames.map(([r, g, b, ...keys]) => [
        r,
        g,
        b,
        keys.join(' '),
    ])
    console.log(JSON.stringify(fs))
    //expect().toEqual(colorRgbNames)
})

test.only('buffer count', () => {
    let res =[];
    let fs = from('aabbcc')
        .pipe(bufferCount(2), map(([a, b]) => a + b))
        .subscribe(e => res.push(e))

    expect(res).toEqual(['aa','bb','cc'])
})
