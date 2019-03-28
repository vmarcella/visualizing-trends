axios.get('/data?n=2004&n=2005&m=diet&m=gym').then(response => console.log(response.data)).catch(err => console.error(err));
