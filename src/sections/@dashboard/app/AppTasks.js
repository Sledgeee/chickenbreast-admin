import { useEffect, useState } from 'react'
import {
	Card,
	CardHeader,
	Checkbox,
	CircularProgress,
	FormControlLabel,
	Stack
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { API_ENDPOINTS, ApiService } from '../../../services/apiService'

export default function AppTasks() {
	const [isLoading, setIsLoading] = useState(false)
	const [configId, setConfigId] = useState('')
	const [runTasks, setRunTasks] = useState(false)
	const [keys, setKeys] = useState([])
	const [list, setList] = useState([])
	const { t } = useTranslation()

	useEffect(() => {
		;(async () => {
			setIsLoading(true)
			const { data, status } = await ApiService.getAll(
				API_ENDPOINTS.CRON,
				'crud/'
			)
			if (status === 200) {
				setConfigId(data[0]._id)
				setRunTasks(Boolean(data[0].run))
				setKeys(Object.keys(data[0].jobs))
				const values = Object.values(data[0].jobs)
				const tasks = []
				for (let i = 0; i < values.length; i += 1) {
					tasks.push({
						id: i + 1,
						label: `${values[i].description}`,
						run: Boolean(values[i].run)
					})
				}
				setList(tasks)
			}
			setIsLoading(false)
		})()
	}, [])

	const updateCron = runJobTasks => {
		const json = {
			run: Number(runJobTasks),
			jobs: {}
		}
		keys.forEach((value, index) => {
			json.jobs[value] = {
				run: Number(list[index].run),
				description: list[index].label
			}
		})
		ApiService.updateOne(API_ENDPOINTS.CRON, configId, json, 'crud/').catch(e =>
			console.log(e)
		)
		setRunTasks(runJobTasks)
	}

	return (
		<Card>
			{isLoading && (
				<Stack sx={{ alignItems: 'center', my: 10 }}>
					<CircularProgress color={'info'} />
				</Stack>
			)}
			{!isLoading && (
				<>
					<Stack sx={{ my: 1 }}>
						<TaskItem
							task={{ id: -1, run: runTasks, label: 'Запускати крон задачі?' }}
							onChange={() => {
								updateCron(!runTasks)
							}}
						/>
					</Stack>
					{runTasks && (
						<>
							<CardHeader title={t('Tasks')} />
							<Stack>
								{list.map((task, index) => (
									<TaskItem
										key={task.id}
										task={task}
										onChange={() => {
											const copy = list
											copy[index].run = !copy[index].run
											setList([...copy])
											updateCron(runTasks)
										}}
									/>
								))}
							</Stack>
						</>
					)}
				</>
			)}
		</Card>
	)
}

function TaskItem({ task, onChange }) {
	return (
		<Stack
			direction='row'
			sx={{
				px: 3,
				py: 0.75,
				...(!task.run && {
					color: 'text.disabled'
				})
			}}
		>
			<FormControlLabel
				control={<Checkbox checked={task.run} onChange={onChange} />}
				label={task.label}
			/>
		</Stack>
	)
}
