export type Task = {
	id: string;
	name: string;
	minutesAmount: number;
	startDate: Date;
	interruptedDate?: Date;
	finishedDate?: Date;
};

export type TasksState = {
	tasks: Task[];
	activeTaskId: string;
};

export interface TaskContextType {
	tasks: Task[] | [];
	activeTask: Task;
	activeTaskId: string | null;
	amountSecondsPassed: number;
	changedTimer: (totalSecondsElapsed: number) => void;
	changedTaskToFinished: () => void;
	createNewTask: (data: NewTaskFormData) => void;
	stopTask: () => void;
}
export type NewTaskFormData = {
	task: string;
	minutesAmount: number;
};

export type TaskContextProviderProps = {
	children: React.ReactNode;
};
