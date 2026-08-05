const answer = ({
    hello: "Hello User",
    course: "Node JS Programming",
    college: "VNSGU",
    bye: "Good Bye"
});

function reply(question) {
    question = question.toLowerCase();
    return answer[question] || "Sorry ! I don't know.";
}

module.exports = reply;