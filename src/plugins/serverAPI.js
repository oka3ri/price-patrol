import axios from 'axios'
import { mapGetters } from 'vuex'
import store from '../store/index'
import router from '../router/index'
axios.defaults.serverIp = import.meta.env.VITE_APP_SERVER_IP
axios.defaults.baseURL = axios.defaults.serverIp + '/'
const REFRESH_URL = import.meta.env.VITE_APP_SERVER_IP + '/admin/refresh'

// 요청 인터셉터
axios.interceptors.request.use(
	(config) => {
		// API 요청을 보내기 전에 수행(baseURL 추가, header에 token 추가)
		config.url =
			config.url.includes('http://') || config.url.includes('https://')
				? config.url
				: axios.defaults.baseURL + config.url
		let $_token =
			config.url == REFRESH_URL
				? store.getters.adminRefToken
				: store.getters.adminAccToken

		if ($_token !== null && config.url.includes(axios.defaults.baseURL)) {
			config.headers.Authorization = `Bearer ${$_token}`
		}
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
		//
		const {
			config,
			response: { status },
		} = err

		// JWT 재발급 응답, 401 에러가 아닌 응답, JWT 재발급 요청 후의 에러 응답일 때는 reject
		if (config.url === REFRESH_URL || status !== 401 || config.sent) {
			return Promise.reject(err)
		}

		// 401에러 응답으로 인해 JWT 재발급 요청 및 API 재 호출
		try {
			config.sent = true

			const accessToken = await methods.getRefreshToken()
			if (accessToken) {
				config.headers.Authorization = `Bearer ${accessToken}`
			} else {
				store.commit('resetAdmin')
				router.push({ name: 'login' })
			}
			return await axios(config)
		} catch (err) {
			console.log(err)
			throw err
		}
	}
)

const methods = {
	// async admin_get(url, params) {
	// 	if (this.$store.getters.userAccToken == null) {
	// 		alert('로그인이 필요한 서비스입니다.')
	// 		this.$_goTo({ name: 'login' })
	// 	} else {
	// 		let $_url = axios.defaults.baseURL + url
	// 		let $_res = ''
	// 		$_res = axios({
	// 			method: 'GET',
	// 			url: $_url,
	// 			params: params,
	// 			headers: {
	// 				Authorization: `Bearer ${this.$store.getters.userAccToken}`,
	// 				'Content-Type': 'multipart/form-data',
	// 			},
	// 		})
	// 			.then((res) => {
	// 				if (res.status === 200 || res.status === 204) {
	// 					return res
	// 				} else {
	// 					return false
	// 				}
	// 			})
	// 			.catch((err) => {
	// 				return err
	// 			})

	// 		return $_res
	// 	}
	// },
	// async admin_post(url, params) {
	// 	let $_url = axios.defaults.baseURL + url
	// 	let $_res = ''
	// 	$_res = axios({
	// 		method: 'POST',
	// 		url: $_url,
	// 		params: params,
	// 		headers: {
	// 			'Content-Type': 'multipart/form-data',
	// 		},
	// 	})
	// 		.then((res) => {
	// 			if (res.status === 200 || res.status === 204) {
	// 				return res
	// 			} else {
	// 				return false
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			return err
	// 		})

	// 	return $_res
	// },
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
		// else if (method == 'FILE') {
		// 	let path = axios.defaults.baseURL + 'uploader'
		// 	var formdata = new FormData()
		// 	formdata.append('files', url)
		// 	$_res = axios({
		// 		method: 'POST',
		// 		url: path,
		// 		formdata,
		// 		headers: {
		// 			Authorization: `Bearer ${this.$store.getters.userAccToken}`,
		// 			'Content-Type': 'multipart/form-data',
		// 		},
		// 	})
		// 		.then((res) => {
		// 			if (res.status === 200) {
		// 				return res.data
		// 			} else {
		// 				return false
		// 			}
		// 		})
		// 		.catch((err) => {
		// 			return err
		// 		})
		// }
		return $_res
	},
	// async upLoad(method, path, files) {
	// 	let url = axios.defaults.baseURL + path

	// 	if (method == 'POST') {
	// 		return axios
	// 			.post(url, files, {
	// 				headers: {
	// 					Authorization: `Bearer ${this.$store.getters.userAccToken}`,
	// 					'Content-Type': 'multipart/form-data',
	// 				},
	// 			})
	// 			.then((res) => {
	// 				if (res.status === 200) {
	// 					return res
	// 				} else {
	// 					return false
	// 				}
	// 			})
	// 			.catch(() => {
	// 				return false
	// 			})
	// 	} else if (method == 'PUT') {
	// 		return axios
	// 			.put(url, files, {
	// 				headers: {
	// 					Authorization: `Bearer ${this.$store.getters.userAccToken}`,
	// 					'Content-Type': 'multipart/form-data',
	// 				},
	// 			})
	// 			.then((res) => {
	// 				if (res.status === 200) {
	// 					return res
	// 				} else {
	// 					return false
	// 				}
	// 			})
	// 			.catch(() => {
	// 				return false
	// 			})
	// 	}
	// },
	async download(method, path, params) {
		let $_url = axios.defaults.baseURL + path

		let $_res = ''
		$_res = axios({
			method: method,
			url: $_url,
			params: params,
			responseType: 'arraybuffer',
		}).then((res) => {
			if (res.status === 200 || res.status === 204) {
				return res
			} else {
				return false
			}
		})
		return $_res
	},
	async get(url, param) {
		axios.get(url, param).then((res) => {
			if (res.status === 200 || res.status === 204) {
				return res
			} else {
				return false
			}
		})
	},

	login(param) {
		let $_url = axios.defaults.baseURL + 'admin/login'
		return new Promise((resolve) => {
			axios({ method: 'POST', url: $_url, data: param })
				.then((res) => {
					resolve(res.data)
				})
				.catch((err) => {
					resolve(err)
				})
		})
	},
	// user_login(param) {
	// 	let $_url = axios.defaults.baseURL + 'user/login'
	// 	return new Promise((resolve) => {
	// 		axios({ method: 'POST', url: $_url, data: param })
	// 			.then((res) => {
	// 				resolve(res)
	// 			})
	// 			.catch(() => {
	// 				resolve(false)
	// 			})
	// 	})
	// },
	async getRefreshToken() {
		// 토큰 refresh 요청
		let $_res = false
		$_res = await axios({
			method: 'POST',
			url: 'admin/refresh',
			data: { admin_id: store.getters.adminId },
		})
			.then(async (res) => {
				if (res.status === 200) {
					// 재발급 받은 토큰 정보 저장
					let resToken = await store.dispatch('saveAdmin', res.data)
					if (resToken === 0) {
						return res.data.data.ac_token
					}
					return false
				} else {
					return false
				}
			})
			.catch((err) => {
				console.log(err)
				return false
			})
		return $_res
	},
}

export default {
	data() {
		return {}
	},
	computed: {
		...mapGetters(['userAccToken']),
	},
	methods: {},
	install(Vue) {
		Vue.config.globalProperties.$_axios = methods.axios
		Vue.config.globalProperties.$_getRefreshToken = methods.getRefreshToken
		// Vue.config.globalProperties.$_admin_get = methods.admin_get
		// Vue.config.globalProperties.$_admin_post = methods.admin_post
		// Vue.config.globalProperties.$_upLoad = methods.upLoad
		Vue.config.globalProperties.$_login = methods.login
		// Vue.config.globalProperties.$_user_login = methods.user_login
		Vue.config.globalProperties.$_download = methods.download
	},
}
