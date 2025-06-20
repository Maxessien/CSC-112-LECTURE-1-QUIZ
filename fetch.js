let quizDatas
const startBtn = document.querySelector('.start')
if (startBtn){startBtn.addEventListener('click', ()=>{
    console.log('fetching')
    startBtn.textContent = 'Loading ...'
    fetch('https://raw.githubusercontent.com/Maxessien/Test-API-Fetch-/main/test.json')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            quizDatas = data;
            sessionStorage.setItem('quizData', JSON.stringify(quizDatas))
            
            window.location.href = 'quiz.html'

        }).catch(err =>{
            if (err.message==='Failed to fetch') {
                alert('Network Error. Please check your internet connection')
                startBtn.textContent = 'Start Quiz'
            }
        });
})}