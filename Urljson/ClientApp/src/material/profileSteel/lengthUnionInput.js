import { map } from 'rxjs/operators'
import { span, label, option } from '../../hyperscript'
import { checkbox, numberbox, select } from '../../hyperscript/form'
import { LengthUnion, lengthUnits } from './LengthUnion'

export const lengthUnionInput = (model = new LengthUnion()) =>
    span(
        label(checkbox({ checked: model.givenLength }), '定长？'),
        numberbox({
            'style.display':
                model.givenLength |> map(yes => (yes ? 'inline-block' : 'none')),
            size: 8,
            number: model.length,
        }),

        select(
            { value: model.unit },
            Object.entries(lengthUnits).map(([text, value]) =>
                option({ text, value })
            )
        )
    )
