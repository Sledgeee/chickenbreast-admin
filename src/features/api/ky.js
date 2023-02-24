import ky from 'ky'

const URL = 'https://chickenapi-1-r8060741.deta.app'

export const $ky = ky.create({
	prefixUrl: URL,
	credentials: 'include',
	mode: 'cors'
})

export const $api = $ky.extend({
	hooks: {
		beforeRequest: [
			request => {
				const token = localStorage.getItem('token')
				request.headers.set('Authorization', `Bearer ${token}`)
			}
		],
		afterResponse: [
			async (request, options, response) => {
				if (response.status === 401) {
					const response = await $ky.get(`auth/refresh`)
					if (response.status === 200) {
						const { accessToken, admin } = await response.json()
						localStorage.setItem('user', JSON.stringify(admin))
						localStorage.setItem('token', accessToken)
						request.headers.set('Authorization', `Bearer ${accessToken}`)
						return ky(request)
					}
				}
				return response
			}
		]
	}
})
