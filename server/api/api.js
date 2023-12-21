const express = require("express");
const router = express.Router();
const data = require("../mysql");
const { validation } = require("../middleware/middleware");

//lấy
router.get("/", async (req,res)=>{
    let result = await data.getTodo();
    res.status(200).json(result)
});
//thêm
router.post("/",validation, async(req,res)=>{
    let result = await data.getTodo();
    let index = result.findIndex(item=> item.name == req.body.name)
    if (index == -1) {
        await data.postTodo(req.body);
        res.status(201).json({
            messange:"Đã thêm thành công"
        })    
    }else{
        res.status(400).json({
            messange:"Công việc đã có rồi"
        })
    }
})
//xoá
router.delete("/:id",async(req,res)=>{
    await data.deleteTodo(req.params.id)
    res.status(200).json({
        messange:"Đã xoá thành công"
    })
})

//status
router.put("/:id", async (req,res)=>{
    await data.statusTodo(req.params.id, req.body)
    res.status(200).json({
        messange:"Cập nhật status thành công"
    })
})
module.exports = router