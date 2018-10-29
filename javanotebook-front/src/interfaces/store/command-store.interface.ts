export interface ICommandStore {
    isProcessing?: boolean;
    isProcessingError?: boolean;
    commandOutput?: string;
}