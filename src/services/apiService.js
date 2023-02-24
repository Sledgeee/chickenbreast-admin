import { $api } from '../features/api'

export const API_ENDPOINTS = {
	ADMIN: 'admins',
	ORDER: 'orders',
	FEEDBACKS: 'contact/feedbacks'
}

export const ApiService = {
	async getAll(url) {
		const response = await $api.get(`${url}/`)
		return { data: await response.json(), status: response.status }
	},

	async createOne(url, json) {
		const response = await $api.post(`${url}/`, {
			json
		})
		return { data: await response.json(), status: response.status }
	},

	async updateOne(url, id, json) {
		const response = await $api.put(`${url}/${id}/`, {
			json
		})
		return { data: await response.json(), status: response.status }
	},

	async deleteOne(url, id) {
		const response = await $api.delete(`${url}/${id}/`)
		return { data: await response.json(), status: response.status }
	},

	async deleteMany(url, ids) {
		const response = await $api.post(`${url}/bulk-delete/`, {
			json: { ids }
		})
		return { status: response.status }
	}
}
