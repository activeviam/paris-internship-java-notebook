import { call, put, takeEvery } from 'redux-saga/effects';

import { ActionTypes, COMMANDS_ACTIONS } from './actions';

import { push } from 'connected-react-router';

import { API } from './api';

export function* processCommandRequest(params: any): Iterator<any> {
    try {
        const rep = yield call(API.sendCommand, params.payload.command, params.payload.notebookId);
        const data = rep.data;
        // // add missing value from api
        yield put(COMMANDS_ACTIONS.processingCommandSuccess({codeOutput: data, id: params.payload.id}));
    } catch (error) {
        yield put(COMMANDS_ACTIONS.processingCommandFailure());
    }
}

export function* saveCodeSnippetRequest(params: any): Iterator<any> {
    try {
        yield call(API.saveCodeSnippet, params.payload.codeSnippetContent, params.payload.codeSnippetName);
        yield put(COMMANDS_ACTIONS.saveCodeSnippetSuccess());
    } catch (error) {
        yield put(COMMANDS_ACTIONS.saveCodeSnippetFailure());
    }
}

export function* getCodeSnippetRequest(params: any): Iterator<any> {
    try {
        const rep = yield call(API.getCodeSnippet, params.payload.idSnippet);
        yield put(COMMANDS_ACTIONS.changeCodeContent({codeContent: rep.data.content, id: params.payload.id}));
    } catch (error) {
        yield put(COMMANDS_ACTIONS.getCodeSnippetFailure());
    }
}

export function* saveNotebookRequest(params: any): Iterator<any> {
    try{
        console.log("here");
        yield call(API.saveNotebook, params.payload.notebook.id, params.payload.notebook.name, params.payload.notebook.description, params.payload.notebook.codeSnippets);
        yield put(COMMANDS_ACTIONS.saveNotebookSuccess());
    } catch (error) {
        yield put(COMMANDS_ACTIONS.saveNotebookFailure());
    }
}

export function* goToNotebook(): Iterator<any> {
    yield put(push("/notebook"));
}

export function* commandSaga(): Iterator<any> {
    yield takeEvery(ActionTypes.PROCESS_COMMAND_REQUEST, processCommandRequest);
    yield takeEvery(ActionTypes.SAVE_CODE_SNIPPET_REQUEST, saveCodeSnippetRequest);
    yield takeEvery(ActionTypes.GET_CODE_SNIPPET_REQUEST, getCodeSnippetRequest);
    yield takeEvery(ActionTypes.OPEN_NOTEBOOK, goToNotebook);
    yield takeEvery(ActionTypes.SAVE_NOTEBOOK_REQUEST, saveNotebookRequest);
}
