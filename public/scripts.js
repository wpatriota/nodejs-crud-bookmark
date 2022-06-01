const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')

async function load(){
    const res = await fetch("http://localhost:3000/").then((data) => data.json())
    res.urls.map(url => addElement(url));
}

async function inputData(name,url){
    const res = await fetch(`http://localhost:3000/?name=${name}&url=${url}`).then(data => data.json())
    //return load();
    //res.urls.map(url => addElement(url));
    return res;
}


async function delData(name,url){
    console.log(name,url);
    const stringdel = `http://localhost:3000/?name=${name}&url=${url}&del=1`;
    console.log(stringdel);
    const res = await fetch(stringdel).then(data => data.json())
    console.table(res);
    //return res;
    //res.urls.map(url => addElement(url));
}

load();

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)
}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?')){        
        delData(el.parentNode.firstChild.innerHTML, el.parentNode.firstChild.href);
        el.parentNode.remove();

        //delData(el.parentNode.firstChild.innerHTML, el.parentNode.firstChild.href) = () => {
            //alert("Deletado com sucesso");
            //el.parentNode.remove();
        //}
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")

    inputData(name, url) = () => {
        addElement({ name, url })
    }    
    

    input.value = ""
})