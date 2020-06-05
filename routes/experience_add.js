var express = require('express');
var router = express.Router();

//增加引用函式
const experience = require('./utility/experience');

//接收POST請求
router.post('/', function(req, res, next) {
    var user_account = req.body.user_account;                 
    var exp_title = req.body.exp_title;              
    var exp_content = req.body.exp_content  

    // 建立一個新資料物件
    var newData={
        user_account:user_account,
        exp_title:exp_title,
        exp_content:exp_content
    } 
    
    experience.add(newData).then(d => {
        if (d==0){
            res.render('addSuccess');  //傳至成功頁面
        }else{
            res.render('addFail');     //導向錯誤頁面
        }  
    })
});

module.exports = router;