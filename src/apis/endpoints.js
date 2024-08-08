import { axiosInstance } from ".";

export const apis = {
    getData
}

async function getData(id) {
    const response = await axiosInstance.get(`photos/${id}`)
    return response
}
