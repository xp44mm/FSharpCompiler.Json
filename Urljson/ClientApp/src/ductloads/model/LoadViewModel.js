import { BehaviorSubject, of } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { ShapeViewModel, bindingShape } from '../../shapes'
import { DamperViewModel } from './DamperViewModel'
import { DuctViewModel } from './DuctViewModel'
import { ExpansionViewModel } from './ExpansionViewModel'

export const chineseLoadKinds = {
    duct: '烟道',
    damper: '挡板',
    expansion: '膨胀节',
}

export class LoadViewModel {
    constructor() {
        this.duct = new DuctViewModel()
        this.damper = new DamperViewModel()
        this.expansion = new ExpansionViewModel()

        //this.section = new ShapeViewModel()
        //bindingShape(this.section, this.duct.section)
        //bindingShape(this.section, this.damper.section)
        //bindingShape(this.section, this.expansion.section)
        
        this.kind = new BehaviorSubject('duct') //'duct' | 'damper' | 'expansion'

        this.weight =
            this.kind
            |> mergeMap(
                kind =>
                    kind == 'duct' || kind == 'damper'
                        ? this[kind].weight
                        : of(0)
            )

        this.ashWeight =
            this.kind
            |> mergeMap(kind => (kind == 'duct' ? this.duct.ashWeight : of(0)))

        this.loadZ =
            this.kind
            |> mergeMap(
                kind => (kind == 'expansion' ? this.expansion.loadZ : of(0))
            )

        this.loadX =
            this.kind
            |> mergeMap(
                kind => (kind == 'expansion' ? this.expansion.loadX : of(0))
            )

        this.loadY =
            this.kind
            |> mergeMap(
                kind => (kind == 'expansion' ? this.expansion.loadY : of(0))
            )
    }

    pickeys() {
        return ['kind', this.kind.value]
    }
}
