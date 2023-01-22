import { Console } from "./console.model";
import { Genere } from "./genere.model";

export class Data {
    constructor (
        public generi: Genere[],
        public consoles: Console[]
    ) { }
}