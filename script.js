// menggunakan vanillajs

// home


$('.search-button').on('click', function(){
    function cDatabase(url, success, error){
        let xhr = new XMLHttpRequest();
        
        xhr.onreadystatechange=function(){
            if (xhr.readyState===4) {
                if (xhr.status===200) {
                    success(xhr.responseText)
                }else{
                    error(xhr.responseText)
                }
            }
        }
        xhr.open('get', url)
        xhr.send();
    }
    
    function success(hasil){
        let result=JSON.parse(hasil).Search
        let card=``;
        result.forEach(e=>{
            card+=`<div class="col-md-4 my-3">
                        <div class="card">
                            <img src="${e.Poster}" class="card-img-top">
                            <div class="card-body">
                                <h5 class="card-title">${e.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${e.Year}</h6>
                                <a href="#" class="btn btn-primary tombol" data-bs-toggle="modal" data-bs-target="#exampleModal" data-imdb="${e.imdbID}">Go somewhere</a>
                            </div>
                        </div>
                    </div>`
                })
                const container=document.querySelector(".list")
                container.innerHTML=card
                const modal=document.querySelectorAll('.tombol')
                modal.forEach(e=>{
                    e.addEventListener("click", function(){
                        $.ajax({
                            url: `http://www.omdbapi.com/?apikey=343ef111&i=${this.dataset.imdb}`,
                            success:m=>{
                                const modal=`<div class="container-fluid">
                                <!-- gambar -->
                                <div class="row">
                                    <div class="col-md-3">
                                      <img src="${m.Poster}" class="img-fluid">
                                    </div>
                                
                                <!-- keterangan -->
                                    <div class="col-md">
                                      <ul class="list-group">
                                          <li class="list-group-item"><h4>Harry Potter</h4></li>
                                          <li class="list-group-item"><strong>Director:</strong>${m.Director}</li>
                                          <li class="list-group-item"><strong>Actors :</strong>${m.Actors}</li>
                                          <li class="list-group-item"><strong>Writer :</strong>${m.Writer}</li>
                                          <li class="list-group-item"><strong>Plot :</strong><em>${m.Plot}</em></li>
                                        </ul>
                                    </div>
                            </div>
                            </div>`;
                                document.querySelector(".modal-body").innerHTML=modal
                            }
                        })
                    })
                })
    
    }
    function error(params){
        console.log(params)
    }
    
    cDatabase('http://www.omdbapi.com/?i=tt3896198&apikey=343ef111&s='+$('.input-keyword').val(), success, error)
})



