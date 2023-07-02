// Load the questions and display remaining runs and months
window.addEventListener('DOMContentLoaded', () => {
    const questionForm = document.querySelector('.js-questionForm');
    const questionContainer = document.getElementById('question-container');
    const remainingRuns = document.getElementById('remaining-runs');
    const remainingMonths = document.getElementById('remaining-months');

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

    // Function to calculate and display remaining runs and months
    function displayRemainingInfo(totalQuestions, numQuestions) {
        const runs = Math.ceil(totalQuestions / numQuestions);
        const months = Math.ceil(runs / 4);
        remainingRuns.textContent = `Remaining Runs: ${runs}`;
        remainingMonths.textContent = `Remaining Months: ${months}`;
    }

    // Function to format and display the loaded questions
    function displayQuestions(questions) {
        const questionList = questions.map((question, index) => `<li><input type="checkbox"><span>${question}</span></li>`).join('');
        questionContainer.innerHTML = `<ol id="question-list">${questionList}</ol>`;
    }

    // Event listener for form submission
    questionForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const numQuestionsInput = document.getElementById('num-questions-input');
        const numQuestions = parseInt(numQuestionsInput.value, 10);

        // Load questions and display them
        const response = await fetch('questions.txt');
        const text = await response.text();
        const allQuestions = text.trim().split('\n');
        const totalQuestions = allQuestions.length;
        const questions = await loadQuestions(numQuestions);
        displayQuestions(questions);

        // Display remaining runs and months
        displayRemainingInfo(totalQuestions, numQuestions);
    });
});
