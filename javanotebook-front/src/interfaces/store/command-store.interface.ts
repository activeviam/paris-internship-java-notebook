import { IProcessedCommand } from '../processed-command.interface';

export interface ICommandStore {
    isProcessing?: boolean;
    isProcessingError?: boolean;
    codeOutput?: IProcessedCommand[];
}