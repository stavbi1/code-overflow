process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

import * as vscode from 'vscode';
import { search } from './commands/search/Search';

import { TreeDataProvider } from './vscode/QuestionDataProvider';

export function activate(context: vscode.ExtensionContext) {
	console.log('activating extension');
	const questionsTreeDataProvider = new TreeDataProvider();
	
	registerCommands(context, questionsTreeDataProvider);
	vscode.window.registerTreeDataProvider('questions', questionsTreeDataProvider);
}

// this method is called when your extension is deactivated
export function deactivate() { }


const registerCommands = (context: vscode.ExtensionContext, questionsTreeDataProvider: TreeDataProvider): void => {
	let disposableSearchCommand = vscode.commands.registerCommand(
		'code-overflow.search-stackoverflow',
		() => search(questionsTreeDataProvider)
	);

	context.subscriptions.push(disposableSearchCommand);
}