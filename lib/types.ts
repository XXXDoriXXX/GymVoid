export interface Workout {
    id: string;
    title: string;
    day: string;
    muscleGroup: string;
    sets: number;
    reps: number;
    notes?: string;
}
