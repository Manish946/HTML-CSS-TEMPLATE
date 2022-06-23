
const API_BASE_URL = 'https://www.algoexpert.io/api/fe/questions';

fetchAndAppendQuestions();

async function fetchAndAppendQuestions(){
    const questions = await fetchQuestions();
    const questionsByCategory = getQuestionsByCategory(questions);

    const wrapper = document.getElementById('wrapper');
    for (const[category,questions] of Object.entries(questionsByCategory)){
        const category = createCategory(category, questions);
        wrapper.append(CategoryDiv);
    
    }

}


function createCategory(category, questions){
    const CategoryDiv = document.createElement('div');
    CategoryDiv.classList.add('category');
    const h2 = document.createElement('h2');
    h2.textContent = category;
    questions.forEach(question =>{
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        const h3 = document.createElement('h3');
        h3.textContent = question.name;
        questionDiv.append(h3);
        CategoryDiv.append(questionDiv);
    });

    return CategoryDiv;
}


async function fetchQuestions(){
    const response = await fetch(API_BASE_URL);

    const questions = await response.json();
    return questions;
}


function getQuestionsByCategory(questions){
    const QuestionsByCategory = {};
    questions.forEach(question => {
        if(QuestionsByCategory.hasOwnProperty(question.category)){
            QuestionsByCategory[question.category].push(question);
        }
        else{
            QuestionsByCategory[question.category] = [question];
        }
    });
    return QuestionsByCategory;
}