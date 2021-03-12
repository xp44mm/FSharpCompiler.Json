﻿import { BehaviorSubject } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import { CircleViewModel } from './CircleViewModel'
import { RectangleViewModel } from './RectangleViewModel'


export class ShapeViewModel {
    constructor(
        rectangle = new RectangleViewModel(),
        circle = new CircleViewModel()
    ) {
        this.rectangle = rectangle
        this.circle = circle

        this.kind = new BehaviorSubject('rectangle') //: 'rectangle' | 'circle'

        this.area = this.kind |> mergeMap(kind => this[kind].area)

        this.peri = this.kind |> mergeMap(kind => this[kind].peri)

        this.dimension =
            this.kind
            |> mergeMap(k => this[k].dimension)

    }

    pickeys() {
        return ['kind', this.kind.value]
    }
}

