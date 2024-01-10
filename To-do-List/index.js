
let count=0;
let myToDos=[];
let sample=document.querySelector(".to-do-items");
let complete=document.querySelector(".complete-to-do");
document.querySelector(".count").innerText=myToDos.length;
if(myToDos.length===0)
    sample.innerText="To do list is Empty";
const addHtml=function toDoList(str,items){
    count++;
    // items.style.gridTemplateRows=`repeat(${count},1fr)`;
    return `
        <div class="to-do-values">
            <div class="select-to-do">
                <input id="${"my-check-box"+count}" name="my-check-box" type="checkbox">
            </div>
            <div class="todos">
            ${str}
            </div>
            <div class="clear-to-do" id="${"clear-to-do"+count}">
            <i class="fa-regular fa-circle-xmark"></i>
            </div>
        </div>
    `
}

const addCheckBox=(checkbox)=>{
    console.log(`#my-check-box${count}`);
    // let checkbox=document.querySelector(`#my-check-box${count}`);
    console.log(checkbox);
    checkbox.addEventListener('change',()=>{
        console.log("kittu");
        let toDoBox=checkbox.closest(".to-do-values");
        console.log(toDoBox);
        if(checkbox.checked){
            toDoBox.classList.add("checked");
            console.log("hiiiiii");
        }else
        {
            console.log("bye");
            toDoBox.classList.remove("checked");
        }
    });
};

const removeTDoS=(clearToDo,flag)=>{
    let toDoBox=clearToDo.closest(".to-do-values");
    console.log("todo cleared");
    let toDoValue=toDoBox.querySelector(".todos").innerText;
    // let index=myToDos.indexOf(toDoValue);
    // myToDos.splice(toDoValue,index);
    myToDos=myToDos.filter(todo=>todo!=toDoValue);
    console.log(myToDos);
    // myToDos.remove(toDoValue);
    console.log(toDoValue);
    toDoBox.classList.add("animate-remove");
    setTimeout(()=>{
        toDoBox.parentNode.removeChild(toDoBox);
        let addToDo=document.querySelector(".add-to-do");
        if(flag==0)
            addToDo.classList.add("to-do-remove");
        else
            addToDo.classList.add("task-completed");
        // let data=addToDo.getAttribute("data-message");
        // data="To do removed";
        setTimeout(() => {
            if(flag==0)
            addToDo.classList.remove("to-do-remove");
        else
            addToDo.classList.remove("task-completed");
            if(myToDos.length==0){
                sample.innerText="To do List is Empty";
                sample.classList.add("sample");
                complete.style.display="none";
            }
        }, 2000);
    },500);
    document.querySelector(".count").innerText=myToDos.length;
};

const removeToDo=(clearToDo)=>{
    clearToDo.addEventListener('click',()=>{
        removeTDoS(clearToDo,0);
    });
};

let add=document.querySelector(".add");

let textBox=document.querySelector('input[type="text"]');


textBox.addEventListener('focus',()=>{
    add.style.opacity=1;
});

textBox.addEventListener('blur',()=>{
    add.style.opacity=0;
});

add.addEventListener('click',()=>{
    let toDo=textBox.value;
    console.log(myToDos);
    if(myToDos.includes(toDo)){
        let err=document.querySelector('.add-to-do');
        err.classList.toggle("active");
        setTimeout(()=>{
            err.classList.remove("active");
        },2000)
    }else{
        if(myToDos.length===0){
            sample.classList.remove("sample"); 
            sample.innerText="";
            complete.style.display="block";
        }
        myToDos.push(toDo);
        let items=document.querySelector(".to-do-items");
        // items.innerHTML+=addHtml(toDo,items);
        items.insertAdjacentHTML('beforeend', addHtml(toDo, items));
        let checkbox=document.querySelector(`#my-check-box${count}`);
        addCheckBox(checkbox);
        let clearToDo=document.querySelector(`#clear-to-do${count}`);
        removeToDo(clearToDo);
    }
    textBox.value="";
    document.querySelector(".count").innerText=myToDos.length;
})

complete.addEventListener('click',()=>{
    let checkboxs = document.querySelectorAll(`input[type="checkbox"]`);
    // console.log(checkboxs);
   let tempCheckboxs=[];
    for(let checkbox of checkboxs){
        if(checkbox.checked)
            tempCheckboxs.push(checkbox);
    }
    if(tempCheckboxs.length==0)
    {
        let completeDailouge=document.querySelector('.add-to-do');
        completeDailouge.classList.add("complete");
        console.log("no checked todo's");
        setTimeout(()=>{
            completeDailouge.classList.remove("complete");
        },2000)
    }else{
        for(let checkbox of tempCheckboxs){
            removeTDoS(checkbox,1);
        }
    }
})
