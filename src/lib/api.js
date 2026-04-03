const BASE = '/api'

async function req(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error || res.statusText)
  }
  return res.json()
}

export const api = {
  getSites: () => req('GET', '/sites'),
  getSite: id => req('GET', `/sites/${id}`),
  createSite: data => req('POST', '/sites', data),
  updateSite: (id, data) => req('PUT', `/sites/${id}`, data),
  deleteSite: id => req('DELETE', `/sites/${id}`),
  exportUrl: id => `${BASE}/sites/${id}/export`,
  previewUrl: id => `${BASE}/sites/${id}/preview`,
}
