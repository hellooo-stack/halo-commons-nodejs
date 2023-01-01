/**
 * @author: Jeb.Wang
 * @date: 2023/1/1 13:27
 */
const {
    isEmpty,
    isNotEmpty,
    isBlank,
    isNotBlank
} = require('src/utils/string-util');


describe('test isEmpty', () => {
    it('should return true for empty or not existed string', () => {
        const expected = true;

        expect(isEmpty(null)).toBe(expected);
        expect(isEmpty(undefined)).toBe(expected);
        expect(isEmpty('')).toBe(expected);
    });

    it('should return false for non-empty or existed string', () => {
        const expected = false;

        expect(isEmpty('hello')).toBe(expected);
        expect(isEmpty(' ')).toBe(expected);
    });
});

describe('test isNotEmpty', () => {
    it('should return true for non-empty string', () => {
        const expected = true;

        expect(isNotEmpty('hello')).toBe(expected);
        expect(isNotEmpty(' ')).toBe(expected);
    });

    it('should return false for empty string', () => {
        const expected = false;

        expect(isNotEmpty(null)).toBe(expected);
        expect(isNotEmpty(undefined)).toBe(expected);
        expect(isNotEmpty('')).toBe(expected);
    });
});

describe('test isBlank', () => {
    it('should return true for blank string', () => {
        const string = '   ';
        const expected = true;
        const actual = isBlank(string);

        expect(actual).toBe(expected);
    });

    it('should return false for non-blank string', () => {
        const string = 'hello';
        const expected = false;
        const actual = isBlank(string);

        expect(actual).toBe(expected);
    });
});

describe('test isNotBlank', () => {
    it('should return true for non-blank string', () => {
        const string = 'hello';
        const expected = true;
        const actual = isNotBlank(string);

        expect(actual).toBe(expected);
    });

    it('should return false for blank string', () => {
        const string = '   ';
        const expected = false;
        const actual = isNotBlank(string);

        expect(actual).toBe(expected);
    });
});
