import {assert} from 'chai'
import {encodeCustomTxData, decodeCustomTxData} from '../../lib/utils/hex'

describe('hex_encodeCustomTxData_decodeCustomTxData', () => {
    const tests = [
        {input: undefined, output: null},
        {input: {}},
        {input: null},
        {input: -123},
        {input: '123'},
        {input: []},
        {input: ['123', 456]},
        {input: {a: 12, b: [{c: '22"', d: true}]}},
    ]
    tests.forEach(test => {
        it(`encodeCustomTxData(${JSON.stringify(test.input)})`, () => {
            const dataStr = encodeCustomTxData(test.input)
            if (typeof test.output === 'undefined') {
                assert.deepStrictEqual(decodeCustomTxData(dataStr), test.input)
            } else {
                assert.deepStrictEqual(decodeCustomTxData(dataStr), test.output)
            }
        })
    })
})
