const crypto = require('crypto');
const { promisify } = require('util');
const crypto_random_bytes = promisify(crypto.randomBytes);

module.exports = generate_hex_code;

async function generate_hex_code(byte_length) {
    const buffer = await crypto_random_bytes(byte_length);
    const code = buffer.toString('hex');
    return code;
}
