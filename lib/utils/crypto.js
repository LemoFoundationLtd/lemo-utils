import {Buffer} from 'safe-buffer'
import keccak from 'keccak'
import BigNumber from 'bignumber.js'
import elliptic from 'elliptic'

import {setBufferLength, toBuffer} from './buffer'
import secp256k1 from '../secp256k1/index'
import messages from '../secp256k1/messages'

const ec = new (elliptic.ec)('secp256k1') // eslint-disable-line
const N = secp256k1.N
// secp256k1n/2
const N_DIV_2 = new BigNumber('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16)

/**
 * sign hash
 * @param {Buffer} privateKey length must be 32
 * @param {Buffer} hash length must be 32
 * @return {Buffer}
 */
export function sign(privateKey, hash) {
    const sig = secp256k1.sign(hash, privateKey)
    const recovery = Buffer.from([sig.recovery])
    return Buffer.concat([sig.signature, recovery]);
}

/**
 * Recover public key from hash and sign data
 * @param {Buffer} hash
 * @param {Buffer} sig
 * @return {Buffer|null}
 */
export function recover(hash, sig) {
    sig = setBufferLength(sig, 65)
    const recovery = sig[64]
    if (recovery !== 0 && recovery !== 1) {
        console.error('Invalid signature recovery value')
        return null
    }

    // const r = sig.slice(0, 32)
    const s = sig.slice(32, 64)
    // All transaction signatures whose s-value is greater than secp256k1n/2 are considered invalid.
    if (new BigNumber(s).gt(N_DIV_2)) {
        return null
    }

    try {
        const signature = sig.slice(0, 64)

        return secp256k1.recover(hash, signature, recovery)
    } catch (e) {
        return null
    }
}

/**
 * sha3
 * @param {Buffer} data
 * @return {Buffer}
 */
export function sha3(data) {
    return keccak('keccak256').update(data).digest()
}

/**
 * private key to public key
 * @param {Buffer} privKey
 * @return {Buffer}
 */
export function privateToPublicKey(privKey) {
    privKey = toBuffer(privKey)
    const privNum = new BigNumber(privKey)
    if (privNum.gt(N) || privNum.isZero()) {
        throw new Error(messages.EC_PUBLIC_KEY_CREATE_FAIL)
    }

    const ecKey = ec.keyFromPrivate(privKey);
    return Buffer.from(ecKey.getPublic().encode())
}

export default {
    sign,
    recover,
    sha3,
    privateToPublicKey,
}
