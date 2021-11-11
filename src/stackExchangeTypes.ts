/* eslint-disable @typescript-eslint/naming-convention */
export interface Owner {
  account_id: number;
  reputation: number;
  user_id: number;
  user_type: string;
  profile_image: string;
  display_name: string;
  link: string;
}

export interface Answer {
  owner: Owner;
  body_markdown: string;
}

export interface Item {
  tags: string[];
  answers: Answer[];
  owner: Owner;
  question_id: number;
  link: string;
  title: string;
}

export interface StackExchangeResult {
  items: Item[];
  has_more: boolean;
  quota_max: number;
  quota_remaining: number;
}