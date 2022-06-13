import React from 'react'
import { useLocation } from 'react-router-dom'
import './HomeMainbar.css'
import QuestionList from './QuestionList'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function HomeMainbar() {

    /*var questionsList = [{
        _id:1,
        upVotes:3,
        downVotes:2,
        noOfAnswers:2,
        questionTitle: "What is a Function ?",
        questionBody: "It meant to be",
        questionTags: ["java", "nodejs", "react js", "mongodb"],
        userPosted:'ashwin',
        userId:1,
        askedOn:'jan 1',
        answer: [{
            answerBody:'Answer',
            userAnswered: 'gupta',
            answeredOn: "jan 2",
            userId:2
        }]
    },{
        _id:2,
        upVotes:3,
        downVotes:2,
        noOfAnswers:0,
        questionTitle: "What is a Function ?",
        questionBody: "It meant to be",
        questionTags: ["java", "R", "python"],
        userPosted:'ashwin',
        askedOn:'jan 1',
        userId: 1,
        answer: [{
            answerBody:'Answer',
            userAnswered: 'gupta',
            answeredOn: "jan 2",
            userId:2
        }]
    },{
        _id:3,
        votes:1,
        noOfAnswers:0,
        questionTitle: "What is a Function ?",
        questionBody: "It meant to be",
        questionTags: ["java", "R", "python"],
        userPosted:'ashwin',
        askedOn:'jan 1',
        userId: 1,
        answer: [{
            answerBody:'Answer',
            userAnswered: 'gupta',
            answeredOn: "jan 2",
            userId:2
        }]
    }]*/

    const questionsList = useSelector(state => state.questionsReducer)
    console.log(questionsList)

    const location = useLocation()
    const user = 1
    const navigate = useNavigate()

    const handleCheckAuth = () => {
        if(user === null)
        {
            alert("Login or Sign Up")
            navigate('/Auth')
        }
        else
        {
            navigate('/AskQuestion')
        }
    }

    return(
        <div className='main-bar'>
            <div className='main-bar-header'>
                {
                    location.pathname === '/' ? <h1>Top Questions</h1> : <h1>All Questions</h1>
                }
                <button onClick={()=>handleCheckAuth()} className='ask-btn'>Ask Questions</button>
            </div>
            <div>
                {
                    questionsList.data === null ?
                    <h1>Loading...</h1> : 
                    <>
                        <p>{ questionsList.data.length } questions</p>
                        <QuestionList questionsList={questionsList.data} />
                    </>
                }
            </div>
        </div>
    )
}

export default HomeMainbar