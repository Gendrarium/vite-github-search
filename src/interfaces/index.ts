export interface IRepository {
  url: string;
  name: string;
  description: string;
  updatedAt: string;
  owner: { login: string };
  stargazerCount: number;
}

export interface IRepositoryAll extends IRepository {
  owner: { login: string; avatarUrl?: string; url: string };
  languages: { languages: { language: { name: string } }[] };
}
