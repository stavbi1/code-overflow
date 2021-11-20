import * as vscode from 'vscode';

import { Item } from '../stack-exchange/search/SearchResult';

export class TreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
	private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined | null | void> = new vscode.EventEmitter<TreeItem | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;

	refresh(): void {
		this._onDidChangeTreeData.fire();
	}
	data: TreeItem[];

	constructor() {
		this.data = [];
	}

	setData(items: Item[] = []) {
		this.data = items.map(item =>
			new TreeItem(item.title, item.answers?.map(answer => new TreeItem(answer.body_markdown)) || []));
	}

	getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}

	getChildren(element?: TreeItem | undefined): vscode.ProviderResult<TreeItem[]> {
		if (element === undefined) {
			return this.data;
		}
		
		return element.children;
	}
}

class TreeItem extends vscode.TreeItem {
	children: TreeItem[] | undefined;

	constructor(label: string, children?: TreeItem[]) {
		super(
			label,
			children === undefined ?
				vscode.TreeItemCollapsibleState.None :
				vscode.TreeItemCollapsibleState.Expanded
		);
		this.children = children;
	}
}