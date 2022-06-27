export const getVisibleRoutes = (routes, role)=>{
    return routes.filter(route=>{
        return route.visibleFor.includes(role);
    })
}

export const getVisibleNavItems = (_nav, role)=>{
    return _nav.filter(navItem=>{
        return navItem.accessibleBy.includes(role);
    })
}

export const getActiveQuizList = (quizList)=>{
    return quizList.filter((quiz) => !quiz.isDeleted);
}

export const findQuizFromQuizList = (quizList, id)=>{
    const quiz = quizList.find(quizItem => Number(quizItem.id) === Number(id));
    if(quiz){
        return quiz;
    }
    return null;
}

export const getActiveQuestions = (questions)=>{
    console.log({questions});
    return questions && questions.filter(item=>!item.isDeleted);
}

export const formatQuestion = (data)=>{
    let questionData = {};
    questionData.question = data.question;
    questionData.answer = data.answer;

    const objectKeys = Object.keys(data.options);
    let options = [];
    const newOptions = data.options;

    for (let i = 0; i < objectKeys.length; i++) {
      options.push(newOptions[objectKeys[i]]);
    }

    questionData.options = options;
    questionData.isDeleted = false;
    return questionData;
}

export const getCurrentYear = ()=>{
    const d = new Date();
    return d.getFullYear();
}

export const formatQuiz = (quiz, questions)=>{
    const formatedQuiz ={...quiz, questions:[quiz.questions]};
    formatedQuiz.questions = questions;
    return formatedQuiz;
}