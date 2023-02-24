import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import { Box, Button, Container, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'

const StyledContent = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	padding: theme.spacing(12, 0)
}))

export default function Page404() {
	const { t } = useTranslation()
	const navigate = useNavigate()

	const handleClickHome = () => {
		navigate('/', { replace: true })
	}

	return (
		<>
			<Helmet>
				<title> 404 | KI2 Helper </title>
			</Helmet>

			<Container>
				<StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
					<Typography variant='h3' paragraph>
						{t('PageNotFound')}
					</Typography>

					<Typography sx={{ color: 'text.secondary' }}>
						{t('PageNotFoundDescription')}
					</Typography>

					<Box
						component='img'
						src='/assets/illustrations/illustration_404.svg'
						sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
					/>

					<Button size='large' variant='contained' onClick={handleClickHome}>
						{t('GoToHome')}
					</Button>
				</StyledContent>
			</Container>
		</>
	)
}
