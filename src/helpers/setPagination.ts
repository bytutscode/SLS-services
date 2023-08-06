export const setPagination = (totalItems: number, limit: number, offset: number, query?: object) => {
    let pages = [];
    const totalPages = totalItems / limit;
    let queryString = '?';
    let curretPag = offset / limit + 1;

    for (let prop in query) {
        queryString += `${prop}=${query[prop as keyof typeof query]}&`;
    }

    queryString = queryString.slice(0, -1);

    for (let i = 1; i <= totalPages; i++) {
        pages.push({ page: i, status: '', url: `/pag/${i}/${queryString}` })
    }

    pages.forEach(page => page.page === curretPag ? page.status = 'active' : page.status = '');

    if (curretPag <= 3) {
        pages = pages.slice(0, 5);
    } else {
        let twoBefore = curretPag - 2;
        let twoAfter = curretPag + 3;
        pages = pages.slice(twoBefore, twoAfter)
    }

    return pages;
}


export const setPaginationADM = (totalItems: number, limit: number, offset: number) => {
    let pages = [];
    const totalPages = totalItems / limit;
    let curretPag = offset / limit + 1;

    for (let i = 1; i <= totalPages; i++) {
        pages.push({ page: i, status: '', url: `/adm/${i}` })
    }

    pages.forEach(page => page.page === curretPag ? page.status = 'active' : page.status = '');

    if (curretPag <= 3) {
        pages = pages.slice(0, 5);
    } else {
        let twoBefore = curretPag - 2;
        let twoAfter = curretPag + 3;
        pages = pages.slice(twoBefore, twoAfter)
    }

    return pages;
}