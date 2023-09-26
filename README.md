
# Drive Capital Sample Problem
## Zach Studer

## Verify Install of node & npm
Make sure you have node installed. You can install via https://docs.npmjs.com/downloading-and-installing-node-js-and-npm if needed.
Then to verify: 

```node -v```
```npm -v```

## Install dependencies
```npm install```

## To run the app

```npm start "</absolute/file/path/here>"```

The index.txt file contains the same sample as the drive readmen

## Run unit tests
```npm test```

## Run eslint
```npm run lint```


# Design Approach
Node/Typescript were chosen due moslty to recent familiarity. This problem may or may not lend itself to languages with built in OOP instead of runtime OOP on top with typescript. 

I like to apporach a problem like this, when it makes sense, with TDD (test driven development). As you'll note, I've provided a full unit test suite for the main Class of the code ```TextProcessor.ts``` in the ```TextProcessor.test.ts``` file. I essentially turned each requirement into a failing unit test first before proceeding to write the code that would pass it. 

Given that this is a problem without a data models, I made simple types to represent the requirements for each of the potential "data models" such as Companies, Contacts, etc that you will see defined in ```types.ts```. In a more OOP focused language these would obviously translate directly to classes but that was overkill for this problem in TS. The types defined there are translations of the requirements for each line input from the data. You'll see, for example, a Company type having an array of Employees. 

The application itself simply takes in the file input and reads it in line by line similar to how you would other languages, and process the each line after reading. The code makes the assumption that the input is ordered in a way to not create errors. I.e. it expects a company to be defined before an employee. The TextProcessor class then holds these processed data pieces within its members. At scale, these would obviously be things you'd want to save to your data store as you processed them (or batch them) but for this case the class members served this purpose. Having a switch case use the first word in the line input also seemed the simpliest way to handle adding a each new entry to the class' array members while also utilizing the default case to throw an error on invalid input. 

After all the lines are processed, the line reader is closed out on the end of the file and then calls ```outputCompanyContacts()``` to process and print out the desired output. It first sorts the companies, then iterates over them. It then collects any contacts that can be linked back to the company through employees. If there aren't any, that company has no current relationships. Once we have the contact list for that company, we then get the partner with the highest amount of contacts per buisness and print it out. 

# Notes & Assumptions
- The application only accepts file reading input currently
- Proper Entity order is assumed. I.e. an employee cannot be established before the company of that which they are employed
- The first word of each line describes one of the 4 possible declaritive entities (Company, Employee, Patner, or Contact), otherwise an error is thrown
- For contacts, the contact type must be of ```email | coffee | call``` or an error is thrown
- Entities are assumed to be single words with no spaces
