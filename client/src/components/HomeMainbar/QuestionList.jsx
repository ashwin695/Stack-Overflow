import React from "react";
import Questions from './Questions'

function QuestionList({questionsList}) {

    return(
        <div>
            {
                questionsList.map((question) => (
                    <Questions question={question} key={question._id} />
                ))
            }
        </div>
    )
}

export default QuestionList