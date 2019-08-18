import {assert} from 'chai'
import {Buffer} from 'safe-buffer'
import {sign, recover, sha3} from '../../lib/utils/crypto'
import {generateAccount, pubKeyToAddress} from '../../lib/utils/address'
import {toBuffer} from '../../lib/utils/buffer'

function randomBytes(size) {
    const numArr = new Array(size).fill(0).map(() => Math.floor(Math.random() * 256))
    return Buffer.from(numArr)
}

describe('crypto_sign_recover', () => {
    for (let i = 0; i < 20; i++) {
        it(`random case ${i}`, () => {
            const account = generateAccount()
            const hash = sha3(randomBytes(20))
            const sig = sign(toBuffer(account.privateKey), hash)
            const pub = recover(hash, sig)
            assert.equal(account.address, pubKeyToAddress(pub), `index=${i}, priv=${account.privateKey}, hash=${hash}`)
        })
    }
})
