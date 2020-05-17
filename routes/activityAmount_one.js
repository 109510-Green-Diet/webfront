var express = require('express');
var router = express.Router();

//增加引用函式
//var moment = require('moment');
const activityAmount = require('./utility/activityAmount');

//接收GET請求
router.get('/:actno', function(req, res, next) {
    var actno = req.params.actno;   //取出參數  activno

    activityAmount.one(actno).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            //data.inventorydate=moment(data.inventorydate).format("YYYY-MM-DD")
            res.render('activityAmount_one', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;