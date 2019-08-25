export default {
    EC_PRIVATE_KEY_TYPE_INVALID: 'private key should be a Buffer',
    EC_PRIVATE_KEY_LENGTH_INVALID: 'private key length is invalid',
    EC_PUBLIC_KEY_CREATE_FAIL: 'private was invalid try again',
    ECDSA_SIGNATURE_TYPE_INVALID: 'signature should be a Buffer',
    ECDSA_SIGNATURE_LENGTH_INVALID: 'signature length is invalid',
    ECDSA_SIGNATURE_PARSE_FAIL: 'couldn\'t parse signature',
    ECDSA_SIGN_FAIL: 'nonce generation function failed or private key is invalid',
    ECDSA_RECOVER_FAIL: 'couldn\'t recover public key from signature',
    MSG32_TYPE_INVALID: 'message should be a Buffer',
    MSG32_LENGTH_INVALID: 'message length is invalid',
    RECOVERY_ID_TYPE_INVALID: 'recovery should be a Number',
    RECOVERY_ID_VALUE_INVALID: 'recovery should have value between -1 and 4',
}
