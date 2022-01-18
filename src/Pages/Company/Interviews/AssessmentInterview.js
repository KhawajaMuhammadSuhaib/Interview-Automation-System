import React, { useState, useRef, useContext } from 'react'
import Icon from '@mdi/react';
import { Toast } from 'primereact/toast';
import { mdiArrowLeft } from '@mdi/js';
import { ProgressSpinner } from 'primereact/progressspinner';
import axios from 'axios';
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import 'antd/dist/antd.css';
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import UserContext from '../../../Context/User';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);

export default function AssessmentInterview(props) {
    const [files, setFiles] = useState('');
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [lastDate, setLastDate] = useState(null);
    const [instructions, setInstructions] = useState(null);
    const [url, setUrl] = useState('')
    const toastBR = useRef(null);

    const showError = (message) => {
        toastBR.current.show({ severity: 'error', summary: 'Error Message', detail: message, life: 3000 });
    }
    const showSuccess = (message) => {
        toastBR.current.show({ severity: 'success', summary: 'Interview Created', detail: message, life: 3000 });
    }
    const CreateInterview = async () => {
        setLoading(true)
        if (lastDate === null || instructions === null || files === '') {
            showError('Please provide all the details required to attempt the interview')
            setLoading(false)
        }
        else {
            const file = files;
            const data = new FormData()
            data.append("file", file)
            data.append("upload_preset", "fileUpload")
            data.append("cloud_name", "dx6obccn6")
            fetch("https://api.cloudinary.com/v1_1/dx6obccn6/upload", {
                method: "post",
                mode: "cors",
                body: data
            }).then(res => res.json())
                .then(async data => {
                    setUrl(() => data.url)
                    console.log(data.url)
                }).catch(err => {
                    console.log(err)
                })
            const date = new Date(lastDate).getTime() / 1000
            const info = {
                jobID: props.ID,
                instructions: instructions,
                testName: 'Assessment Interview',
                deadline: new Date(lastDate).getTime() / 1000,
                fileLink: url,
            }
            console.log(info)
            axios.post('https://iastestingapi.herokuapp.com/api/interviews/createProjectAssesment', { ...info }, { headers: { 'x-access-token': user.token } }
            ).then(async (res) => {
                setLoading(false)
                showSuccess('Interview created successfully.')
                props.onClose();
                console.log(res)
            }).catch(async (err) => {
                showError("Error in interview creation please review all feilds and try again");
                console.log(err)
                setLoading(false)
            })
        }
    }
    return (
        <div>
            <Toast ref={toastBR} position="bottom-right" />
            <div className="">
                <div>
                    <Icon path={mdiArrowLeft} size={1} onClick={props.onClose} />
                </div>
                <p className='UnderLineHeader'> Task Assessment Interview Setup</p>
                <div className='RecordQuestionFormContainer'>
                    <div className='DeadlineContainer'>
                        <div className='DeadlineWrap'>
                            <p className='interviewHeading'>Last date</p>
                            <p className='interviewSubheading'>Please specify the closing date of the interview.</p>
                            <input className='DeadlineInput' type='date' onClick={(e) => setLastDate(e.target.value)} />
                        </div>
                    </div>
                    <div className='QuestionWrap'>
                        <p className='interviewHeading'>Instructions</p>
                        <p className='interviewSubheading'>Please specify the instructions required to solve the task.</p>
                        <textarea rows="3" cols="140" onChange={(e) => setInstructions(e.target.value)} />
                    </div>
                    <div className='QuestionWrap'>
                        <p className='interviewHeading'>Assessment</p>
                        <p className='interviewSubheading'>Please upload the Task File for the interview below.</p>
                        <div className='fileUploader'>
                            {/* <FilePond
                                files={files}
                                allowMultiple={false}
                                onupdatefiles={setFiles}
                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                            /> */}
                        </div>
                        <input type='file' onChange={(e) => setFiles(e.target.files[0])} />
                    </div>

                    <div className='QuestionButtonContainer' style={{ marginTop: '90px' }}>
                        <div className='CreateInterviewButton' onClick={CreateInterview}>Create</div>
                        <div className='CancelButton' onClick={props.onClose}>Cancel</div>
                    </div>
                </div>
            </div>
            {
                loading ?
                    <div className='loaderContainer'>
                        <ProgressSpinner />
                    </div>
                    :
                    ''
            }
        </div>
    )
}