import {Controller, Get, MergeParams} from "@tsed/common";
import {ReportService} from "./ReportService";


@Controller("/report")
@MergeParams(true)
export class ReportCtrl {


    constructor(private reportService: ReportService) {
    }

    @Get("/")
    async getAllCompromisso()/*: Promise<Agenda[]> */ {

    }
}
