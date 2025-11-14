/**
 * Basic test to verify Jest setup is working
 */

describe('Basic test setup', () => {
  test('should pass a simple test', () => {
    expect(1 + 1).toBe(2)
  })

  test('should handle async operations', async () => {
    const result = await Promise.resolve(42)
    expect(result).toBe(42)
  })

  test('should have mock functions available', () => {
    const mockFn = jest.fn()
    mockFn('test')
    expect(mockFn).toHaveBeenCalledWith('test')
  })
})