import {
    Authenticated,
    BodyParams,
    Controller,
    Delete,
    Get,
    PathParams,
    Post,
    Put,
    Required,
    Status
} from "@tsed/common";
import { NotFound } from "ts-httpexceptions";
import { Agenda } from "../../interfaces/Agenda";
import { AgendaService } from "../../services/agenda/AgendaService";
import { CompromissoService } from "../../services/compromisso/CompromissoService";
var fs = require('fs');
var csv = require('fast-csv');
var ws = fs.createWriteStream('my.csv')

@Controller("/agenda")
export class AgendaCtrl {

    constructor(private agendaService: AgendaService, private compromissoService: CompromissoService) {
    }


    @Get("/")
    async getAllAgenda()/*: Promise<Agenda[]>*/ {
        const agenda = await this.agendaService.query();

        for (let i = 0; i < agenda.length; i++) {
            agenda[i].compromisso = await this.compromissoService.query(agenda[i]._id);
        }
        return agenda
        // console.log(agenda)

        // return csv.write([agenda], {headers:true}).pipe(ws);
    }

    @Get("/:id")
    async findById(@Required() @PathParams("id") id: string): Promise<Agenda> {

        const people = await this.agendaService.findById(id);
        if (people) {
            return people;
        }
        throw new NotFound("Agenda not found");
    }

    @Post("/")
    async save(@BodyParams() agenda: Agenda) {

        const agendaCriada = await this.agendaService.procuraPorData(agenda.diaMes);
        if (agendaCriada !== null) {
            return agendaCriada;
        }

        return await this.agendaService.create(agenda);
    }

    /**
     *
     * @param id
     * @param name
     * @returns {Promise<Calendar>}
     */
    @Put("/:id")
    async update(@PathParams("id") @Required() id: string,
        @BodyParams() @Required() agenda: Agenda): Promise<Agenda> {
        const teste = this.agendaService.update(id, agenda);

        return teste;
    }

    @Delete("/")
    @Authenticated()
    @Status(204)
    async remove(@BodyParams("id") id: string): Promise<void> {
        this.agendaService.remove(id);
        this.compromissoService.removeAll(id);
    }
}
