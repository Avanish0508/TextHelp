import React, {useState} from 'react';

export default function Textform(props) {
    const handleUpperClick = (event) =>{
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to uppercase","success");
    }
    const handleLowerClick = (event) =>{
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase", "success");
    }
    const handleSpeakClick = (event) =>{
    //    let msg = new SpeechSynthesisUtterance();
    //    msg.text = text;
    //    window.speechSynthesis.speak(msg);
    
        let msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
        const toogle = document.getElementById('toggle')
        if (toogle.textContent === "Speak") {
            toogle.innerHTML = "Stop";
            props.showAlert("Speak function is used", "success");
        }
        else {
            toogle.innerHTML = "Speak"
            if (toogle.innerHTML === "Speak"){
                window.speechSynthesis.cancel();
                props.showAlert("Speak function is stopped", "success");
            }
        }
        
    }
    const handleClearClick = (event) =>{
        let newText = '';
        setText(newText);
        props.showAlert("Textarea is cleared", "success");
    }
    const handleReverseClick = (event) =>{
        let newText =  text.split("").reverse().join("");
         setText(newText);
        props.showAlert("Text is reversed", "success");
    }
    const handleCapitalizeClick = (event) => {
        let arr = text.split(" ")
        let i = arr.length
        let newText = ""
        while(i!==0){
            newText = newText + arr[i-1].charAt(0).toUpperCase()+arr[i-1].substring(1).toLowerCase()+" " ;
            i--;
        }
        setText(newText);
        props.showAlert("Text is Capitalized", "success");

    }
    const handleCopyClick = (event) => {
        navigator.clipboard.writeText(text);
        props.showAlert("Text is copied to clipboard", "success");

    }
    const handleSpacesClick = (event)=>{
        let words = text.split(' ');
        let newText = '';
        words.forEach((element)=>{
            if(element[0] !== undefined){
                newText += element + " ";
            }
        })
        setText(newText);
        props.showAlert("Extra spaces are removed", "success");
    }
    const handleOnChange = (event) =>{
        setText(event.target.value);
    }
    
    const [text, setText] = useState('');

    
    return (
        <>
            <div className="container" style={{
                color: props.mode === 'dark' ? 'white' : '#042743'
            }}>
            <h1 className='mb-4'>{props.heading}</h1>
            <div className="mb-3">
            <textarea className="form-control" onChange={handleOnChange} style = {{
                        backgroundColor: props.mode === 'dark' ? '#042743' : 'white', color: props.mode === 'dark' ? 'white' : '#042743'
            }}id="myBox" value={text} rows="8"></textarea>
            </div>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleUpperClick}>Convert to Uppercase</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleLowerClick}>Convert to Lowercase</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleClearClick}>Clear Text</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleReverseClick}>Reverse Text</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleCapitalizeClick}>Capitalize Text</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleSpacesClick}>Trim Space</button>
            <button disabled={text.length === 0} className="btn btn-primary mx-2 my-2" onClick={handleCopyClick}>Copy Text</button>
            <button disabled={text.length === 0} className="btn btn-warning mx-2 my-2" onClick={handleSpeakClick} type="submit" id="toggle">Speak</button>
        </div>
            <div className='container my-3' style={{
                color: props.mode === 'dark' ? 'white' : '#042743'
            }}>
            <h2>Your Text summary</h2>

                <p> {text.split(/\s+/).filter((element)=> {return element.length !== 0}).length} words and {text.length} characters</p>
                <p> {text.split(/\s+/).filter((element) => { return element.length !== 0 }).length * 0.008} Minutes read</p>

            
            <h3>Preview</h3>
            <p>{text.length>0?text:"Nothing to Previw!"}</p>
        </div>
        </>
    )
}