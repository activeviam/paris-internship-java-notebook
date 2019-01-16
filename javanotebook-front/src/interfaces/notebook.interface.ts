import { ICodeSnippet } from './code-snippet.interface';

export interface INotebook {
    id: string;
    name: string;
    description: string;
    codeSnippets?: ICodeSnippet[];
}