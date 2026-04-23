import axios from 'axios';

const BACKEND_URL = 'http://localhost:8000';
const api = axios.create({
  baseURL: BACKEND_URL,
  timeout: 3500,
});

export async function fetchHealth() {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend unreachable');
  }
}

export async function fetchIncidents() {
  try {
    const response = await api.get('/incidents');
    return response.data.incidents;
  } catch (error) {
    return [];
  }
}

export async function triggerAgents(incidentId) {
  try {
    const response = await api.post('/agents/trigger', null, {
      params: { incident_id: incidentId },
    });
    return response.data;
  } catch (error) {
    return { status: 'failed', reason: 'Unable to reach backend' };
  }
}
