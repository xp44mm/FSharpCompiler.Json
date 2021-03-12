import { idealCombusAjax } from "../ajax";
import { coalBinding } from "./coalBinding";
import { combusGasBinding } from "./combusGasBinding";
import { combusGasWithO2Binding } from "./combusGasWithO2Binding";
import { compute_fluegas } from "./compute_fluegas";
import { compute_real } from "./compute_real";
import { compute_realGasPercent } from "./compute_realGasPercent";
import { gasVolumesBinding } from "./gasVolumesBinding";
import { idealGasCompute } from "./idealGasCompute";

export const combustionBinding = (balance) => {
    let { gasParameters: { baseO2 }, combustion } = balance
    let {
        coal,
        product,
        idealGas,
        realGas,
        realGasPercent,
        realGasDryPercent
    } = combustion

    coalBinding(coal)
    combusGasBinding(product)

    idealCombusAjax(combustion)
    idealGasCompute(balance)

    combusGasWithO2Binding({
        baseO2,
        combusGas: idealGas,
    })

    combusGasWithO2Binding({
        baseO2,
        combusGas: realGas,
    })

    compute_realGasPercent(combustion)
    combusGasBinding(realGasPercent)
    combusGasBinding(realGasDryPercent)

    compute_real(balance)
    gasVolumesBinding(balance)
    compute_fluegas(balance)

}
