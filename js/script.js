  fetch('data.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('prvitekst').innerHTML = data.naslov;
            document.getElementById('ime-para').innerHTML = data.imePara;
            document.getElementById('datum-svadbe').innerText = data.datumSvadbe;
            document.getElementById('drugitekst').innerHTML = data.drugitekst;
            document.getElementById('slika-para').src = data.slikaPara;
        })
        .catch(error => console.error('Greška prilikom učitavanja JSON fajla:', error));


  const ugaoSlika = document.getElementById('ugao-slika');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      ugaoSlika.classList.add('prikazi');
    } else {
      ugaoSlika.classList.remove('prikazi');
    }
  });        