function primNumber() {
    for (var i = 3; i < 5000; i++) {
        var oszto = 0;
        for (var j = 2; j < i; j++) {
            if (i % j === 0) {
                oszto = 1;
                break;
            }
        }
        if (oszto === 0) {
            postMessage(i);
        }
    }
}

primNumber();