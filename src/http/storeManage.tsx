import { httpUrl } from '@/helpers/httpUrl'

const url = httpUrl('/')

export class StoreManage {

    async items () {
        const { data } = await url.get('/items.json')
        return data
    }

}