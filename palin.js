
function reverseStr(str)
{
    var listOfChars = str.split("");
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join("");
    return reversedStr;
}

function isPalindrome(str)
{
    var reverse = reverseStr(str);
    return str === reverse;
}

function convertDateToStr(date)
{
    var dateStr = {day: '',month:'',year:''};
    if(date.day<10)
    {
        dateStr.day = "0" + date.day;
    }
    else{
        dateStr.day = date.day.toString();
    }

    if(date.month<10)
    {
        dateStr.month = "0" + date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}

//console.log(convertDateToStr(date))
function getAllDateFormats(date)
{
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2)
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2)
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day
    
    return [ddmmyyyy,mmddyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd];
}

function isLeapYear(year)
{
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4===0){
        return true;
    }
    return false;
}

function checkPalindromeForAllFormats(date)
{
    var allFormats = getAllDateFormats(date);
    var flag = false;
    for(var i=0;i<allFormats.length;i++)
    {
        if(isPalindrome(allFormats[i])){
            flag=true;
            break
        }
    }
    return flag;
}

function getNextDate(date)
{
    var day = date.day+1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    if(month === 2){ //check for feb
        //check for leap year
        if(isLeapYear(year))
        {
            if(day > 29){
                day = 1;
                month++;
            }
        }
        else{
            if(day > 28){
                day = 1;
                month++;
            }
        }
    }
    else{
        if(day > daysInMonth[month-1]){
            day = 1;
            month++;
        }
    }

    if(month > 12){
        month = 1;
        year++;
    }
    return{
        day:day,
        month:month,
        year:year
    }

}

function getNextPlaindrome(date)
{
    var ctr=0;
    var nextDate = getNextDate(date);
    while(1)
    {
        ctr++;
        var ispalin = checkPalindromeForAllFormats(nextDate);
        if(ispalin)
        {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr,nextDate]
}

function getPrevDate(date)
{
    var day = date.day;
    var month = date.month;
    var year = date.year;
    var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
    
    if(month === 3){ //check for feb
        //check for leap year
        if(isLeapYear(year))
        {
            if(day === 1){
                day = 29;
                month--;
            }
            else
            {
                day--;
                month--;
            }
        }
        else{
            if(day == 1){
                day = 28;
                month--;
            }
            else{
                day--;
                month--;
            }
        }
    }
    else{
        if(day === 1){
            if(month === 1){ // jan 1st prev case
                day = 31;
                month = 12;
                year--;
            }
            else{
                day = daysInMonth[month-2];
                month--;
            }
        }
        else{
            day = day-1;
        }
    }

    return{
        day:day,
        month:month,
        year:year
    }

    
}

function getPrevPlaindrome(date)
{
    var ctr=0;
    var prevDate = getPrevDate(date);
    while(1)
    {
        ctr++;
        var ispalin = checkPalindromeForAllFormats(prevDate);
        if(ispalin)
        {
            break;
        }
        prevDate = getPrevDate(prevDate);
    }
    return [ctr,prevDate]
}

// var date = {
//     day: 3,
//     month: 2,
//     year: 2020
// }


// console.log(getPrevPlaindrome(date));
// console.log(getNextPlaindrome(date));

bdayDate = document.querySelector("#bdayDate");
checkBtn = document.querySelector(".checkBtn");
output = document.querySelector("#output");
function clickHandler(e)
{
    var bdayStr = bdayDate.value;

    if(bdayStr !== "")
    {
        var listOfDate = bdayStr.split("-");

        var date = {
            day : Number(listOfDate[2]),
            month : Number(listOfDate[1]),
            year : Number(listOfDate[0])
        };
        var isPlainMain = checkPalindromeForAllFormats(date);
        if(isPlainMain)
        {
            output1.innerText = "hey!! Your Birthday is a Plaindrome😎"
            output2.innerText = "";
        }
        else{
            var [ctrNext,nextDate] = getNextPlaindrome(date);
            var [ctrPrev,prevDate] = getPrevPlaindrome(date);
            output1.innerText = `The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year},you missed it by ${ctrNext} days🙂`;
            output2.innerText = `The Previous palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year},you missed it by ${ctrPrev} days🙃`;

        }
    }
}

checkBtn.addEventListener("click",clickHandler);