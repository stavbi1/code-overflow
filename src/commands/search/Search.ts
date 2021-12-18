import * as open from 'open';
import * as vscode from 'vscode';

import StackExchange from '../../stack-exchange/StackExchange';
import { Item } from '../../stack-exchange/search/SearchResult';
import { getSelectedText } from '../../vscode/VsCodeUtil';
import { Question } from './SearchTypes';

export const search = async (setResults: (items: Item[]) => void): Promise<void> => {
    const query: string = getSelectedText() || await vscode.window.showInputBox();

	if (query) {
        const rawResult: Item[] = await StackExchange.search(query);
        const parsedResult: Question[] = parseItemsToQuestions(rawResult);
        
        // start of custom left side tab (in activity bar)
        setResults(rawResult);

        const selectedQuestion = await vscode.window.showQuickPick(
            parsedResult.map(result => result.question),
            { canPickMany: false }
        );

        if (selectedQuestion) { 
            await open(getLinkByQuestion(parsedResult, selectedQuestion));
        }
    }
};

const getLinkByQuestion = (questions: Question[], question: string): string =>
    questions.find(result => result.question === question).link;

const formatItemTitle = (item: Item): string => `
    ${item.is_answered ? '✅' : '🤔'} ${item.score}🔺 ${item.answer_count}❗
    ➡️ ${item.title} 🏷️ ${item.tags.join(',')} 👩‍💻 by ${item.owner.display_name}
`;

const parseItemsToQuestions = (rawItems: Item[]): Question[] => 
	rawItems?.map(item => ({ question: formatItemTitle(item), link: item.link })) || [];

