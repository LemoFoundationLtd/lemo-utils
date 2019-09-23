import * as address from './utils/address'
import * as amount from './utils/amount'
import * as buffer from './utils/buffer'
import * as crypto from './utils/crypto'
import * as hex from './utils/hex'
import * as rlp from './utils/rlp'

export const pubKeyToAddress = address.pubKeyToAddress
export const privateKeyToAddress = address.privateKeyToAddress
export const verifyAddress = address.verifyAddress
export const isLemoAddress = address.isLemoAddress
export const isTempAddress = address.isTempAddress
export const isContractAddress = address.isContractAddress
export const createTempAddress = address.createTempAddress
export const encodeAddress = address.encodeAddress
export const decodeAddress = address.decodeAddress
export const generateAccount = address.generateAccount
export const formatLEMO = amount.formatLEMO
export const lemoToMo = amount.lemoToMo
export const moToLemo = amount.moToLemo
export const toBuffer = buffer.toBuffer
export const bufferTrimLeft = buffer.bufferTrimLeft
export const setBufferLength = buffer.setBufferLength
export const sign = crypto.sign
export const recover = crypto.recover
export const sha3 = crypto.sha3
export const privateToPublicKey = crypto.privateToPublicKey
export const has0xPrefix = hex.has0xPrefix
export const decodeUtf8Hex = hex.decodeUtf8Hex
export const toHexStr = hex.toHexStr
export const rlpEncode = rlp.rlpEncode
export const rlpDecode = rlp.rlpDecode

export default {
    // address
    pubKeyToAddress: address.pubKeyToAddress,
    privateKeyToAddress: address.privateKeyToAddress,
    verifyAddress: address.verifyAddress,
    isLemoAddress: address.isLemoAddress,
    isTempAddress: address.isTempAddress,
    isContractAddress: address.isContractAddress,
    createTempAddress: address.createTempAddress,
    encodeAddress: address.encodeAddress,
    decodeAddress: address.decodeAddress,
    generateAccount: address.generateAccount,

    // amount
    formatLEMO: amount.formatLEMO,
    lemoToMo: amount.lemoToMo,
    moToLemo: amount.moToLemo,

    // buffer
    toBuffer: buffer.toBuffer,
    isBuffer: buffer.isBuffer,
    bufferTrimLeft: buffer.bufferTrimLeft,
    setBufferLength: buffer.setBufferLength,

    // crypto
    sign: crypto.sign,
    recover: crypto.recover,
    sha3: crypto.sha3,
    privateToPublicKey: crypto.privateToPublicKey,

    // hex
    has0xPrefix: hex.has0xPrefix,
    decodeUtf8Hex: hex.decodeUtf8Hex,
    toHexStr: hex.toHexStr,

    // rlp
    rlpEncode: rlp.rlpEncode,
    rlpDecode: rlp.rlpDecode,
}
