import { balance } from './balance'
import { denox } from './denox'
import { dilution } from './dilution'
import { ductloads } from './ductloads'
//import { ductStatistics } from './ductStatistics'
import { a, div, h3, li, ul, h4 } from './hyperscript'
import { insulation } from './insulation'
import { material } from './material'
import { orrifice } from './orrifice'
import { ribs } from './ribs'
import { sections } from './sections'

import { color } from './color'
import { parseHTML } from './parseHTML'

import { booster } from './performance/booster'
import { cavitationErosion } from './performance/cavitationErosion'

import { ashLoad } from './load/ashLoad'
import { buckling } from './load/buckling'
import { buoyant } from './load/buoyant'
import { windLoad } from './load/windLoad'

import { boosterfan } from './equipment/boosterfan'
import { fan } from './equipment/fan'
import { gypsumHouse } from './equipment/gypsumHouse'
import { pump } from './equipment/pump'
import { rootsfan } from './equipment/rootsfan'
import { tank } from './equipment/tank'

import { frictionalResistance } from './fluids/frictionalResistance'
import { miterElbow } from './fluids/miterElbow'
import { rectangleBend } from './fluids/rectangleBend'
import { reducer } from './fluids/reducer'
import { singleMiterElbow } from './fluids/singleMiterElbow'

const apps = {
    balance,
    denox,
    dilution,
    ductloads,
    //ductStatistics,
    insulation,
    material,
    orrifice,
    ribs,
    sections,
    parseHTML,
    color,
    booster,
    cavitationErosion,
    ashLoad,
    buckling,
    buoyant,
    windLoad,
    boosterfan,
    fan,
    gypsumHouse,
    pump,
    rootsfan,
    tank,
    frictionalResistance,
    miterElbow,
    rectangleBend,
    reducer,
    singleMiterElbow,
}

export function startup() {
    let root = document.getElementById('root')

    function item(name, text = name) {
        return li([
            a({
                href: 'javascript:void(0);',
            }, text).subscribeEvent('click', e => {
                document.title = text + '之于' + document.title
                e.preventDefault()
                while (root.firstChild) {
                    root.removeChild(root.firstChild)
                }

                root.appendChild(apps[name]())
            }),
        ])
    }

    return div(
        h3('选择要进入的程序:'),
        ul([
            item('balance', '脱硫物料平衡计算'),
            item('denox', '氨耗量'),
            item('dilution', '溶液稀释'),
            item('ductloads', '烟道荷载'),
            //item('ductStatistics', '烟道材料统计'),
            item('insulation', '保温计算'),
            item('orrifice', '孔板计算'),
            item('ribs', '加固肋计算'),
            item('sections', '管道流速计算'),
        ]),

        h4('小工具'),
        ul([
            item('parseHTML', '解析HTML'),
            item('color', '颜色工具'),
        ]),

        h4('性能'),
        ul([
            item('booster', '风机出口温度'),
            item('cavitationErosion', '汽蚀'),
        ]),

        h4('荷载计算'),
        ul([
            item('ashLoad', '烟道灰荷载计算'),
            item('buckling', '轴心受压构件稳定性'),
            item('buoyant', '浮力'),
            item('windLoad', '风荷载'),
        ]),

        h4('设备选型'),
        ul([
            item('boosterfan', '增压风机选型'),
            item('fan', '风机选型'),
            item('gypsumHouse', '石膏库大小'),
            item('pump', '水泵选型'),
            item('rootsfan', '罗茨风机选型'),
            item('tank', '箱罐'),
        ]),

        h4('流体阻力'),
        ul([
            item('frictionalResistance', '沿程阻力系数'),
            item('miterElbow', '虾米弯头'),
            item('rectangleBend', '矩形弯头'),
            item('reducer', '变径管'),
            item('singleMiterElbow', '单节虾米弯'),
        ]),



    )
}
