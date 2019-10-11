export default {
    InvalidAddress: address => `Invalid LemoChain address ${address}`,
    InvalidAddressLength: address => `Invalid length of LemoChain address ${address}`,
    InvalidAddressType: address => `Invalid type of address ${address}, expected 'string' rather than '${typeof address}'`,
    InvalidHexAddress: address => `Invalid hex address ${address}`,
    InvalidAddressCheckSum: address => `Invalid address checksum ${address}`,
    DecodeAddressError: (address, errMsg) => `Decode address ${address} fail: ${errMsg}`,

    MoneyFormatError: () => 'The big number is in the wrong format',

    NotSupportedType: () => 'The type of input value is not supported',

    InvalidUserIdLength: () => 'The length of the userId cannot be more than 10',
    InvalidUserId: () => 'Invalid userID',
}
