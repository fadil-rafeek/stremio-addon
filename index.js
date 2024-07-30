const { addonBuilder, serveHTTP } = require("stremio-addon-sdk");

// Define the manifest for your addon
const manifest = {
    id: "org.stremio.sampleaddon",
    version: "1.0.0",
    name: "Sample Addon",
    description: "Sample addon to play a video from a URL",
    resources: ["catalog", "stream"],
    types: ["movie", "series"],
    idPrefixes: ["yt_id:"],
    catalogs: [
        {
            type: "movie",
            id: "goofy",
            name: "goofy"
        }
    ],
    background: "https://www.example.com/background.jpg",
    logo: "https://www.example.com/logo.png"
};

// Initialize the addon builder with the manifest
const builder = new addonBuilder(manifest);

// Define the catalog handler
builder.defineCatalogHandler(({ type, id, extra }) => {
    if (type === "movie" && id === "sample_catalog") {
        const metas = [
            {
                id: "yt_id:dQw4w9WgXcQ",
                type: "movie",
                name: "Sample Video",
                poster: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
                background: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
                description: "This is a sample video from YouTube."
            }
        ];
        return Promise.resolve({ metas });
    } else {
        return Promise.resolve({ metas: [] });
    }
});

// Define the stream handler
builder.defineStreamHandler(({ type, id }) => {
    if ((type === "movie" || type === "series") && id === "yt_id:dQw4w9WgXcQ") {
        // Replace with your own video URL
        const videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        
        return Promise.resolve({ streams: [{ title: "Sample Video", url: videoUrl }] });
    } else {
        return Promise.resolve({ streams: [] });
    }
});

// Serve the addon
serveHTTP(builder.getInterface(), { port: 7000 });
