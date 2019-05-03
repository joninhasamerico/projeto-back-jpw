import {Controller, Get, MergeParams, PathParams, Required} from "@tsed/common";
import {ViaCepService} from "./ViaCepService";
import {ViaCepApi} from "./ViaCepApi";


@Controller("/viacep")
@MergeParams(true)
export class ViaCepCtrl {


    constructor(private viaCepService: ViaCepService) {
    }

    @Get("/:cep/")
    async getCep(@Required @PathParams("cep") cep: string): Promise<ViaCepApi> {
        return this.viaCepService.findCep(cep);
    }
}
