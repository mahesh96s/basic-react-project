import React from 'react';
import { render, cleanup, fireEvent, waitFor, screen, act } from '@testing-library/react';
import WorkoutList from './WorkoutList';

const CardioWorkouts = {
    id: 1,
    title: "Cardio",
    description : "Some details about workout",
    active: false,
    status: "APPROVED",
    videoId: "1234356",
    videoUrl: "https://player.vimeo.com/external/310830640.m3u8?s=ca9056e6f65814878a190c8b43155fc51c8d2ebf&oauth2_token_id=abc",
    videoThumbnailUrl: "https://i.vimeocdn.com/video/751504735_295x166.jpg?r=pad",
    videoLength: "42",
    updated_at: "2019-03-15T06:50:48.187Z",
    created_at: "2019-03-15T06:50:48.187Z",
    bookmarked: false
};

const breathingWorkout = {
    id: 2,
    title: "Breathing",
    description : "Some details about workout",
    createdBy : "3",
    active: false,
    status: "APPROVED",
    videoId: "3243567",
    videoUrl: "https://player.vimeo.com/external/310830640.m3u8?s=ca9056e6f65814878a190c8b43155fc51c8d2ebf&oauth2_token_id=abc",
    videoThumbnailUrl: "https://i.vimeocdn.com/video/751504735_295x166.jpg?r=pad",
    videoLength: "42",
    updated_at: "2019-03-15T06:50:48.187Z",
    created_at: "2019-03-15T06:50:48.187Z",
    trainer: {
      id: 3,
      firstName: "Trainer",
      lastName: " User",
      profileImageURL: "https://dev.junkyardgym.com/api/users/1/profile-image/1595401897506-sample.jpg"
    },
    bookmarked: true
};

jest.mock("../../services/workoutAPI", () => ({
    getWorkoutsList: jest.fn((workoutFilterParams?) => {
        if (workoutFilterParams.searchText === 'cardio') {
            return Promise.resolve({
                totalItems: 0,
                totalPages: 0,
                workouts: [CardioWorkouts]
            });
        } else if (workoutFilterParams.searchText === 'pull ups') {
            return Promise.resolve({
                totalItems: 0,
                totalPages: 0,
                workouts: []
            });
        }
        return Promise.resolve({
            totalItems: 0,
            totalPages: 0,
            workouts: [CardioWorkouts, breathingWorkout]
        });
    }),
    getMediaTypes: jest.fn(() => Promise.resolve([
        {
            id: 1,
            type: "video"
        },
        {
            id: 2,
            type: "article"
        }
    ]))
}));

afterEach(() => {
    jest.clearAllMocks();
    return cleanup;
});

describe('Workout list', () => {

    test('Rendering Workout list', async () => {
        act(() => {
            render(<WorkoutList />);
        });
        await waitFor(() => {
            expect(screen.queryByText('Workouts')).toBeInTheDocument();
        });
    });

    test('Search by valid workout name', async () => {
        act(() => {
            render(<WorkoutList />);
        });
        const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
        act(() => {
            fireEvent.change(searchInput, { target: { value: 'cardio' } });
        });
        await waitFor(() => {
            expect(screen.queryByText('Cardio')).toBeInTheDocument();
            expect(screen.getByText(/^Last updated/).textContent).toBe('Last updated March 15, 2019')
        });
    });

    test('Search by Invalid workout name', async () => {
        act(() => {
            render(<WorkoutList />);
        });
        const searchInput = screen.getByPlaceholderText('Search') as HTMLInputElement;
        act(() => {
            fireEvent.change(searchInput, { target: { value: 'pull ups' } });
        });
        await waitFor(() => {
            expect(screen.queryByText('No Workouts found')).toBeInTheDocument();
        });
    });

    test('It should open filter popup', async () => {
        act(() => {
            render(<WorkoutList />);
        });
        const filterButton = screen.getByRole('button', {name: 'Filter'}) as HTMLInputElement;
        act(() => {
            fireEvent.click(filterButton);
        });
        await waitFor(() => {
            expect(screen.queryByText('Workout Filter')).toBeInTheDocument();
        });
    });

});