import { useEffect, useState } from 'react'
import { alpha } from '@mui/material/styles'
import { Box, IconButton, MenuItem, Popover, Stack } from '@mui/material'
import i18next from 'i18next'

const LANGS = [
	{
		value: 'uk',
		label: 'Українська',
		icon: '/assets/icons/ua_flag.svg'
	},
	{
		value: 'en',
		label: 'English',
		icon: '/assets/icons/usa_flag.svg'
	}
]

export default function LanguagePopover() {
	const [open, setOpen] = useState(null)
	const [iconToShow, setIconToShow] = useState(null)

	useEffect(() => {
		setIconToShow(LANGS.find(x => x.value === i18next.language).icon)
	}, [])

	const handleOpen = event => {
		setOpen(event.currentTarget)
	}

	const handleClose = () => {
		setOpen(null)
	}

	const handleChangeLang = async value => {
		await i18next.changeLanguage(value)
		setIconToShow(LANGS.find(x => x.value === i18next.language).icon)
		setOpen(null)
	}

	return (
		<>
			<IconButton
				onClick={handleOpen}
				sx={{
					padding: 0,
					width: 44,
					height: 44,
					...(open && {
						bgcolor: theme =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.focusOpacity
							)
					})
				}}
			>
				<img src={iconToShow} width='30' height='30' alt={'icon'} />
			</IconButton>

			<Popover
				open={Boolean(open)}
				anchorEl={open}
				onClose={handleClose}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				transformOrigin={{ vertical: 'top', horizontal: 'right' }}
				PaperProps={{
					sx: {
						'p': 1,
						'mt': 1.5,
						'ml': 0.75,
						'width': 180,
						'& .MuiMenuItem-root': {
							px: 1,
							typography: 'body2',
							borderRadius: 0.75
						}
					}
				}}
			>
				<Stack spacing={0.75}>
					{LANGS.map(option => (
						<MenuItem
							key={option.value}
							selected={option.value === i18next.language}
							onClick={() => handleChangeLang(option.value)}
						>
							<Box
								component='img'
								alt={option.label}
								src={option.icon}
								sx={{ width: 28, mr: 2 }}
							/>

							{option.label}
						</MenuItem>
					))}
				</Stack>
			</Popover>
		</>
	)
}
