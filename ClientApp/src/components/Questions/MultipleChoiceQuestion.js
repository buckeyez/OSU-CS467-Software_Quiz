import React, { Component, useState } from 'react';


const MultipleChoiceQuestion = () =>{

  const [choiceList, setChoiceList] = useState([{choiceOption: ""}]);

  function handleChange(index, event) {
    const options = [...choiceList];
    options[index].choiceOption = event.target.value;
    setChoiceList(options);
  }


  function handleRemove(index,e){
    e.preventDefault();
    console.log("before remove: ", choiceList)
    const options = [...choiceList];
    console.log("before remove: ", options)
    options.splice(index, 1);
    setChoiceList(options);
    console.log("after remove: ", options)
  }

  function handleAdd(){
      const options = [...choiceList];
      options.push({choiceOption: ""});
      setChoiceList(options);
  }



  return (
    <div>
      {choiceList.map((choice, index) => {
        return(
          <div key={`${choice}-${index}`} >
            <input type="radio" name="multipleChoice" value={choice.choiceOption} />
            <input 
              type="text" 
              placeholder="Type text here"  
              value={choice.choiceOption || ""} 
              onChange={(e) => handleChange(index, e)}>
            </input>
            {choiceList.length !== 1 && <button onClick={(e) => handleRemove(index, e)}>Remove</button>}
            <br></br>
            {choiceList.length - 1 === index && <button onClick={() => handleAdd()}>Add More</button>}
          </div>
        )
      })}
      {/* <input type="radio" name="multipleChoice" value="true" /> True */}
      {/* <input type="radio" name="trueOrFalse" value="false" />False */}
      {/* <button>Add</button> */}
    </div>

  )
}

export default MultipleChoiceQuestion;