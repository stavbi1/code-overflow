import * as vscode from 'vscode';

export const getSelectedText = (): string => {
    const activeTextEditor: vscode.TextEditor = vscode.window.activeTextEditor;
    const selection: vscode.Selection = activeTextEditor?.selection;  

    if (activeTextEditor && selection) {
      return activeTextEditor?.document.getText(new vscode.Range(selection.start, selection.end));
    }
    
    return "";
  };