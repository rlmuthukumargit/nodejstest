
module.exports = {
    userTokenVerification: {
        method: 'GET',
        url: "",
        headers: {
            contentType: 'application/json',
            authorization: ' Bearer token'
        }
    },
    verifylocation: {
        method: "POST",
        url: `http://localhost:2114/api/v1/location/verifylocation`,
        headers: {
          contentType: "application/json",
          authorization: "Bearer token",
        },
      },
}