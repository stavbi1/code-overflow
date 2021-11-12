import * as vscode from 'vscode';

export const getSelectedText = () => {
  const activeTextEditor = vscode.window.activeTextEditor;
  const selection = activeTextEditor?.selection;  
  if (activeTextEditor && selection) {
    return activeTextEditor?.document.getText(new vscode.Range(selection.start, selection.end));
  }
  return "";
};