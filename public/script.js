const table_data = document.getElementById("table-data");
const showingAnswer = document.getElementById("callout");
const showingAnswer2 = document.getElementById("callout2");
let button = document.querySelector(".submit display");
let inputName = document.getElementById("userN");
let inputLastName = document.getElementById("lastN");
let inputEmail = document.getElementById("userEmail");
let inputName2 = document.getElementById("userN2");
let inputLastName2 = document.getElementById("lastN2");
let inputEmail2 = document.getElementById("userEmail2");
let add_user_text = document.getElementById("callout-header")
let update_user_text = document.getElementById("callout-header2")
let user_id = document.getElementById("userId");

const user_url = "http://localhost:5050/api/users";
var regEmail =  /\S+@\S+\.\S+/;
let regForName = /^[a-zA-Z]+(\s{1}[a-zA-Z]+)*$/;
let returnName,lastName,email , idOfUser = false;
let selected_id , selected_firstName , selected_lastName ,selected_email;
let row_2_data_6;

getData();

async function getData(){
    document.querySelector("#load").innerHTML = "Loading..."
    try{
        const res = await fetch(user_url);
        const josnResult = await res.json(); 
        let size = josnResult.length 
        console.log("the size ", size)  
        if(josnResult == undefined || josnResult.length == 0){
            document.querySelector("#load").innerHTML = "No users to display"
            document.querySelector("#load").style.color = "red"
        }else{
                josnResult.forEach(element => {
                    var obj = element;
                    let row_2 = document.createElement('tr');
                    let row_2_data_1 = document.createElement('td');
                    let row_2_data_2 = document.createElement('td');
                    let row_2_data_3 = document.createElement('td');
                    let row_2_data_4 = document.createElement('td');
                    let row_2_data_5 = document.createElement('td');
                    row_2_data_6 = document.createElement('td');
                    let create_btn1 = document.createElement("button")
                    let create_btn2 = document.createElement("button")
                    let button_1 = document.createTextNode("Remove")
                    let button_2 = document.createTextNode("Update")
                    
                    create_btn1.setAttribute("id",`${obj.id}`)
                    create_btn2.setAttribute("id",`${obj.id}`)
                    create_btn1.setAttribute('onclick', "userRemove(this.id)")
                    create_btn2.setAttribute('onclick', "get_clicked_id(this.id)")
                    create_btn1.setAttribute("class" , "created_btn")
                    create_btn2.setAttribute("class" , "created_btn")
                    create_btn1.appendChild(button_1)
                    create_btn2.appendChild(button_2)
                    
                    row_2_data_1.innerHTML = obj.id
                    row_2_data_2.innerHTML= "<img src='userIcon.png' alt='User icon'>"
                    row_2_data_3.innerHTML= obj.name
                    row_2_data_4.innerHTML= obj.lastName
                    row_2_data_5.innerHTML= obj.email

                    row_2.appendChild(row_2_data_1)
                    row_2.appendChild(row_2_data_2)
                    row_2.appendChild(row_2_data_3)
                    row_2.appendChild(row_2_data_4)
                    row_2.appendChild(row_2_data_5) 
                    row_2.appendChild(row_2_data_6)
                    row_2_data_6.appendChild(create_btn1)
                    row_2_data_6.appendChild(create_btn2)
                    table_data.appendChild(row_2)
                    document.querySelector("#load").innerHTML = "Getting data from DB is successed"
                    document.querySelector("#load").style.color = "black"
        });
    }
    }catch(error){console.log(error);}
}

function userRemove(get_remove_id){
    console.log(get_remove_id)
    fetch(`http://localhost:5050/api/remove/${get_remove_id}`, {
    method: "DELETE",
    headers: {'Content-type': 'application/json'}
}) 
    reloadButton()
}

const list = [];
function get_clicked_id(click_id){
    document.getElementById("userId2").value = click_id
    showingAnswer2.style.display = "block";
    list.push(click_id)
}

function userUpdate(){
    if(returnName && lastName && email === true){
        let list_id = list[0];
        let update_user = {
            "id" : list_id,
            "name": selected_firstName ,
            "lastName" : selected_lastName ,
            "email" : selected_email
        }
        console.log(update_user)
        updateUserData(update_user,update_user.id)
        reloadButton()
    }
}

