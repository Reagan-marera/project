document.addEventListener("DOMContentLoaded", () => {
  const metaViewport = document.createElement('meta');
  metaViewport.name = 'viewport';
  metaViewport.content = 'width=device-width, initial-scale=1.0';
  document.head.appendChild(metaViewport);

  const baseURL = 'http://localhost:4000/biriyaniMenu'; 
  const biriyaniList = document.getElementById('biriyani-list');
  const refreshButton = document.getElementById('refresh-btn');

  const fetchData = async () => {
      try {
          const response = await fetch(baseURL);
          if (!response.ok) {
              throw new Error('Failed to fetch data from the API');
          }
          return response.json();
      } catch (error) {
          displayError('Error fetching data:', error.message);
          return null;
      }
  };

  const renderBiriyaniItem = (biriyani) => {
      const li = document.createElement('li');
      const img = document.createElement('img');
      img.src = biriyani.img; 
      img.alt = biriyani.name; 
      li.appendChild(img); 

      const dishInfo = document.createElement('span');
      dishInfo.textContent = `${biriyani.name} - $${biriyani.price.toFixed(2)} - ${biriyani.description}`;
      li.appendChild(dishInfo); 

      const orderButton = createButton('Order', () => orderBiriyani(biriyani));
      const addToFavoritesButton = createButton('Add to Favorites', () => addToFavorites(biriyani));
      li.appendChild(orderButton); 
      li.appendChild(addToFavoritesButton);

      biriyaniList.appendChild(li); 
  };

  const createButton = (text, onClick) => {
      const button = document.createElement('button');
      button.textContent = text;
      button.addEventListener('click', onClick);
      return button;
  };

  const displayError = (message) => {
      const li = document.createElement('li');
      li.textContent = message;
      biriyaniList.appendChild(li);
  };

  const orderBiriyani = (biriyani) => {
      const amount = prompt(`Enter the amount of ${biriyani.name}:`);
      if (amount !== null) {
          alert(`You ordered ${amount} ${biriyani.name}(s)`);
      }
  };

  const addToFavorites = (biriyani) => {
      alert(`Added ${biriyani.name} to Favorites`);
  };

  const renderBiriyaniMenu = async () => {
      biriyaniList.innerHTML = ''; 
      const data = await fetchData();
      if (data && Array.isArray(data)) {
          data.forEach(biriyani => {
              renderBiriyaniItem(biriyani);
          });
      } else {
          displayError('Failed to fetch biriyani menu');
      }
  };

  renderBiriyaniMenu();

  refreshButton.addEventListener('click', renderBiriyaniMenu);
});
