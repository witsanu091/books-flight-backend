const partnerSecretValue = {
  API_KEY: '1651c8d7a5a55af8d72c00d3e6ca4d71',
  Secret: '308f2f6026d249f1892c4e632517e56f',
  AES: '15bef7d9b753afe6d0236d5f92b2b7d7',
  Code: 'bof',
  RequestCode: 'bof-request',
};

jest.mock('../../helper/SecretsManager', () => {
  return jest.fn().mockImplementation(() => {
    return {
      getSecretString: jest.fn().mockImplementation((partnerCodeKey) => {
        if (partnerCodeKey === 'DAQ/KEY/BOF') return partnerSecretValue;
        return undefined;
      }),
    };
  });
});

jest.mock('../../security/Encryption', () => {
  return jest.fn().mockImplementation(() => {
    return {
      HmacSHA256: jest.fn().mockImplementation((key = '', text = '') => {
        return `${key}+${text}`;
      }),
      HmacSHA256ToHex: jest.fn().mockImplementation((key = '', text = '') => {
        return `${key}+${text}`;
      }),
      decrypt256ecb: jest.fn().mockImplementation((key = '', text = '') => {
        return `${key}+${text}`;
      }),
      encrypt256ecb: jest.fn().mockImplementation((key = '', text = '') => {
        return `${key}+${text}`;
      }),
    };
  });
});

jest.mock('https', () => {
  return {
    Agent: jest.fn().mockReturnValue({}),
  };
});

jest.mock('uuid', () => ({ v4: () => '123456789' }));

const {
  _getSecretesKeyPartner,
  generateRequestParams,
} = require('../buildRequestParams');

describe('Build Request Params API', () => {
  describe('Case sucess', () => {
    beforeEach(() => {
      jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);
      jest.useFakeTimers().setSystemTime(new Date('2022-01-17'));
    });

    afterEach(() => {
      jest.spyOn(global.Math, 'random').mockRestore();
    });
    test('should returned sucess get secrete value ', async () => {
      const expected = partnerSecretValue;
      const received = await _getSecretesKeyPartner('BOF');
      expect(received).toEqual(expected);
    });
    test('should returned sucess generate request params ', async () => {
      const expected = {
        method: 'POST',
        url: 'DOMAINPATH',
        headers: {
          'x-api-key': '1651c8d7a5a55af8d72c00d3e6ca4d71',
          'x-api-uuidv4': '1234567891642377600',
          'x-api-signature':
            'bof308f2f6026d249f1892c4e632517e56f+1642377600+123456789+1651c8d7a5a55af8d72c00d3e6ca4d71+bof-request+POSTPATH123456789',
          'x-apigw-api-id': 'GATEWAY',
          origin: 'DOMAIN',
        },
        httpsAgent: {},
        timeout: 10000,
        responseType: 'json',
        data: '"BODY"+15bef7d9b753afe6d0236d5f92b2b7d7',
        params: {},
      };
      const received = generateRequestParams({
        partnerSecretValue,
        GATEWAY: 'GATEWAY',
        METHOD: 'POST',
        DOMAIN: 'DOMAIN',
        PATH: 'PATH',
        BODY: 'BODY',
      });
      expect(received).toEqual(expected);
    });
  });
});
