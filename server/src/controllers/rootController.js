module.exports = (req, res) => {
    return res.status(200)
        .json({message: 'Please go to /apikey to generate api key.'});
}
