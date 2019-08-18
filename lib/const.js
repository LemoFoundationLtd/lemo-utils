// The length of hex address bytes (without checksum)
export const ADDRESS_BYTE_LENGTH = 20
// The alphabet for base26 algorithm for Lemo address encoding
export const ADDRESS_ALPHABET = '83456729ABCDFGHJKNPQRSTWYZ'
// All Lemo address with be start with this logo
export const ADDRESS_LOGO = 'Lemo'
// 创建临时账户时，从from截取出来的十六进制字符串长度
export const TEMP_SENDER_LENGTH = 18
// 创建临时账户时，userID十六进制字符串的长度
export const TEMP_USER_ID_LENGTH = 20

// secp256k1 public key
export const AddressType = {
    NORMAL: 1,
    // 合约账户的标识
    CONTRACT: 2,
    // 临时账户的标识
    TEMP: 3,
}
