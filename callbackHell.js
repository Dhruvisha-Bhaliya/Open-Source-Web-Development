setTimeout(() => {
    console.log("Task 1 completed");
    setTimeout(() => {
        console.log("Task 2 completed");
        setTimeout(() => {
            console.log("Task 3 completed");
        }, 1000);
    }, 2000);
}, 3000);