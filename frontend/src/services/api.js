const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
const API_ROOT = `${API_BASE_URL.replace(/\/$/, '')}/api`
export const ENABLE_FALLBACK = import.meta.env.VITE_ENABLE_FALLBACK === 'true'

const handleResponse = async (response) => {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }
  return response.json()
}

export const fetchProjects = () => fetch(`${API_ROOT}/projects/`).then(handleResponse)

export const fetchPostsByCategory = () => fetch(`${API_ROOT}/posts/`).then(handleResponse)

export const fetchPostBySlug = (slug) =>
  fetch(`${API_ROOT}/posts/${slug}/`).then(handleResponse)

export const submitContact = (payload) =>
  fetch(`${API_ROOT}/contact/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  }).then(handleResponse)
