import {assert} from 'chai'
import {
    verifyAddress,
    isTempAddress,
    isContractAddress,
    createTempAddress,
    encodeAddress,
    decodeAddress,
    generateAccount,
} from '../../lib/utils/address'
import errors from '../../lib/errors'

const testAddr = 'Lemo836BQKCBZ8Z7B7N4G4N4SNGBT24ZZSJQD24D'

describe('address_verifyAddress', () => {
    it('valid address', () => {
        const errMsg = verifyAddress(testAddr)
        return assert.equal(errMsg, '')
    })
    it('invalid address', () => {
        assert.throws(() => {
            verifyAddress('0x1')
        }, errors.InvalidAddress('0x1'))
    })
})

describe('address_generateAccount', () => {
    it('generateAccount', () => {
        const account = generateAccount()
        assert.exists(account.privateKey)
        assert.exists(account.address)
    })
})

describe('address_createTempAddress', () => {
    const tests = [
        {input: '0123456789', output: 'Lemo85SY56SGRTQQ63A2Y5ZWBBBGYT3CACBY6AB8'},
        {input: '1231234', output: 'Lemo85SY56SGRTQQ63A2Y48GBNF7ND5BWZRPW9Z3'},
        {input: 'mmsajfoa', output: 'Lemo85SY56SGRTQQ63A2Y48GCTPB294KJBF4AJD3'},
        {input: '0x123wq213', output: 'Lemo85SY56SGRTQQ63A2Y68732H8Y6PJWCCKKSA3'},
        {input: '测试', output: 'Lemo85SY56SGRTQQ63A2Y48GBNCS79CBNPK8Y7TN'},
        {input: 'sanff,da', output: 'Lemo85SY56SGRTQQ63A2Y48GCYCJZKHF3JW4R7C2'},
        {input: 213545, output: 'Lemo85SY56SGRTQQ63A2Y48GBNCRGJC85HPB87RW'},
        {input: '', output: '', error: errors.InvalidUserId()},
        {input: [1232312133], output: '', error: errors.InvalidUserId()},
        {input: ['01311111111000000000000'], output: '', error: errors.InvalidUserId()},
        {input: 21352312414157567575656765623145, output: '', error: errors.InvalidUserIdLength()},
        {input: '01311111111000000000000', output: '', error: errors.InvalidUserIdLength()},
    ]
    tests.forEach(test => {
        it(`the userId is ${test.input}, length is ${test.input.length}`, () => {
            const userId = test.input
            if (test.error) {
                assert.throws(() => {
                    createTempAddress(testAddr, userId)
                }, test.error)
            } else {
                const result = createTempAddress(testAddr, userId)
                assert.equal(result, test.output)
            }
        })
    })
})

describe('address_isTempAddress', () => {
    it('address_isTempAddress_false', () => {
        const result = isTempAddress(testAddr)
        assert.equal(result, false)
    })
    it('address_isTempAddress_true', () => {
        const userId = '032479789'
        const address = createTempAddress(testAddr, userId)
        const result = isTempAddress(address)
        assert.equal(result, true)
    })
})

describe('address_isContractAddress', () => {
    it('address_isContractAddress_false', () => {
        const result = isContractAddress(testAddr)
        assert.equal(result, false)
    })
    it('address_isContractAddress_true', () => {
        const result = isContractAddress('Lemo84PBJRWCJJ96KPN7PJ7FJZQK8743W7NK5TAD')
        assert.equal(result, true)
    })
})

describe('address_decodeAddress', () => {
    const tests = [
        {input: 'Lemo', error: errors.InvalidAddressCheckSum('Lemo')},
        {input: 'Lemo8', error: errors.InvalidAddressCheckSum('Lemo8')},
        {input: 'LemoBW', output: '0x01'},
        {input: 'Lemo83GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG', output: '0x015780f8456f9c1532645087a19dcf9a7e0c7f97'},
        {input: 'lemo83gn72gyh2nz8ba729z9tct7kq5fc3cr6djg', output: '0x015780f8456f9c1532645087a19dcf9a7e0c7f97'},
        {
            input: 'Lemo03GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG',
            error: 'Decode address LEMO03GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG fail: Non-base26 character',
        },
        {input: 'Lemo33GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG', error: errors.InvalidAddressCheckSum('Lemo33GN72GYH2NZ8BA729Z9TCT7KQ5FC3CR6DJG')},
        {input: '123', error: errors.InvalidAddress('123')},
        {input: '0x', output: '0x'},
        {input: '0x1', output: '0x1'},
        {input: '0x015780f8456f9c1532645087a19dcf9a7e0c7f97', output: '0x015780f8456f9c1532645087a19dcf9a7e0c7f97'},
        {input: 0x1, error: errors.InvalidAddressType(0x1)},
    ]

    tests.forEach((test) => {
        it(`address ${JSON.stringify(test.input)}`, () => {
            if (test.error) {
                assert.throws(() => {
                    decodeAddress(test.input)
                }, test.error)
            } else {
                assert.equal(decodeAddress(test.input), test.output)
            }
        })
    })
})

describe('address_encodeAddress_decodeAddress', () => {
    const tests = {
        '0x': 'Lemo888888888888888888888888888888888888',
        '0x01': 'Lemo8888888888888888888888888888888888BW',
        '0x02': 'Lemo8888888888888888888888888888888888QR',
        '0x10': 'Lemo888888888888888888888888888888888246',
        '0x0123': 'Lemo88888888888888888888888888888888622H',
        '0x12345678901234567890': 'Lemo888888888888888888QCN9RQT745GKWS6GPA',
        '0x01c96d852165a10915ffa9c2281ef430784840f0': 'Lemo848S799HQ3KPTNSYGDF5TARS3Z8Z2ZCAH5S3',
    }
    Object.entries(tests).forEach(([hex, lemoAddr]) => {
        it(`hex_address_${hex}`, () => {
            const encoded = encodeAddress(hex)
            assert.equal(encoded, lemoAddr)
            const decoded = decodeAddress(lemoAddr)
            assert.equal(decoded, hex)
        })
    })
})
