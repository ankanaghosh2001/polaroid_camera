import http from 'k6/http'
import { check, sleep } from 'k6'

const BASE_URL = __ENV.BASE_URL

export const options = {
   stages: [
    { duration: '1m', target: 10 },
    { duration: '1m', target: 50 },

    { duration: '1m', target: 100 },
    { duration: '10m', target: 100 },

    { duration: '1m', target: 1000 },
    { duration: '10m', target: 1000 },

    { duration: '1m', target: 0 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1000'],
  },
};

export default function () {
  const home = http.get(`${BASE_URL}`)
  
    check(home, {
      'GET /returns 200': (r) => r.status === 200,
    })
  
    sleep(1)
  
    const camera = http.get(`${BASE_URL}/camera?shotsCount=2`)
  
    check(camera, {
      'GET /camera returns 200': (r) => r.status === 200,
    })
  
    sleep(1)
  
    const result = http.get(`${BASE_URL}/result`)
  
    check(result, {
      'GET /result returns 200': (r) => r.status === 200,
    })
  
    sleep(1)
  
}