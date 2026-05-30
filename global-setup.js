module.exports = async function globalSetup() {
  process.env.EMPLOYEE_ID = `${Math.floor(Date.now() / 1000)}`;
};
