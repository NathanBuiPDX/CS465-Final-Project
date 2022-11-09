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