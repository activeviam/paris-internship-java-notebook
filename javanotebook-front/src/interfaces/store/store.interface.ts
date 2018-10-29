import { ICommandStore } from './command-store.interface';

export interface IStore {
    commandReducer: ICommandStore;
}