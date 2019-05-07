import {Endereco} from "../../interfaces/Endereco";
import {Service} from "@tsed/di";

const datastore = require("nedb");
const db = new datastore({filename: "endereco.json"});
db.loadDatabase((err) => console.log(err || "DB loaded with success."));


@Service()
export class EnderecoService {

    constructor() {
    }


    async getEnderecoById(id: string): Promise<Endereco> {
        return new Promise((resolve, reject) => {
            db.find({_id: id}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }


    async create(endereco: Endereco): Promise<Endereco> {
        return new Promise((resolve, reject) => {
            db.insert(endereco, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }


    async update(id: string,  endereco: Endereco): Promise<Endereco> {
        return new Promise((resolve, reject) => {
            db.update({_id: id}, endereco, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });

    }


    async remove(id: string): Promise<Endereco> {
        return new Promise((resolve, reject) => {
            db.remove({_id: id}, {} , (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }
}