import {assert} from 'chai'
import {Buffer} from 'safe-buffer'
import BigNumber from 'bignumber.js'
import {toBuffer} from '../../lib/utils/buffer'
import errors from '../../lib/errors'

describe('buffer_toBuffer', () => {
    const tests = [
        {input: '', output: ''},
        {input: '1', output: '31'},
        {input: '\'😋"}', output: '27f09f988b227d'},
        {input: '{"a":1}', output: '7b2261223a317d'},
        {input: '0x10011', output: '010011'},
        {input: 0, output: '00'},
        {input: 0.1, output: ''},
        {input: -5, output: ''},
        {input: [1, 2], output: '0102'},
        {input: Buffer.from('abc'), output: '616263'},
        {input: new BigNumber('0x01'), output: '01'},
        {input: {a: 1}, error: errors.NotSupportedType()},
    ]
    tests.forEach(test => {
        it(`when input is ${test.input}`, () => {
            if (test.error) {
                assert.throws(() => {
                    toBuffer(test.input)
                }, test.error)
            } else {
                assert.equal(toBuffer(test.input).toString('hex'), test.output)
            }
        })
    })
})
