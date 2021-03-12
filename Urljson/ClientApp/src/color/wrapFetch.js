//import { of } from 'rxjs'
//import { fromFetch } from 'rxjs/fetch'
//import { mergeMap, catchError } from 'rxjs/operators'

//function wrapFetch(r, g, b) {
//    return fromFetch(`color/nearest?r=${r}&g=${g}&b=${b}`, { method: 'GET' }).pipe(
//        mergeMap(response => {
//            if (response.ok) {
//                // OK return data
//                return response.json()
//            } else {
//                // Server is returning a status requiring the client to try something else.
//                return of({ error: true, message: `Error ${response.status}` })
//            }
//        }),
//        catchError(err => {
//            // Network or other error, handle appropriately
//            console.error(err)
//            return of({ error: true, message: err.message })
//        })
//    )

//}


//data$.subscribe({
//    next: result => {
//        console.log(result)
//    },
//    complete: () => console.log('done'),
//})
