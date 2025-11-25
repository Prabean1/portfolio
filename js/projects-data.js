// Project Data - Edit this file to update project details
// You can use HTML tags like <br> or <strong> within the strings if needed.

const projectData = {
  '1': {
    title: 'Network Infrastructure Design',
    subtitle: 'Network Design / 2024',
    summary: 'Designed a small-scale network using the Fixed Length Subnet Mask (FLSM) concept.',
    img: 'img/network.png', // Ensure this path is correct relative to project.html
    description: `
      <p>Designed a small-scale network using the Fixed Length Subnet Mask (FLSM) concept. Implemented IP addressing, Packet Tracer configuration, and documentation.</p>
      <p>You may view the Cisco PT Files and the full technical report in the Drive link!</p>
    `,
    features: [
      'OSPF (Open Shortest Path First) routing for a failover router',
      'Syslog server to track administrative actions, downtime, routing changes etc.',
      'Easily scalable infrastructure'
    ],
    info: {
      role: 'Lead (and sole) Developer',
      timeline: 'Nov 2024 - Apr 2025',
      stack: 'Cisco Packet Tracer'
    }
  },
  '2': {
    title: 'Lively App Prototype',
    subtitle: 'Interdisciplinary Project / 2024',
    summary: 'IoT dashboard for controlling home appliances via a web interface.',
    img: 'img/lively.png',
    description: `
      <p>The core motive of Lively is to help individuals overcome challenges related to unhealthy stress coping mechanisms, irregular sleep habits, and poorly managed diets, which negatively impact their productivity and overall well-being.</p>
      <p>Initially, the goal was to assist busy professionals with sleep optimization, but this was broadened to a prototype that promotes inclusivity for people from all walks of life to achieve their best physical and mental state.</p>
      <p>(For the record, this project was done before Thunkable integrated AI into its website.)</p>
    `,
    features: [
      'Sleep Tracker and Tips',
      'BMR/BMI Calculation',
      'Personalized Plans (Meal and Workout)',
      'Step Tracking and Reward System',
      'Relaxation Techniques'
    ],
    info: {
      role: 'Full Stack Dev',
      timeline: 'Oct 2024 - Jan 2025',
      stack: 'Thunkable, Canva, surviving without ChatGPT'
    }
  },
  '3': {
    title: 'Object Detection System (YOLOv11)',
    subtitle: 'Computer Vision and AI (ONGOING) / 2025',
    summary: 'Object Detection System (YOLOv11) for real-time object detection and tracking.',
    img: 'img/cvai.png',
    description: `
      <p>Object Detection System (YOLOv11) for real-time object detection and tracking.</p>
      <p>Assigned a particular object to detect (bowl). Ive taken effort to collate a dataset, tailored to detected the object in any environment. Occluded, overturned, all shapes and sizes. Developed Python scripts for polite scraping of images, downloading and utilising pre existing datasets (e.g. OpenImagesV7, COCO) and utilised Roboflow for dataset annotation and training.</p>
      <p>Currently focused on improving precision (mAP50 & mAP50-95) (see Drive for table and progress, updated regularly!) by adjusting LR, enabling cos_LR for improved learning progress and carefully utilising augmentations to prepare the model for any sort of environment. On track to hit 0.9+ in Box(P).</p>
      <p>Next Goal: Develop an UI for the model to allow for real-time object detection, confidence slider and user convenience coupled with an industry level accurate model.</p>
    `,
    features: [
      'Real Time Object Detection',
      'Curated weights and dataset',
      '(Pending) Seamless UI/UX'
    ],
    info: {
      role: 'Lead (and sole) Developer',
      timeline: 'October 2025 - Present',
      stack: 'YOLOv11, PyTorch, Roboflow, Anaconda'
    }
  },
  '4': {
    title: 'Weather Station',
    subtitle: 'IoT / 2023',
    summary: 'Solar-powered weather station logging data to the cloud.',
    img: 'https://placehold.co/1200x600/555/fff?text=Weather+Station',
    description: `
      <p>Solar-powered weather station logging data to the cloud. It measures temperature, humidity, pressure, and air quality.</p>
      <p>Data is visualized on a public website, allowing the local community to monitor weather conditions.</p>
    `,
    features: [
      'Solar Powered Operation',
      'Cloud Data Logging',
      'Air Quality Monitoring'
    ],
    info: {
      role: 'Firmware Dev',
      timeline: '5 Weeks',
      stack: 'ESP32, AWS IoT, React'
    }
  },
  '5': {
    title: 'Portfolio Site',
    subtitle: 'Web Dev / 2025',
    summary: 'This very website! Built with Bootstrap and custom JS.',
    img: 'https://placehold.co/1200x600/666/fff?text=Portfolio+Site',
    description: `
      <p>This very website! Built with Bootstrap and custom JS to showcase my projects and skills.</p>
      <p>Features a custom grid distortion effect and a dynamic project gallery.</p>
    `,
    features: [
      'Responsive Design',
      'Custom WebGL Effects',
      'Dynamic Content Loading'
    ],
    info: {
      role: 'Frontend Dev',
      timeline: '1 Week',
      stack: 'HTML, CSS, Bootstrap, Three.js'
    }
  }
};
