
export const _WebSocketChatsURL = 'wss://norma.nomoreparties.space/chat';
export const _userJoinChat = 'https://chat.nomoreparties.space/join';
export const _DNSApi = `https://sdms.dns-shop.ru/services/hs/api/devrequests/lists`;
export const _dnsApiPartner = `https://adm-sdms.partner.ru/services/hs/api/tasks/list`;
export const _directionsListApi = `http://78.24.216.128:3000`;



const request = async (url: RequestInfo | URL, option?: RequestInit) => {
    const res = await fetch(url, option);
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
}

// const checkResponse = (res: Response) => {
//     return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
// }


export const getListTasksDNSApi = async () => {
    const res = await request(`${_DNSApi}/devrequests/list`, {
        method: `GET`,
        mode: 'no-cors',
        // cache: 'no-cache',
        // credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            authorization: "Bearer " + localStorage.getItem("JWT_Token")
        },

        body: `${localStorage.getItem("Mail_Data")}`,

    });
    console.log(res);
    return await res;
}

export const getListDirectionsApi = async () => {
    const res = await request(`${_directionsListApi}/directions/list`, {
        method: `GET`,
        mode: 'no-cors',
        // cache: 'no-cache',
        // credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // authorization: "Bearer " + localStorage.getItem("JWT_Token")
        },

    });
    console.log(res);
    return await res;
}

export const getListTasksApi = async () => {
    const res = await request(`http://95.154.68.108:3001/tasks/list`);
    console.log(res);
    return await res;
}


