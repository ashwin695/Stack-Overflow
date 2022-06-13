import React from "react";
import { useState } from "react";
import { updateProfile } from "../../actions/users";
import './UsersProfile.css'
import { useDispatch } from 'react-redux'

function EditProfileForm({currentUser, setEdit}) {

    const [name, setName] = useState(currentUser?.result?.name)
    const [about, setAbout] = useState(currentUser?.result?.about)
    const [tags, setTags] = useState('')

    const dispatch = useDispatch()

    const handleSubmit = (event) => {
        event.preventDefault()
        if(tags.length === 0)
        {
            dispatch(updateProfile(currentUser?.result?._id, {name, about, tags: currentUser?.result?.tags}))
        }
        else
        {
            dispatch(updateProfile(currentUser?.result?._id, {name, about, tags}))
        }
        setEdit(false)
    }

    return(
        <div>
            <h1 className="edit-profile-title">
                Edit Your Profile
            </h1>
            <h2 className="edit-profile-title-2">
                Public Information
            </h2>
            <form className="edit-profile-form" onSubmit={handleSubmit}>
                <label htmlFor="name">
                    <h3>Display Name</h3>
                    <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
                </label>
                <label htmlFor="about">
                    <h3>About me</h3>
                    <textarea id="about" cols="30" rows="10" value={about} onChange={(event) => setAbout(event.target.value)}></textarea>
                </label>
                <label htmlFor="tags">
                    <h3>Watched Tags</h3>
                    <p>Add tags separated by 1 space</p>
                    <input type="text" id="tags" onChange={(event) => setTags(event.target.value.split(' '))} />
                </label>
                <br />
                <input type="submit" value="Save profile" className="user-submit-btn" />
                <button type="button" className="user-cancel-btn" onClick={() => setEdit(false)}>Cancel</button>
            </form>
        </div>
    )
}

export default EditProfileForm