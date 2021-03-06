import { call, put, takeEvery } from 'redux-saga/effects';

import { ActionTypes, NOTEBOOK_ACTIONS } from './actions';

import { API } from './api';

export function* getNotebookListRequest(params: any): Iterator<any> {
    try {
        const rep = yield call(API.getNotebookList);
        const data = rep.data.map((notebookReceived: any) => 
        ({...notebookReceived, codeSnippets: (notebookReceived.codeSnippets || []).sort((snippet1: any, snippet2: any) => 
            (snippet1.position > snippet2.position ? 1 : snippet1 === snippet2.position ? 0 : -1))
            .map((snippet: any) => 
                (snippet.content)
        )}));
        yield put(NOTEBOOK_ACTIONS.getNotebookSuccess({notebookList: data}))
    } catch (error) {
        yield put(NOTEBOOK_ACTIONS.getNotebookFailure());
    }
}

export function* createNewNotebookRequest(params: any): Iterator<any> {
    try {
        const rep = yield call(API.createNewNotebook, params.payload.name, params.payload.description);
        const data = rep.data;
        console.log(data);
        yield put(NOTEBOOK_ACTIONS.createNewNotebookSucces(data));
        yield put(NOTEBOOK_ACTIONS.getNotebookRequest());
    } catch (error) {
        yield put(NOTEBOOK_ACTIONS.createNewNotebookFailure());
    }
}

export function* notebookSaga(): Iterator<any> {
    yield takeEvery(ActionTypes.GET_NOTEBOOK_LIST_REQUEST, getNotebookListRequest);
    yield takeEvery(ActionTypes.CREATE_NEW_NOTEBOOK_REQUEST, createNewNotebookRequest);
}