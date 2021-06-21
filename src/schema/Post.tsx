import { User } from "./User";

export interface Post {
    id?: number;
    description?: string;
    userId?: number;
    deletedAt?: string;
    created_at?: string;
    updated_at?: string;
    status?: string;
    createdBy?: User;
    liked?: boolean;
    likesCount?: number;
    favourited?: boolean;
    commentsCount?: number;
}

