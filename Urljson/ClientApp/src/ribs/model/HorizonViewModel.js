import { WallViewModel } from "./WallViewModel";

export class HorizonViewModel {
    constructor() {
        this.top = new WallViewModel()
        this.bottom = new WallViewModel()
        this.side = new WallViewModel()
    }
}

