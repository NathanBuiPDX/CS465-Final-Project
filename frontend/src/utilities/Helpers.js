export const msToDuration = (diffTime) => {
    diffTime = diffTime / 1000;
    let secs = Math.floor(diffTime % 60);
    diffTime = diffTime / 60;
    let mins = Math.floor(diffTime % 60);
    diffTime = diffTime / 60;
    let hours = Math.floor(diffTime % 60);
    let days = Math.floor(diffTime /24 );

    let result = "";
    if (days > 0) result = days + 'd';
    else{
        if (hours > 0) result = hours + 'h';
        else {
            if (mins > 0) {
                result = mins + 'm';
            }
            else result = secs + 's';
        }
    }

    return result;
}

export function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
    
    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        
        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name === cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }
    
    // Return null if not found
    return null;
}