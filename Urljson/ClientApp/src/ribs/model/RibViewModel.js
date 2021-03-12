import { BehaviorSubject } from 'rxjs'
import { DimensionViewModel } from './DimensionViewModel'
import { HorizonViewModel } from './HorizonViewModel'
import { SteelViewModel } from './SteelViewModel'
import { VerticalViewModel } from './VerticalViewModel'

export class RibViewModel {
    constructor() {
        this.title = new BehaviorSubject('加固肋选型')

        //灰
        this.ash = new BehaviorSubject(1.33)

        //振动频率
        this.frequency = new BehaviorSubject(20)

        //设计温度
        this.temperature = new BehaviorSubject(150)

        this.ribMaterial = new SteelViewModel()

        this.pipeMaterial = new SteelViewModel()

        this.insulationWeight = new BehaviorSubject(0)

        this.elevation = new BehaviorSubject(10)

        this.windElevCoeff = new BehaviorSubject(0)
        this.barotropy = new BehaviorSubject(2)
        this.vaccum = new BehaviorSubject(-6.83)
        this.span = new BehaviorSubject(900)

        // 尺寸
        this.latitude = new DimensionViewModel() //纬度
        this.longitude = new DimensionViewModel() //经度

        //
        this.kind = new BehaviorSubject('horizon')
        this.type = new BehaviorSubject('fixed')

        this.horizon = new HorizonViewModel()
        this.vertical = new VerticalViewModel()
    }

    pickeys() {
        return [
            'title',
            'ash',
            'frequency',
            'temperature',
            'ribMaterial',
            'pipeMaterial',
            //'insulationWeight',
            'elevation',
            //'windElevCoeff',
            'barotropy',
            'vaccum',
            'span',
            'latitude',
            'longitude',
            'kind',
            'type',
            this.kind.value,
        ]
    }
}
