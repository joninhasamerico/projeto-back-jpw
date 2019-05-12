import {Controller, Get, MergeParams, PathParams, Required} from "@tsed/common";
import {EnderecoService} from "../../services/endereco/EnderecoService";

@Controller("/endereco")
@MergeParams(true)
export class CompromissoCtrl {
    constructor(private enderecoService: EnderecoService) {
    }

    @Get("/:cep")
    async getEnderecoByCep(
        @Required() @PathParams("cep") cep: string
    ) /*: Promise<Agenda[]> */ {
        return null;
    }
}
