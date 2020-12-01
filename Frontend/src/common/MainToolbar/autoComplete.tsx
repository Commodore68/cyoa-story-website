// import React, { useState, useEffect } from 'react';
// import { AutoComplete } from 'primereact/autocomplete';
// import SampleStories from "./DataTable";
// import 'primeicons/primeicons.css';
// import 'primereact/resources/themes/saga-blue/theme.css';
// import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';
//
//
// const AutoCompleter = () => {
//     const [stories, setStories] = useState<string[]>([]);
//     const [selectedStory, setSelectedStory] = useState<any>(null);
//     const [filteredStories, setFilteredStories] = useState<any>(null);
//     const sampleStories = new SampleStories();
//
//     useEffect(() => {
//         sampleStories.getSampleAuthors().then(data =>{ console.log(data);
//             return setStories(data);}).catch(e => console.log(e));
//     }, []);
//
//     const searchStories = (event: { query: string }) => {
//         setTimeout(() => {
//             let filteredStories;
//             if (!event.query.trim().length) {
//                 filteredStories = [...stories];
//             }
//             else {
//                 filteredStories = stories.filter((story) => {
//                     return story.toLowerCase().startsWith(event.query.toLowerCase());
//                 });
//             }
//
//             setFilteredStories(filteredStories);
//         }, 250);
//     };
//
//
//     return (
//         <div className="card">
//             <AutoComplete value={selectedStory} suggestions={filteredStories} completeMethod={searchStories} field="title" onChange={(e) => setSelectedStory(e.value)} />
//         </div>
//     );
// };
//
// export default AutoCompleter;
