'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-取出單一商品
//------------------------------------------
var query = async function(recipe_name){
    var result={};
    
    await sql('SELECT * FROM project.recipe WHERE recipe_name = $1', [recipe_name])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows[0];   
            }else{
                result = -1;
            }    
        }, (error) => {
            result = null;
        });
		
    return result;
}

//------------------------------------------
//執行資料庫動作的函式-新增產品資料
//------------------------------------------
var add = async function(newData){
    var result;

    await sql('INSERT INTO project.food (recipeno, recipe_name, seasoning_use, pic, rc_content) VALUES ($1, $2, $3, $4, $5)', [newData.recipeno, newData.recipe_name, newData.seasoning, newData.pic, newData.rc_content])
        .then((data) => {
            result = 0;  
        }, (error) => {
            result = -1;
        });
		
    return result;
}

//匯出
module.exports = {query, add};