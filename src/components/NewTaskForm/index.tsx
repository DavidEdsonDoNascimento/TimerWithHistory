import { useForm } from 'react-hook-form';
import { FormContainer, MinutesAmountInput, TaskInput } from './styles';
import * as zod from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const newTaskValidationSchema = zod.object({
	task: zod.string().min(1, 'Informe a tarefa'),
	minutesAmount: zod
		.number()
		.min(1, 'A tarefa precisa ser de no mínimo 5 minutos')
		.max(60, 'A tarefa precisa ser de no máximo 60 minutos'),
});

type NewTaskFormData = zod.infer<typeof newTaskValidationSchema>;

export const NewTaskForm = () => {
	const { register, handleSubmit, watch, reset } = useForm<NewTaskFormData>({
		resolver: zodResolver(newTaskValidationSchema),
		defaultValues: {
			task: '',
			minutesAmount: 0,
		},
	});

	const task = watch('task');

	return (
		<FormContainer>
			<label htmlFor='task'>Vou trabalhar em</label>
			<TaskInput
				id='task'
				placeholder='Nome da tarefa ...'
				list='task-suggestions'
				{...register('task')}
				disabled={activeTask}
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
				disabled={activeTask}
			/>

			<span>minutos.</span>
		</FormContainer>
	);
};
