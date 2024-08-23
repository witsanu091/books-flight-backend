const { encrypt, decrypt } = require('../encryption');

test('Helper encryption', () => {
  const AES = 'j4EwTjgS3Y3jMFsbvLAJU5xcGloRU4SaM+1I29/MR1Y=';
  const keyAes = Buffer.from(AES, 'base64');
  const text = 'TCRBANK';
  const textEn = 'de3550fd8dd032d16efbb59067e44d19';
  const encryptText = encrypt(text, keyAes);
  console.log(
    '🚀 ~ file: encryption.test.js:9 ~ describe ~ encryptText:',
    encryptText,
  );
  expect(encryptText).toBe(textEn);
  const decryptText = decrypt(encryptText, keyAes);
  expect(decryptText).toBe(text);
});
