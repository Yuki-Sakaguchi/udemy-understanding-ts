class Department {
  // readonly id: string;
  // name: string;
  // private employees: string[] = [];
  // constructor(n: string) {
  //   this.name = n;
  // }

  // フィールドと初期化が２じゅうになって面倒なので↓こんな感じで書ける
  static fiscalYear = 2020;
  protected employees: string[] = [];

  static createEmployee(name: string) {
    return { name: name }
  }

  constructor(private readonly id: string, public name: string) {}

  describe(this: Department) {
    console.log(`Department: ${this.id} ${this.name}`);
  }
  
  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployee() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// 継承
class ITDepartment extends Department {
  constructor(id: string, private admins: string[]) {
    super(id, 'IT');
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment; // シングルトン用

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('error');
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('値が正しくない');
    }
    this.addReport(value);
  }

  // シングルトン
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment('d2', []);
    return this.instance;
  }

  private constructor(id: string, private reports: string[]) {
    super(id, 'Accounting');
    this.lastReport = reports[0];
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  addEmployee(name: string) {
    if (name === 'Max') {
      return;
    }
    this.employees.push(name);
  }
}

const accounting = new Department('d1', 'Accounting');
accounting.describe();
accounting.addEmployee('Max');
accounting.addEmployee('Manu');
accounting.printEmployee();
console.log(Department.createEmployee('sum'), Department.fiscalYear)

const itAccounting = new ITDepartment('it1', ['Max']);

const accountingDepartment = AccountingDepartment.getInstance();
accountingDepartment.mostRecentReport = '通期会計れぽーと';
console.log(accountingDepartment.mostRecentReport)
accountingDepartment.addReport('someting');
accountingDepartment.addEmployee('Max');
accountingDepartment.addEmployee('Manu');
accountingDepartment.printEmployee();