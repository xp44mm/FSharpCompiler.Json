import { combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { bucklingAjax } from '../ajax'
import { projectReady } from '../ajax/ProjectReady'

const dimensions = ['longitude', 'latitude']

export function pipeBindings(rib) {
    let ribReady = projectReady.ribs.get(rib)
    dimensions.forEach(dimensionKey => {
        let dimension = rib[dimensionKey]
        let neighbor = rib[getNeighborKey(dimensionKey)]
        let ready = ribReady[dimensionKey]

        pipeBinding({ rib, neighbor, dimension, ready: ready.pipe.buckling })
    })
}

function getNeighborKey(dimensionKey) {
    return dimensions.find(d => d !== dimensionKey)
}

function pipeBinding({ rib, neighbor, dimension, ready }) {
    let { span } = rib
    let { pipe, pipeNumber, designLength } = dimension

    neighbor.length.subscribe(pipe.length)

    combineLatest(pipeNumber, span, designLength)
        |> map(([num, span, len]) => (num > 0 ? span * len / 1e6 : 0))
        |> ($ => $.subscribe(pipe.wallArea))

    bucklingAjax(pipe, ready)
}
