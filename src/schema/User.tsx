export interface User {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    roleId?: number;
    profileImageURL?: string;
    lastLogin?: string;
    createdAt?: string;
    role?: Role;
    active?: boolean;
}

export interface IsUserLoggedIn {
    loggedIn?: boolean;
    user?: User;
}

export interface Role {
    id?: number;
    name?: string;
}

export interface UserFormFields {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    formErrors?: UserFormFieldError;
}

export interface UserFormFieldError {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export interface UserContextType {
    currentUser: IsUserLoggedIn;
    setCurrentUser: (current: IsUserLoggedIn) => void;
}

export interface UserFilterParams {
    pageSize: number;
    currentPage: number;
    q: string;
}