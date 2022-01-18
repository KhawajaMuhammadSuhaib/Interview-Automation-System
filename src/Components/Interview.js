import { Button } from "primereact/button";
import React, { useState } from "react";
import { RadioButton } from 'primereact/radiobutton';
import Icon from '@mdi/react';
import {  mdiArrowLeft} from '@mdi/js';
import { useTimer } from 'react-timer-hook';
import '../StyleSheets/web.css'


export default function QuestionInterview() {
  const [loading, setLoading] = useState(false);


    return (
        <div className='body-content'>
          <div>
            <Icon path={mdiArrowLeft } size={1}/>
          </div>
            <div>
                <div>
                    <p>React Developer Job - Recorded Interview</p>
                    <p>Due December 3, 2021</p>
                </div>
                <div>
                    <Button>Start</Button>
                </div>
            </div>
            <div>
                <p>Instructions</p>
                <p>None</p>
            </div>
            <div>
                <p>Description</p>
                <p>None</p>
            </div>
        </div>
    );
};
