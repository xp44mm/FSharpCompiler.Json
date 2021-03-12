import { BehaviorSubject } from "rxjs";
import { tabs } from "../hyperscript";
import { ProjectViewModel } from "./ProjectViewModel";
import { inputPanel } from "./inputPanel";

export const part = (project = new ProjectViewModel(), tabIndex = new BehaviorSubject(0)) => tabs({
    tabIndex,
    tags: ['输入', '输出'],
    panels: [
        inputPanel(project),
        'outputTbl(project)',
    ]
})
