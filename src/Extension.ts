process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

import * as vscode from 'vscode';
import { search } from './commands/search/Search';
import { SidebarProvider } from './view/sidebar/SidebarProvider';

export function activate(context: vscode.ExtensionContext) {	
	registerCommands(context);
	
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"questions",
			sidebarProvider
		)
	);
}

// this method is called when your extension is deactivated
export function deactivate() { }


const registerCommands = (context: vscode.ExtensionContext): void => {
	context.subscriptions.push(vscode.commands.registerCommand(
		'code-overflow.search-stackoverflow',
		() => search(null)
	));
};