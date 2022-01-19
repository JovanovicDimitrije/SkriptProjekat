function init() {
    
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/admin/komentari',{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('komentariLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.ID}, ID knjige: ${el.ID_KNJIGA}, ID korisnika: ${el.ID_KORISNIK}, Komentar: ${el.KOMENTAR} <button type="button" onclick="deleteKomentar(${el.ID})" id="delete${el.id}"> Izbrisi </button> </li>`;
            });
        });

        document.getElementById('komentarBtn').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                ID_KNJIGA: document.getElementById('idknjiga').value,
                ID_KORISNIK: document.getElementById('idkorisnik').value,
                KOMENTAR: document.getElementById('komentar').value
            };
            console.log(data);
            document.getElementById('idknjiga').value = '';
            document.getElementById('idkorisnik').value = '';
            document.getElementById('komentar').value = '';
    
            fetch('http://127.0.0.1:8000/admin/dodajkomentar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( data => {
                    document.getElementById('komentariLst').innerHTML += `<li>ID: ${data.ID}, ID knjige: ${data.ID_KNJIGA}, ID korisnika: ${data.ID_KORISNIK}, Komentar: ${data.KOMENTAR} <button> Izbrisi </button> </li>`;
                    location.reload();
                });
        });
    
        
}