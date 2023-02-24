import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { useTranslation } from 'react-i18next'

export default function ConfigDialog({ open, handleClose, handleYes }) {
	const { t } = useTranslation('modal')

	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle>{t('AskAction')}</DialogTitle>
			<DialogActions>
				<Button variant={'outlined'} onClick={handleClose}>
					{t('Cancel')}
				</Button>
				<Button variant={'contained'} onClick={handleYes}>
					{t('Yes')}
				</Button>
			</DialogActions>
		</Dialog>
	)
}
