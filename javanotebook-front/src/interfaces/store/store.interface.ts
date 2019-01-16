import { ICommandStore } from './command-store.interface';
import { INotebookStore } from './notebook-store.interface';

export interface IStore {
    commandReducer: ICommandStore;
    notebookReducer: INotebookStore;
}