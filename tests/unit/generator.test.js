const { loadSpec, extractContracts } = require('../../src/generator');
const path = require('path');

const specPath = path.join(__dirname, '../../openapi/petstore.yaml');

describe('Contract Generator - Unit Tests', () => {
  let spec;

  beforeAll(() => {
    spec = loadSpec(specPath);
  });

  test('should load the OpenAPI spec successfully', () => {
    expect(spec).toBeDefined();
    expect(spec.openapi || spec.swagger).toBeDefined();
  });

  test('should have paths defined in the spec', () => {
    expect(spec.paths).toBeDefined();
    expect(Object.keys(spec.paths).length).toBeGreaterThan(0);
  });

  test('should extract contracts from spec', () => {
    const contracts = extractContracts(spec);
    expect(Array.isArray(contracts)).toBe(true);
    expect(contracts.length).toBeGreaterThan(0);
  });

  test('each contract should have required fields', () => {
    const contracts = extractContracts(spec);
    contracts.forEach(c => {
      expect(c).toHaveProperty('route');
      expect(c).toHaveProperty('method');
      expect(c).toHaveProperty('responses');
    });
  });

  test('should only include valid HTTP methods', () => {
    const contracts = extractContracts(spec);
    const validMethods = ['GET','POST','PUT','DELETE','PATCH'];
    contracts.forEach(c => {
      expect(validMethods).toContain(c.method);
    });
  });
});