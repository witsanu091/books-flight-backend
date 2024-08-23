process.env.DEBTACQ_KEY = 'test';
jest.mock('../../lib/security/Encryption', () => {
  return jest.fn().mockImplementation(() => {
    return {
      encrypt256cbc: jest.fn().mockImplementation((expected) => {
        return JSON.stringify(expected);
      }),
      decrypt256cbc: jest.fn().mockImplementation((expected) => {
        return JSON.stringify(expected);
      }),
    };
  });
});

const { decryptCBC256, encryptCBC256 } = require('../tools/encryptionField');

describe('encryptionField', () => {
  describe('Case sucess', () => {
    test('should returned sucess decryptCBC256', async () => {
      const expected = {
        key_search: '12345',
      };
      const received = decryptCBC256(expected, 'key');
      expect(JSON.parse(received)).toEqual(expected);
    });

    test('should returned sucess encryptCBC256', async () => {
      const expected = {
        key_search: '12345',
      };
      const received = encryptCBC256(expected, 'key');
      expect(JSON.parse(received)).toEqual(expected);
    });
  });
});
