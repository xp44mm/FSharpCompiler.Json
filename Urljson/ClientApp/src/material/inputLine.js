import { button,  option, td, textNode, tr } from '../hyperscript'
import { choice } from '../hyperscript/component'
import { numberbox,select } from '../hyperscript/form'
import { partKinds, PartViewModel } from './PartViewModel'
import { plateInput } from './plate/plateInput'
import { profileSteelInput } from './profileSteel/profileSteelInput'

export const inputLine = (model = new PartViewModel(), project) => {
    return tr(
        td(
            select(
                { value: model.kind },
                Object.entries(partKinds).map(([value, text]) =>
                    option({ value, text })
                )
            )
        ),

        td({ className: 'text-right' }, numberbox({ size: 8, number: model.quantity })),

        ...choice(model.kind, {
            plate: plateInput(model.plate),
            profileSteel: profileSteelInput(model.profileSteel),
        }),

        td(),
        //textNode(model.description)
        td({ className: 'text-right' }, textNode(model.measure)),
        td({ className: 'text-right' }, textNode(model.weight)),
        td({ className: 'text-right' }, textNode(model.total)),

        td(
            button('移除').subscribeEvent('click', _ => {
                project.remove(model)
            })
        )
    )
}
