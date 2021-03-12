import { BehaviorSubject } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { ObservableArray } from '../../deep'
import { bindTabIndex, tabControl, tabNavItem, tabPanel, tabRoot } from '../component'

///選項卡面板標題
let tabtags = ['Home', 'Profile', 'Contact']

///選項卡面板内容
let sheets = [
   "Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua, retro synth master cleanse. Mustache cliche tempor, williamsburg carles vegan helvetica. Reprehenderit butcher retro keffiyeh dreamcatcher synth. Cosby sweater eu banh mi, qui irure terry richardson ex squid. Aliquip placeat salvia cillum iphone. Seitan aliquip quis cardigan american apparel, butcher voluptate nisi qui.",
   "Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.",
   "Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.",
]

///靜態選項卡示例
export function tabsTest() {
   let tabIndex = new BehaviorSubject(0)
   return tabControl({ tabIndex }, tabtags, sheets)
}

///動態選項卡示例
export function observableArrayTest() {
   let root = tabRoot({}) // tabControl({ tabIndex }, tags, panels)
   let navs = root.firstChild
   let panels = root.lastChild

   //選項卡的按鈕，面板對
   let entries = new ObservableArray()

   //配置添加事件
   entries.push$
      |> map(([tag, panel]) => [tabNavItem(tag), tabPanel(panel)])
      |> (o =>
         o.subscribe(([tag, panel]) => {
            navs.appendChild(tag)
            panels.appendChild(panel)
         }))

   //配置刪除事件
   entries.remove$
      |> tap(i => {
         let nav = navs.childNodes[i]
         let panel = panels.childNodes[i]
         nav.parentNode.removeChild(nav)
         panel.parentNode.removeChild(panel)
      })
      |> (o =>
         o.subscribe(i => {
            if (i === tabIndex.value) {
               if (i > 0) {
                  tabIndex.next(i - 1)
               } else {
                  tabIndex.next(0)
               }
            }
         }))

   // 初始化選項卡控件
   for (let i of tabtags.keys()) {
      entries.push([tabtags[i], sheets[i]])
   }

   let tabIndex = new BehaviorSubject(0)
   bindTabIndex(root, tabIndex)

   tabIndex.next(2)
   //test remove event
   entries.splice(2, 1)

   return root
}
