import {Buffer} from 'safe-buffer'
import baseX from 'base-x'
import {sha3, privateToPublicKey} from './crypto'
import errors from '../errors';
import {toBuffer, bufferTrimLeft} from './buffer'
import {has0xPrefix} from './hex'
import {ADDRESS_BYTE_LENGTH, ADDRESS_ALPHABET, ADDRESS_LOGO, AddressType, TEMP_SENDER_LENGTH, TEMP_USER_ID_LENGTH} from '../const'

const BASE26_0 = ADDRESS_ALPHABET[0]
const base26 = baseX(ADDRESS_ALPHABET)

/**
 * Decode public key to LemoChain address
 * @param {Buffer} pubKey
 * @return {string}
 */
export function pubKeyToAddress(pubKey) {
    const addressType = Buffer.from([AddressType.NORMAL])
    const pubHash = sha3(pubKey.slice(1))
    const addressBin = Buffer.concat([addressType, pubHash.slice(0, 19)])
    return encodeAddress(addressBin)
}

/**
 * Private key to LemoChain address
 * @param {Buffer} privKey
 * @return {string}
 */
export function privateKeyToAddress(privKey) {
    return pubKeyToAddress(privateToPublicKey(privKey))
}

/**
 * Verify a LemoChain address
 * @param {string} address
 * @return {string} verify error message
 */
export function verifyAddress(address) {
    try {
        decodeAddress(address)
        return ''
    } catch (e) {
        return e.message
    }
}

/**
 * @param {string} addr
 * @return {boolean}
 */
export function isLemoAddress(addr) {
    return typeof addr === 'string' && addr.toLowerCase().startsWith(ADDRESS_LOGO.toLowerCase())
}

/**
 * 判断当前账户是否为临时账户
 * @param {string} address
 * @return {boolean}
 */
export function isTempAddress(address) {
    const codeAddress = decodeAddress(address)
    // 截取0x开头的地址第三位和第四位， 用来判断账户类型
    return parseInt(codeAddress.slice(2, 4), 16) === AddressType.TEMP
}

/**
 * 判断当前账户是否为合约账户
 * @param {string} address
 * @return {boolean}
 */
export function isContractAddress(address) {
    const codeAddress = decodeAddress(address)
    // 截取0x开头的地址第三位和第四位， 用来判断账户类型
    return parseInt(codeAddress.slice(2, 4), 16) === AddressType.CONTRACT
}

/**
 * Create temp address
 * @param {string} from Creator address
 * @param {string} userId User id
 * @return {string}
 */
export function createTempAddress(from, userId) {
    if (!userId) {
        throw new Error(errors.InvalidUserId())
    }
    if (typeof userId === 'string') {
        userId = Buffer.from(userId).toString('hex')
    } else if (typeof userId === 'number') {
        userId = userId.toString(16)
    } else {
        throw new Error(errors.InvalidUserId())
    }
    if (userId.length > TEMP_USER_ID_LENGTH) {
        throw new Error(errors.InvalidUserIdLength())
    }
    userId = userId.padStart(TEMP_USER_ID_LENGTH, '0')

    const addressType = Number(AddressType.TEMP).toString(16).padStart(2, '0')

    // 截取from的后9个字节
    const codeAddress = decodeAddress(from)
    const sender = codeAddress.substring(codeAddress.length - TEMP_SENDER_LENGTH)

    return encodeAddress(`0x${addressType}${sender}${userId}`)
}

/**
 * Encode hex address to LemoChain address
 * @param {string|Buffer} data
 * @return {string}
 */
export function encodeAddress(data) {
    if (isLemoAddress(data)) {
        return data
    }
    data = toBuffer(data)

    let checkSum = 0
    for (let i = 0; i < data.length; i++) {
        checkSum ^= data[i]
    }

    const fullPayload = Buffer.concat([data, Buffer.from([checkSum])])

    let encoded = base26.encode(fullPayload)
    while (encoded.length < 36) {
        encoded = BASE26_0 + encoded
    }

    return ADDRESS_LOGO + encoded
}

/**
 * Decode LemoChain address to hex address
 * @param {string} address
 * @return {string}
 */
export function decodeAddress(address) {
    if (typeof address !== 'string') {
        throw new Error(errors.InvalidAddressType(address))
    }

    const origAddr = address
    if (has0xPrefix(address)) {
        if (new RegExp(`^0x[0-9a-f]{0,${ADDRESS_BYTE_LENGTH * 2}}$`, 'i').test(address)) {
            return address
        } else {
            throw new Error(errors.InvalidHexAddress(origAddr))
        }
    }
    address = address.toUpperCase()
    if (address.slice(0, 4) !== ADDRESS_LOGO.toUpperCase()) {
        // no logo
        throw new Error(errors.InvalidAddress(origAddr))
    }
    if (address.length < 4 + 2) {
        // no checkSum
        throw new Error(errors.InvalidAddressCheckSum(origAddr))
    }

    let fullPayload
    try {
        fullPayload = base26.decode(address.slice(4))
    } catch (e) {
        throw new Error(errors.DecodeAddressError(address, e.message))
    }
    fullPayload = bufferTrimLeft(fullPayload)
    const maxLenWithCheckSum = ADDRESS_BYTE_LENGTH + 1
    if (fullPayload.length > maxLenWithCheckSum) {
        throw new Error(errors.InvalidAddressLength(origAddr))
    }
    const data = fullPayload.slice(0, fullPayload.length - 1)
    const checkSum = fullPayload[fullPayload.length - 1] || 0

    let realCheckSum = 0
    for (let i = 0; i < data.length; i++) {
        realCheckSum ^= data[i]
    }
    if (realCheckSum !== checkSum) {
        throw new Error(errors.InvalidAddressCheckSum(origAddr))
    }

    // trim left 00
    const hex = data.toString('hex').replace(/^(00)+/, '')
    return `0x${hex}`
}

function randomBytes(size) {
    const numArr = new Array(size).fill(0).map(() => Math.floor(Math.random() * 256))
    return Buffer.from(numArr)
}

/**
 * 创建账户
 * @return {{privateKey: string, address: string}}
 */
export function generateAccount() {
    let privKey
    let address
    while (!address) {
        const innerHex = sha3(randomBytes(64));
        privKey = sha3(Buffer.concat([randomBytes(32), innerHex, randomBytes(32)]));
        try {
            address = privateKeyToAddress(privKey)
        } catch (error) {
            console.warn(error, 'try again')
        }
    }
    return {
        privateKey: `0x${privKey.toString('hex')}`,
        address,
    }
}

export default {
    pubKeyToAddress,
    privateKeyToAddress,
    verifyAddress,
    isLemoAddress,
    isTempAddress,
    isContractAddress,
    createTempAddress,
    encodeAddress,
    decodeAddress,
    generateAccount,
}
