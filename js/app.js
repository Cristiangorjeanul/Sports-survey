document.addEventListener('DOMContentLoaded', function () {

	// Stars field
	window.onload = function () {

		var pageContainer = this.document.getElementById("survey");
		var width = pageContainer.clientWidth;
		var height = pageContainer.clientHeight;
		// Random stars
		for (let i = 0; i < 500; i++) {
			var starX = Math.random() * 100;
			var starY = Math.random() * 97;

			if (starX < width && starY < height) {
				let star = this.document.createElement('div');
				star.style.width = "0.1em";
				star.style.height = "0.1em";
				star.style.background = "white";
				star.style.position = "absolute";
				star.style.top = starY + "%";
				star.style.left = starX + "%";
				star.style.borderRadius = "50%";

				pageContainer.appendChild(star);
			}
		}
	};
	// Format question
	function FormatQuestion(text, options, answer) {
		this.text = text;
		this.options = options;
		this.answer = answer;
	}
	// If option is correct answer then return true
	FormatQuestion.prototype.correctAnswer = function (option) {
		return this.answer === option;
	};
	// Format questionnaire
	function Questionnaire(questions) {
		// Array of questions
		this.questions = questions;
		// Start quiz with the first question
		this.questionIndex = 0;
		this.score = 0;
	}
	Questionnaire.prototype.currentQuestion = function () {
		return this.questions[this.questionIndex];
	};
	Questionnaire.prototype.checkAnswer = function (answer) {
		if (this.currentQuestion().correctAnswer(answer)) {
			this.score++;
		}
		this.questionIndex++;
	};
	// Check if quiz end is reached
	Questionnaire.prototype.isOver = function () {
		// Return TRUE only after last question
		return this.questionIndex >= this.questions.length;
	};
	// Format questionnaire
	var QuestionnaireFormat = {
		displayNext: function () {
			if (quiz.isOver()) {
				this.showResults();
			} else {
				this.displayQuestion();
				this.displayOptions();
				this.displayState();
				this.displayScore();
			}
		},
		displayQuestion: function () {
			this.fillingWithText('table', quiz.currentQuestion().text);
		},
		displayOptions: function () {
			var options = quiz.currentQuestion().options;
			// Display all options
			for (var i = 0; i < options.length; i++) {
				var optionId = 'option' + i;
				var optionText = options[i];
				this.fillingWithText(optionId, optionText);
				this.checkAnswerOrganizer(optionId, optionText);
			}
		},
		checkAnswerOrganizer: function (id, guess) {
			var button = document.getElementById(id);
			button.onclick = function () {
				quiz.checkAnswer(guess);
				QuestionnaireFormat.displayNext();
			}
		},
		displayScore: function () {
			var scoreText = 'Score: ' + quiz.score;
			this.fillingWithText('score', scoreText);
		},
		displayState: function () {
			var questionNumber = quiz.questionIndex + 1;
			var totalQuestions = quiz.questions.length;
			var showState = 'Page ' + questionNumber + ' of ' + totalQuestions;
			this.fillingWithText('page', showState);
		},
		showResults: function () {
			var grade = quiz.score / quiz.questions.length;
			var results = '<h1>';

			results += '<h1>Final score: <br><br>' + quiz.score + ' points</h1>';
			if (grade >= 0.8) {
				results += '<h2><br>Congratulations!<br>You are a real sports fan!</h2>';
			} else if (grade < 0.8 && grade > 0) {
				results += '<h2><br>Bravo!<br>You are a fan of ' + quiz.score + ' sports!</h2>';
			}
			results += '<br><button id="reset">Try Again?</button>';
			this.fillingWithText('survey', results);
			this.resetQuestionnaire();
		},
		resetQuestionnaire: function () {
			var resetBtn = document.getElementById('reset');
			// Restart from the beginning
			resetBtn.onclick = function () {
				window.location.reload(false);
			}
		},
		fillingWithText: function (id, content) {
			var element = document.getElementById(id);
			element.innerHTML = content;
		}
	};
	// Create questions
	var questions = [
		new FormatQuestion('&#9725; CYCLING &#9725;<br>When was the first bicycle invented?', ['17th Century', '18th Century', '19th Century', '20th Century'], '19th Century'),
		new FormatQuestion('&#9725; TABLE TENNIS &#9725;<br>What material are table tennis balls made of now?', ['Leather', 'Rubber', 'Celluloid', 'Polymer'], 'Polymer'),
		new FormatQuestion('&#9725; BASKETBALL &#9725;<br>How many players does a basketball team have?', ['Five players', 'Six players', 'Seven players', 'Eight players'], 'Five players'),
		new FormatQuestion('&#9725; FOOTBALL &#9725;<br>How long is the European football field?', ['80-110 m', '90-120 m', '100-130 m', '130-150 m'], '90-120 m'),
		new FormatQuestion('&#9725; VOLLEYBALL &#9725;<br>How many sets are played in a volleyball match?', ['2 sets', '3 sets', '4 sets', '5 sets'], '5 sets'),
		new FormatQuestion('&#9725; TENNIS &#9725;<br>What material is the tennis ball made of now?', ['Polymer', 'Leather', 'Celluloid', 'Rubber'], 'Rubber'),
		new FormatQuestion('&#9725; ATHLETICS &#9725;<br>How many km long is the marathon track?', ['40 km', '41 km', '42 km', '45 km'], '42 km'),
		new FormatQuestion('&#9725; HANDBALL &#9725;<br>How long is a period of a handball match?', ['20 minutes', '25 minutes', '30 minutes', '35 minutes'], '30 minutes'),
		new FormatQuestion('&#9725; RUGBY &#9725;<br>How many players are there on a rugby team?', ['9 players', '11 players', '13 players', '15 players'], '15 players'),
		new FormatQuestion('&#9725; SKI &#9725;<br>How many disciplines does Alpine skiing have?', ['Two disciplines', 'Three disciplines', 'Four disciplines', 'Five disciplines'], 'Four disciplines')
	];
	// Questionnaire initialization
	var quiz = new Questionnaire(questions);
	QuestionnaireFormat.displayNext();

});