import { insulationWeightAjax, steelPropertyAjax, windElevCoeffAjax } from '../ajax'
import { projectReady } from '../ajax/ProjectReady'

export function basicBinding({ project, rib }) {
    let ready = projectReady.ribs.get(rib)

    windElevCoeffAjax(project, rib, ready.windElevCoeff)
    insulationWeightAjax(rib, ready.insulationWeight)
    steelPropertyAjax(rib, rib.ribMaterial, ready.ribMaterial.steelProperty)
    steelPropertyAjax(rib, rib.pipeMaterial, ready.pipeMaterial.steelProperty)

}
