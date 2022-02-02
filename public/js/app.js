console.log("app.js is working");

//jquery object declarations
const $testbutton =$('#TestButton');
const $popoverCancel =$('#popoverCancel')
const $storecard =$('#purchaseCard');

$testbutton.on("click",function(){
    $storecard.show();
})
$popoverCancel.on("click",function(){
    $storecard.hide();
})