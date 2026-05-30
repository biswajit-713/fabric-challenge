import { test as base, expect } from "@playwright/test";
import { fixtureEmployee, apiAuth } from "../data/testdata.json";

const runEmployee = { ...fixtureEmployee, id: process.env.EMPLOYEE_ID ?? `${Math.floor(Date.now() / 1000)}` };

export const test = base.extend({
  bearerToken: async ({}, use) => {
    await use(apiAuth.bearerToken);
  },

  newEmployee: async ({}, use) => {
    await use(runEmployee);
  },
});

export { expect };
