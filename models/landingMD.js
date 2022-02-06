const db = require("../config/database")
//REVIEW REMOVE PSEUDO DB
function getAll() {
    return [{test: "Test complete"}];
}

function testDBLink(){
    return[
        {
            name: "Sam",
            height:`6'3"`,
            email:"thematrix15@hotmail.com"
        }]
}

function getProducts(){
    return(db.db);
}
module.exports = {
    getAll,
    testDBLink,
    getProducts,
}