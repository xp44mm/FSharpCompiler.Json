import { ProjectViewModel, RibViewModel } from '../model'
import { basicBinding } from './basicBinding'
import { dimensionBindings } from './dimensionBindings'
import { wallBindings } from './wallBindings'
import { wallLoadBindings } from './wallLoadBindings'
import { primitiveLoadBindings } from './primitiveLoadBindings'
import { plateRibLoadBindings } from './plateRibLoadBindings'

export function ribBinding(project = new ProjectViewModel(), rib = new RibViewModel()) {
    basicBinding({ project, rib })
    dimensionBindings(rib)
    wallBindings(rib)
    primitiveLoadBindings(project, rib)
    plateRibLoadBindings(rib)
    wallLoadBindings(project, rib)
}


