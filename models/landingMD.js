//noDBYET
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
module.exports = {
    getAll,
    testDBLink,
}