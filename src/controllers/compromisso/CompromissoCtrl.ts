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
import {CompromissoInterface} from "../../interfaces/CompromissoInterface";


@Controller("/:calendarId/compromisso")
@MergeParams(true)
export class CompromissoCtrl {
    private AUTO_INC = 5;
    private events: CompromissoInterface[] = require("../../../resources/events.json");

    /**
     *
     * @returns {null}
     */
    @Get("/:id")
    async get(@Required() @PathParams("calendarId") calendarId: string,
              @PathParams("id") id: string): Promise<CompromissoInterface> {
        // const event = this.events.find(event => event.id === id && event.calendarId === calendarId);

        return null;
        throw new NotFound("event not found");
    }

    /**
     *
     * @returns {null}
     */
    @Put("/")
    async save(@Required() @PathParams("calendarId") calendarId: string,
               @BodyParams("startDate") startDate: string,
               @BodyParams("endDate") endDate: string,
               @BodyParams("name") name: string): Promise<CompromissoInterface> {


        // this.AUTO_INC++;
        //
        // const event: CompromissoInterface = {id: "" + this.AUTO_INC, calendarId, startDate, endDate, name};
        // this.events.push(event);

        return null;
    }

    /**
     *
     * @returns {null}
     */
    @Post("/:id")
    async update(@Required() @PathParams("calendarId") calendarId: string,
                 @PathParams("id") id: string,
                 @BodyParams("startDate") startDate: string,
                 @BodyParams("endDate") endDate: string,
                 @BodyParams("name") name: string): Promise<CompromissoInterface> {

        // const event = await this.get(calendarId, id);
        // event.name = name;
        // event.startDate = name;
        // event.endDate = name;
        return null;
    }

    /**
     *
     */
    @Delete("/:id")
    @Authenticated()
    @Status(204)
    async remove(@Required() @PathParams("calendarId") calendarId: string,
                 @PathParams("id") id: string): Promise<CompromissoInterface> {

        // this.events = this.events.filter(event => event.id === id && event.calendarId === calendarId);
        return null;
    }

    @Get("/")
    async getEvents(@Required() @PathParams("calendarId") calendarId: string): Promise<CompromissoInterface[]> {
        return null;
        // this.events.filter(event => event.calendarId === calendarId);
    }
}
