import { BehaviorSubject } from 'rxjs'
import { AirViewModel } from './AirViewModel'

export class AtmosphereViewModel {
    constructor() {
        this.pressure = new BehaviorSubject(0)
        this.temperature = new BehaviorSubject(0)
        this.humidity = new BehaviorSubject(0)

        this.wetAir = new AirViewModel()
        this.airVol = new AirViewModel()
    }

    pickeys() {
        return ['pressure', 'temperature', 'humidity']
    }
}
