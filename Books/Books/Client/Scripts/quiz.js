
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiURL = "https://localhost:7195/GetApiKey";
const userHighScoreApiURL = "https://localhost:7195/api/Users/UpdateHighScore";
const booksApiURL = "https://localhost:7195/api/Books";
const correctImg = 'https://upload.wikimedia.org/wikipedia/commons/7/73/Flat_tick_icon.svg';
const incorrectImg = 'https://upload.wikimedia.org/wikipedia/commons/6/69/X_Icon_or_Close_Icon.svg';
var API_KEY;
var generatedData;
var bookAndAuthors;
var randomNum;
var gameScore = 0;
var highScore;
var user = JSON.parse(sessionStorage.getItem('user'));
var playerScore = document.getElementById("gameScore");
var isQuizChangeListenerAttached = false;

$('#gameScore').hide();
$('#finishQuiz').hide();


$(document).ready(async function () {

    if (!user) {
        alert("You must login to play");
        window.location.href = "login.html";
    }

    function getUserHighScore() {
        ajaxCall("GET", `${userHighScoreApiURL}/${user.id}`, `${gameScore}`, getUserHighScoreSCB, getUserHighScoreECB);
    }

    function getUserHighScoreSCB(result) {
        highScore = result;
        console.log(result);
    }

    function getUserHighScoreECB(err) {
        console.log(err);
    }

    getUserHighScore();

    function getTitlesAndAuthors() {
        ajaxCall("GET", `${booksApiURL}/GetTitlesAndAuthors`, "", getTitlesAndAuthorsSCB, getTitlesAndAuthorsECB);
    }

    function getTitlesAndAuthorsSCB(result) {
        bookAndAuthors = result;
        getRandomIndex(bookAndAuthors);
        console.log(randomNum);
        // After bookAndAuthors is ready, proceed with API key retrieval and other operations
        initializeGenerativeAI();
    }

    function getTitlesAndAuthorsECB(err) {
        console.log(err);
    }
    
    getTitlesAndAuthors();

    async function getApiKey() {
        try {
            const response = await $.ajax({
                type: "GET",
                url: `${apiURL}`,
            });
            return response.apiKey;
        } catch (err) {
            console.log(err);
        }
    }
    window.initializeGenerativeAI = async function() {
    //async function initializeGenerativeAI() {
        //API_KEY = await getApiKey();
        if (!API_KEY) { API_KEY = await getApiKey(); }

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            tools: [{ codeExecution: {} }],
        });

        const generationConfig = {
            temperature: 1,
            topP: 0.95,
            topK: 64,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        };

        async function run() {
            const chatSession = model.startChat({
                generationConfig,
                // safetySettings: Adjust safety settings
                // See https://ai.google.dev/gemini-api/docs/safety-settings
                history: [
                    {
                        role: "user",
                        parts: [
                            { text: "create a question with 1 correct and 3 wrong answers about the book paper money written by Ken Follet or its contents,  display the question and answers as such: Question, Answers, CorrectAnswer, Explanation, each one in a new line each answer in a new line dont display bullets, only respond with the requested information" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "Question: In Ken Follett's \"Paper Money,\" what is the primary driver of the plot?\nAnswers: \nA political conspiracy to manipulate the stock market.\nA deadly virus outbreak that threatens global stability.\nA group of criminals attempting to counterfeit money.\nA love story set against the backdrop of financial intrigue.\nCorrectAnswer: A group of criminals attempting to counterfeit money.\nExplanation: The central plot of \"Paper Money\" revolves around a group of individuals who plan to counterfeit a massive amount of US currency, creating a global financial crisis. \n" },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "same request about the book Homo Deus by Yuval Noah Harari" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "Question: What is the primary theme explored in Yuval Noah Harari's \"Homo Deus\"?\nAnswers: \nThe future of humanity in a world dominated by artificial intelligence.\nThe rise and fall of civilizations throughout history.\nThe evolution of human consciousness and its potential for transcendence.\nThe impact of climate change on human societies.\nCorrectAnswer: The evolution of human consciousness and its potential for transcendence.\nExplanation: \"Homo Deus\" explores the trajectory of human history and envisions a future where humans, through technological advancements, may transcend their biological limitations and achieve godlike capabilities. \n" },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "different question about the book Homo Deus by Yuval Noah Harari" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "Question: According to Yuval Noah Harari in \"Homo Deus,\" what is the primary motivation behind the rise of dataism? \nAnswers:\nTo create a more equitable and just society for all.\nTo improve human health and extend lifespans.\nTo better understand and predict human behavior.\nTo solve the world's most pressing environmental problems.\nCorrectAnswer: To better understand and predict human behavior.\nExplanation: In \"Homo Deus,\" Harari argues that dataism, a belief system centered around the power of data, is driven by the desire to understand and predict human behavior with increasing accuracy. This information, he contends, can be used to optimize various aspects of human life, from health and education to economic productivity and social interactions. \n" },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "another question about the book Homo Deus by Yuval Noah Harari" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "Question: In \"Homo Deus,\" Yuval Noah Harari argues that the \"humanist revolution\" of the Enlightenment has reached its limits. What does he claim is the reason for this?\nAnswers:\nHumanism is too focused on individual freedom and ignores the needs of the collective.\nHumanism has failed to provide solutions to global problems like poverty and disease.\nHumanism has been overtaken by new technologies that are challenging traditional values.\nHumanism is based on a flawed understanding of human nature.\nCorrectAnswer: Humanism has been overtaken by new technologies that are challenging traditional values.\nExplanation: Harari argues that the Enlightenment's focus on human reason and individual freedom, while valuable, has been overshadowed by the rapid advancements in technology. He suggests that these technologies, like artificial intelligence and genetic engineering, are forcing humans to confront new questions about their place in the universe and their understanding of themselves, thus pushing the boundaries of traditional humanist thought. \n" },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "same request about the book Moby Dick by Herman Melville" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "Question:  In Herman Melville's \"Moby Dick,\" what does the white whale, Moby Dick, symbolize?\n\nAnswers:\nThe destructive power of nature.\nThe pursuit of revenge.\nThe elusive nature of truth and meaning.\nThe dangers of unchecked ambition.\n\nCorrectAnswer: The elusive nature of truth and meaning.\nExplanation: While Moby Dick can symbolize various things, the text emphasizes its connection to the elusive nature of truth and meaning.  Captain Ahab's obsessive pursuit of the whale represents a desperate search for understanding and a struggle against the unknowable.  Moby Dick embodies the vastness and mystery of the universe, leaving Ahab and the crew grappling with questions of purpose and existence. \n" },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "make sure to always generate a total of 4 answers including 1 correct and 3 incorrect and make sure there are no empty lines between the text" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "Okay, I understand. I will make sure to generate 4 answers, including 1 correct and 3 incorrect, with no empty lines between the text. \n\nPlease let me know what question you would like me to generate about \"Moby Dick\".  \n" },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "generate a different question about the book The Girl with the Dragon Tattoo by Stieg Larsson" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "Question: In Stieg Larsson's \"The Girl with the Dragon Tattoo,\" what is the primary motive behind the decades-old murder mystery that Lisbeth Salander and Mikael Blomkvist investigate?\n\nAnswers:\nTo expose a network of child sex trafficking.\nTo uncover a hidden Nazi treasure.\nTo avenge a past betrayal within a powerful family.\nTo protect a secret government conspiracy.\n\nCorrectAnswer: To avenge a past betrayal within a powerful family.\nExplanation: The central mystery in \"The Girl with the Dragon Tattoo\" revolves around the disappearance of Harriet Vanger, a member of a wealthy and influential family. The investigation uncovers a web of dark secrets and long-held grudges within the Vanger clan, ultimately leading to a quest for justice and retribution. \n" },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "There are empty lines between question answer and correctAnswer" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "You are absolutely right! I apologize for the formatting error. I will make sure to keep the text compact and without unnecessary spacing.  \n\nPlease give me another question to generate, and I will do my best to provide the formatted output correctly. \n" },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "same request about the book A New and General Biographical Dictionary by Richard A. Burridge's" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "Question: What is the primary focus of Richard A. Burridge's \"A New and General Biographical Dictionary\"?\n\nAnswers:\nBiographies of prominent figures in the early Christian church.\nBiographies of notable individuals throughout history.\nBiographies of influential figures in the field of biblical studies.\nBiographies of renowned scientists and inventors.\n\nCorrectAnswer: Biographies of prominent figures in the early Christian church.\nExplanation:  \"A New and General Biographical Dictionary\" by Richard A. Burridge is specifically dedicated to providing biographies of significant individuals who played a key role in the development and spread of early Christianity. \n" },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            { text: "same request about the book The Twelve Caesars by Suetonius" },
                        ],
                    },
                    {
                        role: "model",
                        parts: [
                            { text: "Question: What is the primary purpose of Suetonius's \"The Twelve Caesars\"?\n\nAnswers:\nTo provide a detailed account of the Roman Republic's transition to an empire.\nTo offer a historical analysis of the Roman military's rise to power.\nTo present a collection of gossipy anecdotes about the first twelve Roman emperors.\nTo examine the philosophical and religious beliefs of the Roman elite.\n\nCorrectAnswer: To present a collection of gossipy anecdotes about the first twelve Roman emperors.\nExplanation: \"The Twelve Caesars\" by Suetonius is known for its focus on the personal lives and often scandalous behavior of the first twelve Roman emperors. It provides a unique blend of historical facts and juicy details, offering a glimpse into the personalities and power struggles of these influential figures. \n" },
                        ],
                    },
                ],
            });
            console.log(randomNum);
            const result = await chatSession.sendMessage(`same request about the book ${bookAndAuthors[randomNum].title} written by ${bookAndAuthors[randomNum].name}`);
            var text = result.response.text();
            generatedData = parseTextToJSON(text);

            createQuiz(generatedData.question, generatedData.answers);
        }

        run();
        var startBtn = document.getElementById("startGame");
        playerScore.innerText = `Player Score: ${gameScore}`;

        if (!isQuizChangeListenerAttached) {
            quiz.addEventListener('change', (event) => {
                if (event.target.type === 'radio') {
                    const selectedAnswer = event.target.value;
                    const selection = event.target.parentElement;
                    revealAnswer(generatedData.correctAnswer, selectedAnswer, generatedData.explanation, selection);
                    const radioButtons = document.querySelectorAll('input[type="radio"]');
                    radioButtons.forEach(radioButton => {
                        if (!radioButton.checked) {
                            radioButton.disabled = true;
                        }
                    });
                }
            });
            isQuizChangeListenerAttached = true; // Set the flag to true after attaching the event listener
        }

        startBtn.addEventListener('click', (event) => {
            $('#startGame').hide();
            $('#gameScore').show();
            $('#quiz').show();
            $('#finishQuiz').show();
            gameScore = 0;
        });
    }
    $('#quiz').hide();


});

