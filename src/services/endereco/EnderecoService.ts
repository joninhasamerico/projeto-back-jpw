import {Service} from "@tsed/di";
import {Compromisso} from "../../interfaces/Compromisso";

const datastore = require("nedb");
const db = new datastore({filename: "compromisso.json"});
db.loadDatabase((err) => console.log(err || "DB loaded with success."));


@Service()
export class CompromissoService {

    constructor() {
    }


    async findById(id: string, agendaID: string): Promise<Compromisso> {
        return new Promise((resolve, reject) => {
            db.find({agendaId: agendaID, _id: id}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }


    async create(compromisso: Compromisso): Promise<Compromisso> {
        return new Promise((resolve, reject) => {
            db.insert(compromisso, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }


    async query(agendaID: string): Promise<Compromisso[]> {
        return new Promise((resolve, reject) => {
            db.find({agendaId: agendaID}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    async update(agendaID: string, id: string, compromisso: Compromisso): Promise<Compromisso> {
        return new Promise((resolve, reject) => {
            db.update({agendaId: agendaID, _id: id}, compromisso, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });

    }


    async remove(id: string): Promise<Compromisso> {
        return new Promise((resolve, reject) => {
            db.remove({_id: id}, {}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }
}