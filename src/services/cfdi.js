import { urlFull, optionsDefault } from './config'
const getcfdireporissues = urlFull('/Issued?')
const cfdiservices = {
    async getcfdireporissues(companygroup, company, cfditype, year, pageSize, pageNo) {
        const res = await fetch(`${getcfdireporissues}companygroup=${companygroup}&company=${company}&cfditype=${cfditype}&year=${year}&pageSize=${pageSize}&pageNo=${pageNo}`, { method: 'GET', ...optionsDefault, })
        const json = await res.json()
        return json
    }
}
export default {...cfdiservices }