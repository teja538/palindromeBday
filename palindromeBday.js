bdayDate = document.querySelector("#bdayDate");
checkBtn = document.querySelector(".checkBtn");
output = document.querySelector("#output");

function bdayReverse()
{
    var str = bdayDate.value.split("-"); //spliting by -
    var bdayDateConcat = str.join("");   // joining given date
    var str1 = bdayDateConcat.split("");  //inorder to rev splitting
    var str1Rev = str1.reverse();         //reversed
    var bdayDateRev = str1Rev.join("");    //list joined
    isPalindrome(bdayDateConcat,bdayDateRev);
}

function isPalindrome(bdayDateConcat,bdayDateRev)
{
    //console.log(bdayDateConcat,bdayDateRev)
    if(bdayDateConcat === bdayDateRev)
    {
        output.innerText = "Your Birthday Date is a palindrome😎 !!!";
    }
    else{
        output.innerText = "Your Birthday Date is NOT a palindrome🙃"
    }
    
}

checkBtn.addEventListener("click",bdayReverse);








