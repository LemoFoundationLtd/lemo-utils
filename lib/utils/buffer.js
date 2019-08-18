import {Buffer} from 'safe-buffer'
import BigNumber from 'bignumber.js'
import errors from '../errors'

export function toBuffer(v) {
    if (Buffer.isBuffer(v)) {
        return v
    }
    if (v === null || v === undefined) {
        return Buffer.allocUnsafe(0)
    }
    if (Array.isArray(v)) {
        return Buffer.from(v)
    }
    if (typeof v === 'string') {
        // is Hex String
        if (v.match(/^0x[0-9A-Fa-f]*$/)) {
            return hexStringToBuffer(v)
        } else {
            // encode string as utf8
            return Buffer.from(v)
        }
    }
    if (typeof v === 'number') {
        v = v.toString(16)
        return hexStringToBuffer(v)
    }
    // BigNumber object
    if (BigNumber.isBigNumber(v)) {
        v = v.toString(16)
        return hexStringToBuffer(v)
    }
    // BN object
    if (v.toArray) {
        return Buffer.from(v.toArray())
    }

    throw new Error(errors.NotSupportedType())
}

export function hexStringToBuffer(hex) {
    if (hex.slice(0, 2).toLowerCase() === '0x') {
        hex = hex.slice(2)
    }
    if (hex.length % 2) {
        hex = `0${hex}`
    }
    return Buffer.from(hex, 'hex')
}

export function bufferTrimLeft(buffer) {
    let i = 0
    for (; i < buffer.length; i++) {
        if (buffer[i].toString() !== '0') {
            buffer = buffer.slice(i)
            break
        }
    }
    if (i === buffer.length) {
        buffer = Buffer.allocUnsafe(0)
    }
    return buffer
}

export function setBufferLength(buffer, length, right) {
    if (right) {
        if (buffer.length < length) {
            const buf = Buffer.allocUnsafe(length).fill(0)
            buffer.copy(buf)
            return buf
        }
        return buffer.slice(0, length)
    } else {
        if (buffer.length < length) {
            const buf = Buffer.allocUnsafe(length).fill(0)
            buffer.copy(buf, length - buffer.length)
            return buf
        }
        return buffer.slice(-length)
    }
}

export default {
    toBuffer,
    hexStringToBuffer,
    bufferTrimLeft,
    setBufferLength,
}
