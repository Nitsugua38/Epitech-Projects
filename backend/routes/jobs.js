const fetchJobsList = async (page = 0, size = 50, query = "") => {
    
    const apiKey = process.env.API_KEY;
    let url = `https://epi-api.welovedevs.com/v1?page=${page}&size=${size}`;
    if (query) {
        url += `&q=${encodeURIComponent(query)}`;
    }

    const response = await fetch(url, {
        headers: {
            "X-API-Key": apiKey,
        },
    });

    if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    return data.values.map(job => ({
        id: job.id,
        title: job.title,
        company: job.smallCompany?.companyName || "Entreprise inconnue",
        location: job.formattedPlaces?.join(", ") || "À distance",
        descriptionPreview: job.descriptionPreview || "",
        remotePolicy: job.details?.remotePolicy?.frequency == "hybrid" ? "Hybride" : (job.details?.remotePolicy?.frequency == "fullTime" ? "Remote" : ""),
        requiredExperience: job.details?.requiredExperience || "",
        profession: job.profession?.langContent?.fr?.displayName || job.profession?.langContent?.en?.displayName || "",
        skills: (job.skillsList || []).map(s => s.name),
        status: job.status,
        publishDate: job.publishDate,
        salary: job.details?.salary ? `${job.details.salary.min}k - ${job.details.salary.max}k €` : null,
        companyLogo: job.smallCompany?.gallery?.handle ? `https://cdn.filestackcontent.com/${job.smallCompany.gallery.handle}` : "",
        tags: [
            ...(job.contractTypes || []),
            job.details?.remotePolicy?.frequency == "hybrid" ? "Hybride" : (job.details?.remotePolicy?.frequency == "fullTime" ? "Remote" : null)
        ].filter(Boolean)
    }));
};



const jobs = async (req, res) => {
    try {
        const page = req.query.page || 0;
        const size = req.query.size || 50;
        const Jobs = await fetchJobsList(page, size);
        res.json({ jobs: Jobs });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Failed to fetch jobs" });
    }
};

module.exports = {
    jobs
}