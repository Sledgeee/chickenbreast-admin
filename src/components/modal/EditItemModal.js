import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { Backdrop, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function EditItemModal({
	open,
	handleClose,
	handleUpdate,
	children
}) {
	const [isLoading, setIsLoading] = useState(false)
	const { t } = useTranslation('modal')

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>{t('CreateNewItem')}</DialogTitle>
				{children}
				{isLoading && (
					<Backdrop
						sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
						open
					>
						<CircularProgress color={'info'} />
					</Backdrop>
				)}
				<DialogActions>
					<Button variant={'outlined'} onClick={handleClose}>
						{t('Cancel')}
					</Button>
					<Button
						variant={'contained'}
						onClick={async () => {
							setIsLoading(true)
							const status = await handleUpdate()
							setIsLoading(false)
							if (status === 1) {
								handleClose()
							} else if (status !== 0) {
								console.log(status)
							}
						}}
					>
						{t('Update')}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
