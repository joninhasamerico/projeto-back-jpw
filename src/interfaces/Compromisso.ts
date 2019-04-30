import {Task} from "./Task";

export interface Compromisso {
  id: string;
  agendaId: string;
  descricaoCompromisso: string;
  horarioInicio: string;
  horarioFim: string;
}
