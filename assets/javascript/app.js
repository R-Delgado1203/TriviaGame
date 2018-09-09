
var triviaQuestions = [{
	question: "What is the second largest country by land mass?",
	choices: ["United States", "Canada", "Russia", "China"],
	answer: 1
}, {
	question: "Which actor played the main character in the 1990 film “Edward Scissorhands”?",
	choices: ["Johnny Depp", "Adam Sandler", "Ryan Reynolds", "Dwayne Johnson"],
	answer: 0
}, {
	question: "Which planet has the most moons?",
	choices: ["Earth", "Saturn", "Pluto", "Jupiter"],
	answer: 3
}, {
	question: "In what month does winter begin in the Southern Hemisphere?",
	choices: ["April", "May", "June", "September"],
	answer: 2
}, {
	question: "How many castaways were there on the American sitcom Gilligan’s Island?",
	choices: ["Three", "Five", "Seven", "Eleven"],
	answer: 2
}, {
	question: "Which painter started the impressionist movement?",
	choices: ["Monet", "Picasso", "Van Gogh", "Kahlo"],
	answer: 0
}, {
	question: "Which of the Beatles is barefoot on the Abbey Road album cover?",
	choices: ["Paul", "Ringo", "John", "George"],
	answer: 0
}, {
	question: "In what country did table tennis originate?",
	choices: ["United States", "England", "France", "Germany"],
	answer: 1
}, {
	question: "1,024 Gigabytes is equal to one what?",
	choices: ["1GB", "1MB", "1KB", "1TB"],
	answer: 3
}, {
	question: "What natural phenomena are measured by the Richter scale?",
	choices: ["Hurricane", "Monsoon", "Earthquake", "Volcanic Erruption"],
	answer: 2
}];

var currentQuestion;
var correctAnswer;
var wrongAnswer;
var notAnswered;
var seconds;
var time;
var answered;
var selectedAnswer;


var messages = {
	correct: "Correct!",
	incorrect: "Incorrect...",
	endTime: "Out of time!",
	finished: "Your Score:"
}

$(document).ready(function () {
	//start btn click handler
	$("#start-btn").on("click", function () {
		$(this).hide();
		$(".instructions").hide();
		newGame();
	});
	//start over click handler
	$("#start-over-btn").on("click", function () {
		$(this).hide();
		newGame();
	});
});

//new game function
function newGame() {
	$("#final-message").empty();
	$("#correct-answer").empty();
	$("#incorrect-answer").empty();
	$("#not-answered").empty();
	currentQuestion = 0;
	correctAnswer = 0;
	wrongAnswer = 0;
	notAnswered = 0;
	newQuestion();
}

//pull new question from question array obj
function newQuestion() {
	$("#message").empty();
	$("#corrected-answer").empty();
	answered = true;

	//sets up new questions & choices
	$("#current-question").text("Question #" + (currentQuestion + 1) + "/" + triviaQuestions.length);
	$(".question").text(triviaQuestions[currentQuestion].question);
	for (var i = 0; i < 4; i++) {
		var choices = $("<div>");
		choices.text(triviaQuestions[currentQuestion].choices[i]);
		choices.attr({ "data-index": i });
		choices.addClass("answer-choice");
		$(".choices").append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$(".answer-choice").on("click", function () {
		selectedAnswer = $(this).data("index");
		clearInterval(time);
		answerPage();
	});
}

function countdown() {
	seconds = 15;
	$("#time-left").text("Time Remaining: " + seconds);
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$("#time-left").text("Time Remaining: " + seconds);
	if (seconds < 1) {
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$("#current-question").empty();
	$(".answer-choice").empty();
	$(".question").empty();

	var rightAnswerText = triviaQuestions[currentQuestion].choices[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

	//checks to see correct, incorrect, or notAnswered
	if ((selectedAnswer === rightAnswerIndex) && (answered === true)) {
		correctAnswer++;
		$("#message").text(messages.correct);
	} else if ((selectedAnswer !== rightAnswerIndex) && (answered === true)) {
		wrongAnswer++;
		$("#message").text(messages.incorrect);
		$("#corrected-answer").text("The correct answer was: " + rightAnswerText);
	} else {
		notAnswered++;
		$("#message").text(messages.endTime);
		$("#corrected-answer").text("The correct answer was: " + rightAnswerText);
		answered = true;
	}

	if (currentQuestion === (triviaQuestions.length - 1)) {
		setTimeout(scoreboard, 1500)
	} else {
		currentQuestion++;
		setTimeout(newQuestion, 1750);
	}
}

function scoreboard() {
	$("#time-left").empty();
	$("#message").empty();
	$("#corrected-answer").empty();

	$("#final-message").text(messages.finished);
	$("#correct-answer").text("Correct Answers: " + correctAnswer);
	$("#incorrect-answer").text("Incorrect Answers: " + wrongAnswer);
	$("#not-answered").text("Unanswered: " + notAnswered);
	$("#start-over-btn").addClass("reset");
	$("#start-over-btn").show();
	$("#start-over-btn").text("Start Over?");
}
