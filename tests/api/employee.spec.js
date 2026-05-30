import { test, expect } from "../fixtures";

test.describe("Employee validation through OrangeHRM api", () => {
  let apiContext;

  test.beforeEach(async ({ playwright, bearerToken }) => {
    apiContext = await playwright.request.newContext({
      baseURL: "https://opensource-demo.orangehrmlive.com",
      extraHTTPHeaders: {
        accept: "application/json",
        authorization: `Bearer ${bearerToken}`,
      },
    });
  });

  test.afterEach(async () => {
    await apiContext.dispose();
  });

  test("should validate employee details and job title", async ({ newEmployee }) => {
    const limit = 50;
    let offset = 0;
    let employee;

    do {
      const listResponse = await apiContext.get("/web/index.php/api/v2/pim/employees", {
        params: { limit, offset },
      });
      expect(listResponse.status()).toBe(200);

      const body = await listResponse.json();
      employee = body.data.find((e) => e.employeeId === newEmployee.id);

      if (employee) break;
      offset += limit;

      if (offset >= body.meta.total) break;
    } while (true);

    // validate employee name
    expect(employee, `employee ${newEmployee.id} not found`).toBeDefined();
    expect(employee.employeeId).toBe(newEmployee.id);
    expect(employee.firstName).toBe(newEmployee.firstName);
    expect(employee.lastName).toBe(newEmployee.lastName);

    // validate job title
    const jobResponse = await apiContext.get(
      `/web/index.php/api/v2/pim/employees/${employee.empNumber}/job-details`
    );
    expect(jobResponse.status()).toBe(200);

    const { data: jobData } = await jobResponse.json();
    expect(jobData.jobTitle?.title).toBe(newEmployee.jobDetails.jobTitle);
  });
});
