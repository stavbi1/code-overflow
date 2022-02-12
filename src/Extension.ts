process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import * as vscode from 'vscode';
import { ErrorsQuickFixProvider } from './commands/quick-fix/ErrorsQuickFixProvider';
import { searchPromptedText, searchQuery, searchSelectedText } from './commands/search/Search';
import { SidebarProvider } from './view/sidebar/SidebarProvider';

export async function activate(context: vscode.ExtensionContext) {
	const sidebarProvider = new SidebarProvider(context.extensionUri);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			"questions",
			sidebarProvider
		)
	);

	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider({ pattern: "*" }, new ErrorsQuickFixProvider(), {
			providedCodeActionKinds: ErrorsQuickFixProvider.providedCodeActionKinds
		})
	);

	registerCommands(context, sidebarProvider);
}

// this method is called when your extension is deactivated
export function deactivate() { }


const registerCommands = (context: vscode.ExtensionContext, sidebarProvider: SidebarProvider): void => {
	context.subscriptions.push(vscode.commands.registerCommand(
		'code-overflow.search-stackoverflow',
		() => searchPromptedText(sidebarProvider)
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'code-overflow.search-stackoverflow-selected',
		() => searchSelectedText(sidebarProvider)
	));

	context.subscriptions.push(vscode.commands.registerCommand(
		'code-overflow.search-stackoverflow-args',
		(query: string) => searchQuery(sidebarProvider, query)
	));
};