import {Service} from "@tsed/di";
import {ViaCepApi} from "./ViaCepApi";

const axios = require("axios");


@Service()
export class ViaCepService {
    retornoViaCep: any;

    constructor() {
    }

    async findCep(cepReq: string): Promise<ViaCepApi> {
        await axios.get("https://viacep.com.br/ws/" + cepReq + "/json/")
            .then(response => {
                this.retornoViaCep = response;
            }).catch(error => {
                console.log(error);
            });

        return this.retornoViaCep.data;

    }
}