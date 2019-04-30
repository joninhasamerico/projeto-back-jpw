import {BodyParams, Controller, Delete, Get, PathParams, Post, Put, Required} from "@tsed/common";
import {NotFound} from "ts-httpexceptions";
import {AgendaInterface} from "../../interfaces/AgendaInterface";
import {AgendaService} from "../../services/compromisso/AgendaService";
import {CompromissoCtrl} from "../compromisso/CompromissoCtrl";


@Controller("/agenda", CompromissoCtrl)
export class AgendaCtrl {

  constructor(private agendaService: AgendaService) {
  }

  @Post("/")
  save(@BodyParams() agenda: AgendaInterface) {
    console.log(agenda);
    this.agendaService.create(agenda);
  }

  @Get("/")
  async getAllAgenda(): Promise<AgendaInterface[]> {
    const agenda = this.agendaService.query();


    return agenda;
  }

  @Get("/:id")
  async findById(@Required() @PathParams("id") id: string): Promise<AgendaInterface> {
    console.log(id);
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
               @BodyParams() @Required() agenda: AgendaInterface): Promise<AgendaInterface> {
    return this.agendaService.update(id, agenda);
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
