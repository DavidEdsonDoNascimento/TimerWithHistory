import { useContext } from 'react';
import { TaskContext } from '../../contexts/TaskContext';
import { HistoryContainer, HistoryList, Status } from './styles';
import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const History = () => {
	const { tasks } = useContext(TaskContext);

	return (
		<HistoryContainer>
			<h1>Meu histórico</h1>
			<HistoryList>
				<table>
					<thead>
						<tr>
							<th>Tarefa</th>
							<th>Duração</th>
							<th>Início</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{tasks.length ? (
							tasks.map((task) => {
								return (
									<tr key={task.id}>
										<td>{task.name}</td>
										<td>{task.minutesAmount} minutos</td>
										<td>{formatDistanceToNow(
											task.startDate,
											{ addSuffix: true, locale: ptBR },
											)}</td>
										<td>
											{task.finishedDate ? (
												<Status current='completed'>Concluído</Status>
											) : task.interruptedDate ? (
												<Status current='interrupted'>Interrompido</Status>
											) : (
												<Status current='pending'>Em andamento</Status>
											)}
										</td>
									</tr>
								);
							})
						) : (
							<tr
								style={{
									textAlign: 'center',
								}}
							>
								Nenhuma tarefa executada.
							</tr>
						)}
					</tbody>
				</table>
			</HistoryList>
		</HistoryContainer>
	);
};
