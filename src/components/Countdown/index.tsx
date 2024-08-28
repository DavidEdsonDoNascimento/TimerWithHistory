import { useEffect, useState } from 'react';
import { CountdownContainer, Separator } from './styles';
import { differenceInSeconds } from 'date-fns';

type CountdownProps = {
	minutes: string;
	seconds: string;
};

export const Countdown = ({ minutes, seconds }: CountdownProps) => {
	const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
	const activeTask = tasks.find((t) => t.id == activeTaskId);
	const totalSeconds = activeTask ? activeTask.minutesAmount * 60 : 0;
	const currentSeconds = activeTask ? totalSeconds - amountSecondsPassed : 0;
	const minutesAmount = Math.floor(currentSeconds / 60);
	const secondsAmount = currentSeconds % 60;
	const minutesStr = String(minutesAmount).padStart(2, '0');
	const secondsStr = String(secondsAmount).padStart(2, '0');

	useEffect(() => {
		let interval: number;

		if (activeTask) {
			interval = setInterval(() => {
				const secondsDifference = differenceInSeconds(
					new Date(),
					activeTask.startDate
				);

				if (secondsDifference < totalSeconds) {
					setAmountSecondsPassed(secondsDifference);
					return;
				}

				setTasks((state) =>
					state.map((item) =>
						item.id != activeTaskId
							? item
							: {
									...item,
									finishedDate: new Date(),
							  }
					)
				);
				setAmountSecondsPassed(totalSeconds);
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
