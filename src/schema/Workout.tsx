export interface WorkoutFilterParams {
    pageSize?: number;
    currentPage?: number;
    searchText?: string;
    includeTags?: string;
    createdBy?: number;
    status?: string;
    startDate?: string;
    endDate?: string;
}

export interface Workout {
    id?: number;
    title?: string;
    description?: string;
    active?: boolean;
    status?: string;
    videoId?: string;
    videoUrl?: string;
    videoThumbnailUrl?: string;
    updated_at?: string;
    created_at?: string;
    bookmarked?: boolean;
}