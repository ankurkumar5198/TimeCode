document.addEventListener('DOMContentLoaded', () => {
    const codeInput = document.getElementById('codeInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const result = document.getElementById('result');
    const complexityOutput = document.getElementById('complexityOutput');
    const complexityGraph = document.getElementById('complexityGraph');
    let chart;

    analyzeBtn.addEventListener('click', () => {
        const code = codeInput.value;
        if (code.trim() === '') {
            alert('Please enter some code to analyze.');
            return;
        }

        const complexity = analyzeBigO(code);
        displayResult(complexity);
    });

    function analyzeBigO(code) {
        // This is a placeholder function. In a real-world scenario, you'd need a more sophisticated
        // algorithm to analyze the code and determine its time complexity.
        const complexities = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n^2)', 'O(2^n)', 'O(n!)'];
        return complexities[Math.floor(Math.random() * complexities.length)];
    }

    function displayResult(complexity) {
        complexityOutput.textContent = complexity;
        result.classList.add('visible');
        
        const data = generateComplexityData(complexity);
        createGraph(data);

        // Scroll to results
        result.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function generateComplexityData(complexity) {
        const data = [];
        for (let i = 1; i <= 10; i++) {
            let y;
            switch (complexity) {
                case 'O(1)': y = 1; break;
                case 'O(log n)': y = Math.log(i); break;
                case 'O(n)': y = i; break;
                case 'O(n log n)': y = i * Math.log(i); break;
                case 'O(n^2)': y = i * i; break;
                case 'O(2^n)': y = Math.pow(2, i); break;
                case 'O(n!)': y = factorial(i); break;
                default: y = i;
            }
            data.push({ x: i, y: y });
        }
        return data;
    }

    function factorial(n) {
        if (n === 0 || n === 1) return 1;
        return n * factorial(n - 1);
    }

    function createGraph(data) {
        if (chart) {
            chart.destroy();
        }

        const ctx = complexityGraph.getContext('2d');
        chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(point => point.x),
                datasets: [{
                    label: 'Time Complexity',
                    data: data.map(point => point.y),
                    borderColor: '#4361ee',
                    backgroundColor: 'rgba(67, 97, 238, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Input Size'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Time'
                        },
                        beginAtZero: true
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        titleColor: '#ffffff',
                        bodyColor: '#ffffff',
                        displayColors: false
                    }
                },
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        });
    }
});