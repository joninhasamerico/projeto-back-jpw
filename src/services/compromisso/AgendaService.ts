import {Service} from "@tsed/common";
import {AgendaInterface} from "../../interfaces/AgendaInterface";

const datastore = require("nedb");
const db = new datastore({filename: "agenda.json"});
db.loadDatabase((err) => console.log(err || "DB loaded with success."));


@Service()
export class AgendaService {

    constructor() {
    }

    /**
     * Find a person by his ID.
     * @param id
     * @returns {undefined|Person}
     */
    async findById(id: string): Promise<AgendaInterface> {
        return await db.find({_id: id}, (err, docs) => {
            return docs;
        });
    }

    /**
     * Create a new Person
     * @param agenda
     * @returns {{id: any, name: string}}
     */
    async create(agenda: AgendaInterface) {
        console.log("Oiiii " + agenda)

        return await db.insert(agenda, (err) => {
            if (err) return console.log(err);

            console.log("Novo usuário adicionado! " + agenda.id);

            return this.findById(agenda.id);
        });
    }

    /**
     *
     * @returns {Person[]}
     */
    async query(): Promise<AgendaInterface[]> {
        return await db.find({}, (err, usuarios) => {
            if (err) return console.log(err);

            return  usuarios;
        });
    }

    /**
     *
     * @param id
     * @param agenda
     * @returns {Person}
     */
    async update(id: string, agenda: AgendaInterface): Promise<AgendaInterface> {
        return await db.update({_id: id}, agenda, (err) => {
            if (err) return console.log(err);

            console.log("Usuário atualizado");
        });
        ;
    }

    /**
     *
     * @param id
     * @returns {Promise<Person>}
     */
    async remove(id: string): Promise<AgendaInterface> {
        return null;
    }
}