console.log("app.js is working");

const $testbutton =$('#TestButton');
const $storecard =$('#purchaseCard');

$testbutton.on("click",function(){
    $storecard.toggle();
})