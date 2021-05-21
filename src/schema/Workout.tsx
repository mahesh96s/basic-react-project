export interface WorkoutFilterParams {
    pageSize?: number;
    currentPage?: number;
    searchText?: string;
    includeTags?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
    bookmarked?: boolean;
    active?: string;
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