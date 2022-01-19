function init() {
        
        const cookies = document.cookie.split('=');
        const token = cookies[cookies.length - 1];

        

        document.getElementById('knjigeBtn').addEventListener('click', e => {
            e.preventDefault();
    
            fetch('http://127.0.0.1:8000/knjige', {
                method: 'GET',
                headers: {
                        'Authorization': `Bearer ${token}`
                    }
                
            })
                .then( el => {
                        window.location.href = 'knjige.html';  
                });
        });

        document.getElementById('autoriBtn').addEventListener('click', e => {
                e.preventDefault();
        
                fetch('http://127.0.0.1:8000/autori', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                    
                })
                    .then( el => {
                            window.location.href = 'autori.html';  
                    });
        });

        document.getElementById('korisniciBtn').addEventListener('click', e => {
                e.preventDefault();
        
                fetch('http://127.0.0.1:8000/admin/korisnici', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                    
                })
                    .then( el => {
                            window.location.href = 'korisnici.html';  
                    });
        });

        document.getElementById('komentariBtn').addEventListener('click', e => {
                e.preventDefault();
        
                fetch('http://127.0.0.1:8000/komentari', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                    
                })
                    .then( el => {
                            window.location.href = 'komentari.html';  
                    });
        });
}