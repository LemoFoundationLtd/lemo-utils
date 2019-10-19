import {assert} from 'chai'
import {Buffer} from 'safe-buffer'
import {base64Encode, base64Decode} from '../../lib/utils/base64'

function randomBytes(size) {
    const numArr = new Array(size).fill(0).map(() => Math.floor(Math.random() * 256))
    return Buffer.from(numArr)
}

describe('base64_base64Encode_base64Decode', () => {
    for (let i = 0; i < 20; i++) {
        it(`random utf8 case ${i}`, () => {
            const test = randomBytes(20)
            const testUtf8 = test.toString()
            const encoded = base64Encode(testUtf8, true)
            assert.equal(base64Decode(encoded), testUtf8, `case ${i}, hex of test=${test.toString('hex')}`)
        })
    }

    for (let i = 0; i < 20; i++) {
        it(`random hex case ${i}`, () => {
            const test = randomBytes(20).toString('hex')
            const encoded = base64Encode(test, true, true)
            assert.equal(base64Decode(encoded, true), test, `case ${i}, test=${test}`)
        })
    }
})
