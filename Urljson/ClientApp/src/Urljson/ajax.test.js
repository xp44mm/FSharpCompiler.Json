import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, tap, map } from 'rxjs/operators';
import { XMLHttpRequest } from 'xmlhttprequest';
import { queryStringify } from './queryStringify';

//Node.js root `global` arm with XMLHttpRequest
if (global.XMLHttpRequest) {
    global.XMLHttpRequest = XMLHttpRequest
}

const mainUrl = (controller, action, domain = 'http://localhost:3000') => `${domain}/${controller}/${action}`

let urljsonUrl = action => mainUrl('Urljson', action, 'http://localhost:61126')

//运行测试前，需要启动服务器端。
describe('Ajax test', () => {
    // 明天覆盖各种基元类型
    test('emptyParam && parseField', done => {
        let obj = {
            a: undefined,
            b: null,
            c: NaN,
        }

        expect.assertions(2)

        of(queryStringify(obj))
            |> tap(qs => expect(qs).toEqual('a=&b=&c='))
            |> map(qs => urljsonUrl('emptyParam') + '?' + qs)
            //|> tap(console.log)
            |> mergeMap(url => ajax.getJSON(url))
            |> o => o.subscribe(response => {
                //console.log(response)
                expect(response).toEqual([
                    { item1: 'a', item2: '' },
                    { item1: 'b', item2: '' },
                    { item1: 'c', item2: '' }
                ])
            }, 0, done)
    });

    test('parseField', done => {
        let obj = {
            section: { span: 5000, pipeNumber: 0, pipeSpec: 'Φ76×6' },
            panel: { t: 6, ribSpec: '[16a' },
        }

        expect.assertions(2)
        of(queryStringify(obj))
            |> tap(qs => expect(qs).toEqual("section=(span!5000*pipeNumber!0*pipeSpec!~%CE%A676%C3%976~)&panel=(t!6*ribSpec!~%5B16a~)"))
            |> map(qs => urljsonUrl('parseField') + '?' + qs)
            //|> tap(console.log)
            |> mergeMap(url => ajax.getJSON(url))
            |> o => o.subscribe(response => {
                //console.log(response)
                expect(response).toEqual(obj)
            }, 0, done)
    });

    test('SectionInput', done => {
        let obj = { "pipeNumber": 0, "pipeSpec": "Φ76×6", "span": 0 }
        expect.assertions(2)
        of(queryStringify(obj))
            |> tap(qs => expect(qs).toEqual("pipeNumber=0&pipeSpec=%CE%A676%C3%976&span=0"))
            |> map(qs => urljsonUrl('SectionInput') + '?' + qs)
            //|> tap(console.log)
            |> mergeMap(url => ajax.getJSON(url))
            |> o => o.subscribe(response => {
                console.log(response)
                expect(response).toEqual(obj)
            }, 0, done)
    });

});
