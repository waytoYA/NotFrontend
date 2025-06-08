import { httpUrl } from '@/helpers/httpUrl'

const url = httpUrl('/')

export class ProfileManage {

    async history () {
        const { data } = await url.get('/history.json')
        return data
    }

}