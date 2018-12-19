import { call, put, takeEvery } from 'redux-saga/effects';

import { ActionTypes, NOTEBOOK_ACTIONS } from './actions';

import { API } from './api';

export function* getNotebookListRequest(params: any): Iterator<any> {
    try {
        const rep = yield call(API.getNotebookList);
        const data = rep.data;
        yield put(NOTEBOOK_ACTIONS.getNotebookSuccess(data))
    } catch (error) {
        yield put(NOTEBOOK_ACTIONS.getNotebookFailure());
    }
}

export function* notebookSaga(): Iterator<any> {
    yield takeEvery(ActionTypes.GET_NOTEBOOK_LIST_REQUEST, getNotebookListRequest);
}