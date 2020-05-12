const getList = async (offset = 1, limit = 20) =>{
    let data = await {};
    let con = [];
    let isi = '';
    
    for(let i = offset; i <= limit; i++){
        data = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        data = await data.json();
        await con.push(data);
    }

    await con.map((p) => {
        isi = isi + `<tr>
        <th scope="row">
          <div class="media align-items-center">
            <a href="#" class="avatar rounded-circle mr-3">
              <img alt="Image placeholder" src="${p.sprites.front_default}">
            </a>
            <div class="media-body">
              <span class="mb-0 text-sm">${p.name}</span>
            </div>
          </div>
        </th>
        <td>
          No.${p.order}
        </td>
        <td>
            ${p.types.map( t => `<span class="badge badge-dot mr-1"><i class="bg-dark"></i>${t.type.name}</span>`)}
        </td>

        <td class="text-right">
          <a class="btn btn-sm btn-icon-only text-light" href="https://faiisll.github.io/pokedex?id=${p.id}" role="button">
            <i class="fas fa-info"></i>
          </a>
        </td>
      </tr>`;
    });
    
    
    document.getElementById('tb-poke').innerHTML = await isi;

};

let lim = 20;
let off = 1;

const next = () => {
    let btn = document.getElementById('next');
    let btn2 = document.getElementById('prev');
    if(lim <= 964){
        lim = lim + 20;
        off = off + 20;

        setTimeout(async () =>{
            await btn.classList.add('disabled');
            await getList(off, lim);
            await btn.classList.remove('disabled');
            await btn2.classList.remove('disabled');
        }, 1);
    }else{
        alert('You have reach the last page');
        btn.classList.add('disabled');
    }
};


//has a bug, when off < 1 the prev button still active (not disabled)
const prev = () => {
    let btn = document.getElementById('prev');
    if(off >= 1){
        lim = lim - 20;
        off = off - 20;

        setTimeout(async () =>{
            await btn.classList.add('disabled');
            await getList(off, lim);
            await btn.classList.remove('disabled');
        }, 1);
    }else{
        alert('You have reach the last page');
        btn.classList.add('disabled');
    }
}
setTimeout(async () =>{
    await getList();
}, 1);