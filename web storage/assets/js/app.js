let cl = console.log;

const stdform = document.getElementById("stdform");
const updateBtn = document.getElementById("updateBtn");
const submitBtn = document.getElementById("submitBtn");
const stdContainer = document.getElementById("stdContainer");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email");
const contactControl = document.getElementById("contact");

const  generateUuid = () => {
    var u='',m='xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',i=0,rb=Math.random()*0xffffffff|0;
    while(i++<36) {
        var c=m[i-1],r=rb&0xf,v=c=='x'?r:(r&0x3|0x8);
        u+=(c=='-'||c=='4')?c:v.toString(16);rb=i%8==0?Math.random()*0xffffffff|0:rb>>4
    }
    return u
}

console.log( generateUuid());

let stdArray = [];

const onEdit = (ele) => {
   // cl(ele.closest('tr').getAttribute('id'))
   let editId = ele.closest('tr').getAttribute('id');
   localStorage.setItem("editId",editId);
   let editObj = stdArray.find(std => std.id === editId)
    cl(editObj);

    fnameControl.value = editObj.fname;
    lnameControl.value = editObj.lname;
    emailControl.value = editObj.email;
    contactControl.value = editObj.contact;

    updateBtn.classList.remove('d-none');
    submitBtn.classList.add('d-none');
}

const onDelete = (ele) => {
   // cl(ele)
   let deleteId = ele.closest("tr").id;
   //cl(deleteId)
   let deleteIndex = stdArray.findIndex(std => std.Id === deleteId)
    cl(deleteIndex);
    stdArray.splice(deleteIndex, 1);
    localStorage.setItem("stdData", JSON.stringify(stdArray));
    templating(stdArray);
}


const templating = (arr) => {
    let result = '';
    arr.forEach((std, i) => {
        result += `
                    <tr id="${std.id}">
                     <td>${i + 1}</td>
                     <td>${std.fname}</td>
                     <td>${std.lname}</td>
                     <td>${std.email}</td>
                     <td>${std.contact}</td>
                     <td><button class="btn btn-primary" onclick="onEdit(this)">
                     <i class="fa-solid fa-pen-to-square"></i>
                     </button></td>

                    <td><button class="btn btn-danger" onclick="onDelete(this)">
                    <i class="fa-solid fa-trash"></i>
                    </button></td>
                     </tr>
                     `
    });
 stdContainer.innerHTML = result;
}

//stdArray = localStorage.getItem("stdData");
//if(localStorage.getItem("stdData")){
    //stdArray = JSON.parse(localStorage.getItem("stdData"));
//}
//stdArray = JSON.parse(localStorage.getItem("stdData")) || [];
stdArray = JSON.parse(localStorage.getItem("stdData")) ?? []; // Nullish collesion

templating(stdArray);

const onStdAdd = (eve) => {
    eve.preventDefault();
   let stdObj = {
        fname : fnameControl.value,
        lname : lnameControl.value,
        email : emailControl.value,
        contact : contactControl.value,
        id : generateUuid()

    }
    eve.target.reset();
    stdArray.push(stdObj);
    localStorage.setItem("stdData", JSON.stringify(stdArray));
    templating(stdArray)
    
}

const onStdUpdate = () => {
    let updateId = localStorage.getItem("editId");
//    cl(`Updated ${updateId}`);
//     cl(fnameControl?.value)
//     cl(lnameControl?.value)
//     cl(emailControl?.value)
//     cl(contactControl?.value)
// // 
   stdArray.forEach(obj => {
        if(obj.id === updateId){
            obj.fname = fnameControl.value;
            obj.lname = lnameControl.value;
            obj.email = emailControl.value;
            obj.contact = contactControl.value;
        }
    })
    localStorage.setItem("stdData", JSON.stringify(stdArray));
    templating(stdArray)
    stdform.reset();
}
    


stdform.addEventListener("submit", onStdAdd);
updateBtn.addEventListener("click", onStdUpdate)