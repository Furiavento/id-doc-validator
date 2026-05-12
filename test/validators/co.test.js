import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { validateCC, validateCE, validateNIT } from '../../src/validators/co.js'

describe('validateCC', () => {
  it('acepta 6 dígitos', () => assert.equal(validateCC('123456'), true))
  it('acepta 10 dígitos', () => assert.equal(validateCC('1234567890'), true))
  it('rechaza 5 dígitos', () => assert.equal(validateCC('12345'), false))
  it('rechaza 11 dígitos', () => assert.equal(validateCC('12345678901'), false))
  it('rechaza letras', () => assert.equal(validateCC('12345a'), false))
  it('rechaza vacío', () => assert.equal(validateCC(''), false))
})

describe('validateCE', () => {
  it('acepta 4 caracteres alfanuméricos', () => assert.equal(validateCE('ab12'), true))
  it('acepta 12 caracteres', () => assert.equal(validateCE('abc123def456'), true))
  it('acepta mayúsculas', () => assert.equal(validateCE('ABC123'), true))
  it('rechaza 3 caracteres', () => assert.equal(validateCE('ab1'), false))
  it('rechaza 13 caracteres', () => assert.equal(validateCE('abcdefghijklm'), false))
  it('rechaza caracteres especiales', () => assert.equal(validateCE('ab-12'), false))
})

describe('validateNIT', () => {
  it('acepta NIT válido', () => assert.equal(validateNIT('800197268-4'), true))
  it('rechaza dígito verificador incorrecto', () => assert.equal(validateNIT('800197268-9'), false))
  it('rechaza NIT sin guión', () => assert.equal(validateNIT('8001972684'), false))
  it('rechaza NIT vacío', () => assert.equal(validateNIT(''), false))
})
