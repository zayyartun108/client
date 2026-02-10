import axios from "axios";

const api=axios.create({
    baseURL:"https://myapp.onrender.com/api/",
})
api.interceptors.request.use((config)=>{
    const token=localStorage.getItem("access");
    if (token && !config.url.includes("login") && !config.url.includes("register")) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
},
(error) => Promise.reject(error))


// ✅ Response interceptor (401 → refresh token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const res = await axios.post(
          "https://myapp.onrender.com/api/token/refresh/",
          { refresh }
        );

        localStorage.setItem("access", res.data.access);

        originalRequest.headers.Authorization =
          "Bearer " + res.data.access;

        return api(originalRequest);
      } catch (err) {
        // refresh token expired → logout
        localStorage.clear();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);
export default api
