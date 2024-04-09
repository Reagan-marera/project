document.addEventListener("DOMContentLoaded", () => {
  const baseURL = 'http://localhost:4000/biriyaniMenu';

  const fetchData = async () => {
    try {
      const response = await fetch(baseURL);
      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return null;
    }
  };

  const renderBiriyaniMenu = async () => {
    const biriyaniList = document.getElementById('biriyani-list');
    biriyaniList.innerHTML = ''; 
    const data = await fetchData();
    if (data && Array.isArray(data)) {
      data.forEach(biriyani => {
        const li = document.createElement('li');
        
        
        const img = document.createElement('img');
        img.src = biriyani.img; 
        img.alt = biriyani.name; 
        li.appendChild(img); 
        
        
        const dishInfo = document.createElement('span');
        dishInfo.textContent = `${biriyani.name} - $${biriyani.price.toFixed(2)} - ${biriyani.description}`;
        li.appendChild(dishInfo); 
        
        
        const orderButton = document.createElement('button');
        orderButton.textContent = 'Order';
        orderButton.addEventListener('click', () => {
          const amount = prompt(`Enter the amount of ${biriyani.name}:`);
          if (amount !== null) {
            alert(`You ordered ${amount} ${biriyani.name}(s)`);
          }
        });
        li.appendChild(orderButton); 
        
        biriyaniList.appendChild(li); 
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'Failed to fetch biriyani menu';
      biriyaniList.appendChild(li);
    }
  };

  
  renderBiriyaniMenu();

  
  const refreshButton = document.getElementById('refresh-btn');
  refreshButton.addEventListener('click', () => {
    renderBiriyaniMenu(); 
  });
});
