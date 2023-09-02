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
