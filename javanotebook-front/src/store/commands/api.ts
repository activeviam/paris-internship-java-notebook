import axios from 'axios';
import { BACK_URL } from '../../const';

const sendCommand = async (command: string) => {
    const url = BACK_URL + '/jshellCommand';
    const rep = await axios.post(url, {command});
    console.log("api command rep", rep);
    return rep;
};

export const API = {
    sendCommand
}