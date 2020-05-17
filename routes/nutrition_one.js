var express = require('express');
var router = express.Router();

//增加引用函式
//var moment = require('moment');
const nutrition = require('./utility/nutrition');

//接收GET請求
router.get('/:nutrition_no', function(req, res, next) {
    var nutrition_no = req.params.nutrition_no;   //取出參數

    nutrition.one(nutrition_no).then(data => {
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