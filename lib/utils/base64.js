import {Buffer} from 'safe-buffer'

/**
 * Encode by base64
 * @param {string} input
 * @param {boolean?} uriSafe encode to a uri safe string
 * @param {boolean?} isHex is input a hex data, or it must be utf8
 * @return {string}
 */
export function base64Encode(input, uriSafe, isHex) {
    let result = Buffer.from(input, isHex ? 'hex' : 'utf8').toString('base64')
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
    return Buffer.from(input, 'base64').toString(isHex ? 'hex' : 'utf8')
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
