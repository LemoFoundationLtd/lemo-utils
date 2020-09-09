# Lemo-utils

A collection of utility functions for Lemochain

[![npm](https://img.shields.io/npm/v/lemo-utils.svg?style=flat-square)](https://www.npmjs.com/package/lemo-utils)
[![Build Status](https://travis-ci.org/LemoFoundationLtd/lemo-utils.svg?branch=master)](https://travis-ci.org/LemoFoundationLtd/lemo-utils)
[![code coverage](https://img.shields.io/coveralls/LemoFoundationLtd/lemo-utils.svg?style=flat-square)](https://coveralls.io/github/LemoFoundationLtd/lemo-utils)
[![GitHub license](https://img.shields.io/badge/license-LGPL3.0-blue.svg?style=flat-square)](https://github.com/LemoFoundationLtd/lemo-utils/blob/master/LICENSE)

#### address
- [pubKeyToAddress](#pubKeyToAddress)
- [privateKeyToAddress](#privateKeyToAddress)
- [verifyAddress](#verifyAddress)
- [isLemoAddress](#isLemoAddress)
- [isTempAddress](#isTempAddress)
- [isContractAddress](#isContractAddress)
- [createTempAddress](#createTempAddress)
- [encodeAddress](#encodeAddress)
- [decodeAddress](#decodeAddress)
- [generateAccount](#generateAccount)

#### amount
- [formatLEMO](#formatLEMO)
- [lemoToMo](#lemoToMo)
- [moToLemo](#moToLemo)


#### buffer
- [toBuffer](#toBuffer)
- [isBuffer](#isBuffer)
- [bufferTrimLeft](#bufferTrimLeft)
- [setBufferLength](#setBufferLength)


#### crypto
- [sign](#sign)
- [recover](#recover)
- [sha3](#sha3)
- [privateToPublicKey](#privateToPublicKey)


#### hex
- [has0xPrefix](#has0xPrefix)
- [decodeUtf8Hex](#decodeUtf8Hex)
- [toHexStr](#toHexStr)

#### rlp
- [rlpEncode](#rlpEncode)
- [rlpDecode](#rlpDecode)

#### base64
- [base64Encode](#base64Encode)
- [base64Decode](#base64Decode)

### address

---

<a name="pubKeyToAddress"></a>

#### pubKeyToAddress
```
pubKeyToAddress(pubKey)
```
公钥生成地址

##### Parameters
0. `Buffer` - Buffer类型的公钥

##### Returns
`string` - 生成Lemo地址

---

<a name="privateKeyToAddress"></a>

#### privateKeyToAddress
```
privateKeyToAddress(privKey)
```
通过私钥得到公钥，然后用公钥生成地址

##### Parameters
0. `string|Buffer` - 私钥

##### Returns
`string` - 生成Lemo地址

---

<a name="verifyAddress"></a>

#### verifyAddress
```
verifyAddress(address)
```
校验生成的地址

##### Parameters
0. `string` - 地址

##### Returns
`string` - 如果地址正确返回空值，反之返回错误信息

---

<a name="isLemoAddress"></a>

#### isLemoAddress
```
isLemoAddress(addr)
```
用来校验是否是lemochain上面的地址，通常是以`Lemo`为地址的头四位

##### Parameters
0. `string` - 地址

##### Returns
`Boolean` - 返回`Boolean`

---

<a name="isTempAddress"></a>

#### isTempAddress
```
isTempAddress(address)
```
判断当前账户是否为临时账户

##### Parameters
0. `string` - 地址

##### Returns
`Boolean` - 返回`Boolean`

---

<a name="isContractAddress"></a>

#### isContractAddress
```
isContractAddress(address)
```
判断当前账户是否为合约账户

##### Parameters
0. `string` - 地址

##### Returns
`Boolean` - 返回`Boolean`

---

<a name="createTempAddress"></a>

#### createTempAddress
```
createTempAddress(from, userId)
```
创建临时账户

##### Parameters
0. `string` - 需要创建临时账户的地址
1. `ustring` - 用户设置的id

##### Returns
`string` - 临时账户的地址

---

<a name="encodeAddress"></a>

#### encodeAddress
```
encodeAddress(data)
```
将十六进制的地址转换为`Lemo`开头的地址

##### Parameters
0. `string|Buffer` - 需要转换的十六进制地址

##### Returns
`string` - 以`Lemo`开头的地址

---

<a name="decodeAddress"></a>

#### decodeAddress
```
decodeAddress(address)
```
将`Lemo`开头的地址转换为十六进制的地址

##### Parameters
0. `string` - `Lemo`开头的地址

##### Returns
`string` - 十六进制的地址

---

<a name="generateAccount"></a>

#### generateAccount
```
generateAccount()
```
创建账户

##### Parameters
无

##### Returns
`object` - 带有账户和私钥的地址，包括：
    - `privateKey` 私钥
    - `address` 以`Lemo`开头的地址

### amount

---

<a name="formatLEMO"></a>

#### formatLEMO
```
formatLEMO(mo)
```
规范LEMO的单位

##### Parameters
0. `string` - 金额，单位`mo`

##### Returns
`string` - 返回计算之后的结果

---

<a name="moToLemo"></a>

#### moToLemo
```
moToLemo(mo)
```
将单位从mo转换为LEMO的金额

##### Parameters
0. `number|string` - 金额，单位为`mo`

##### Returns
`BigNumber` - 返回计算之后的金额

---

<a name="lemoToMo"></a>

#### lemoToMo
```
lemoToMo(ether)
```
将单位从LEMO的金额转换为mo

##### Parameters
0. `string` - 金额，单位为`LEMO`

##### Returns
`BigNumber` - 返回计算之后的金额


### Buffer

---

<a name="toBuffer"></a>

#### toBuffer
```
toBuffer(v)
```
将不同数据类型的数据转换成Buffer类型的二进制字节流

##### Parameters
0. `string|Array|object|number|bigNumber|Buffer` - 需要转换的数据

##### Returns
`Buffer` - 得到的Buffer类型的数据

---

<a name="isBuffer"></a>

#### isBuffer
```
isBuffer(v)
```
检测传入的值是否是Buffer类型

##### Parameters
0. `*` - 需要检测的数据

##### Returns
`bool` - 是否是Buffer类型的数据

---

<a name="hexStringToBuffer"></a>

#### hexStringToBuffer
```
hexStringToBuffer(hex)
```
将十六进制的字符串转换成Buffer类型的二进制字节流

##### Parameters
0. `string` - 需要转换的十六进制字符串

##### Returns
`Buffer` - 得到的Buffer类型的数据

---

<a name="bufferTrimLeft"></a>

#### bufferTrimLeft
```
bufferTrimLeft(buffer)
```
删去Buffer类型的二进制字节流左边连续的0

##### Parameters
0. `Buffer` - 需要转换的数据

##### Returns
`Buffer` - 整理后的Buffer类型的数据

---

<a name="setBufferLength"></a>

#### setBufferLength
```
setBufferLength(buffer, length, right)
```
将buffer设置为固定的长度

##### Parameters
0. `Buffer` - Buffer类型的数据
1. `string` - 长度
2. `boolean` - 如果传入的buffer长度不足，是否从右边补0

##### Returns
`Buffer` - 整理后的Buffer类型的数据

### crypto

---

<a name="sign"></a>

#### sign
```
sign(privateKey, hash)
```
对hash进行签名

##### Parameters
0. `Buffer` - Buffer类型的私钥数据
1. `Buffer` - Buffer类型的交易hash值

##### Returns
`Buffer` - Buffer类型的签名值

---

<a name="recover"></a>

#### recover
```
recover(hash, sig)
```
通过hash和签名恢复公钥

##### Parameters
0. `Buffer` - Buffer类型的私钥数据
1. `Buffer` - Buffer类型的交易hash值

##### Returns
`Buffer|null` - 如果成功得到的Buffer类型的公钥，反之为null

---

<a name="sha3"></a>

#### sha3
```
function sha3(data)
```
hash算法

##### Parameters
0. `Buffer` - buffer数据

##### Returns
`Buffer` - 加密之后的buffer

---

<a name="privateToPublicKey"></a>

#### privateToPublicKey
```
privateToPublicKey(privKey)
```
通过私钥得到公钥

##### Parameters
0. `string|Buffer` - 私钥

##### Returns
`Buffer` - 得到的公钥的buffer值

### hex

---

<a name="has0xPrefix"></a>

#### has0xPrefix
```
has0xPrefix(str)
```
检验一个十六进制字符串是否以0x开头

##### Parameters
0. `string` - 十六进制字符串

##### Returns
`Boolean` - 返回Boolean值

---

<a name="decodeUtf8Hex"></a>

#### decodeUtf8Hex
```
decodeUtf8Hex(hex)
```
将一个十六进制字符串以utf格式进行解码

##### Parameters
0. `string` - 十六进制字符串

##### Returns
`string` - 解析出的数据

---

<a name="toHexStr"></a>

#### toHexStr
```
toHexStr(data)
```
将字符串或者buffer数据转换成十六进制字符串

##### Parameters
0. `string|Buffer` - 需要转换的数据

##### Returns
`string` - 十六进制字符串


### rlp

---

<a name="rlpEncode"></a>

#### rlpEncode
```
rlpEncode(input)
```
使用rlp算法进行编码

##### Parameters
0. `string|Buffer|Array|number` - 需要编码的数据

##### Returns
`Buffer` - 编码后的Buffer数据对象

---

<a name="rlpDecode"></a>

#### rlpDecode
```
rlpDecode(input, stream)
```
使用rlp算法进行解码

##### Parameters
0. `string|Buffer|Array|number` - 需要解码的数据
1. `bool` - `stream`是否是一个流，这种情况下`input`末尾会存在一些无法解析的数据

##### Returns
`Array` - 解码出的数据

---

<a name="getLength"></a>

#### getLength
```
getLength(input)
```
获取长度，输入需要获取长度的数据，然后返回此数据的长度



---


### base64

---

<a name="base64Encode"></a>

#### base64Encode
```
base64Encode(input, uriSafe, isHex)
```
使用base64算法进行编码

##### Parameters
0. `string` - 需要编码的字符串
1. `uriSafe` - 是否需要编码为uri安全的字符串
2. `isHex` - `input`是否是一个十六进制字符串

##### Returns
`string` - 编码后的字符串

---

<a name="base64Decode"></a>

#### base64Decode
```
base64Decode(input, isHex)
```
使用base64算法进行解码

##### Parameters
0. `string` - 需要解码的字符串
2. `isHex` - 解码后是否是一个十六进制字符串

##### Returns
`string` - 解码后的字符串

---
