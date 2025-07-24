function backendPractise(){
  const promise = new Promise((resolve, reject) => {
    console.log('Start Promise')
    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', ()=>{
      console.log(xhr.response);
      resolve('Everything went well!');
    });
    xhr.open('GET',  'https://supersimplebackend.dev');
    xhr.send();
  });
  return promise;
}

backendPractise().then((data)=>{
  console.log(data);
  console.log('finished!!');
});

new Promise((resolve, reject) => {
  resolve('Everything went well!');
  reject('Something went wrong!');
}).then( data => {console.log(data)})
  .catch(error => {console.log(error)})
