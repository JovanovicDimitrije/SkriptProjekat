function init() {
    
    fetch('http://127.0.0.1:8000/admin/korisnici')
        .then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('korisniciLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.ID}, Ime korisnika: ${el.IME}, Email: ${el.EMAIL}, Password: ${el.PASSWORD} <button type="button" onclick="deleteKorisnika(${el.ID})" id="delete${el.id}"> Izbrisi </button> </li>`;
            });
        });

        document.getElementById('korisnikBtn').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                IME: document.getElementById('ime').value,
                EMAIL: document.getElementById('email').value,
                PASSWORD: document.getElementById('password').value
            };
    
            document.getElementById('ime').value = '';
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
    
            fetch('http://127.0.0.1:8000/admin/dodajkorisnika', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( data => {
                    document.getElementById('korisniciLst').innerHTML += `<li>ID: ${data.ID}, Ime korisnika: ${data.IME}, Email: ${data.EMAIL}, Password: ${data.PASSWORD} <button> Izbrisi </button> </li>`;
                    location.reload();
                });
        });
    
        
}