const validation = (req,res,next) => {
    const {name} = req.body
    if (!name) {
        res.status(400).json({
            messange:"Bạn chưa nhập công việc"
        })
    }else{
        next()
    }
}
module.exports = {validation}