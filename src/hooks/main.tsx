import { ArgsType } from "../types"

const url: {[key in string]: string} =  {
    root: 'http://localhost:3030',
    apiV: '/api/v1',
    login: '/login',
    movie: '/movie',
    search: '/search'
}

export const getUrl = (breakPoint: string, args?: ArgsType): string => {
    let query = ''
    if (args) {
        const str = []
        for(const key of Object.keys(args)) {
            str.push(`${key}=${args[key]}`)
        }
        query = '?' + str.join('&')
    }
    console.log(url.root + url.apiV + url[breakPoint] + query)
    return url.root + url.apiV + url[breakPoint] + query
}
