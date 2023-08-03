import { PubInstance } from "../models/Pub";
import { states } from "./states";

export const getStateSail = (service: PubInstance) => {

    const state = states.find(state => state.nome === service.state);

    if (state) {
        service.state = state.sigla;
    }

}