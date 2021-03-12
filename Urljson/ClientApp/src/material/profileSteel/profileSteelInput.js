import { map } from 'rxjs/operators'
import { option, td } from '../../hyperscript'
import { select } from '../../hyperscript/form'
import { choice } from '../../hyperscript/component'

import { flatInput } from './flatInput'
import { lengthUnionInput } from './lengthUnionInput'
import { pipeInput } from './pipeInput'
import {
    profileSteelKinds,
    ProfileSteelViewModel,
} from './ProfileSteelViewModel'
import { shapeSteelInput } from './shapeSteelInput'

export const profileSteelInput = (
    //props = {},
    model = new ProfileSteelViewModel()
) =>
    td(
        //props,
        select(
            { value: model.kind },
            Object.entries(profileSteelKinds).map(([value, text]) =>
                option({ value, text })
            )
        ),
        ...choice(model.kind, {
            shapeSteel: shapeSteelInput(model.shapeSteel),
            pipe: pipeInput(model.pipe),
            flat: flatInput(model.flat),
        }),

        lengthUnionInput(model.lengthUnion)
    )
