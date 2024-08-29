import { useContext, useEffect, useState } from 'react';
import { CountdownContainer, Separator } from './styles';
import { differenceInSeconds } from 'date-fns';
import { TaskContext } from '../../pages/Home';

export const Countdown = () => {
	const {
		activeTask,
		activeTaskId,
		tasks,
		amountSecondsPassed,
		changedTimer,
		changedTaskToFinished,
	} = useContext(TaskContext);

	const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0;
	const currentSeconds = activeTask ? totalSeconds - amountSecondsPassed : 0;
	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;
	const minutes = String(minutesAmount).padStart(2, '0');
	const seconds = String(secondsAmount).padStart(2, '0');

	useEffect(() => {
		if (activeTask) {
			document.title = `${minutes}:${seconds}`;
		}
	}, [minutes, seconds, activeTask]);

	useEffect(() => {
		let interval: number;

		if (activeTask) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date(),
					activeTask.startDate
				);

				if (secondsDifference < totalSeconds) {
					changedTimer(secondsDifference);
					return;
				}

				changedTaskToFinished();
				changedTimer(totalSeconds);
				clearInterval(interval);
			}, 1000);
		}

		return () => {
			clearInterval(interval);
		};
	}, [activeTask, totalSeconds, activeTaskId, tasks]);

	return (
		<CountdownContainer>
			<span>{minutes[0]}</span>
			<span>{minutes[1]}</span>
			<Separator>:</Separator>
			<span>{seconds[0]}</span>
			<span>{seconds[1]}</span>
		</CountdownContainer>
	);
};
