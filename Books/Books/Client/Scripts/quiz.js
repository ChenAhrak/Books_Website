
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiURL = "https://localhost:7195/GetApiKey";
const booksApiURL = "https://localhost:7195/api/Books";
var API_KEY;
var generatedData;
var bookAndAuthors;
var randomNum;


$(document).ready(async function () {


    function getTitlesAndAuthors() {
        ajaxCall("GET", `${booksApiURL}/GetTitlesAndAuthors`, "", getTitlesAndAuthorsSCB, getTitlesAndAuthorsECB);
    }

    function getTitlesAndAuthorsSCB(result) {
        bookAndAuthors = result;
        console.log(bookAndAuthors[0]);
        getRandomIndex(bookAndAuthors);
        console.log(randomNum);
        // After bookAndAuthors is ready, proceed with API key retrieval and other operations
        initializeGenerativeAI();
    }

    function getTitlesAndAuthorsECB(err) {
        console.log(err);
    }

    function getRandomIndex(object) {
        const length = Object.keys(object).length;
        randomNum = Math.floor(Math.random() * length)
        return randomNum;
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

    async function initializeGenerativeAI() {
        API_KEY = await getApiKey();

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
                            { text: "Question: In Stieg Larsson's \"The Girl with the Dragon Tattoo,\" what is the primary motivation behind the decades-old murder investigation that Lisbeth Salander and Mikael Blomkvist undertake?\n\nAnswers:\nA desire to clear the name of a falsely accused individual.\nA personal vendetta against the perpetrator of the crime.\nA quest for justice and closure for the victims' families.\nA chance to expose a larger conspiracy and corruption within the Swedish government.\n\nCorrectAnswer: A quest for justice and closure for the victims' families.\nExplanation:  The investigation into the disappearance and presumed murder of Harriet Vanger is primarily driven by the desire for justice and closure for the Vanger family. Mikael Blomkvist is hired to investigate the case, and Lisbeth Salander joins him, driven by her own sense of justice and a desire to protect the vulnerable. While elements of conspiracy and corruption are present, the primary motivation is the pursuit of truth and closure for the victims. \n" },
                        ],
                    },
                ],
            });

            const result = await chatSession.sendMessage(`same request about the book ${bookAndAuthors[randomNum].title} written by ${bookAndAuthors[randomNum].name}`);
            var text = result.response.text();
            generatedData = parseTextToJSON(text);

            createQuiz(generatedData.question, generatedData.answers);
        }

        run();

        quiz.addEventListener('change', (event) => {
            if (event.target.type === 'radio') {
                const selectedAnswer = event.target.value;
                console.log('Selected answer:', selectedAnswer);

                if (selectedAnswer === generatedData.correctAnswer) {
                    console.log("+100 points awarded");
                } else {
                    console.log("0 points awarded");
                }
            }
        });
    }
});

function revealAnswer() {

}


function createQuiz(question, options) {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';
    var optionCount = 0;
    const quizQuestion = document.createElement('p');
    quizQuestion.textContent = question;
    quizContainer.appendChild(quizQuestion);
    options.forEach(option => {
        if (optionCount == 4) { return; }
        const label = document.createElement('label');
        const input = document.createElement('input');
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
