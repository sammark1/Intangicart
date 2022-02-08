console.log("app.js is working");

//jquery object declarations
const $testbutton =$('#TestButton');
const $popoverCancel =$('#popoverCancel')
const $storecard =$('#purchaseCard');


//click toggles
$storecard.hide();
$testbutton.on("click",function(){
    $storecard.show();
})
$popoverCancel.on("click",function(){
    $storecard.hide();
})

//Userpage
const $editUserProfileButton =$('#profileEditButton');
const $updateUserProfileButton =$('#profileUpdateButton');
const $profileEdit =$('.profileUpdate');
$profileEdit.hide();
$editUserProfileButton.on("click",function(){
    $profileEdit.show();
    $editUserProfileButton.hide();
});
const $deleteProfileButton =$('#deleteProfileButton');
const $deleteProfileConfirm =$('#deleteProfileConfirm');
const $deleteProfileCancel=$('#deleteProfileCancel');
$deleteProfileConfirm.hide();
$deleteProfileCancel.hide();
$deleteProfileButton.on('click',function(){
    $deleteProfileConfirm.show();
    $deleteProfileCancel.show();
    $deleteProfileButton.hide();
});
$deleteProfileCancel.on('click',function(){
    $deleteProfileConfirm.hide();
    $deleteProfileCancel.hide();
    $deleteProfileButton.show();
});
