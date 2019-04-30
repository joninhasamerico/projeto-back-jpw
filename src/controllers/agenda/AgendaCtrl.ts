import {BodyParams, Controller, Delete, Get, PathParams, Post, Put, Required} from "@tsed/common";
import {NotFound} from "ts-httpexceptions";
import {Agenda} from "../../interfaces/Agenda";
import {AgendaService} from "../../services/compromisso/AgendaService";
import {CompromissoCtrl} from "../compromisso/CompromissoCtrl";


@Controller("/agenda", CompromissoCtrl)
export class AgendaCtrl {

    constructor(private agendaService: AgendaService) {
    }


    @Get("/")
    async getAllAgenda()/*: Promise<Agenda[]> */{
        const agenda = this.agendaService.query();


        return agenda;
    }

    @Post("/")
    async save(@BodyParams() agenda: Agenda) {
        const teste = await this.agendaService.create(agenda);

        return teste;
    }

    @Get("/:id")
    async findById(@Required() @PathParams("id") id: string): Promise<Agenda> {

        const people = await this.agendaService.findById(id);
        if (people) {
            return people;
        }
        throw new NotFound("Person not found");
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
        console.log("AAA  " + teste);

        return teste;
    }

    /**
     *
     * @param id
     * @returns {{id: string, name: string}}
     */
    @Delete("/:id")
    async remove(@BodyParams("id") @Required() id: string): Promise<void> {
        this.agendaService.remove(id);
    }
}
