import { Task, TasksState } from '../../@types/task';
import { TaskActionType } from './actions';

export const tasksReducer = (
	currentState: TasksState,
	action: any
): TasksState => {
	console.log(action);
	if (TaskActionType.ADD_NEW_TASK === action.type) {
		return {
			tasks: [...currentState.tasks, action.payload.newTask || ({} as Task)],
			activeTaskId: action.payload.newTask?.id || '',
		};
	}

	if (TaskActionType.STOP_CURRENT_TASK === action.type) {
		return {
			tasks: currentState.tasks.map((item) => {
				return item.id === currentState.activeTaskId
					? {
							...item,
							interruptedDate: new Date(),
					  }
					: item;
			}),
			activeTaskId: '',
		};
	}

	return {
		tasks: currentState.tasks.map((item) => {
			return item.id === currentState.activeTaskId
				? {
						...item,
						finishedDate: new Date(),
				  }
				: item;
		}),
		activeTaskId: '',
	};
};
