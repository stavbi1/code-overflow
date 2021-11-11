import axios from "axios";
import { StackExchangeResult } from "./stackExchangeTypes";


export const getRelevantQuestions = async (query: string) => {
  const stackExchangeUrl = `https://api.stackexchange.com/2.3/similar`;
  const defaultParams = {
    page: "1",
    pagesize: "5",
    order: "desc",
    sort: "relevance",
    site: "stackoverflow",
    filter: "!)5cCAwFkT3Sn*YJBWzSPjABVPLSf"
  };

  const res = await axios.get<StackExchangeResult>(stackExchangeUrl, {
    params: {
      ...defaultParams,
      title: query
    }
  });
  return res.data;
};