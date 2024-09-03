import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { defaultTheme } from './styles/themes/default';
import { Router } from './Router';
import { BrowserRouter } from 'react-router-dom';
import { TaskContextProvider } from './contexts/TaskContext';

export const App = () => {
	return (
		<ThemeProvider theme={defaultTheme}>
			<BrowserRouter>
				<TaskContextProvider>
					<Router />
				</TaskContextProvider>
				<GlobalStyle />
			</BrowserRouter>
		</ThemeProvider>
	);
};
