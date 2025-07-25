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

  const countDownDate = new Date("Oct 16, 2025 13:00:00").getTime();

const timer = document.getElementById("timer");

  const countdownFunction = setInterval(function () {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance < 0) {
      clearInterval(countdownFunction);
      timer.innerHTML = "Srećno!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Formatiraj da uvek bude dvoznamenkasto
    const format = (n) => (n < 10 ? "0" + n : n);

    timer.innerHTML = `${format(days)} : ${format(hours)} : ${format(minutes)} : ${format(seconds)}`;
  }, 1000);
