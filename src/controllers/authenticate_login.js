module.exports = authenticate_login;

function authenticate_login(req, res) {
    console.log(`authenticate_login ~ req.body`, req.body);
    res.send('recieved');
}
