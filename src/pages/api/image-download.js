// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require("axios");
const Buffer = require("buffer").Buffer;


export default async function handler(req, res) {
    // res.status(200).json({ name: "John Doe" });
    const { method } = req;
    try {
        switch (method) {

            case "POST":
                await handlePOST(req, res);
                break;

            case "GET":
                await handleGET(req, res);
                break;
        }
    } catch (error) {
        console.log(err)
    }
}


const handleGET = async (req, res) => {
    // const currentUser = await (req);
    const teams = { name: "Akash" };

    res.status(200).json({
        data: teams,
    });
};

const handlePOST = async (req, res) => {
    const { image } = req.body
    try {
        if (image) {
            let response = await axios.get(image, { responseType: 'arraybuffer' }, 1000 * 10);
            let returnedB64 = Buffer.from(response.data).toString('base64');
            const result = `data:image/png;base64,${returnedB64}`
            res.status(200).json({
                image: result,
            });
        }
    } catch (err) {
        // console.log(err)
        res.status(501).json({
            err,
        });
    }
};