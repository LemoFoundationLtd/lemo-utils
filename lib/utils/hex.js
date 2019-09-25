import {Buffer} from 'safe-buffer'
import {TxCustomDataEncode} from '../const'
import {hexStringToBuffer, toBuffer} from './buffer'
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

/**
 * Encode information as customised transaction data
 * @param {object} obj
 * @return {string} encoded text which used to set transaction data
 */
export function encodeCustomTxData(obj) {
    const version = toBuffer([TxCustomDataEncode.STRINGIFY])
    const buffer = toBuffer(JSON.stringify(obj))
    const combined = Buffer.concat([version, buffer], buffer.length + 1)
    return toHexStr(combined)
}

/**
 * Decode information as customised transaction data
 * @param {string} dataStr the data in transaction
 * @return {object}
 */
export function decodeCustomTxData(dataStr) {
    const buffer = toBuffer(dataStr)
    if (buffer.length <= 1) {
        return null
    }

    const version = buffer[0]
    switch (version) {
        case TxCustomDataEncode.STRINGIFY:
            return JSON.parse(buffer.slice(1).toString())
        default:
            return null
    }
}

export default {
    has0xPrefix,
    decodeUtf8Hex,
    toHexStr,
    encodeCustomTxData,
    decodeCustomTxData,
}
