# Lemo-utils

A collection of utility functions for Lemochain

[![npm](https://img.shields.io/npm/v/lemo-utils.svg?style=flat-square)](https://www.npmjs.com/package/lemo-utils)
[![Build Status](https://travis-ci.org/LemoFoundationLtd/lemo-utils.svg?branch=master)](https://travis-ci.org/LemoFoundationLtd/lemo-utils)
[![code coverage](https://img.shields.io/coveralls/LemoFoundationLtd/lemo-utils.svg?style=flat-square)](https://coveralls.io/github/LemoFoundationLtd/lemo-utils)
[![GitHub license](https://img.shields.io/badge/license-LGPL3.0-blue.svg?style=flat-square)](https://github.com/LemoFoundationLtd/lemo-utils/blob/master/LICENSE)

#### address
- pubKeyToAddress
- privateKeyToAddress
- verifyAddress
- isLemoAddress
- isTempAddress
- isContractAddress
- createTempAddress
- encodeAddress
- decodeAddress
- generateAccount

#### amount
- formatLEMO
- lemoToMo
- moToLemo

#### buffer
- toBuffer
- bufferTrimLeft
- setBufferLength

#### crypto
- sign
- recover
- sha3
- privateToPublicKey

#### hex
- has0xPrefix
- decodeUtf8Hex
- toHexStr

#### rlp
- rlpEncode
- rlpDecode
