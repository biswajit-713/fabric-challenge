import { EmployeeListPage } from "../pages/employeelist.page";
import { AddEmployeePage } from "../pages/addemployee.page";
import { EmployeeDetailsPage } from "../pages/employeedetails.page";

export class PimModule {
    constructor(page) {
        this.page = page;
        this.employeeListPage = new EmployeeListPage(page);
        this.addEmployeePage = new AddEmployeePage(page);
        this.employeeDetailsPage = new EmployeeDetailsPage(page);
    }

    async addEmployee(employee) {
        await this.employeeListPage.launchAddEmployee();
        await this.addEmployeePage.add(employee);
    }

    async assertEmployeeCreated(employee) {
        await this.employeeListPage.assertEmployeeCreated(employee);
    }

    async updateEmployeeInfo(employee) {
        await this.employeeListPage.navigateToEmployeeDetails(employee);
        await this.employeeDetailsPage.updatePersonalInfo(employee.personalInfo);
        await this.employeeDetailsPage.updateJob(employee.jobDetails);
    }

    async assertEmployeeUpdated(employee) {
        await this.employeeListPage.assertEmployeeUpdated(employee);
    }
}