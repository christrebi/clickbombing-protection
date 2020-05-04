// get el containing ad
var ad = document.getElementById('ad');

// counter for num of clicks2
var counter = 0;
var today;
var mil;

// check if browser is compatible with addeventlistener
if (document.addEventListener) {
    ad.addEventListener('mousedown', function(e) {
        counter++;
        if (!e) {
            e = window.event;
        }
    //check if Ls is available
        if (hasStorage()) {
    // check if user clicked ad
            if (counter === 1) {
                setTimeout(firstClick, 43200000);
                localStorage.setItem('counter', counter)
        // store date and time of first click
                today = new Date();
         // get time in milliseconds
                 mil = today.getTime();
                 localStorage.setItem('date', mil);
                console.log(localStorage)
    } 
    // check if user has clicked more than twice
            else if (counter > 2) {
     // call function for third click
                thirdClick();
    } 
    } 
    // check if cookies are accessible
        else if (cookiesEnabled()) {
         ad.addEventListener('mousedown', createCookie, false)
    } 
    //check if  neither cookies nor localstorage unavailable
        else if(!cookiesEnabled() && !hasStorage()){
    //if so:
        ad.style.visibility = "hidden";
    }
    
   }, false)
} 
// if addeventlistener isn't compatible:
else if (document.attachEvent) {
        ad.attachEvent('onmousedown', function() {
        oldbr(); 
    })  
} else if (!document.addEventListener || !document.attachEvent) {
    ad.style.visibility = "hidden";
}

// function to check if browser has local storage
function hasStorage() { 
    var test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch(e) {
      return false;
    }
}


//console.log(navigator.cookieEnabled)
function firstClick() {
    localStorage.clear();
}

// function for when ad is clicked more than twice
function thirdClick() {
    localStorage.setItem('counter', counter);
    //get current date object
    var rightNow = new Date();
    //get current time of second click
    var secondTime = rightNow.getTime();
    //check if it's been more or less than X hours
    if (secondTime < mil + 43200000) {
        ad.style.visibility = 'hidden';
        setTimeout(show, 43200000);
    } else {
    //clear local storage
        localStorage.clear();
        counter = 0;
    }
}

//function to show the ad after it has been hidden for X hours
function show() {
    ad.style.visibility = 'visible'; 
    counter = 0;
    localStorage.clear();
}

//localStorage.clear()
function cookiesEnabled() {
    var cookiesEnabled = (navigator.cookieEnabled) ?true: false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookiesEnabled) {
        document.cookie = "mytestcookie";
        cookiesEnabled = (document.cookie.indexOf("mytestcookie")!= -1) ?true: false;
    }
    return cookiesEnabled;
}

// regular expression to search for string 
var re = RegExp("new=cookie77");
function createCookie() { 
    // add one to the counter when mouse is clicked
  counter++;
  // upon the first click:
    if (counter === 1) {
        // get date object
        var d = new Date();
        // set expiry for cookie
        d.setTime(d.getTime() + 43200000);
        // store name and encoded semi colon 
        var name = "new=cookie77" + encodeURI(";");
        // store expiry for cookie
        var exp = "expires=" + d.toUTCString();
        // concat to set cookie and expiry
        document.cookie = name + exp;
        // after two clicks check if there exists newcookie 
    } else if (counter > 2 && re.test(document.cookie)) {
        // if yes hide ad
        ad.style.visibility = "hidden";
        // after 12 hours bring back ad and del cookie
        setTimeout(delCookie, 43200000);
        }
    }

// function to return the ad and del cookie
function delCookie() {
    // hide ad
    ad.style.visibility = 'visible'; 
    //reset counter to 0
    counter = 0;
    // delete cookie
    var ck = "new=cookie77" + encodeURI(';') + 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
    document.cookie = ck;
}



function oldbr() {
    counter++;
    if (!e) {
        e = window.event;
    }
    //check if Ls is available
    if (hasStorage()) {

        // check if user clicked ad
        if (counter === 1) {
            setTimeout(firstClick, 43200000);
            //update lLs w num of clicks
            localStorage.setItem('counter', counter)
        // store date and time of first click
            today = new Date();
        // get time in milliseconds
            mil = today.getTime();
        //save current time on local storage
            localStorage.setItem('date', mil);
        } 
        // check if user has clicked more than twice
        else if (counter > 2) {
        // call function for third click
             thirdClick();
        } 
        
        }
            // check if cookies are accessible
    else if (cookiesEnabled()) {
             createCookie();
        } 
        //check if  neither cookies nor localstorage unavailable
    else if(!cookiesEnabled() && !hasStorage()){
        //if so:
           ad.style.visibility = "hidden"
        }
        
}
