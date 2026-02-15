document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: false,
        mirror: true
    });

    // 10-Minute Presentation Timer
    let seconds = 0;
    const timerElement = document.getElementById('timer');
    const timerContainer = document.getElementById('timer-container');

    const presentationTimer = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        timerElement.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        // 8-10 min: Warning (yellow/orange)
        if (seconds >= 480 && seconds < 600) {
            timerContainer.classList.add('warning');
        }

        // 10 min: Stop (red)
        if (seconds >= 600) {
            clearInterval(presentationTimer);
            timerContainer.classList.add('stop');
            timerElement.innerText = "10:00 - TIME!";
        }
    }, 1000);

    // Smooth Scroll and Active Link Highlighting
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Chart.js - SLM vs LLM Performance
    const ctxPerf = document.getElementById('perfChart').getContext('2d');
    new Chart(ctxPerf, {
        type: 'bar',
        data: {
            labels: ['NER (F1)', 'MedQA (Acc)', 'PubMedQA (Acc)'],
            datasets: [
                {
                    label: 'PubMedBERT/SLM',
                    data: [0.909, 0.419, 0.734],
                    backgroundColor: 'rgba(59, 130, 246, 0.6)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    borderWidth: 1
                },
                {
                    label: 'GPT-4 (LLM)',
                    data: [0.612, 0.748, 0.758],
                    backgroundColor: 'rgba(148, 163, 184, 0.4)',
                    borderColor: 'rgba(148, 163, 184, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.0,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            },
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            }
        }
    });

    // Chart.js - Cost Comparison
    const ctxCost = document.getElementById('costChart').getContext('2d');
    new Chart(ctxCost, {
        type: 'bar',
        data: {
            labels: ['SLMs (Local)', 'GPT-4'],
            datasets: [{
                label: 'Cost per 100 Queries ($)',
                data: [0, 8.5],
                backgroundColor: ['rgba(16, 185, 129, 0.6)', 'rgba(239, 68, 68, 0.6)'],
                borderColor: ['rgba(16, 185, 129, 1)', 'rgba(239, 68, 68, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });

    // Chart.js - OCR Engine Comparison
    const ctxOCR = document.getElementById('ocrChart').getContext('2d');
    new Chart(ctxOCR, {
        type: 'radar',
        data: {
            labels: ['Accuracy', 'Speed', 'Handwriting', 'Low Cost'],
            datasets: [
                {
                    label: 'PaddleOCR',
                    data: [90, 95, 60, 100],
                    backgroundColor: 'rgba(59, 130, 246, 0.2)',
                    borderColor: 'rgba(59, 130, 246, 1)',
                    pointBackgroundColor: 'rgba(59, 130, 246, 1)'
                },
                {
                    label: 'Google Doc AI',
                    data: [99, 80, 70, 20],
                    backgroundColor: 'rgba(168, 85, 247, 0.2)',
                    borderColor: 'rgba(168, 85, 247, 1)',
                    pointBackgroundColor: 'rgba(168, 85, 247, 1)'
                },
                {
                    label: 'TrOCR',
                    data: [95, 40, 90, 50],
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    borderColor: 'rgba(16, 185, 129, 1)',
                    pointBackgroundColor: 'rgba(16, 185, 129, 1)'
                }
            ]
        },
        options: {
            scales: {
                r: {
                    angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                    grid: { color: 'rgba(255, 255, 255, 0.1)' },
                    pointLabels: { color: '#94a3b8' },
                    ticks: { display: false },
                    suggestedMin: 0,
                    suggestedMax: 100
                }
            },
            plugins: {
                legend: { labels: { color: '#f8fafc' } }
            }
        }
    });
});
