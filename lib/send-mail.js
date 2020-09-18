const { SocketLabsClient } = require('@socketlabs/email');
let { SOCKETLABS_API_KEY, SOCKETLABS_SERVER_ID } = require('../config');

module.exports = async (context, msg) => {
    SOCKETLABS_SERVER_ID = parseInt(SOCKETLABS_SERVER_ID);
    const client = new SocketLabsClient(SOCKETLABS_SERVER_ID, SOCKETLABS_API_KEY);

    return await client.send(msg).then(
        (res) => {
            //Handle successful API call
            context.log(res);
            return true;
        },
        (err) => {
            //Handle error making API call
            context.log(err);
            throw err;
        });
}