const { expect } = require('chai'),
  concreteUtils = require('../../../lib/swaggerUtils/schemaUtilsSwagger'),
  fs = require('fs'),
  validSwaggerFolder = './test/data/valid_swagger',
  invalidSwaggerFolder = './test/data/invalid_swagger';

describe('parseSpec method', function () {
  it('should return true and a parsed specification', function () {
    let fileContent = fs.readFileSync(validSwaggerFolder + '/json/sampleswagger.json', 'utf8');
    const parsedSpec = concreteUtils.parseSpec(fileContent, {});
    expect(parsedSpec.result).to.be.true;
    expect(parsedSpec.openapi.swagger).to.equal('2.0');
  });

  it('should return false and info must have a title message', function () {
    let fileContent = fs.readFileSync(invalidSwaggerFolder + '/invalid_no_info_title.json', 'utf8');
    const parsedSpec = concreteUtils.parseSpec(fileContent, {});
    expect(parsedSpec.result).to.be.false;
    expect(parsedSpec.reason).to.equal('The info property must have title and version defined');
  });

  it('should return false and swagger must have info object message', function () {
    let fileContent = fs.readFileSync(invalidSwaggerFolder + '/invalid_no_info.json', 'utf8');
    const parsedSpec = concreteUtils.parseSpec(fileContent, {});
    expect(parsedSpec.result).to.be.false;
    expect(parsedSpec.reason).to.equal('The Swagger object must have an \"info\" property');
  });

  it('should return false and invalid version message', function () {
    let fileContent = fs.readFileSync(invalidSwaggerFolder + '/invalid_wrong_swagger_version.json', 'utf8');
    const parsedSpec = concreteUtils.parseSpec(fileContent, {});
    expect(parsedSpec.result).to.be.false;
    expect(parsedSpec.reason).to.equal('The Swagger object must have the \"swagger\" property set to 2.0');
  });

  it('should return false and no paths message', function () {
    let fileContent = fs.readFileSync(invalidSwaggerFolder + '/invalid_no_paths.json', 'utf8');
    const parsedSpec = concreteUtils.parseSpec(fileContent, {});
    expect(parsedSpec.result).to.be.false;
    expect(parsedSpec.reason).to.equal('The Swagger object must have a "paths" property');
  });
});
