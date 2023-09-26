import { Company, Contact, ContactType, Partner } from "../types";

export default class TextProcessor {
    
    partners: Array<Partner> = [];

    companies: Array<Company> = [];

    contacts: Array<Contact> = [];

    private sortCompanies = () => this.companies.sort((a, b) => a.name > b.name ? 1 : -1)

    private getCompanyContactList = (company: Company): Array<Contact> => this.contacts.filter(contact => company.employees.includes(contact.employee));

    private getTopPartnerForCompany = (companyContacts: Array<Contact>): {partner: string, contactCount: number} => {
        const partnerContacts: Array<{partner: string, contactCount: number}> = [];
        companyContacts.forEach(contact => {
            const pcIndex = partnerContacts.findIndex(pc => pc.partner === contact.partner);
            if(pcIndex > -1){
                partnerContacts[pcIndex].contactCount = partnerContacts[pcIndex].contactCount + 1;
            } else {
                partnerContacts.push({partner: contact.partner, contactCount: 1})
            }
        });

        partnerContacts.sort((a, b) => a.contactCount > b.contactCount ? -1 : 1);

        return partnerContacts[0];
    }

    processLine = (lineInput: string) => {
        const words = lineInput.split(" ");
        const inputType = words[0];
        let employeeName: string, companyName: string, partnerName: string, contactType: string

        switch (inputType) {
            case "Employee":
                [ , employeeName, companyName ] = words;
                const employees = this.companies.find(company => company.name === companyName)?.employees;
                if(!employees?.find(employee => employee === employeeName)){
                    employees?.push(employeeName)
                }
                break;
            case "Partner":
                [ , partnerName ] = words;
                this.partners.push(partnerName)
                break;
            case "Contact":
                [ , employeeName, partnerName, contactType] = words;
                if(Object.values(ContactType).includes(contactType)){
                    this.contacts.push({type: contactType, partner: partnerName, employee: employeeName})
                } else {
                    throw new Error("Invalid contact type option")
                }
                break;
            case "Company":
                [ , companyName ] = words;
                this.companies.push({name: companyName, employees: []})
                break;
            default:
                throw new Error("Invalid input option")
        } 
    }

    outputCompanyContacts = () => {
        this.sortCompanies();

        this.companies.forEach(company => {
            const companyContacts = this.getCompanyContactList(company);
            if(companyContacts.length > 0){
                const topPartnerContact = this.getTopPartnerForCompany(companyContacts);

                process.stdout.write(`${company.name}: ${topPartnerContact.partner} (${topPartnerContact.contactCount})\n`)
            } else {
                process.stdout.write(`${company.name}: No current relationship\n`)
            }
        
        });
    };
}

