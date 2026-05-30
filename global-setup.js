const { writeFileSync } = require('fs');
const { join } = require('path');

module.exports = async function globalSetup() {
  const employeeId = `${Math.floor(Date.now() / 1000)}`;
  writeFileSync(join(process.cwd(), '.run-state.json'), JSON.stringify({ employeeId }), 'utf8');
};
