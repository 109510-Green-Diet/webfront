var express = require('express');
var router = express.Router();

//增加引用函式
const recipe = require('./utility/recipe');

//---------------------------
// 引用multer外掛
//---------------------------
const multer  = require('multer');

// 宣告上傳存放空間及檔名更改
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/pic');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now()+"--"+file.originalname);    
    }   
})

// 產生multer的上傳物件
var maxSize=1024*1024;  //設定最大可接受圖片大小(1M)

var upload = multer({
    storage:storage
})
//---------------------------

//接收POST請求
router.post('/', upload.single('pic'), function(req, res, next) {
    // 如果有選擇圖片
    if (typeof req.file != 'undefined'){
        // 傳入檔案不可超過maxSize
        if(req.file.size > maxSize){
            res.render('fileSizeError');  //圖片過大
            return;
        }                      
    }  

    var recipe_no = req.body.recipe_no;                  //取得產品編號
    var recipe_name = req.body.recipe_name;              //取得產品名稱
    var seasoning_use = req.body.seasoning_use;          //取得價格
    var pic;
    var rc_content = req.body.rc_content;

    // 如果有選擇圖片
    if (typeof(req.file) != 'undefined'){
    picture=req.file.filename;   //取得上傳照片名稱
    }

    // 建立一個新資料物件
    var newData={
        recipe_no:recipe_no,
        recipe_name:recipe_name,
        seasoning_use:seasoning_use,
        pic:pic,
        rc_content:rc_content
    } 
    
    recipe.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;