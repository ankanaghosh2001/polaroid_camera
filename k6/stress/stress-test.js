import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = 'http://localhost:3000'
// const image = open('../test-image.png', 'b')

export const options = {
  stages: [
    { duration: '1m', target: 10 },
    { duration: '2m', target: 10 },

    { duration: '1m', target: 50 },
    { duration: '2m', target: 50 },

    { duration: '1m', target: 100 },
    { duration: '2m', target: 100 },

    { duration: '1m', target: 200 },
    { duration: '2m', target: 200 },

    { duration: '1m', target: 300 },
    { duration: '2m', target: 300 },

    { duration: '1m', target: 300 },
    { duration: '2m', target: 300 },

    // { duration: '1m', target: 400 },
    // { duration: '2m', target: 400 },

    // { duration: '1m', target: 500 },
    // { duration: '2m', target: 500 },

    // { duration: '1m', target: 600 },
    // { duration: '2m', target: 600 },

    // { duration: '1m', target: 700 },
    // { duration: '2m', target: 700 },

    // { duration: '1m', target: 800 },
    // { duration: '1m', target: 800 },

    // { duration: '1m', target: 900 },
    // { duration: '1m', target: 900 },

    // { duration: '1m', target: 1000 },
    // { duration: '1m', target: 1000 },
  ],

  thresholds: {
    http_req_failed: ['rate<0.05'],
    http_req_duration: ['p(95)<1000'],
  },
};

// export function uploadPolaroid() {
//   const fileName = `stress-test-${__VU}-${__ITER}.png`

//   const res = http.post(
//     `${BASE_URL}/api/upload?filename=${fileName}`,
//     image,
//     {
//       headers: {
//         'Content-Type': 'image/png',
//       },
//     }
//   )

//   check(res, {
//     'POST /upload succeeded': (r) => r.status === 200,
//   })

//   return res
// }

// export function openURL(){
//   const imageURL = 'https://w7l5wgvtofwy4pur.public.blob.vercel-storage.com/pretty_polaroid_1786262292525.png'

//   const res = http.get(`${imageURL}`)

//   check(res, {
//     'GET /image is visible': (r) => r.status === 200
//   })
// }

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

  // uploadPolaroid()

  // sleep(1)

  // openURL()
}