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
import {NotFound} from "ts-httpexceptions";
import {Agenda} from "../../interfaces/Agenda";
import {AgendaService} from "../../services/agenda/AgendaService";


@Controller("/agenda")
export class AgendaCtrl {

    constructor(private agendaService: AgendaService) {
    }


    @Get("/")
    async getAllAgenda()/*: Promise<Agenda[]> */{
        const agenda = this.agendaService.query();


        return agenda;
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
        const agendaCriada = await this.agendaService.create(agenda);

        return agendaCriada;
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

    @Delete("/")
    @Authenticated()
    @Status(204)
    async remove(@BodyParams("id") id: string): Promise<void> {
        this.agendaService.remove(id);
    }
}
