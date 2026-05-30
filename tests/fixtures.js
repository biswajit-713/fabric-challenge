import { test as base, expect } from "@playwright/test";
import { fixtureEmployee, apiAuth } from "../data/testdata.json";
import { readFileSync } from "fs";
import { join } from "path";

let runId;
try {
  const state = JSON.parse(readFileSync(join(process.cwd(), ".run-state.json"), "utf8"));
  runId = state.employeeId;
} catch {
  runId = `${Math.floor(Date.now() / 1000)}`;
}

const runEmployee = { ...fixtureEmployee, id: runId };

export const test = base.extend({
  bearerToken: async ({}, use) => {
    await use(apiAuth.bearerToken);
  },

  newEmployee: async ({}, use) => {
    await use(runEmployee);
  },
});

export { expect };
