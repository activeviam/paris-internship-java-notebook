import { IProcessedCommand } from '../processed-command.interface';
import { IVariable } from '../variable.interface';

import * as monaco from 'monaco-editor';

export interface ICommandStore {
    isProcessing?: boolean;
    isProcessingError?: boolean;
    currentNotebook?: number;
    codeBlocks?: { [id: number]: {codeOutput: IProcessedCommand[], codeContent: string}};
    variables?: IVariable[];
    imports?: string[];
    completionItems?: monaco.languages.CompletionList;
}