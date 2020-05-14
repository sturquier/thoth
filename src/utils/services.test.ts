import { createHttpRequest } from './services'

describe('Services util', () => {
  describe('createHttpRequest()', () => {
    it('should return a correct Promise', () => {
      const url = '/foo/bar'
      const options = {
        method: 'GET',
        params: {}
      }
      const token = 'a1b2c3'

      expect(createHttpRequest(url, options, token)).toBeInstanceOf(Promise)
    })
  })
})
