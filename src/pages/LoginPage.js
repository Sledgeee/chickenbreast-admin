import { Helmet } from 'react-helmet-async'
// @mui
import { styled } from '@mui/material/styles'
import { Container, Stack, Typography } from '@mui/material'
// hooks
import { useTranslation } from 'react-i18next'
import { useResponsive } from '../hooks'
// components
import Logo from '../components/logo'
// sections
import { LoginForm } from '../sections/auth/login'
import LanguagePopover from '../layouts/dashboard/header/LanguagePopover'

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
	[theme.breakpoints.up('md')]: {
		display: 'flex'
	}
}))

const StyledSection = styled('div')(({ theme }) => ({
	width: '100%',
	maxWidth: 480,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	boxShadow: theme.customShadows.card,
	backgroundColor: theme.palette.background.default
}))

const StyledContent = styled('div')(({ theme }) => ({
	maxWidth: 480,
	margin: 'auto',
	minHeight: '100vh',
	display: 'flex',
	justifyContent: 'center',
	flexDirection: 'column',
	padding: theme.spacing(12, 0)
}))

// ----------------------------------------------------------------------

export default function LoginPage() {
	const mdUp = useResponsive('up', 'md')
	const { t } = useTranslation()

	return (
		<>
			<Helmet>
				<title> {t('Login')} | Чікенбрест </title>
			</Helmet>

			<Stack sx={{ position: 'fixed', right: 0, m: { xs: 2, sm: 3, md: 4 } }}>
				<LanguagePopover />
			</Stack>

			<StyledRoot>
				<Logo
					sx={{
						position: 'fixed',
						top: { xs: 16, sm: 24, md: 40 },
						left: { xs: 16, sm: 24, md: 40 }
					}}
				/>

				{mdUp && (
					<StyledSection>
						<Typography variant='h3' sx={{ px: 5, mt: 10, mb: 5 }}>
							{t('WelcomeBack')}
						</Typography>
						<img
							src='/assets/illustrations/illustration_login.png'
							alt='login'
						/>
					</StyledSection>
				)}

				<Container maxWidth='sm'>
					<StyledContent>
						<Typography variant='h4' gutterBottom>
							{t('SignInTo')}
						</Typography>

						<Stack sx={{ my: 1 }}>
							<LoginForm />
						</Stack>
					</StyledContent>
				</Container>
			</StyledRoot>
		</>
	)
}