import {Buffer} from 'safe-buffer'
import {hexStringToBuffer} from './buffer'

/**
 * Encode by base64
 * @param {string} input
 * @param {boolean?} uriSafe encode to a uri safe string
 * @param {boolean?} isHex is input a hex data, or it must be utf8
 * @return {string}
 */
export function base64Encode(input, uriSafe, isHex) {
    const buffer = isHex ? hexStringToBuffer(input) : Buffer.from(input)
    let result = buffer.toString('base64')
    if (uriSafe) {
        result = uriSafeEncode(result)
    }
    return result
}

/**
 * Decode by base64
 * @param {string} input
 * @param {boolean?} isHex is the decoded string a hex data, or it must be utf8
 * @return {string}
 */
export function base64Decode(input, isHex) {
    input = uriSafeDecode(input)
    const buffer = Buffer.from(input, 'base64')

    if (!isHex) {
        return buffer.toString()
    }

    let result = buffer.toString('hex')
    if (result[0] === '0') {
        result = result.slice(1)
    }
    return result.length ? `0x${result}` : ''
}

export function uriSafeEncode(input) {
    return input.replace(/[+/]/g, m0 => (m0 === '+' ? '-' : '_'))
        .replace(/=/g, '')
}

export function uriSafeDecode(input) {
    return input.replace(/[-_]/g, m0 => (m0 === '-' ? '+' : '/'))
}

export default {
    base64Encode,
    base64Decode,
}
