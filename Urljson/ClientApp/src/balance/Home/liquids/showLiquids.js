import { map } from 'rxjs/operators'
import { chlorideBleeds } from '../model'

export const showLiquids = map(
    i =>
        chlorideBleeds[i] == 'SH OF'
            ? [
                  '石灰石',
                  '石灰石浆液',
                  '浆液排出',
                  '石膏站顶流',
                  '石膏站底流',
                  '过滤机供浆',
                  '石膏',
                  '滤液水',
                  '废水站供浆',
                  '废水站顶流',
                  '废水站底流',
                  '回流水',
                  '去制浆',
              ]
            : [
                  '石灰石',
                  '石灰石浆液',
                  '浆液排出',
                  '石膏站顶流',
                  '石膏站底流',
                  '过滤机供浆',
                  '石膏',
                  '滤液水',
                  '废水排放',
                  '回流水',
                  '去制浆',
              ]
)

//浆液汇总
export const liquids = balance => {
}
