import { Suspense } from 'react'
import { Backdrop, CircularProgress } from '@mui/material'

const Loading = ({ children }) => {
	return (
		<Suspense
			fallback={
				<>
					<Backdrop
						sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
						open
					>
						<CircularProgress color={'info'} />
					</Backdrop>
				</>
			}
		>
			{children}
		</Suspense>
	)
}

export default Loading
