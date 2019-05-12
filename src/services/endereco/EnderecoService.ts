import {Service} from "@tsed/di";

const datastore = require("nedb");
const db = new datastore({filename: "endereco.json"});
db.loadDatabase(err => console.log(err || "DB loaded with success."));

@Service()
export class EnderecoService {
    constructor() {
    }

}
