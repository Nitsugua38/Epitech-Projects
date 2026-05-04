document.addEventListener('DOMContentLoaded',()=> {
    const searchInputs= document.querySelectorAll('.search-input');
    const inputQuoi= searchInputs[0];
    const inputOu= searchInputs[1];
    const jobCards= document.querySelectorAll('.job-card');
    const performSearch= () => {
        const queryQuoi= inputQuoi.value.toLowerCase().trim();
        const queryOu= inputOu.value.toLowerCase().trim();

        jobCards.forEach(card => {
            const title= card.querySelector('.job-title').textContent.toLowerCase();
            const company =card.querySelector('.job-company').textContent.toLowerCase();
            const location =card.querySelector('.job-location').textContent.toLowerCase();
            const tags= card.querySelector('.job-tags').textContent.toLowerCase();

            const matchQuoi =title.includes(queryQuoi)||company.includes(queryQuoi)||tags.includes(queryQuoi);
            const matchOu =location.includes(queryOu);

            if (matchQuoi && matchOu) {
                card.style.display= '';
            } else {
                card.style.display ='none';}});};
    inputQuoi.addEventListener('input',performSearch);
    inputOu.addEventListener('input',performSearch);
});


//coté backedn
async function getData() {
  const url = `http://localhost:${process.env.PORT}/api/test`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
getData();