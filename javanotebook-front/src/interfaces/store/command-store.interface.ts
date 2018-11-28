import { IProcessedCommand } from '../processed-command.interface';

export interface ICommandStore {
    isProcessing?: boolean;
    isProcessingError?: boolean;
    codeBlocks?: { [id: number]: {codeOutput: IProcessedCommand[], codeContent: string}};
}