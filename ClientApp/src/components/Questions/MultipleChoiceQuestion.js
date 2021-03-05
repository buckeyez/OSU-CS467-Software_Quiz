import React, { /*Component,*/ useState, useEffect } from 'react';


const MultipleChoiceQuestion = (props) =>{

  const [choiceList, setChoiceList] = useState([{Value: "", Correct: false}]);

  useEffect(() => {
    console.log("Use Effect - choiceList: ", choiceList, "answers prop: ", props.answers, props.answers.length);
    if(props.answers.length > 0){
      let newList = []
      for (let i = 0; i < props.answers.length; i++){
        newList.push({Value: props.answers[i].value, Correct: props.answers[i].correct})
      }
      console.log("----------newList in useEffect: ", choiceList)
      setChoiceList(newList)
      // console.log("newList in useEffect: ", choiceList)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 

  function handleChange(index, event) {
    const options = [...choiceList];
    console.log("event.target.prevSib: ", event.target.previousSibling.checked);
    console.log("e.target.value: ", event.target.value)
    options[index].Value = event.target.value;
    options[index].Correct = false;
    setChoiceList(options);
    console.log("choiceList: ", choiceList);
    props.handleMultipleChoiceAnswer(choiceList);
  }

  function handleRadioButtonChange(index, e){
    console.log("radio button changed: ", e.target.nextSibling.value, e.target.checked);
    const options = [...choiceList];
    let length = options.length;
    for (let i = 0; i < length; i++){
      if(i === index){
        options[i].Correct = e.target.checked
      }else{
        options[i].Correct = false;
      }
    }
    setChoiceList(options);
    console.log("choiceList: ", choiceList);
    props.handleMultipleChoiceAnswer(choiceList);
  }


  function handleRemove(index,e){
    e.preventDefault();
    console.log("before remove: ", choiceList)
    const options = [...choiceList];
    console.log("before remove: ", options)
    options.splice(index, 1);
    setChoiceList(options);
    console.log("after remove: ", options)
    props.handleMultipleChoiceAnswer(options);
  }

  function handleAdd(){
      const options = [...choiceList];
      options.push({Value: ""});
      setChoiceList(options);

  }

  var inputStyle = {
    marginLeft: '8px',
    width: '50%',
    border: 'none',
    borderBottom: 'solid 1px lightgrey',
    marginBottom: '8px'
    
  };

  var addStyle = {
    backgroundColor: 'white',
    borderRadius: '5px',
    border: 'solid 1px lightgrey'
   
    
  };

  var removeStyle = {
    backgroundColor: 'white',
    borderRadius: '5px',
    marginLeft: '5px',
    border: 'solid 1px grey'
    
    
  };



  return (
    <div>
      {choiceList.map((choice, index) => {
        return(
          <div key={`${choice}-${index}`} >
            <input type="radio" name="multipleChoice" value={choice.Value} checked={choice.Correct === true} onChange={(e) => handleRadioButtonChange(index, e)}/>
            <input style={inputStyle}
              type="text" 
              placeholder="Type text here"  
              value={choice.Value || ""} 
              onChange={(e) => handleChange(index, e)}>
            </input>
            {choiceList.length !== 1 && <button style={removeStyle} onClick={(e) => handleRemove(index, e)}>x</button>}
            <br></br>
            {choiceList.length - 1 === index && <button  style={addStyle} onClick={() => handleAdd()}>+</button>}
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
