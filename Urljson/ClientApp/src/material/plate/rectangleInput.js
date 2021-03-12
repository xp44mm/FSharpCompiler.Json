import { option, span } from '../../hyperscript'
import { numberbox, select } from '../../hyperscript/form'
import { AreaShape, areaUnits, UnitShape } from './AreaShape'
import { Circle, Rectangle } from './shape'
import { Trap } from './trap'

export const rectangleInput = (props = {}, rectangle = new Rectangle()) =>
    span(
        props,
        numberbox({ size: 8, placeholder: '宽(mm)', number: rectangle.width }),
        '×',
        numberbox({ size: 8, placeholder: '高(mm)', number: rectangle.height })
    )

export const circleInput = (props = {}, circle = new Circle()) =>
    span(
        props,
        numberbox({
            size: 10,
            placeholder: '直径(mm)',
            number: circle.diameter,
        })
    )

export const trapInput = (props = {}, trap = new Trap()) =>
    span(
        props,
        numberbox({ size: 8, placeholder: '上底(mm)', number: trap.top }),
        '×',
        numberbox({ size: 8, placeholder: '下底(mm)', number: trap.bottom }),
        '×',
        numberbox({ size: 8, placeholder: '高(mm)', number: trap.height })
    )


let areaUnitKeys = Object.keys(areaUnits)

export const areaShapeInput = (props = {}, vm = new AreaShape()) =>
    span(
        props,
        numberbox({ size: 8, placeholder: '面积', number: vm.area }),
        select({ value: vm.unit }, areaUnitKeys.map(text => option({ text })))
    )

export const unitShapeInput = (props = {}, vm = new UnitShape()) =>
    span(
        props,
        select({ value: vm.unit }, areaUnitKeys.map(text => option({ text })))
    )