function getRandomIndex(object) {
    const length = Object.keys(object).length;
    randomNum = Math.floor(Math.random() * length)
    return randomNum;
}

var next = document.createElement('button');
var resultImg = document.createElement('img');
var quizExplanation = document.createElement('p');
var nextEventListener = false;
function revealAnswer(answer, selectedAnswer, explanation, selection) {
    var image;
    if (selectedAnswer === answer) {
        image = correctImg;
        gameScore += 1;
        selection.classList.add('correctAnswer');
        console.log("Correct, +1 point awarded");
        playerScore.innerText = `Player Score: ${gameScore}`;
        //increaseScore(); /// to be implemented
    } else {
        image = incorrectImg;
        selection.classList.add('incorrectAnswer');
        console.log("Incorrect, 0 points awarded");
    }
    next.textContent = "Next question";
    next.id = "nextQuestion";
    resultImg.src = image;
    quizExplanation.id = "quizExp";
    quizExplanation.textContent = explanation;
    $('#quiz').append(resultImg);
    $('#quiz').append(quizExplanation);
    $('#quiz').append(next);
    if (!nextEventListener) {
        next.addEventListener('click', (event) => {
            getRandomIndex(bookAndAuthors);
            initializeGenerativeAI()
            $('#quiz').empty();
            nextEventListener = true;
        });
    }

}

