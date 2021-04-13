const generator = require('generate-password');

const generatePassword = () => generator.generate({ length: 6, numbers: true });

module.exports = generatePassword;
