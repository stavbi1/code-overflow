import * as vscode from 'vscode';
import { SearchOption, SearchRequestOptions } from '../stack-exchange/search/SearchRequestOptions';

export const getSelectedText = (): string => {
	const activeTextEditor: vscode.TextEditor = vscode.window.activeTextEditor;
	const selection: vscode.Selection = activeTextEditor?.selection;  

	if (activeTextEditor && selection) {
		return activeTextEditor?.document.getText(new vscode.Range(selection.start, selection.end));
	}
	
	return "";
};

export const getConfigParameters = async (): Promise<SearchRequestOptions> => {
	const configOptions: SearchOption[] = ['tagged', 'sort', 'order'];

	return configOptions.reduce((prev, current) => {
		const option: string = vscode.workspace.getConfiguration().get(`conf.search.${current}`);

		if (option) {
			return {...prev, [current]: option};
		}
		else {
			return prev;
		}
	}, {});
};