const Encryption = require('../Encryption');

const encryption = new Encryption();

describe('Encryption Test Case', () => {
  describe('Success Case', () => {
    const originalData = 'Hello';
    const key = 'b886da7791e108adce12901edb591657';
    test('1. Encrypt & Decrypt 256 gcm ', async () => {
      expect(
        encryption.decrypt256gcm(
          encryption.encrypt256gcm(originalData, key),
          key,
        ),
      ).toBe(originalData);
    });
    test('2. Encrypt & Decrypt 256 ecb ', async () => {
      expect(
        encryption.decrypt256ecb(
          encryption.encrypt256ecb(originalData, key),
          key,
        ),
      ).toBe(originalData);
    });
    test('3. Encrypt HmacSHA256 to Base64 ', async () => {
      const received = encryption.HmacSHA256(key, originalData);
      expect(received.toString('base64')).toBe(
        '1IoqLtjrFsAJRSW5wxRbbzUk7DvD7B2VQ5s7fNz6waA=',
      );
    });
    test('4. Encrypt HmacSHA256 to Hex ', async () => {
      const received = encryption.HmacSHA256ToHex(key, originalData);
      expect(received).toBe(
        'd48a2a2ed8eb16c0094525b9c3145b6f3524ec3bc3ec1d95439b3b7cdcfac1a0',
      );
    });
  });
});