function updateUserData(post,get_update_id){
    console.log(post, get_update_id)
    fetch(`http://localhost:5050/api/update/${get_update_id}`, {   
    method: 'PUT',
    body: JSON.stringify(post),
    headers: {
        'Content-type': 'application/json'
    }
    }).then((response) => {
    return response.json()
    }).then((res) => {
    if (res.status === 200) {
        console.log("Update is successfully !")
        
    }else if(res.status === 404){
        document.querySelector("#load").innerHTML = "Error on updating data"
    }
    }).catch((error) => {
    console.log(error)
    })

    // reloadButton()
}

function checkUserNameUpdate(){
    if(inputName2.value.match(regForName) && inputName2.value !== ""){
        update_user_text.innerHTML = "Valid First Name"
        update_user_text.style.color = "green";
        returnName = true;
        selected_firstName = inputName2.value;
        return true
    }else{
        update_user_text.innerHTML = "Invalid First Name"
        update_user_text.style.color = "red";
        return false
    }
}

function checkUserLastNameUpdate(){
    if(inputLastName2.value.match(regForName) && inputLastName2.value !== ""){
        update_user_text.innerHTML = "Valid Last Name"
        update_user_text.style.color = "green";
        selected_lastName = inputLastName2.value;
        lastName = true;
        return true
    }else{
        update_user_text.innerHTML = "Invalid Last Name"
        update_user_text.style.color = "red";
        return false ;
    }
}

function checkInputEmailUpdate(){
    if(regEmail.test(inputEmail2.value)){
        update_user_text.innerHTML = "Valid Email"
        update_user_text.style.color="green";
        email = true;
        selected_email = inputEmail2.value;
        return true;
    }else{
        update_user_text.innerHTML = "Invalid Email"
        update_user_text.style.color="red";
        return false;
    }
}

function userRegister(){
    showingAnswer.style.display = "block";
}

function checkUserID(){
    let enteredId = user_id.value;   
    if(enteredId == 0){
        add_user_text.innerHTML = "ID must be grater than 0"
        add_user_text.style.color = "red";
        return idOfUser = false
    }else {
        selected_id = enteredId;
        add_user_text.innerHTML = "Valid ID"
        add_user_text.style.color = "green";
        return idOfUser = true
    }
}

function checkUserName(){
    if(inputName.value.match(regForName) && inputName.value !== ""){
        add_user_text.innerHTML = "Valid First Name"
        add_user_text.style.color = "green";
        returnName = true;
        selected_firstName = inputName.value;
        return true
    }else{
        add_user_text.innerHTML = "Invalid First Name"
        add_user_text.style.color = "red";
        return false
    }
}

function checkUserLastName(){
    if(inputLastName.value.match(regForName) && inputLastName.value !== ""){
        add_user_text.innerHTML = "Valid Last Name"
        add_user_text.style.color = "green";
        selected_lastName = inputLastName.value;
        lastName = true;
        return true
    }else{
        add_user_text.innerHTML = "Invalid Last Name"
        add_user_text.style.color = "red";
        return false ;
    }
}

function checkInputEmail(){
    if(regEmail.test(inputEmail.value)){
        add_user_text.innerHTML = "Valid Email"
        add_user_text.style.color="green";
        email = true;
        selected_email = inputEmail.value;
        return true;
    }else{
        add_user_text.innerHTML = "Invalid Email"
        add_user_text.style.color="red";
        return false;
    }
}

function reloadButton(){
    location.reload()
}

function clickButton(){ 
    console.log(returnName,lastName,email,idOfUser)
    if(returnName && lastName && email && idOfUser === true){
        let new_user = {
            "id" : selected_id,
            "name": selected_firstName ,
            "lastName" : selected_lastName ,
            "email" : selected_email
        }
        postUser(JSON.stringify(new_user));
    }else{
        add_user_text.innerHTML = "Error on adding user to DB"
        add_user_text.style.color="red";
    }
}

async function postUser(post){
    let f = await fetch("http://localhost:5050/api/postUser", {
    credentials: "same-origin",
    mode: "same-origin",    
    method: 'post',
    body: post,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    })
    let response = await f.json()
    if(response.success == true){
    add_user_text.innerHTML = "User added successfully. Click view users button to see them"
    add_user_text.style.color = "green"; 
    }else if(response.success == false){
        add_user_text.innerHTML = "ID is already exist, please select another one"
        add_user_text.style.color = "red"; 
    }
}

