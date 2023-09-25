import TextProcessor from "./TextProcessor"



describe("TextProcessor", () => {
  let subject: TextProcessor;

  beforeEach(() => {
    subject = new TextProcessor();
  })

  describe("processText", () => {

    it("throws an error when providing an invalid first word", () => {
      expect(() => subject.processLine("invalid first word")).toThrow("Invalid input option")
    });
  
    it("adds in a partner when given a partner to process", () => {
      subject.processLine("Partner jimbo");
  
      expect(subject.partners.length).toBe(1);
      expect(subject.partners[0]).toBe("jimbo")
    })
  
    it("adds in a company when given a company to process", () => {
      subject.processLine("Company coolinc");
  
      expect(subject.companies.length).toBe(1);
      expect(subject.companies[0].name).toBe("coolinc")
    })
  
    it("adds in an employee when given an employee to process", () => {
      subject.processLine("Company acme");
      subject.processLine("Employee jamison acme");
  
      expect(subject.companies.length).toBe(1);
      expect(subject.companies[0].name).toBe("acme")
      expect(subject.companies[0].employees.length).toBe(1)
      expect(subject.companies[0].employees[0]).toBe("jamison")
    })
  
    it("doesn't add in a duplicate employee name to a company", () => {
      subject.processLine("Company acme");
      subject.processLine("Employee jamison acme");
      subject.processLine("Employee jamison acme");
      
      expect(subject.companies[0].employees.length).toBe(1)
      expect(subject.companies[0].employees[0]).toBe("jamison")
    })
  
    it("adds in a contact when given a contact to process", () => {
      subject.processLine("Partner bigbird")
      subject.processLine("Company dundermifflin");
      subject.processLine("Employee elmo dundermifflin");
      subject.processLine("Contact elmo bigbird coffee");
  
      expect(subject.contacts.length).toBe(1);
      expect(subject.contacts[0].partner).toBe("bigbird");
      expect(subject.contacts[0].employee).toBe("elmo");
      expect(subject.contacts[0].type).toBe("coffee");
    })
  
    it("throws error with invalid contact type", () => {
      expect(() => subject.processLine("Contact elmo bigbird brewery")).toThrow("Invalid contact type option")
    })
  });

  describe('outputCompanyContacts', () => {

    process.stdout.write = jest.fn();

    it("sorts and prints the companies inputed alphabetically", () => {
      subject.processLine("Company Microsoft");
      subject.processLine("Company Twitch");
      subject.processLine("Company Apple");

      subject.outputCompanyContacts();

      expect(process.stdout.write).toHaveBeenCalledTimes(3);
      expect(process.stdout.write).toHaveBeenNthCalledWith(1, "Apple: No current relationship\n")
      expect(process.stdout.write).toHaveBeenNthCalledWith(2, "Microsoft: No current relationship\n")
      expect(process.stdout.write).toHaveBeenLastCalledWith("Twitch: No current relationship\n")
    });

    it("prints out the companies inputed with their highest partner relationship", () => {
      subject.processLine("Company VehementCapital")
      subject.processLine("Company CoolInc");
      subject.processLine("Company Umbrella");

      subject.processLine("Employee MrCrabs CoolInc");
      subject.processLine("Employee SpongeBob CoolInc");
      subject.processLine("Employee Albert Umbrella");

      subject.processLine("Partner Sandy");
      subject.processLine("Partner Patrick");

      subject.processLine("Contact MrCrabs Sandy coffee");
      subject.processLine("Contact SpongeBob Sandy call");
      subject.processLine("Contact SpongeBob Patrick email");
      subject.processLine("Contact Albert Patrick coffee");

      subject.outputCompanyContacts();

      expect(process.stdout.write).toHaveBeenCalledTimes(3);
      expect(process.stdout.write).toHaveBeenNthCalledWith(1, "CoolInc: Sandy (2)\n")
      expect(process.stdout.write).toHaveBeenNthCalledWith(2, "Umbrella: Patrick (1)\n")
      expect(process.stdout.write).toHaveBeenLastCalledWith("VehementCapital: No current relationship\n")
    })
  });
})

