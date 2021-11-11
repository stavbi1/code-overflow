import axios from "axios";
import { Item, StackExchangeResult } from "./stackExchangeTypes";

const formatItemTitle = (item: Item) => `${item.is_answered ? '✅' : '🤔'} ${item.score}🔺 ${item.answer_count}❗ ➡️ ${item.title} 🏷️ ${item.tags.join(',')} 👩‍💻 by ${item.owner.display_name}`;

const generateQuestionToLinkMapping = (items: { question: string; link: string; }[]) => {
  const questionToLinkMapping: { [title: string]: string } = {};
  for (const item of items) {
    questionToLinkMapping[item.question] = item.link;
  }

  return questionToLinkMapping;
};

export const getRelevantQuestions = async (query: string) => {
  const stackExchangeUrl = `https://api.stackexchange.com/2.3/similar`;
  const defaultParams = {
    page: "1",
    pagesize: "5",
    order: "desc",
    sort: "relevance",
    site: "stackoverflow",
    filter: "!-NHuCSBI(mK9lANRoU-O9)grUAKH9Ze7-"
  };

  const res = await axios.get<StackExchangeResult>(stackExchangeUrl, {
    params: {
      ...defaultParams,
      title: query
    }
  });
  const parsedItems = res.data?.items?.map(item => ({ question: formatItemTitle(item), link: item.link })) || [];
  
  return {
    questions: parsedItems.map(item => item.question),
    questionToLinkMapping: generateQuestionToLinkMapping(parsedItems)
  };
};
