import BigNumber from 'bignumber.js'
import errors from '../errors'

export function formatLEMO(mo) {
    mo = new BigNumber(mo).toString(10)
    if (mo === '0') {
        return '0 LEMO'
    }
    if (mo.length > 12) {
        // use LEMO
        return `${moToLemo(mo)} LEMO`
    }

    // use mo
    if (/0{9}$/.test(mo)) {
        return `${mo.slice(0, mo.length - 9)}G mo`
    } else if (/0{6}$/.test(mo)) {
        return `${mo.slice(0, mo.length - 6)}M mo`
    } else if (/0{3}$/.test(mo)) {
        return `${mo.slice(0, mo.length - 3)}K mo`
    } else {
        return `${mo} mo`
    }
}

/**
 * 将单位从mo转换为LEMO的个数
 * @param {number|string} mo
 * @return {BigNumber}
 */
export function moToLemo(mo) {
    return toBigNumber(mo).dividedBy(new BigNumber('1000000000000000000', 10));
}

/**
 * 将单位从LEMO的个数转换为mo
 * @param {number|string} ether
 * @return {BigNumber}
 */
export function lemoToMo(ether) {
    return toBigNumber(ether).times(new BigNumber('1000000000000000000', 10));
}

/**
 * Takes an input and transforms it into an BigNumber
 *
 * @method toBigNumber
 * @param {number|string|BigNumber} num A number, string, HEX string or BigNumber
 * @return {BigNumber} BigNumber
 */
function toBigNumber(num) {
    let result
    if (num instanceof BigNumber || (num.constructor && num.constructor.name === 'BigNumber')) {
        result = num
    } else if (typeof num === 'string' && num.startsWith('0x')) {
        result = new BigNumber(num.replace('0x', ''), 16)
    } else {
        result = new BigNumber(num.toString(10), 10)
    }
    if (result.isNaN()) {
        throw new Error(errors.MoneyFormatError())
    }
    return result
}

export default {
    formatLEMO,
    lemoToMo,
    moToLemo,
}
