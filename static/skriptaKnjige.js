function init() {
    
    fetch('http://127.0.0.1:8000/admin/knjige')
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('knjigeLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.ID}, Ime knjige: ${el.IME}, ID autora: ${el.ID_AUTOR} <button type="button" onclick="deleteKnjiga(${el.ID})" id="delete${el.id}"> Izbrisi </button> </li>`;
            });
        });

        document.getElementById('knjigaBtn').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                IME: document.getElementById('ime').value,
                ID_AUTOR: document.getElementById('id_autor').value
            };
    
            document.getElementById('ime').value = '';
            document.getElementById('id_autor').value = '';
    
            fetch('http://127.0.0.1:8000/admin/dodajknjigu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( data => {
                    document.getElementById('knjigeLst').innerHTML += `<li>ID: ${data.ID}, Ime knjige: ${data.IME}, ID autora: ${data.ID_AUTOR} <button> Izbrisi </button> </li>`;
                    location.reload();
                });
        });
    
        
}