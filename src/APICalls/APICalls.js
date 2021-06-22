
import axios from "axios";

export const getPokedex = async ({ api }) => {
    let apiReturn = await axios
        .get(api)
        .then(async function (response) {
            return response;
        })
        .catch(function (error) {
            console.log(error);
        });
    return apiReturn;
};

export const getDetailPoke = async (urls) => {
    let axiosArray = [];
    urls.map(async (p) => {
        axiosArray.push(getPokedex({ api: p.url }));
    })
    if (axiosArray) {
        return Promise.all(axiosArray).then(res2 => {
            if (res2) {
                return res2
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

};