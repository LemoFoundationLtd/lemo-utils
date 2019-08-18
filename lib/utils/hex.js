import {Buffer} from 'safe-buffer'
import {hexStringToBuffer} from './buffer'
import errors from '../errors'

export function has0xPrefix(str) {
    return typeof str === 'string' && str.slice(0, 2).toLowerCase() === '0x'
}

export function decodeUtf8Hex(hex) {
    return hexStringToBuffer(hex).toString()
}

/**
 * Change string or Buffer object to a hex string which start with "0x"
 * @param {string|Buffer} data
 * @return {string}
 */
export function toHexStr(data) {
    if (!data) {
        return ''
    }
    if (typeof data === 'string') {
        if (has0xPrefix(data)) {
            return data
        }
        return `0x${data}`
    } else if (Buffer.isBuffer(data)) {
        return `0x${data.toString('hex')}`
    } else {
        throw new Error(errors.NotSupportedType())
    }
}

export default {
    has0xPrefix,
    decodeUtf8Hex,
    toHexStr,
}
