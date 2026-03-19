const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

function loadSpec(filePath) {
  const ext = path.extname(filePath);
  const raw = fs.readFileSync(filePath, 'utf8');
  return ext === '.yaml' || ext === '.yml' ? yaml.load(raw) : JSON.parse(raw);
}

function extractContracts(spec) {
  const contracts = [];
  const paths = spec.paths || {};

  for (const [route, methods] of Object.entries(paths)) {
    for (const [method, details] of Object.entries(methods)) {
      if (['get','post','put','delete','patch'].includes(method)) {
        contracts.push({
          route,
          method: method.toUpperCase(),
          operationId: details.operationId || `${method}_${route}`,
          responses: Object.keys(details.responses || {}),
          parameters: details.parameters || [],
        });
      }
    }
  }
  return contracts;
}

module.exports = { loadSpec, extractContracts };