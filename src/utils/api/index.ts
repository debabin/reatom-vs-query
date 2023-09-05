import { api } from './instance';

export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
}

export const getUsers = () => api.get<User[]>('/users');
export const getUser = (id: string) => api.get<User>(`/users/${id}`);
export const getUserProjects = (id: string) => api.get<Project[]>(`/users/${id}/projects`);

export const getUsersPagination = (queries: Record<string, number>) =>
  api.get<{
    users: User[];
    head: {
      back: number | null;
      next: number | null;
      pages: number;
      total: number;
    };
  }>('/users', { params: queries });

export const changeUser = (user: User) => api.put('/users', user);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserWithSignal = (signal: any, id: string) =>
  api.get<User>(`/users/${id}`, { signal });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDataWithSignal = (signal: any, id: string, type: 'friends' | 'projects') =>
  api.get<Project[] | User[]>(`/data/${id}`, { signal, params: { type } });
