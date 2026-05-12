const jobs = async (req, res) => {
    res.json({
        jobs: [
            {
                title: 'Développeur Fullstack JS',
                company: 'Tech Innovate',
                location: 'Paris (Hybride)',
                tags: ['CDI', '45k - 55k'],
            },
            {
                title: 'Ingénieur Data / IA',
                company: 'DataCorp',
                location: '100% Remote',
                tags: ['CDI', 'Python'],
            },
            {
                title: 'Stage Développeur Frontend',
                company: 'Startup Studio',
                location: 'Lyon',
                tags: ['Stage', 'React'],
            },
            {
                title: 'Développeur Backend Python',
                company: 'FinTech Solutions',
                location: 'Bordeaux',
                tags: ['CDI', 'Django'],
            },
        ]
    });
}


module.exports = {
    jobs
}