import { div, h3 } from '../../../hyperscript'
import { BalanceViewModel } from '../../model'
import { liquidTable } from './liquidTable'
import { waterTable } from './waterTable'

export const liquidPanel = (balance = new BalanceViewModel()) => div(h3('液体'), liquidTable(balance), h3('水'), waterTable(balance))
