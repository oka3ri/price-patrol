import axios from 'axios'
import { mapGetters } from 'vuex'
import store from '../store/index'
axios.defaults.serverIp = import.meta.env.VITE_APP_SERVER_IP
axios.defaults.baseURL = axios.defaults.serverIp + '/'

// 요청 인터셉터
axios.interceptors.request.use(
	(config) => {
		// API 요청을 보내기 전에 수행(baseURL 추가)
		config.url =
			config.url.includes('http://') || config.url.includes('https://')
				? config.url
				: axios.defaults.baseURL + config.url

		return config
	},
	(error) => {
		// 요청 오류 처리
		return Promise.reject(error)
	}
)

// 응답 인터셉터
axios.interceptors.response.use(
	(res) => res,
	async (err) => {
		const {
			config,
			response: { status },
		} = err

		return Promise.reject(err)
	}
)

const methods = {
	async axios(method, url, params, header) {
		let $_res = ''
		if (method == 'GET') {
			$_res = axios({
				method: 'GET',
				url: url,
				params: params,
				headers: header,
			}).then((res) => {
				if (res.status === 200 || res.status === 204) {
					return res.data
				} else {
					return false
				}
			})
		} else if (method == 'POST') {
			$_res = axios({
				method: 'POST',
				url: url,
				data: params,
				headers: header,
			})
				.then((res) => {
					if (res.status === 200) {
						return res.data
					} else {
						return false
					}
				})
				.catch((err) => {
					return err
				})
		} else if (method == 'PUT') {
			$_res = axios({
				method: 'PUT',
				url: url,
				data: params,
				headers: header,
			})
				.then((res) => {
					if (res.status === 200) {
						return res.data
					} else {
						return false
					}
				})
				.catch((err) => {
					return err
				})
		} else if (method == 'DELETE') {
			$_res = axios({
				method: 'DELETE',
				url: url,
				params: params,
				headers: header,
			})
				.then((res) => {
					if (res.status === 200) {
						return res.data
					} else {
						return false
					}
				})
				.catch((err) => {
					return err
				})
		}
		return $_res
	},
}

export default {
	data() {
		return {}
	},
	computed: {},
	methods: {},
	install(Vue) {
		Vue.config.globalProperties.$_axios = methods.axios
	},
}
