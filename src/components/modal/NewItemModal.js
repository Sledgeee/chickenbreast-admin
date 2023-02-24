import { useState } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import { Backdrop, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Iconify from '../iconify'

export default function NewItemModal({ handleCreate, children }) {
	const [open, setOpen] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { t } = useTranslation('modal')

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Button variant='contained' onClick={handleClickOpen}>
				<Iconify icon='eva:plus-fill' />
			</Button>
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
							const status = await handleCreate()
							setIsLoading(false)
							if (status === 1) {
								setOpen(false)
							} else if (status !== 0) {
								console.log(status)
							}
						}}
					>
						{t('Create')}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}
