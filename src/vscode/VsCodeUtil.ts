const langMap = require('lang-map');

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
	const searchRequestOptions: SearchRequestOptions = {};

	const autoTag: boolean = vscode.workspace.getConfiguration().get('conf.search.autoTag');
	if (autoTag && vscode.window.activeTextEditor) {
		searchRequestOptions.tagged = getUserLanguage();
	}

	return configOptions.reduce((prev, current) => {
		const option: string = vscode.workspace.getConfiguration().get(`conf.search.${current}`);

		if (option) {
			return {...prev, [current]: option};
		}
		else {
			return prev;
		}
	}, searchRequestOptions);
};

const getUserLanguage = (): string => {
	const fileName: string = vscode.window.activeTextEditor?.document?.fileName;
	const extensionList: string[] = fileName.split('.');

	const languages = langMap.languages(extensionList[extensionList.length - 1]);

	return languages && languages[0];
};