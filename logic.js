window.addEventListener('DOMContentLoaded', () => {
    const questionForm = document.querySelector('.js-questionForm');
    const questionContainer = document.getElementById('question-container');

    // Function to load questions from the text file
    async function loadQuestions(numQuestions) {
        try {
            const response = await fetch('questions.txt');
            const text = await response.text();
            const allQuestions = text.trim().split('\n');
            // Shuffle the questions
            const shuffledQuestions = allQuestions.sort(() => 0.5 - Math.random());
            return shuffledQuestions.slice(0, numQuestions);
        } catch (error) {
            console.error('Error loading questions:', error);
            return [];
        }
    }

    // Function to format and display the loaded questions
    function displayQuestions(questions) {
        const questionList = questions.map((question) => `<li><input type="checkbox"><span>${question}</span></li>`).join('');
        questionContainer.innerHTML = `<ol id="question-list">${questionList}</ol>`;
    }

    // Event listener for form submission
    questionForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const numQuestionsInput = document.getElementById('num-questions-input');
        const numQuestions = parseInt(numQuestionsInput.value, 10);

        // Load questions and display them
        const questions = await loadQuestions(numQuestions);
        displayQuestions(questions);
    });

    // Function to detect curl requests and return questions
    function isCurlRequest() {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        return /curl/i.test(userAgent);
    }

    // Function to handle curl request
    async function handleCurlRequest() {
        const urlParams = new URLSearchParams(window.location.search);
        const numQuestions = urlParams.get('numQuestions') ? parseInt(urlParams.get('numQuestions'), 10) : 5;
        const questions = await loadQuestions(numQuestions);
        questions.forEach(question => console.log(`- ${question}`));
    }

    // If it's a curl request, handle it
    if (isCurlRequest()) {
        handleCurlRequest();
    }
});
