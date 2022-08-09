/*Yaptığınız yapıya Local Storage'ı da ekleyip verilerin kaybolmamasını sağlayın.
Element eklendiğinde ve hata verirken sağ üstte uyarı verdiğini fark etmişsinizdir. 
Bunu sağlayan Bootstrap Toast bildirimdir.--*/

let listDOM = document.querySelector('#list')   
let LocalTask = {id:"", task:"" , check: false} 
let ArrayTask = []                              
let i=0;                                       

//LocalStorage 
if(localStorage.getItem('load'))    
{   
    ArrayTask = JSON.parse(localStorage.getItem('load')) 
    ArrayTask.forEach(function (element)                 
    {
        i++;
        element.id = `id${i}`;                           
        localStorage.setItem('load', JSON.stringify(ArrayTask))

        let liDOM = document.createElement(`li`)        
        liDOM.setAttribute('id',`id${i}`)               
        liDOM.innerHTML =                                
        `
        ${element.task} 
        <button
        class="close" 
        style="width: 50px; height: 50px; text-align: center;"
        onclick="RemoveFunc(${i})"
        >x
        </button>
        `

        listDOM.append(liDOM)    
        if(ArrayTask[i-1].check) 
        {
            let changeLi = document.querySelector(`#id${i}`) 
            changeLi.classList.add("checked")                
        }
    });
}


// Ekle butonunu <span> tipinden <button> tipine çevirme. (bu şekilde listeye "enter" ile ekleme yapılabilcek)
let elem = document.querySelector('#liveToastBtn')
elem.outerHTML = `<button type="submit" onclick="newElement()" id="liveToastBtn" class="button" style ="border-width: 0px">${elem.innerHTML}</button>`;


//yazılan bilgiyi alma
let userTaskDOM = document.querySelector('#userTask')
userTaskDOM.addEventListener('submit', formHandler)

// input 
function formHandler(event) {
    event.preventDefault()                          //Sayfa yenilenmesini engeleme
    const TASK = document.querySelector("#task")    // bilginin atanması
    
    if (TASK.value.trim() == ""){   
        $(".error").toast("show");  
    } 
    else{
        addItem(TASK.value)          //Bilgi ekleme fonksiyonunu çalıştır
        TASK.value = ""              //Gonderdikten sonra "input" sıfırlama 
        $(".success").toast("show"); //"Bilgi eklendi" bildirimini göster
    }
}


//Bilgi ekleme kısmı
const addItem = (task) => 
{ 
    i++;

    LocalTask.task = task;    //object bilgi gönder
    LocalTask.id = `id${i}`;  //object id gönder
    ArrayTask.push(LocalTask) //LocalStorage için object bilgileri gönder
    localStorage.setItem('load', JSON.stringify(ArrayTask))
    ArrayTask = JSON.parse( localStorage.getItem('load'))

    let liDOM = document.createElement(`li`)        
    liDOM.setAttribute('id',`id${i}`)             
    liDOM.innerHTML =                               
    `
    ${task} 
    <button 
    class="close" 
    style="width: 50px; height: 50px; text-align: center;"
    onclick="RemoveFunc(${i})"
    >x
    </button>
    `
    listDOM.append(liDOM)     
}

//Silme fonksiyonu
function RemoveFunc(j) {                                        //jnin id numarası
    const element = document.querySelector(`#id${j}`);          //silinecek liste elemanını için atama

    let index = ArrayTask.findIndex(function (Atask) {          //silinecek liste elemnını LocalStorage içindeki indexine ulaşmak
        return JSON.stringify(Atask).indexOf(`id${j}`) >= 0
    });
        ArrayTask.splice(index, 1)                              //silinecek liste elemanını LocalStorage içinden silme
        localStorage.setItem('load', JSON.stringify(ArrayTask)) //sildikten sonra tekrar set etme
        ArrayTask = JSON.parse( localStorage.getItem('load') )
        element.remove();                                       
}

//Checked işlemi
document.addEventListener('click', (element) =>               
{
    if(element.target.matches('li'))                       
    {
        let elementId = element.target.id;                      //ide ulaşma
        let index = ArrayTask.findIndex(function (Atask) {      //liste elemanının LocalStorage içindeki "index"ine ulaşmak
            return JSON.stringify(Atask).indexOf(`${elementId}`) >= 0
        });
        ArrayTask[index].check = !(ArrayTask[index].check)      //LocalStorage içindeki checki değiştirme
        localStorage.setItem('load', JSON.stringify(ArrayTask)) //değiştirdikten sonra set etme
        ArrayTask = JSON.parse( localStorage.getItem('load') )
        
        let changeLi = document.querySelector(`#${elementId}`) //liste elamanının ataması
        changeLi.classList.toggle("checked")                   //liste elamanına "checked" class bilgisi varsa kaldır yoksa ekle
    }
});