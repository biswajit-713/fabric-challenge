import { test as base, expect } from "@playwright/test";
import { fixtureEmployee, apiAuth } from "../data/testdata.json";

export const test = base.extend({
  bearerToken: async ({}, use) => {
    await use(apiAuth.bearerToken);
  },

  newEmployee: async ({}, use) => {
    await use(fixtureEmployee);
  },
});

export { expect };
