import { all, call, put, takeEvery } from 'redux-saga/effects';

import { ActionTypes, COMMANDS_ACTIONS } from './actions';

import { IVariable } from '../../interfaces'

import { push } from 'connected-react-router';

import { API } from './api';

import * as monaco from 'monaco-editor';

export function* processCommandRequest(params: any): Iterator<any> {
    try {
        const rep = yield call(API.sendCommand, params.payload.command, params.payload.notebookId);
        const data = rep.data;
        // // add missing value from api
        yield put(COMMANDS_ACTIONS.processingCommandSuccess({codeOutput: data, id: params.payload.id}));
        yield put(COMMANDS_ACTIONS.currentVariablesRequest({notebookId: params.payload.notebookId }));
    } catch (error) {
        yield put(COMMANDS_ACTIONS.processingCommandFailure());
    }
}

export function* runAllRequest(params: any): Iterator<any> {
    try {
        const rep = yield call(API.sendCommands, params.payload.commandsAndIds, params.payload.notebookId);
        const data: any[] = rep.data;
        console.log("response api", data);
        yield all(data.map((item) => {
            return put(COMMANDS_ACTIONS.processingCommandSuccess({codeOutput: item.output, id: item.id}));
        }));
        // yield put (COMMANDS_ACTIONS.currentVariablesRequest({notebookId: params.payload.notebookId }));
        yield put(COMMANDS_ACTIONS.runAllSuccess());
    } catch (error) {
        yield put(COMMANDS_ACTIONS.runAllFailure());
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
        yield call(API.saveNotebook, params.payload.notebook.id, params.payload.notebook.name, params.payload.notebook.description, params.payload.notebook.codeSnippets);
        yield put(COMMANDS_ACTIONS.saveNotebookSuccess());
    } catch (error) {
        yield put(COMMANDS_ACTIONS.saveNotebookFailure());
    }
}

export function* currentVariablesRequest(params: any): Iterator<any> {
    try {
        const rep = yield call(API.currentVariables, params.payload.notebookId);
        let variables: IVariable[] = [];
        rep.data.variables.map((value:any) => {
            variables = [...variables, {name: value.name.toString(), typeName: value.typeName.toString(), value: value.value}]
        });
        let imports: string[] = [];
        rep.data.imports.map((value: string) => {
            imports = [...imports, value];
        });
        yield put(COMMANDS_ACTIONS.currentVariablesSuccess({variables, imports}));
    } catch (error) {
        yield put(COMMANDS_ACTIONS.currentVariablesFailure());
    }
}

export function* completionItemsRequest(params: any): Iterator<any> {
    try {
        const rep = yield call(API.getCompletionItems, params.payload.notebookId, params.payload.codeContent, params.payload.cursor); 
        const completionItems: monaco.languages.CompletionList = rep.data.suggestions.map((value: any, index: number) => ({
            label: value,
            insertText: value,
            kind: monaco.languages.CompletionItemKind.Text,
            documentation: rep.data.documentation[index] ? rep.data.documentation[index].javadoc : "",
            detail: rep.data.documentation[index] ? rep.data.documentation[index].signature : "",
        }));
        yield put(COMMANDS_ACTIONS.completionItemsSuccess({completionItems}));
    } catch (error) {
        console.log(error);
        yield put(COMMANDS_ACTIONS.completionItemsFailure());
    }
}

export function* goToNotebook(): Iterator<any> {
    yield put(push("/notebook"));
}

export function* restartJshellRequest(params: any): Iterator<any> {
    try {
        const rep = yield call(API.restartJshell, params.payload.notebookId);
        console.log("api result", rep);
        yield put(COMMANDS_ACTIONS.restartJShellSuccess());
        yield put(COMMANDS_ACTIONS.currentVariablesRequest({notebookId: params.payload.notebookId}))
    } catch (error) {
        yield put(COMMANDS_ACTIONS.restartJshellFailure());
    }
}

export function* commandSaga(): Iterator<any> {
    yield takeEvery(ActionTypes.PROCESS_COMMAND_REQUEST, processCommandRequest);
    yield takeEvery(ActionTypes.SAVE_CODE_SNIPPET_REQUEST, saveCodeSnippetRequest);
    yield takeEvery(ActionTypes.GET_CODE_SNIPPET_REQUEST, getCodeSnippetRequest);
    yield takeEvery(ActionTypes.OPEN_NOTEBOOK, goToNotebook);
    yield takeEvery(ActionTypes.SAVE_NOTEBOOK_REQUEST, saveNotebookRequest);
    yield takeEvery(ActionTypes.CURRENT_VARIABLES_REQUEST, currentVariablesRequest);
    yield takeEvery(ActionTypes.COMPLETION_ITEMS_REQUEST, completionItemsRequest);
    yield takeEvery(ActionTypes.RUN_ALL_REQUEST, runAllRequest);
    yield takeEvery(ActionTypes.RESTART_JSHELL_REQUEST, restartJshellRequest);
}
