/**
 * @author: Jeb.Wang
 * @date: 2023/1/1 12:39
 */
const cookie = require('cookie');
const _ = require('lodash');

const httpUtil = require('src/utils/http-util');

describe('test serializeCookiesToString', () => {
    it('should return an empty string for empty object', () => {
        const expected = '';

        const actual = httpUtil.serializeCookiesToString(null);
        const actual1 = httpUtil.serializeCookiesToString('');
        const actual2 = httpUtil.serializeCookiesToString({});

        expect(actual).toBe(expected);
        expect(actual1).toBe(expected);
        expect(actual2).toBe(expected);
    });

    it('should return serialized string for non-empty object', () => {
        const cookies = {
            name: 'alpha',
            liked_humor: [1, 2]
        };
        const expected = `name=alpha;liked_humor=1%2C2`;
        const actual = httpUtil.serializeCookiesToString(cookies);

        expect(actual).toBe(expected);
    });
});
