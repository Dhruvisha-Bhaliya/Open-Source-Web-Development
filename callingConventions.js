function divide(a,b,callback) {
    if (b === 0) {
        callback("cannot divide by zero", null);
    } else {
        callback(null, a / b);
    }
}

divide(180,20,(err,result) => {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
});