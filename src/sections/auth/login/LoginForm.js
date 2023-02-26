import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CircularProgress, Stack, TextField } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useTranslation } from 'react-i18next'
import { AuthService } from '../../../services/authService'

export default function LoginForm() {
	const navigate = useNavigate()
	const [errored, setErrored] = useState(false)
	const [username, setUsername] = useState('')
	const [otp, setOtp] = useState('')
	const [attemptId, setAttemptId] = useState('')
	const [loginFormVisibility, setLoginFormVisibility] = useState(true)
	const [confirmLoginVisibility, setConfirmLoginVisibility] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const { t } = useTranslation(['common', 'table'])

	const handleUsernameChange = event => {
		if (errored) {
			setErrored(false)
		}
		setUsername(event.target.value)
	}

	const handleOtpChange = event => {
		if (errored) {
			setErrored(false)
		}
		setOtp(event.target.value)
	}

	const handleLoginClick = async () => {
		setErrored(false)
		if (!username) {
			setErrored(true)
			return
		}
		setLoginFormVisibility(false)
		setIsLoading(true)
		try {
			const response = await AuthService.tryLogin(username)
			if (response.accepted === true) {
				const { attemptId } = response
				setAttemptId(attemptId)
				setConfirmLoginVisibility(true)
			}
		} catch (e) {
			setLoginFormVisibility(true)
			setErrored(true)
		}
		setIsLoading(false)
	}

	const handleCheckOtpClick = async () => {
		setErrored(false)
		if (!otp) {
			setErrored(true)
			return
		}
		setConfirmLoginVisibility(false)
		setIsLoading(true)
		try {
			const { success, admin, tokens } = await AuthService.checkOtp(
				attemptId,
				otp
			)
			const { accessToken } = tokens
			if (success) {
				localStorage.setItem('user', JSON.stringify(admin))
				localStorage.setItem('token', accessToken)
				navigate('/', { replace: true })
			} else {
				setErrored(true)
			}
		} catch (e) {
			setConfirmLoginVisibility(true)
			setErrored(true)
		}
		setIsLoading(false)
	}

	return (
		<>
			{isLoading && (
				<Stack sx={{ alignItems: 'center' }}>
					<CircularProgress color='info' />
				</Stack>
			)}
			{loginFormVisibility && (
				<Stack>
					<p>{t('SignInToDescription')}</p>
					<Stack spacing={3}>
						<TextField
							onChange={handleUsernameChange}
							name='email'
							label={t('Username', { ns: 'table' })}
							error={errored}
						/>
					</Stack>

					<Stack sx={{ my: 3 }}>
						<LoadingButton
							fullWidth
							size='large'
							type='submit'
							variant='contained'
							onClick={handleLoginClick}
						>
							{t('SignIn')}
						</LoadingButton>
					</Stack>
				</Stack>
			)}
			{confirmLoginVisibility && (
				<Stack>
					<p>{t('BotSentMessage')}</p>
					<Stack spacing={3}>
						<TextField
							onChange={handleOtpChange}
							name='otp'
							label='OTP'
							error={errored}
						/>
					</Stack>

					<Stack sx={{ my: 3 }}>
						<LoadingButton
							fullWidth
							size='large'
							type='submit'
							variant='contained'
							onClick={handleCheckOtpClick}
						>
							{t('CheckOTP')}
						</LoadingButton>
					</Stack>
					<b>{t('BotWarn')}</b>
				</Stack>
			)}
		</>
	)
}
