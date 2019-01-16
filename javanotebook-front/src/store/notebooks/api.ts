import axios from 'axios';
import { BACK_URL } from '../../const';

const getNotebookList = async () => {
    const url = BACK_URL + '/notebook/all';
    const rep = await axios.get(url);
    console.log("api notebook rep", rep);
    return rep;
}


const createNewNotebook = async(name: string, description?: string) => {
    const url = BACK_URL + '/notebook/save';
    const rep = await axios.post(url, {name, description, codeSnippets: []});
    console.log("api notebook creation rep", rep);
    return rep
}

export const API = {
    createNewNotebook,
    getNotebookList,
}