import { Task } from '../../@types/task';

export enum TaskActionType {
	ADD_NEW_TASK = 'ADD_NEW_TASK',
	STOP_CURRENT_TASK = 'STOP_CURRENT_TASK',
	END_CURRENT_TASK = 'END_CURRENT_TASK',
}

export const addNewTaskAction = (newTask: Task) => {
	return {
		type: TaskActionType.ADD_NEW_TASK,
		payload: { newTask },
	};
};

export const stopCurrentTaskAction = () => {
	return {
		type: TaskActionType.STOP_CURRENT_TASK,
	};
};

export const endCurrentTaskAction = () => {
	return {
		type: TaskActionType.END_CURRENT_TASK,
	};
};
