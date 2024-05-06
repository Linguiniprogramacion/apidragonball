let currentPage = 1;
let loadedCharacters = [];

let isLoading = false;

let nombre = "";



const getCharacters = async(page=1,limit=8)=> {

    try{   const response = await fetch(`https://dragonball-api.com/api/characters?page=${page}&limit=${limit}`);
           const data = await response.json();

        return data.items
    }catch(error){
        console.log(error)
    }

}


const loadInitianlCharacters = async () =>{
    const characters = await getCharacters();
    createCharactersCards(characters);
}



const createCharactersCards = async(characters)=> {

    const personajesRow = document.getElementById('personajesRow');

        characters.map((characters) => {
            const{id, name, ki, descripcion, image, maxKi, gender } = characters;  

            if (!loadedCharacters.includes(id)){
                loadedCharacters.push(id);
                const divRow = document.createElement('div');
                divRow.classList.add('div');
                divRow.classList.add("col-xl-3");
                divRow.classList.add("col-lg-3");
                divRow.classList.add("col-md-3");
                divRow.classList.add("col-sm-12");
                divRow.classList.add("col-xs-12");



                const card = document.createElement('div');
                card.classList.add('card');
                card.classList.add('mt-2');
                card.classList.add('mt-2');
                

                const imgCard = document.createElement('img');
                imgCard.classList.add('card-img-top');
                imgCard.classList.add('mt-2');
                imgCard.classList.add('mx-auto');
                imgCard.classList.add('w-75');
                imgCard.src = image;



                const divBody = document.createElement("div");
                divBody.classList.add("dib-body");

                const tituloC = document.createElement('h5');
                tituloC.classList.add('card-title');
                tituloC.classList.add('mx-auto');
                tituloC.textContent=name;


                const levelC = document.createElement('p');
                levelC.classList.add('card-text');
                levelC.textContent =ki;


                const btnVer = document.createElement('button');
                btnVer.classList.add('btn');
                btnVer.classList.add('btn-primary');
                btnVer.classList.add('text-center');
                btnVer.classList.add('mx-auto');


                btnVer.textContent = 'Ver detalles' ;


                btnVer.addEventListener("click", ()=>{
                    console.log("hola");
                })



                divRow.appendChild(card);
                card.appendChild(imgCard);
                card.appendChild(divBody);

                divBody.appendChild(tituloC);
                divBody.appendChild(levelC);
                divBody.appendChild(btnVer);

                personajesRow.appendChild(divRow);
            }
             
        });

        
        
    }




export const loadMoreCharacter = async () => {
    if (isLoading) return;
    isLoading = true ;


    currentPage++;
    const characters = await getCharacters(currentPage);
    if (characters.length > 0)  {
        createCharactersCards(characters);
    
    }else{
        alert("No hay mas personajes disponibles.");

    }


    isLoading = false;

}

window.onload = loadInitianlCharacters;

window.addEventListener('scroll',()=>{
    const{scrollTop , scrollMeight, clienteHeight } = document.documentElement;
    if (scrollTop + clienteHeight >= scrollMeight - $ && !isloading){
        loadMoreCharacter();
    }
});