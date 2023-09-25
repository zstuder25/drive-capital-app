import readline from "readline";
import fs from "fs"
import TextProcessor from "./TextProcessors/TextProcessor";

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

const textProcessor = new TextProcessor();

rl.on("line", input => textProcessor.processLine(input))
.on("close", () => textProcessor.outputCompanyContacts())
