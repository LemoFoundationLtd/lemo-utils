import {
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
} from './utils/address'
import {formatLEMO, lemoToMo, moToLemo} from './utils/amount'
import {
    toBuffer,
    bufferTrimLeft,
    setBufferLength,
} from './utils/buffer'
import {
    sign,
    recover,
    sha3,
    privateToPublicKey,
} from './utils/crypto'
import {has0xPrefix, decodeUtf8Hex, toHexStr} from './utils/hex'
import {rlpEncode, rlpDecode} from './utils/rlp'


export default {
    // address
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

    // amount
    formatLEMO,
    lemoToMo,
    moToLemo,

    // buffer
    toBuffer,
    bufferTrimLeft,
    setBufferLength,

    // crypto
    sign,
    recover,
    sha3,
    privateToPublicKey,

    // hex
    has0xPrefix,
    decodeUtf8Hex,
    toHexStr,

    // rlp
    rlpEncode,
    rlpDecode,
}
