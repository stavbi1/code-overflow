// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import open = require('open');
import * as vscode from 'vscode';
import { TreeDataProvider } from './questionDataProvider';
import { fetchStackExchangeQuery, formatItems } from './stackExchangeService';
import { getSelectedText } from './vsCodeUtil';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	const questionsTreeDataProvider = new TreeDataProvider();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "code-overflow" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('code-overflow.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from code-overflow!');
	});

	let disposableSearchCommand = vscode.commands.registerCommand('code-overflow.search-stackoverflow', async () => {
		const query = getSelectedText() || await vscode.window.showInputBox();
		if (!query) { return; }

		const rawResult = await fetchStackExchangeQuery(query);
		const parsedResult = formatItems(rawResult);
		
		// start custom of left side tab (in activity bar)
		questionsTreeDataProvider.setData(rawResult);
		questionsTreeDataProvider.refresh();

		const selectedQuestion = await vscode.window.showQuickPick(parsedResult.questions, { canPickMany: false });

		if (!selectedQuestion) { return; }

		await open(parsedResult.questionToLinkMapping[selectedQuestion]);

	});

	context.subscriptions.push(disposable);
	context.subscriptions.push(disposableSearchCommand);
	
	vscode.window.registerTreeDataProvider('questions', questionsTreeDataProvider);
}

// this method is called when your extension is deactivated
export function deactivate() { }
