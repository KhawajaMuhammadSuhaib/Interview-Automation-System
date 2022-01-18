import React, { useState } from "react";
import { Button } from "primereact/button";
import Icon from '@mdi/react';
import { mdiArrowLeft } from '@mdi/js';
import '../StyleSheets/web.css'


export default function StartScreen() {
    const [loading, setLoading] = useState(false);


    return (
        <div className='body-content'>
            <div>
                <Icon path={mdiArrowLeft} size={1} />
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
