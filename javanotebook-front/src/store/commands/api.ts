import axios from 'axios';
import { BACK_URL } from '../../const';

const sendCommand = async (command: string) => {
    const url = BACK_URL + '/jshellCommand';
    const rep = await axios.post(url, {command});
    console.log("api command rep", rep);
    return rep;
};

const saveCodeSnippet = async (content: string, name: string) => {
    const url = BACK_URL + '/codeSnippet/save';
    const rep = await axios.post(url, {content, name});
    console.log("api save rep", rep);
    return rep;
}

const getCodeSnippet = async (id: number) => {
    const url = BACK_URL + `/codeSnippet/id/${id}`;
    const rep = await axios.get(url);
    console.log("api get code snippet", rep);
    return rep;
}

const saveNotebook = async (id: string, name: string, description: string, codeSnippets: any) => {
    const url = BACK_URL + '/notebook/update';
    const rep = await axios.post(url, {id, name, description, codeSnippets});
    console.log("api update rep", rep);
    return rep;
}

export const API = {
    getCodeSnippet,
    saveCodeSnippet,
    sendCommand,
    saveNotebook,
}