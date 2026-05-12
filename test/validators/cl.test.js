import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { validateRUT, validateRUN } from '../../src/validators/cl.js'

describe('validateRUT', () => {
  it('acepta RUT válido con dígito numérico', () => assert.equal(validateRUT('76354771-K'), true))
  it('acepta RUT con dígito K en minúscula', () => assert.equal(validateRUT('76354771-k'), true))
  it('rechaza dígito verificador incorrecto', () => assert.equal(validateRUT('76354771-5'), false))
  it('rechaza RUT sin guión', () => assert.equal(validateRUT('76354771K'), false))
  it('rechaza RUT vacío', () => assert.equal(validateRUT(''), false))
})

describe('validateRUN', () => {
  it('es un alias de validateRUT', () => assert.equal(validateRUN, validateRUT))
  it('valida igual que validateRUT', () => assert.equal(validateRUN('76354771-K'), true))
})
