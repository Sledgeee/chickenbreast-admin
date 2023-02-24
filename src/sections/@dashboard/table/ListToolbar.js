import { useState } from 'react'
import PropTypes from 'prop-types'
// @mui
import { alpha, styled } from '@mui/material/styles'
import {
	IconButton,
	InputAdornment,
	OutlinedInput,
	Toolbar,
	Tooltip,
	Typography
} from '@mui/material'
// component
import { useTranslation } from 'react-i18next'
import Iconify from '../../../components/iconify'
import { ConfirmDialog } from '../../../components/confirm-dialog'

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
	height: 96,
	display: 'flex',
	justifyContent: 'space-between',
	padding: theme.spacing(0, 1, 0, 3)
}))

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
	'width': 240,
	'transition': theme.transitions.create(['box-shadow', 'width'], {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.shorter
	}),
	'&.Mui-focused': {
		width: 320,
		boxShadow: theme.customShadows.z8
	},
	'& fieldset': {
		borderWidth: `1px !important`,
		borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`
	}
}))

// ----------------------------------------------------------------------

ListToolbar.propTypes = {
	numSelected: PropTypes.number,
	filterName: PropTypes.string,
	onFilterName: PropTypes.func
}

export default function ListToolbar({
	numSelected,
	filterName,
	onFilterName,
	handleDelete
}) {
	const [open, setOpen] = useState(false)
	const { t } = useTranslation('table')

	return (
		<StyledRoot
			sx={{
				...(numSelected > 0 && {
					color: 'primary.main',
					bgcolor: 'primary.lighter'
				})
			}}
		>
			{numSelected > 0 ? (
				<Typography component='div' variant='subtitle1'>
					{numSelected} {t('Selected')}
				</Typography>
			) : (
				<StyledSearch
					value={filterName}
					onChange={onFilterName}
					placeholder={t('Search')}
					startAdornment={
						<InputAdornment position='start'>
							<Iconify
								icon='eva:search-fill'
								sx={{ color: 'text.disabled', width: 20, height: 20 }}
							/>
						</InputAdornment>
					}
				/>
			)}

			<ConfirmDialog
				open={open}
				handleClose={() => setOpen(false)}
				handleYes={() => {
					handleDelete()
					setOpen(false)
				}}
			/>

			{numSelected > 0 && (
				<Tooltip title={t('Delete')}>
					<IconButton onClick={() => setOpen(true)}>
						<Iconify icon='eva:trash-2-fill' />
					</IconButton>
				</Tooltip>
			)}
		</StyledRoot>
	)
}
