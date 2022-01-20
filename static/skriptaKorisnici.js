function init() {
    
    const cookies = document.cookie.split('=');
    const token = cookies[cookies.length - 1];

    fetch('http://127.0.0.1:8000/admin/korisnici',{
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then( res => res.json() )
        .then( data => {
            const lst = document.getElementById('korisniciLst');

            data.forEach( el => {
                lst.innerHTML += `<li>ID: ${el.ID}, Ime korisnika: ${el.IME}, Email: ${el.EMAIL} <button type="button" onclick="deleteKorisnika(${el.ID})" id="delete${el.id}"> Izbrisi </button>               
                <button type="button" onclick="editKorisnika(${el.ID},'${el.IME}','${el.EMAIL}')" id="edit${el.ID}"> Izmeni </button></li>`;
            });
        });

        document.getElementById('korisnikBtn').addEventListener('click', e => {
            e.preventDefault();
    
            const data = {
                IME: document.getElementById('ime').value,
                EMAIL: document.getElementById('email').value,
                PASSWORD: document.getElementById('password').value,
                ADMIN: document.getElementById('admin').checked
            };
    
            
            
            fetch('http://127.0.0.1:8000/admin/dodajkorisnika', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( el => {
                    if (el.msg) {
                        alert(el.msg);
                    } else {
                        document.getElementById('korisniciLst').innerHTML += `<li>ID: ${el.ID}, Ime korisnika: ${el.IME}, Email: ${el.EMAIL} <button type="button" onclick="deleteKorisnika(${el.ID})" id="delete${el.id}"> Izbrisi </button> 
                        <button type="button" onclick="editKorisnika(${el.ID},'${el.IME}','${el.EMAIL}')" id="edit${el.ID}"> Izmeni </button></li>`;
                        location.reload();
                    }
                });
                
        });

        
        document.getElementById('EditkorisnikBtn').addEventListener('click', e => {
            e.preventDefault();
    
            const id =document.getElementById('EditID').value;
            const data = {
               
                IME: document.getElementById('Editime').value,
                EMAIL: document.getElementById('Editemail').value,
            };          
            
            fetch('http://127.0.0.1:8000/admin/korisnici/'+id, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then( res => res.json() )
                .then( el => {
                    if (el.msg) {
                        alert(el.msg);
                    } else {
                        document.getElementById('korisniciLst').innerHTML += `<li>ID: ${el.ID}, Ime korisnika: ${el.IME}, Email: ${el.EMAIL} <button type="button" onclick="deleteKorisnika(${el.ID})" id="delete${el.id}"> Izbrisi </button> 
                        <button type="button" onclick="editKorisnika(${el.ID},'${el.IME}','${el.EMAIL}')" id="delete${el.ID}"> Izmeni </button></li>`;
                        location.reload();
                    }
                });
                
        });
    
        
}