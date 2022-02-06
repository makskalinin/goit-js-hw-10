fetch('https:rickandmortyapi.com/api')
    .then(response => response.json())
    .then(data => showData(data))

    const showData = (data) => console.log(data);