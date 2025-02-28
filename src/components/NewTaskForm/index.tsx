import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { TaskContext } from '../../contexts/TaskContext';

export const NewTaskForm = () => {
	const { activeTask } = useContext(TaskContext);
	const { register } = useFormContext();

	return (
		<FormContainer>
			<label htmlFor='task'>Vou trabalhar em</label>
			<TaskInput
				id='task'
				placeholder='Nome da tarefa ...'
				list='task-suggestions'
				{...register('task')}
				disabled={!!activeTask}
			/>
			<datalist id='task-suggestions'>
				<option value='projeto 1' />
				<option value='projeto 2' />
				<option value='projeto 3' />
				<option value='Roteiro' />
			</datalist>
			<label htmlFor='minutesAmount'>durante</label>
			<MinutesAmountInput
				id='minutesAmount'
				type='number'
				placeholder='00'
				step={5}
				min={1}
				max={60}
				{...register('minutesAmount', {
					valueAsNumber: true,
				})}
				disabled={!!activeTask}
			/>

			<span>minutos.</span>
		</FormContainer>
	);
};
