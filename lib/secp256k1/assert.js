const toString = Object.prototype.toString

// TypeError
export function isBuffer(value, message) {
    if (!Buffer.isBuffer(value)) throw TypeError(message)
}

export function isNumber(value, message) {
    if (toString.call(value) !== '[object Number]') throw TypeError(message)
}

// RangeError
export function isBufferLength(buffer, length, message) {
    if (buffer.length !== length) throw RangeError(message)
}

export function isNumberInInterval(number, x, y, message) {
    if (number <= x || number >= y) throw RangeError(message)
}

export default {
    isBuffer,
    isNumber,
    isBufferLength,
    isNumberInInterval,
}
