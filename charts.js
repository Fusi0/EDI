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

            
            createCarProductionChart(data);
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

function createCarProductionChart(data) {
    const carProductionCounts = {
        'Before 1980': 0,
        '1980-1990': 0,
        '1990-2000': 0,
        '2000-2010': 0,
        'After 2010': 0
    };

    data.forEach(item => {
        const productionYear = item.year_of_production;
        if (productionYear < 1980) {
            carProductionCounts['Before 1980']++;
        } else if (productionYear >= 1980 && productionYear < 1990) {
            carProductionCounts['1980-1990']++;
        } else if (productionYear >= 1990 && productionYear < 2000) {
            carProductionCounts['1990-2000']++;
        } else if (productionYear >= 2000 && productionYear < 2010) {
            carProductionCounts['2000-2010']++;
        } else {
            carProductionCounts['After 2010']++;
        }
    });

    const labels = Object.keys(carProductionCounts);
    const dataValues = Object.values(carProductionCounts);

    const config = {
        type: 'pie',
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
                text: 'Car Production Distribution',
            },
        },
    };

    const ctx = document.getElementById('carProductionChart').getContext('2d');
    new Chart(ctx, config);
}