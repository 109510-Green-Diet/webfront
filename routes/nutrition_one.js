var express = require('express');
var router = express.Router();

//增加引用函式
//var moment = require('moment');
const nutrition = require('./utility/nutrition');

//接收GET請求
router.get('/:nutno', function(req, res, next) {
    var nutno = req.params.nutno;   //取出參數

    nutrition.one(nutno).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            //data.inventorydate=moment(data.inventorydate).format("YYYY-MM-DD")
            res.render('nutrition_one', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;