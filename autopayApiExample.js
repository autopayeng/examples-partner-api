const singleApplicantRequestBody = require('./payloads/requests/single-applicant.json');

// various request payloads:
// const withCoApplicantRequestBody = require('./payloads/requests/with-co-applicant.json');
// const purchaseRequestBody = require('./payloads/requests/purchase.json');
// const invalidApplicantRequestBody = require('./payloads/requests/invalid-applicant.json');


const axios = require('axios');

const endpointUrl = 'https://partner.apex.apigw.autopay.xyz/services/activate-application/rates/';

const headers = {
    headers: {
            authorization: `Bearer ${process.env.TOKEN}` || `your token here`,
    }
};

const getRates = () => {
    return axios.post(endpointUrl, singleApplicantRequestBody, headers)
        .then(response => console.log("response:", response.data))
        .catch((e) => {
            if (e.response.status === 412) {
                return console.error(`${e}: Data 'lookup' failures. Ie: failed to pull credit`);
            }
            if (e.response.status === 401) {
                return console.error(`${e}: Token authorization failed`);
            }
            if (e.response.status === 409) {
                return console.error(`${e}: Duplicate Record`);
            }
            if (e.response.status === 422) {
                return console.error(`${e}: Validation constraint failure or invalid data`);
            }
            return console.error(`${e}: some other error`);
        })
};

getRates();

