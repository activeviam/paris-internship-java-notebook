import axios from 'axios';
import { BACK_URL } from '../../const';

const getNotebookList = async () => {
<<<<<<< Updated upstream
    const url = BACK_URL + '/notebookList';
=======
    const url = BACK_URL + '/notebook/all';
>>>>>>> Stashed changes
    const rep = await axios.post(url);
    console.log("api notebook rep", rep);
    return rep;
}

export const API = {
    getNotebookList,
}