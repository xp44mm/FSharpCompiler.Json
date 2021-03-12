import { BehaviorSubject } from 'rxjs'

export class ViewModel {
    constructor() {
        this.flow = new BehaviorSubject(20)
        this.head = new BehaviorSubject(50)
        this.density = new BehaviorSubject(1)
        this.efficiency = new BehaviorSubject(80)

        this.oral = (function({ flow, head, density }) {
            return arguments[0]
        })(this)
    }
}

test('spread arguments', () => {
    let v = new ViewModel()
    console.log(Object.keys(v.oral))
})
