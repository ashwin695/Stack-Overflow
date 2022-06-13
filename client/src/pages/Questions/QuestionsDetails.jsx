import React, {useState} from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import uparrow from '../../assets/uparrow.png'
import downarrow from '../../assets/downarrow.png'
import './Questions.css'
import Avatar from '../../components/Avatar/Avatar'
import DisplayAnswers from "./DisplayAnswer";
import { useDispatch, useSelector } from "react-redux";
import { postAnswer } from "../../actions/question";
import moment from 'moment'
import copy from 'copy-to-clipboard'
import { deleteQuestion, voteQuestion } from "../../actions/question";

function QuestionsDetails() {

    const [answer, setAnswer] = useState('')
    const User = useSelector((state) => (state.currentUserReducer))
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const url = 'http://localhost:3000'
    const questionsList = useSelector(state => state.questionsReducer)

    const handlePosAns = (event, answerLength) => {
        event.preventDefault()
        if(User === null)
        {
            alert('Login or Signuo to Answer a Question')
            navigate('/Auth')
        }
        else
        {
            if(answer === '')
            {
                alert("Enter an Answer before Submit")
            }
            else
            {
                dispatch(postAnswer({ id, noOfAnswers: answerLength + 1, answerBody: answer, userAnswered: User.result.name, userId: User.result._id}))
            }
        }
    }

    const handleShare = () => {
        copy(url+location.pathname)
        alert('Copied url : '+url+location.pathname)
    }

    const handleDelete = () => {
        dispatch(deleteQuestion(id, navigate))
    }

    const handleUpVote = () => {
        dispatch(voteQuestion(id, 'upVote', User.result._id))
    }

    const handleDownVote = () =>{
        dispatch(voteQuestion(id, 'downVote', User.result._id))
    }

    /*var questionsList = [{
        _id:'1',
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
        _id:'2',
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
        _id:'3',
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

    return(
        <div className="question-details-page">
            {
                questionsList.data === null ?
                <h1>Loading...</h1> :
                <>
                    {
                        questionsList.data.filter(question => question._id === id).map(question => (
                            <div key={question._id}>
                                {console.log(question)}
                                <section className="question-details-container">
                                    <h1>{question.questionTitle}</h1>
                                    <div className="question-details-container-2">
                                        <div className="question-votes">
                                            <img src={uparrow} alt='uparrow' width='18' onClick={handleUpVote} />
                                            <p>{question.upVote.length - question.downVote.length}</p>
                                            <img src={downarrow} alt='downarrow' width='18' onClick={handleDownVote} />
                                        </div>
                                        <div style={{width:'100%'}}>
                                            <p className="question-body">{question.questionBody}</p>
                                            <div className="question-details-tags">
                                                {
                                                    question.questionTags.map((tag) => (
                                                        <p key={tag}>{tag}</p>
                                                    ))
                                                }
                                            </div>
                                            <div className="questions-actions-user">
                                                <div>
                                                    <button type="button" onClick={handleShare}>Share</button>
                                                    {
                                                        User?.result?._id === question?.userId && (<button type="button" onClick={handleDelete}>Delete</button>)
                                                    }
                                                </div>
                                                <div>
                                                    <p>asked {moment(question.askedOn).fromNow()}</p>
                                                    <Link to={`/Users/${question.userId}`} className='user-link' style={{color:"#0086d8"}}>
                                                        <Avatar backgroundColor="orange" px="8px" py="5px">{question.userPosted.charAt(0).toUpperCase()}</Avatar>
                                                        <div>
                                                            {question.userPosted}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                {
                                    question.noOfAnswers !== 0 && (
                                        <section>
                                            <h3>{question.noOfAnswers} Answers</h3>
                                            <DisplayAnswers key={question._id} question={question} handleShare={handleShare} />
                                        </section>
                                    )
                                }
                                <section className="post-ans-container">
                                    <h3>Your Answer</h3>
                                    <form onSubmit={(event)=>handlePosAns(event, question.answer.length)}>
                                        <textarea name="" id="" cols="30" rows="10" onChange={(event)=>setAnswer(event.target.value)}></textarea><br />
                                        <input type="submit" className="post-ans-btn" value="Post Your Answers" />
                                    </form>
                                    <p>
                                        Browse other Questions Tagged
                                        {
                                            question.questionTags.map((tag) => (
                                                <Link to="/Tags" key={tag} className='ans-tags'> {tag} </Link>
                                            ))
                                        }
                                        or
                                        {
                                            <Link to="/AskQuestion" style={{textDecoration:'none', color:'#009dff'}}> ask your own question.</Link>
                                        }
                                    </p>
                                </section>
                            </div>
                        ))
                    }
                </>
            }
        </div>
    )
}

export default QuestionsDetails