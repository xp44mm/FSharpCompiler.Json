import { combineLatest } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { td, textNode, tr } from '../hyperscript'
import { kindSelector } from './kindSelector'
import { DuctViewModel } from './model'

export const ductOutputRow = (duct = new DuctViewModel()) => {
    let k1 = duct.surface.kind
    let k2 = duct.surface.kind |> mergeMap(kind => duct.surface[kind].shape.kind)

    return tr([
        td(textNode(duct.remark)),

        td(textNode(combineLatest(k1, k2) |> map(([k1, k2]) => `${k1} && ${k2}`) |> map(ks => kindSelector.find(x => x[3] === ks)[0]))),

        td(textNode(duct.surface.dimension)),

        td({ className: 'text-right' }, textNode(duct.surface.surface |> map(n => n.toFixed(2)))),

        td({ className: 'text-right' }, textNode(duct.weight |> map(n => n.toFixed(2)))),

        td({ className: 'text-right' }, textNode(duct.paintVolume |> map(n => n.toFixed(2)))),

        td({ className: 'text-right' }, textNode(duct.insulaVolume |> map(n => n.toFixed(2)))),

        td({ className: 'text-right' }, textNode(duct.casingArea |> map(n => n.toFixed(2)))),
    ])
}
