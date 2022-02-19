import * as vscode from 'vscode';

export class ErrorsQuickFixProvider implements vscode.CodeActionProvider {

	public static readonly providedCodeActionKinds = [
		vscode.CodeActionKind.QuickFix
	];

	provideCodeActions(document: vscode.TextDocument, range: vscode.Range | vscode.Selection, context: vscode.CodeActionContext, token: vscode.CancellationToken): vscode.CodeAction[] {
		return context.diagnostics
			.filter(diagnostic => diagnostic.severity === vscode.DiagnosticSeverity.Error)
			.map(diagnostic => this.createCommandCodeAction(diagnostic));
	}

	private createCommandCodeAction(diagnostic: vscode.Diagnostic): vscode.CodeAction {
		const action: vscode.CodeAction = new vscode.CodeAction('🕵️search error in stackoverflow🕵️', vscode.CodeActionKind.QuickFix);
		action.command = { command: 'code-overflow.search-stackoverflow-args', arguments: [diagnostic.message], title: '🕵️search error in stackoverflow🕵️' };
		action.diagnostics = [diagnostic];
		action.isPreferred = true;
		return action;
	}
}