var finishGameBtn = document.getElementById("finishGame");

finishGameBtn.addEventListener('click', (event) => {
    $('#startGame').show();
    $('#gameScore').hide();
    $('#quiz').empty();
    $('#quiz').hide();
    $('#finishQuiz').hide();
    updateUserHighScore(); // to be implemented
    console.log("high score:" + highScore);
    // also add modal with results of the game!
});


// not yet implemented
function updateUserHighScore() {
    if (highScore < gameScore) {
        sendUserHighScore();
    }
}

function sendUserHighScore() {
    ajaxCall("PUT", `${userHighScoreApiURL}/${user.id}`, `${gameScore}`, sendUserHighScoreSCB, sendUserHighScoreECB);
}

function sendUserHighScoreSCB(result) {
    console.log(result);
}

function sendUserHighScoreECB(err) {
    console.log(err);
}

function createQuiz(question, options) {
    const quizContainer = document.getElementById('quiz');
    //$('#quiz').empty();
    quizContainer.innerHTML = '';
    var optionCount = 0;
    const quizQuestion = document.createElement('p');
    quizQuestion.textContent = question;
    quizContainer.appendChild(quizQuestion);
    options.forEach(option => {
        if (optionCount == 4) { return; }
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.id = "answerNum" + optionCount;
        const newLine = document.createElement('br');

        input.type = 'radio';
        input.name = 'quizAnswers';
        input.value = option;

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        quizContainer.appendChild(label);
        quizContainer.appendChild(newLine);
        optionCount += 1;
    });
}

function parseTextToJSON(text) {
    const lines = text.trim().split("\n");
    const jsonOutput = {
        question: "",
        answers: [],
        correctAnswer: "",
        explanation: ""
    };

    lines.forEach((line, index) => {
        if (line.startsWith("Question:")) {
            jsonOutput.question = line.replace("Question:", "").trim();
        } else if (line.startsWith("Answers:")) {
            for (let i = index + 1; i < lines.length; i++) {
                if (lines[i].startsWith("CorrectAnswer:") || lines[i].startsWith("Explanation:")) {
                    break;
                }
                jsonOutput.answers.push(lines[i].trim());
            }
        } else if (line.startsWith("CorrectAnswer:")) {
            jsonOutput.correctAnswer = line.replace("CorrectAnswer:", "").trim();
        } else if (line.startsWith("Explanation:")) {
            jsonOutput.explanation = line.replace("Explanation:", "").trim();
        }
    });

    return jsonOutput;
}
