import React, { useState } from "react";
import './AskQuestion.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom"
import { askQuestion } from "../../actions/question";

function AskQuestion() {
    
    const [questionTitle, setQuestionTitle] = useState('')
    const [questionBody, setQuestionBody] = useState('')
    const [questionTags, setQuestionTags] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const User = useSelector((state) => (state.currentUserReducer))

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log({questionTitle, questionBody, questionTags})
        dispatch(askQuestion({ questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id}, navigate))
    }

    const handleEnter = (event) => {
        if(event.key === 'Enter')
        {
            setQuestionBody(questionBody + "\n")
        }
    }

    return(
       <div className="ask-question">
           <div className="ask-ques-container">
               <h1>Ask a Public Question</h1>
               <form onSubmit={handleSubmit}>
                   <div className="ask-form-container">
                       <label htmlFor="ask-ques-title">
                           <h4>Title</h4>
                           <p>Be specific and imagine you're asking a question to another person</p>
                           <input type="text" id="ask-ques-title" onChange={(event)=>setQuestionTitle(event.target.value)} placeholder="e.g. Is there an R function for finding the index of an element in a vector ?" />
                       </label>
                       <label htmlFor="ask-ques-body">
                           <h4>Body</h4>
                           <p>Include all the information someone would need to answer your question</p>
                           <textarea name="" id="ask-ques-body" onChange={(event)=>setQuestionBody(event.target.value)} cols="30" rows="10" onKeyPress={handleEnter}></textarea>
                       </label>
                       <label htmlFor="ask-ques-tags">
                           <h4>Tags</h4>
                           <p>Add up to 5 Tags to describe what your question is about</p>
                           <input type="text" id="ask-ques-tags" onChange={(event)=>setQuestionTags(event.target.value.split(" "))} />
                       </label>
                   </div>
                   <input type="submit" value="Review your Question" className="review-btn" />
               </form>
           </div>
       </div>
    )
}

export default AskQuestion