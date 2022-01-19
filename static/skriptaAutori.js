function init() {
    
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/admin/autori',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('autoriLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.ID}, Ime autora: ${el.AUTOR} <button type="button" onclick="deleteAutora(${el.ID})" id="delete${el.id}"> Izbrisi </button> </li>`;
            });
        });

        document.getElementById('autorBtn').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                AUTOR: document.getElementById('ime').value
            };
    
            fetch('http://127.0.0.1:8000/admin/dodajautora', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( data => {
                    document.getElementById('autoriLst').innerHTML += `<li>ID: ${data.ID}, Ime autora: ${data.AUTOR} <button> Izbrisi </button> </li>`;
                    location.reload();
                });
        });
    
        
}