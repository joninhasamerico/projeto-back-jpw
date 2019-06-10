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
import { NotFound } from "ts-httpexceptions";
import { Compromisso } from "../../interfaces/Compromisso";
import { CompromissoService } from "../../services/compromisso/CompromissoService";
import { AgendaService } from "../../services/agenda/AgendaService";
var fs = require("fs");

@Controller("/consolidacao")
@MergeParams(true)
export class ConsolidarCtrl {


    constructor(private compromissoService: CompromissoService, private agendaService: AgendaService) {
    }

    @Get("/")
    async getAllCompromisso() {
        let quantidadeAgenda;
        let quantidadeCompromisso;
        const agenda = await this.agendaService.query().then(result => {
            quantidadeAgenda = result.length;
            return result;
        });
        const compromisso = await this.compromissoService.findAll().then(result => {
            quantidadeCompromisso = result.length;
            return result;
        });

        let validacao: string = "";
        agenda.forEach(agendaList => {
            validacao = validacao + `<br/> Dia ${agendaList.diaMes}, `;
            compromisso.forEach(compromissoList => {
                if (agendaList._id === compromissoList.agendaId) {
                    validacao = validacao + ` <br/> Compromisso: ${compromissoList.assunto}`;
                }
            });
        });

        var stream = fs.createWriteStream("my_file.csv");
        stream.once('open', function(fd) {
            stream.write(validacao);
            stream.end();
          });


        // return `Você atualmente possui ${quantidadeAgenda} Agenda(s) com as seguintes datas: ${datas} com um total de ${quantidadeCompromisso} compromisso(s) marcado`;
        return validacao;
    }
}
