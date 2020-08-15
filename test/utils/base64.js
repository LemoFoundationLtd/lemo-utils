import {assert} from 'chai'
import {Buffer} from 'safe-buffer'
import {base64Encode, base64Decode} from '../../lib/utils/base64'

function randomBytes(size) {
    const numArr = new Array(size).fill(0).map(() => Math.floor(Math.random() * 256))
    return Buffer.from(numArr)
}

describe('base64_base64Encode_base64Decode', () => {
    const tests = [
        {input: '', isHex: true},
        {input: '0x', isHex: true, output: ''},
        {input: '0xa', isHex: true},
        {input: '0x0a', isHex: true, output: '0xa'},
        {input: '0xab', isHex: true},
        {input: '0xabc', isHex: true},
        {input: '0XABC', isHex: true, output: '0xabc'},
        {input: 'ab', isHex: true, output: '0xab'},
        {input: 'abc', isHex: true, output: '0xabc'},
        {input: '', isHex: false},
        {input: '0x', isHex: false},
        {input: '0xa', isHex: false},
        {input: '0x0a', isHex: false},
        {input: '0xab', isHex: false},
        {input: '0xabc', isHex: false},
        {input: '0XABC', isHex: false},
        {input: 'A', isHex: false},
        {input: 'ABC', isHex: false},
    ]
    tests.forEach((test) => {
        it(`special case ${test.input} isHex=${test.isHex}`, () => {
            const encoded = base64Encode(test.input, true, test.isHex)
            const decoded = base64Decode(encoded, test.isHex)
            const expected = test.output !== undefined ? test.output : test.input
            assert.equal(decoded, expected)
        })
    })
})

describe('base64_utf8', () => {
    for (let i = 0; i < 20; i++) {
        it(`random utf8 case ${i}`, () => {
            const test = randomBytes(20)
            const testUtf8 = test.toString()
            const encoded = base64Encode(testUtf8, true)
            const decoded = base64Decode(encoded)
            assert.equal(decoded, testUtf8, `case ${i}, hex of test=${test.toString('hex')}`)
        })
    }
})

describe('base64_hex', () => {
    for (let i = 0; i < 20; i++) {
        it(`random hex case ${i}`, () => {
            const test = randomBytes(20).toString('hex').replace(/^0+/, '')
            const encoded = base64Encode(test, false, true)
            const decoded = base64Decode(encoded, true)
            const expected = `0x${test}`
            assert.equal(decoded, expected, `case ${i}, test=${test}`)
        })
    }
})
