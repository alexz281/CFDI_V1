import { urlFull, optionsDefault } from './config'
const getcfdireporissues = urlFull('Issued?pageSize=100&pageNo=1')
const cfdiservices = {
    async getcfdireporissues() {
        const res = await fetch(`${getcfdireporissues}`, { method: 'GET', ...optionsDefault, })
        const json = await res.json()
        return json
    }
}
export default {...cfdiservices }