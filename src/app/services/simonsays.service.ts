import { User } from '../interfaces/User'
import { httpService } from './http.service'

export const simonService = {
    getUserScore,
    setBestScore,
}

const BASE_URL = 'simon-says'

async function getUserScore() {
    return httpService.get(BASE_URL)
}

async function setBestScore(bestScore: number) {
    return httpService.post(BASE_URL, { bestScore: bestScore })
}
