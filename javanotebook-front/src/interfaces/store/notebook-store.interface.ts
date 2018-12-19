import { INotebook } from '../notebook.interface';

export interface INotebookStore {
    isLoading?: boolean;
    isLoadingError?: boolean;
    noteBooks?: INotebook[];
}