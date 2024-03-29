import * as open from 'open';
import * as vscode from 'vscode';
import * as jsdom from 'jsdom';

import StackExchange from '../../stack-exchange/StackExchange';
import { Item } from '../../stack-exchange/search/SearchResult';
import { getConfigParameters, getSelectedText } from '../../vscode/VsCodeUtil';
import { Question } from './SearchTypes';
import { SidebarProvider } from '../../view/sidebar/SidebarProvider';
import { SearchRequestOptions } from '../../stack-exchange/search/SearchRequestOptions';

export const searchSelectedText = async (sidebar: SidebarProvider): Promise<void> => {
    return searchQuery(sidebar, getSelectedText());
};

export const searchPromptedText = async (sidebar: SidebarProvider): Promise<void> => {
    return searchQuery(sidebar, await vscode.window.showInputBox());
};

export const searchQuery = async (sidebar: SidebarProvider, query: string): Promise<void> => {
    if (query) {
        const configParameters: SearchRequestOptions = await getConfigParameters();
        const rawResult: Item[] = await StackExchange.search(query, configParameters);

        if (rawResult.length > 0) {
            const parsedResult: Question[] = parseItemsToQuestions(rawResult);

            // start of custom left side tab (in activity bar)
            sidebar.sendMessageToSidebar({ type: 'searchResult', value: parsedResult });

            const selectedQuestion = await vscode.window.showQuickPick(
                parsedResult.map(result => result.question),
                { canPickMany: false }
            );

            if (selectedQuestion) {
                await open(getLinkByQuestion(parsedResult, selectedQuestion));
            }
        } else {
            vscode.window.showWarningMessage('No results found, try to elaborate..');
        }
    }
};

const getLinkByQuestion = (questions: Question[], question: string): string =>
    questions.find(result => result.question === question).link;

const formatItemTitle = (item: Item): string => `
    ${item.is_answered ? '✅' : '🤔'} ${item.score}🔺 ${item.answer_count}❗
    ➡️ ${unescapeHtml(item.title)} 🏷️ ${item.tags.join(',')} 👩‍💻 by ${item.owner.display_name}
`;

const parseItemsToQuestions = (rawItems: Item[]): Question[] =>
    rawItems?.map(item => ({ question: formatItemTitle(item), link: item.link })) || [];


const unescapeHtml = (html: string) => {
    const dom = new jsdom.JSDOM(`<!DOCTYPE html><p>${html}</p>`);

    return dom.window.document.querySelector("p").textContent;
}