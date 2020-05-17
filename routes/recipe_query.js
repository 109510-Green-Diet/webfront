var express = require('express');
var router = express.Router();

//增加引用函式
//var moment = require('moment');
const recipe = require('./utility/recipe');

//接收GET請求
router.get('/', function(req, res, next) {
    var recipe_name = req.query.recipe_name;   //取出參數

    recipe.query(recipe_name).then(data => {
        if (data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data==-1){
            res.render('notFound');  //導向找不到頁面                
        }else{
            res.render('recipe_query', {item:data});  //將資料傳給顯示頁面
        }  
    })
});

module.exports = router;