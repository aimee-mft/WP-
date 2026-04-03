const BASE = '/api'

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  })

  // Session expired mid-use — hard redirect to login
  if (res.status === 401) {
    window.location.href = '/login'
    return
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || res.statusText)
  }
  return res.json()
}

export const api = {
  // Sites
  getSites:    ()         => req('GET',    '/sites'),
  getSite:     id         => req('GET',    `/sites/${id}`),
  createSite:  data       => req('POST',   '/sites', data),
  updateSite:  (id, data) => req('PUT',    `/sites/${id}`, data),
  deleteSite:  id         => req('DELETE', `/sites/${id}`),
  exportUrl:   id         => `${BASE}/sites/${id}/export`,
  previewUrl:  id         => `${BASE}/sites/${id}/preview`,

  // Auth
  login:    (email, password) => req('POST', '/auth/login',    { email, password }),
  register: (email, password) => req('POST', '/auth/register', { email, password }),
  logout:   ()                => req('POST', '/auth/logout'),
  me:       ()                => req('GET',  '/auth/me'),
}
