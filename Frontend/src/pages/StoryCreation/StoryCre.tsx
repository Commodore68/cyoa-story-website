import React, { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import './DropdownDemo.css';

/*  
title: string,
summary: string,
tags: string[],
genre: string,
subGenre?: string | null,
contentRating: 'PG' | 'PG-13' | 'Mature' | 'Corn' | null,
*/

const StoryCre = (): JSX.Element => 
{
    const [genre, setGenre] = useState('');
    const [subGenre, setSubGenre] = useState<any>(null);
    const [contentRating, setContentRating] = useState('');
    const [summary, setSummary] = useState(''); 
    const [title, setTitle] = useState('');
    
    const contentRatingOptions = [
        {name: 'PG', code: 'pg'},
        {name: 'PG-13', code: 'p13'},
        {name: 'Mature', code: 'old'},
        {name: 'Corn', code: 'corn'}
    ];

    const genreOptions = [
        {name: 'action', code: 'act'},
        {name: 'adventure', code: 'adv'},
        {name: 'crime', code: 'crim'},
        {name: 'fantasy', code: 'fan'},
        {name: 'other', code: 'other'}

    ];

    // subgenre need a 
    const subGenreOptions = [
        {name: 'action', code: 'act'},
        {name: 'adventure', code: 'adv'},
        {name: 'crime', code: 'crim'},
        {name: 'fantasy', code: 'fan'},
        {name: 'other', code: 'other'}
    ];
    
    
    return (
        <>
        <div className = "creation">
            <div className = "node">
                <div className="p-field p-grid">
                    <h1>Story Creation Page</h1>
                    <br/>
    
                    // title
                    <h3>Title</h3>
                    <br/>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputText id="inputtext" value={title} onChange={(e) => setTitle(e.target.value)} />
                            <label htmlFor="inputtext">InputText</label>
                        </span>
                    </div>
                    // summary
                    <h3>Summary</h3>
                    <br/>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <InputTextarea id="textarea" value={summary} onChange={(e) => setSummary(e.target.value)} rows={3} />
                            <label htmlFor="Summary">Textarea</label>
                        </span>
                    </div>
                    /* tags, gene, sub gen and content rating will be drop down menu view */

                    // tags
                    <h3>Tags</h3>
                    <br/>

                    // genre
                    <h3>Genre</h3>
                    <br/>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <Dropdown id="dropdown" value={genre} options={genreOptions} onChange={(e) => setGenre(e.value)} optionLabel="name" />
                            <label htmlFor="Genre">Dropdown</label>
                        </span>
                    </div>

                    // sub-genre
                    <h3>Sub-Genre</h3>
                    <br/>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <Dropdown id="dropdown" value={subGenre} options={subGenreOptions} onChange={(e) => setSubGenre(e.value)} optionLabel="name" />
                            <label htmlFor="dropdown">Dropdown</label>
                        </span>
                    </div>

                    // content rating PG, PG-13, Mature, Corn, null
                    <h3>Content Rating</h3>
                    <br/>
                    <div className="p-field p-col-12 p-md-4">
                        <span className="p-float-label">
                            <Dropdown id="dropdown" value={contentRating} options={contentRatingOptions} onChange={(e) => setContentRating(e.value)} optionLabel="name" />
                            <label htmlFor="Content Rating">Dropdown</label>
                        </span>
                    </div>



                </div>
            </div>
        </div>
        
        </>
    );
};

export default StoryCre;
