import {Compromisso} from "./Compromisso";

export interface Agenda {
    _id: string;
    diaMes: Date;
    compromisso: Compromisso[];
}
