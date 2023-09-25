enum ContactType {
    email,
    coffee,
    call
};

type Partner = string;

type Company = {
    name: string
    employees: Array<Employee>
}

type Employee = string;

type Contact = {
    employee: Employee
    partner: Partner
    type: string
}

export { Partner, Company, Employee, Contact, ContactType }; 