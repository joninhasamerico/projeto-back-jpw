import {
    Authenticated,
    BodyParams,
    Controller,
    Delete,
    Get,
    MergeParams,
    PathParams,
    Post,
    Put,
    Required,
    Status
} from "@tsed/common";
import {NotFound} from "ts-httpexceptions";
import {Compromisso} from "../../interfaces/Compromisso";
import {CompromissoService} from "../../services/compromisso/CompromissoService";


@Controller("/compromisso")
@MergeParams(true)
export class CompromissoCtrl {


    constructor(private compromissoService: CompromissoService) {
    }

    @Get("/:agendaId")
    async getAllCompromisso(@Required() @PathParams("agendaId") agendaId: string)/*: Promise<Agenda[]> */ {
        const agenda = this.compromissoService.query(agendaId);


        return agenda;
    }

    /**
     *
     * @returns {null}
     */
    @Get("/:agendaId/:id")
    async getById(@Required() @PathParams("agendaId") agendaId: string,
                  @PathParams("id") id: string): Promise<Compromisso> {

        const compromisso = await this.compromissoService.findById(id, agendaId);
        if (compromisso) {
            return compromisso;
        }
        throw new NotFound("Comprimisso not found");
    }

    @Post("/")
    async save(@BodyParams() compromisso: Compromisso) {
        const compromissoCriado = await this.compromissoService.create(compromisso);

        return compromissoCriado;
    }

    /**
     *
     * @returns {null}
     */
    @Put("/:agendaId/:id")
    async update(@Required() @PathParams("agendaId") agendaId: string,
                 @PathParams("id") id: string,
                 @BodyParams() compromisso: Compromisso): Promise<Compromisso> {

        const compromissoAlterado = this.compromissoService.update(agendaId, id, compromisso);

        return compromissoAlterado;
    }

    /**
     *
     */
    @Delete("/")
    @Authenticated()
    @Status(204)
    async remove(@Required() @BodyParams("agendaId") agendaId: string,
                 @Required() @BodyParams("id") id: string): Promise<Compromisso> {

        this.compromissoService.remove(agendaId, id);

        return null;
    }
}
