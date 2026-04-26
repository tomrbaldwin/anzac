document.addEventListener("DOMContentLoaded", () => {
  // --- CONFIGURATION ---

  // IMPORTANT: Replace with your own MapTiler API key
  const apiKey = "uv3GmpJfUcZpJG0Cnt2d";
  const mapStyle = `https://api.maptiler.com/maps/dataviz-dark/style.json?key=${apiKey}`;

  // Define the "chapters" of map animation
  const chapters = {
    step1: {
      center: [25, 35], // Mediterranean Sea
      zoom: 4,
      pitch: 0,
      bearing: 0,
    },
    step2: {
      center: [34.8, 31.9], // Palestine
      zoom: 7,
      pitch: 20,
      bearing: 0,
    },
    step3: {
      center: [34.7918, 31.9935], // Rishon LeZion
      zoom: 13,
      pitch: 45,
      bearing: -20,
    },
    step4: {
      center: [34.7918, 31.9935], // Rishon LeZion
      zoom: 13,
      pitch: 45,
      bearing: -20,
    },
    step5: {
      center: [34.7918, 31.9935], // Rishon LeZion
      zoom: 13,
      pitch: 45,
      bearing: -20,
    },
  };

  // --- INITIALIZATION ---

  // maplibregl is available globally from the script tag in index.html
  const map = new maplibregl.Map({
    container: "map",
    style: mapStyle,
    center: chapters.step1.center,
    zoom: chapters.step1.zoom,
    pitch: chapters.step1.pitch,
    bearing: chapters.step1.bearing,
    interactive: false, // Disable map interaction
  });

  const scrollySteps = document.querySelectorAll(".scrolly-step");

  // --- SCROLLYTELLING LOGIC ---

  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      const stepElement = entry.target;
      const stepId = stepElement.id;

      if (entry.isIntersecting) {
        // Animate the map to the new chapter's settings
        stepElement.classList.add("is-active");

        // Use flyTo for a smooth, cinematic transition
        map.flyTo({
          ...chapters[stepId],
          duration: 2000, // Animation duration in milliseconds
          essential: true,
        });
      } else {
        stepElement.classList.remove("is-active");
      }
    });
  };

  // Wait for the map to load before setting up the observer
  map.on("load", () => {
    const observer = new IntersectionObserver(handleIntersect, {
      rootMargin: "-50% 0px -50% 0px", // Trigger when a step is in the vertical center
      threshold: 0,
    });

    scrollySteps.forEach((step) => observer.observe(step));
  });
});
