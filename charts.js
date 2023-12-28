document.addEventListener('DOMContentLoaded', function () {
    
    fetch('https://my.api.mockaroo.com/cars.json?key=51df27a0')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            
            createEngineTypesChart(data);

            
            createAveragePriceChart(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


function createEngineTypesChart(data) {

    const engineTypeCounts = {};
    data.forEach(item => {
        const engineType = item.engine_type;
        engineTypeCounts[engineType] = (engineTypeCounts[engineType] || 0) + 1;
    });

    const labels = Object.keys(engineTypeCounts);
    const dataValues = Object.values(engineTypeCounts);

    const config = {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: dataValues,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(153, 102, 255, 0.8)',
                ],
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            title: {
                display: true,
                text: 'Engine Types Distribution',
            },
        },
    };

    const ctx = document.getElementById('engineTypesChart').getContext('2d');
    new Chart(ctx, config);
}
