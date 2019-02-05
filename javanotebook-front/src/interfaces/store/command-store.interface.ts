import { IProcessedCommand } from '../processed-command.interface';
import { IVariable } from '../variable.interface';

export interface ICommandStore {
    isProcessing?: boolean;
    isProcessingError?: boolean;
    currentNotebook?: number;
    codeBlocks?: { [id: number]: {codeOutput: IProcessedCommand[], codeContent: string}};
    variables?: IVariable[];
}