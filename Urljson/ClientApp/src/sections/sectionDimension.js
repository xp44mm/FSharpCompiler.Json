//import { combineLatest } from "rxjs";
//import { CircleViewModel, RectangleViewModel, ShapeViewModel } from "./model/SectionViewModel";
//import { map, mergeMap } from "rxjs/operators";

//function rectangleDimension(rectangle = new RectangleViewModel()) {
//    return combineLatest(rectangle.width, rectangle.height)
//        |> map(([w, h]) => `${w}×${h}`)
//}

//function circleDimension(circle = new CircleViewModel()) {
//    return circle.diameter
//        |> map(d => `φ${d}`)
//}

//export function sectionDimension(section = new ShapeViewModel()) {
//    return section.kind
//        |> mergeMap(k => {
//            if (k === 'rectangle') {
//                return rectangleDimension(section.rectangle)
//            } else {
//                return circleDimension(section.circle)

//            }

//        })
//}