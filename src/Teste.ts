import {Agenda} from "./interfaces/Agenda";
import {Endereco} from "./interfaces/Endereco";
import {Compromisso} from "./interfaces/Compromisso";

export class Teste {

    private _agenda: Agenda;
    private _endereco: Endereco;
    private _compromisso: Compromisso;


    constructor(agenda: Agenda, compromisso: Compromisso) {
        this._agenda = agenda;
        this._compromisso = compromisso;
    }

    get agenda(): Agenda {
        return this._agenda;
    }

    set agenda(value: Agenda) {
        this._agenda = value;
    }

    get endereco(): Endereco {
        return this._endereco;
    }

    set endereco(value: Endereco) {
        this._endereco = value;
    }

    get compromisso(): Compromisso {
        return this._compromisso;
    }

    set compromisso(value: Compromisso) {
        this._compromisso = value;
    }
}