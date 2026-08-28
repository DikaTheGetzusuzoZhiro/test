export type Role = 'user' | 'admin';

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  email: string;
  bio: string | null;
  avatar_url: string | null;
  role: Role;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
}

export interface Resource {
  id: string;
  title: string;
  slug: string | null;
  description: string;
  category_id: string | null;
  cover_url: string | null;
  file_path: string;
  file_name: string;
  file_size: number;
  downloads: number;
  views: number;
  tags: string[];
  compatibility: string[];
  version: string;
  owner_id: string;          // gunakan owner_id bukan author_id
  status: 'draft' | 'published' | 'hidden';
  created_at: string;
  updated_at: string;
  profiles?: Profile;
  categories?: Category;
}
