import { $api, $ky } from '../features/api'

export const AuthService = {
	async magicLogin(uid, username, otp, hash) {
		const response = await $ky.post('auth/magic-login', {
			json: {
				userId: uid,
				username,
				hash,
				otp,
				isMagic: true
			}
		})
		return response.json()
	},

	async tryLogin(username) {
		const response = await $ky.post('auth/login', {
			json: {
				username
			}
		})
		return response.json()
	},

	async checkOtp(id, otp) {
		const response = await $ky.post('auth/check-otp', {
			json: {
				id,
				otp
			}
		})
		return response.json()
	},

	async logout() {
		const response = await $api.post('auth/logout')
		localStorage.removeItem('user')
		localStorage.removeItem('token')
		return response.json()
	}
}
