const { Screen } = require('../models/')

const fetchScreens = async (req, res) => {
  try {
    const screens = await Screen.find({})
    res.json({ screens })
  } catch (err) {
    console.log('Unable to fetch screens', err)
  }
}

exports.fetchScreens = fetchScreens