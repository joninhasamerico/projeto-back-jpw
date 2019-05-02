import {Service} from "@tsed/di";
import {Compromisso} from "../../interfaces/Compromisso";
import {Agenda} from "../../interfaces/Agenda";

const datastore = require("nedb");
const db = new datastore({filename: "compromisso.json"});
db.loadDatabase((err) => console.log(err || "DB loaded with success."));


@Service()
export class CompromissoService {

    constructor() {
    }

    /**
     * Find a compromisso by his agendaID.
     * @param id
     * @param agendaId
     * @returns {undefined|Agenda}
     */
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

    /**
     * Create a new Agenda
     * @param compromisso
     * @returns {{id: any}}
     */
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

    /**
     *
     * @returns {Compromisso[]}
     */
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

    /**
     *
     * @param agendaID
     * @param id
     * @param compromisso
     * @returns {compromisso}
     */
    async update(agendaID: string, id: string,  compromisso: Compromisso): Promise<Compromisso> {
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

    /**
     *
     * @param iDagenda
     * @param id
     * @returns {Promise<Person>}
     */
    async remove(iDagenda: string, id: string): Promise<Compromisso> {
        return new Promise((resolve, reject) => {
            db.remove({agendaId: iDagenda, _id: id}, {} , (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }
}