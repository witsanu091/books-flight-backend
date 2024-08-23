/* eslint-disable import/no-extraneous-dependencies */
const {
  SecretsManagerClient,
  GetSecretValueCommand,
  CreateSecretCommand,
  PutSecretValueCommand,
  UpdateSecretCommand,
  DeleteSecretCommand,
} = require('@aws-sdk/client-secrets-manager');

const { mockClient } = require('aws-sdk-client-mock');
const { faker } = require('@faker-js/faker');

const SecretsManager = require('../SecretsManager');

const client = new SecretsManagerClient({
  region: 'ap-southeast-1',
});

describe('AWS Secrets Manager', () => {
  describe('Case sucess', () => {
    const clientMock = mockClient(client);
    const secretMock = new SecretsManager(clientMock);

    beforeEach(() => {});

    afterEach(() => {
      jest.clearAllMocks();
    });
    test('should returned sucess Create secrete ', async () => {
      const expected = { my_cat_name: faker.animal.cat() };
      clientMock.on(CreateSecretCommand).resolves(expected);
      const received = await secretMock.createSecret('secreteName', expected);
      expect(received).toEqual(expected);
    });

    test('should returned sucess Put secrete ', async () => {
      const secreteValue = { cat_name_1: 'Somwang' };
      const expected = { cat_name_2: faker.animal.cat() };
      clientMock.on(GetSecretValueCommand).resolves({
        SecretString: JSON.stringify(secreteValue),
      });
      clientMock
        .on(PutSecretValueCommand)
        .resolves({ ...expected, ...secreteValue });
      const received = await secretMock.putSecertString('secreteName', {
        ...expected,
      });
      expect(received).toEqual({ ...secreteValue, ...expected });
    });

    test('should returned sucess Update secrete ', async () => {
      const expected = { cat_name_2: faker.animal.cat() };
      clientMock.on(UpdateSecretCommand).resolves(expected);
      const received = await secretMock.updateSecertString(
        'secreteName',
        expected,
      );
      expect(received).toEqual(expected);
    });

    test('should returned sucess Get secrete string response all ', async () => {
      const expected = { my_secret_key: faker.string.uuid() };
      clientMock.on(GetSecretValueCommand).resolves({
        SecretString: JSON.stringify(expected),
      });
      const received = await secretMock.getSecretStringResponseAll(
        'secreteName',
      );
      expect(received.SecretString).toEqual(JSON.stringify(expected));
    });

    test('should returned sucess Get secrete string plaintext ', async () => {
      const expected = faker.string.uuid();
      clientMock.on(GetSecretValueCommand).resolves({
        SecretString: expected,
      });
      const received = await secretMock.getSecretStringPlaintext('secreteName');
      expect(received).toBe(expected);
    });

    test('should returned sucess Get secrete string ', async () => {
      const expected = { my_secret_key: faker.string.uuid() };
      clientMock.on(GetSecretValueCommand).resolves({
        SecretString: JSON.stringify(expected),
      });
      const received = await secretMock.getSecretString('secreteName');
      expect(received).toEqual(expected);
    });

    test('should returned sucess Delete secrete ', async () => {
      const expected = 'success';
      clientMock.on(DeleteSecretCommand).resolves(expected);
      const received = await secretMock.deleteSecretString('secreteName');
      expect(received).toEqual(expected);
    });
  });

  describe('Case error', () => {
    const clientMock = mockClient(client);
    const secretMock = new SecretsManager(clientMock);
    beforeEach(() => {});

    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should returned error Create secrete ', async () => {
      clientMock.on(CreateSecretCommand).rejects(new Error('error'));
      const received = await secretMock
        .createSecret('secreteName', {})
        .catch((error) => error.message);
      expect(received).toEqual('error');
    });

    test('should returned error Put secrete ', async () => {
      clientMock.on(GetSecretValueCommand).rejects(new Error('error'));
      clientMock.on(PutSecretValueCommand).rejects(new Error('error'));
      const received = await secretMock
        .putSecertString('secreteName', {})
        .catch((error) => error.message);
      expect(received).toEqual('error');
    });

    test('should returned error Update secrete ', async () => {
      clientMock.on(UpdateSecretCommand).rejects(new Error('error'));
      const received = await secretMock
        .updateSecertString('secreteName', {})
        .catch((error) => error.message);
      expect(received).toEqual('error');
    });

    test('should returned error Get secrete string response all ', async () => {
      clientMock.on(GetSecretValueCommand).rejects(new Error('error'));
      const received = await secretMock
        .getSecretStringResponseAll('secreteName', {})
        .catch((error) => error.message);
      expect(received).toEqual('error');
    });

    test('should returned error Get secrete string plaintext ', async () => {
      clientMock.on(GetSecretValueCommand).rejects(new Error('error'));
      const received = await secretMock
        .getSecretStringPlaintext('secreteName', {})
        .catch((error) => error.message);
      expect(received).toEqual('error');
    });

    test('should returned error Get secrete string ', async () => {
      clientMock.on(GetSecretValueCommand).rejects(new Error('error'));
      const received = await secretMock
        .getSecretString('secreteName', {})
        .catch((error) => error.message);
      expect(received).toEqual('error');
    });

    test('should returned error Delete secrete ', async () => {
      clientMock.on(DeleteSecretCommand).rejects(new Error('error'));
      const received = await secretMock
        .deleteSecretString('secreteName', {})
        .catch((error) => error.message);
      expect(received).toEqual('error');
    });
  });
});
