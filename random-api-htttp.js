const http = require('http');
const { parse } = require('querystring');
const hostname = '127.0.0.1';
const port = 8000;
const url = 'https://randomuser.me/api/?results=10'
const data =fetch(url).then((response) => response.json());

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
      if(req.method === "GET" && req.url==="/"){
          data.then(resp=>{
              res.end(`
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta http-equiv="X-UA-Compatible" content="IE=edge">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
              </head>
              <body>
              <form action="/" method = "POST">
              <input type="text" name="name" placeholder="Enter Name">
              <input type="text" name="city" placeholder="Enter city">
              <input type="text" name="state" placeholder="Enter state">
              <input type="text" name="post-code" placeholder="Enter postcode">
              <select name="cars" id="cars">
                <option value="asc">Sort asc</option>
                <option value="desc">Sort desc</option> 
            </select>
              <input type="submit">
              </form>
              <script>
              for(let x of ${JSON.stringify(resp.results)}){
                  let p = document.createElement('p');
                  p.innerText = x.name.first+" "+x.location.city+" "+x.location.city+" "+x.location.country+" "+x.location.postcode;
                  document.body.appendChild(p)
              }
              </script>
              </body>
              </html>
          `);
          })
          }
        else if(req.method === "POST" && req.url==="/"){
            let body ='';
            let results=[];
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                console.log(body)
                let n_ame=parse(body).name;
                let c_ity=parse(body).city;
                let s_tate=parse(body).state;
                let c_ountry=parse(body).country;
                let post_code=parse(body).post_code;
                let type=parse(body).cars;     
                data.then((resp)=>{
                    res.end(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    </head>
                    <body>
                    <form action="/" method = "POST">
              <input type="text" name="name" placeholder="Enter Name">
              <input type="text" name="city" placeholder="Enter city">
              <input type="text" name="state" placeholder="Enter state">
              <input type="text" name="post-code" placeholder="Enter postcode">
              <select name="cars" id="cars">
                <option value="asc">Sort asc</option>
                <option value="desc">Sort desc</option> 
            </select>
              <input type="submit">
              </form>
                    <script>
                    let names=[]

                    for(let x of ${JSON.stringify(resp.results)}){
                        if (x.name.first.toLowerCase().includes(${JSON.stringify(n_ame)})){
                        names.push(x);
                        }
                    }
                    
                    names.sort((a,b)=>{
                        if (a.name.first.toLowerCase()<b.name.first.toLowerCase()){
                            return -1
                        }
                        return 1
                    });
                    if(${JSON.stringify(type)}==="desc"){
                        names.reverse();
                    }
                    for(let x of names){
                        let p = document.createElement('p');
                        let q = document.createElement('p');
                        let r = document.createElement('p');
                        p.innerText = x.name.first;
                        q.innerText = x.city;
                        r.innerText = x.location.state;
                        document.body.appendChild(p)
                        document.body.appendChild(q)
                        document.body.appendChild(r)
                    }
                    </script>
                    </body>
                    </html>
                `)



                })


            
          });
      }
    }
      
  );
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
