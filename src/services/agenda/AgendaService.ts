import {Service} from "@tsed/common";
import {Agenda} from "../../interfaces/Agenda";
import {nedbw} from "nedb"

const datastore = require("nedb");
const db = new datastore({filename: "agenda.json"});
db.loadDatabase((err) => console.log(err || "DB loaded with success."));


@Service()
export class AgendaService {

    constructor() {
    }

    /**
     * Find a agenda by his ID.
     * @param id
     * @returns {undefined|Agenda}
     */
    async findById(id: string): Promise<Agenda> {
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

    /**
     * Create a new Agenda
     * @param agenda
     * @returns {{id: any}}
     */
    async create(agenda: Agenda): Promise<Agenda> {
        return new Promise((resolve, reject) => {
            db.insert(agenda, (err, docs) => {
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
     * @returns {Agenda[]}
     */
    async query(): Promise<Agenda[]> {
        return new Promise((resolve, reject) => {
            db.find({}, (err, docs) => {
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
     * @param id
     * @param agenda
     * @returns {Agenda}
     */
    async update(id: string, agenda: Agenda): Promise<Agenda> {
        return new Promise((resolve, reject) => {
            db.update({_id: id}, agenda, (err, docs) => {
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
     * @param id
     * @returns {Promise<Agenda>}
     */
    async remove(id: string)/*: Promise<Agenda>*/ {
        return new Promise((resolve, reject) => {
            console.log(id);
            db.remove({_id: id}, {}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });

    }

    async procuraPorData(data){
        return new Promise((resolve, reject) => {
            console.log("diaMes "+data);
            db.findOne({diaMes: data}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

}