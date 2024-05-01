let addButton = document.querySelector(".addEmp")
let model = document.querySelector("#model")
let closeIcons = document.querySelector("#close")
const form = document.getElementById("form")
let tBody = document.querySelector("#Employee-list > tbody")


let employees ={}

function deleteRecord(e) {
    let detele = e.target.parentNode.parentNode.remove()
}

let ids = 1
function getEId() {
    return ids++;
}

function toggleModel() {
    model.classList.toggle("close-popup")
    model.classList.toggle("open-popup")
}

function addingEmployees(employee) {
    let record = document.createElement("tr")
    record.id=employee.id;
    for (let i in employee) {
        let cell = document.createElement("td")
        cell.innerText = employee[i];
        record.append(cell)
    }
    let option = document.createElement("td")

    let edit = document.createElement("button")
    edit.innerText = "edit"
    edit.classList = "material-symbols-outlined"

    edit.addEventListener("click", editTable)

    let detele = document.createElement("button")
    detele.innerText = "delete"
    detele.classList = "material-symbols-outlined"

    detele.addEventListener("click", deleteRecord)

    option.append(edit, detele)

    record.append(option)

    tBody.append(record)
}


addButton.addEventListener("click", toggleModel)
closeIcons.addEventListener("click", toggleModel)

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const employee = {
        name: e.target.name.value,
        email: e.target.email.value,
        role: form.role.value,
        id: getEId(),
        Doj: form.Doj.value,
        gender: form.gender.value,

    }
    console.log(employee)
    employees[employee.id]=employee;

    //adding employee
    addingEmployees(employee)


    //to reset the form
    form.reset()

    //to toggle the popup
    toggleModel()

})

let updateModel = document.getElementById("model1")
let updateForm =document.getElementById("form1")
let closeIconupdated = document.querySelector("#close1")

let editedId=null;

 function updatetoggle() {
    updateModel.classList.toggle("close-popup")
    updateModel.classList.toggle("open-popup")
 }

 closeIconupdated.addEventListener("click", updatetoggle)

function prefilledData(employee){
    for(let property in employee){
        updateForm[property] && (updateForm[property].value = employee[property])
    }
}

function editTable(e) {
    const empId =e.target.parentNode.parentNode.id;
    editedId=empId;
    updatetoggle()

    prefilledData(employees[empId])
}

updateForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const updateInfo={
        name: e.target.name.value,
        email: e.target.email.value,
        role: updateForm.role.value,
        id: editedId,
        Doj: updateForm.Doj.value,
        gender: updateForm.gender.value,
    }

    employees[editedId]=updateInfo;


    updateForm.reset();

    updatetoggle()

    const record =document.getElementById(editedId)

    let tdCellIndex =0;
    for(let property in updateInfo){
        record.children[tdCellIndex++].innerText =updateInfo[property]
    }


})