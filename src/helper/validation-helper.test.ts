import React from 'react'
import ValidationHelper from './validation-helper'

describe('ValidationHelper', () => {
    it('should parse and return parsed number', () => {
        //Arrange
        const expectedValue = 5

        //Act & Assert
        expect(ValidationHelper.tryParseInt(expectedValue.toString(), 0)).toEqual(expectedValue)
    })

    it('should fail to parse and return default value', () => {
        //Arrange
        const defaultValue = 0

        //Act & Assert
        expect(ValidationHelper.tryParseInt('abc', 0)).toBe(defaultValue)
        expect(ValidationHelper.tryParseInt('', 0)).toBe(defaultValue)
        expect(ValidationHelper.tryParseInt(null, 0)).toBe(defaultValue)
        expect(ValidationHelper.tryParseInt(undefined, 0)).toBe(defaultValue)
    })
})