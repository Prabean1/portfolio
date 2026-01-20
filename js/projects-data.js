// It's easier to manage a template for each project than to have multiple different fields for every project.


const projectData = {
  '1': {
    title: 'Network Infrastructure Design',
    subtitle: 'Network Design / 2024',
    summary: 'Designed a small-scale network using the Fixed Length Subnet Mask (FLSM) concept.',
    img: 'img/network.png',
    description: `
      <p>I segmented a 102.12.100.0/24 network into multiple subnets, manually configuring IP addresses, subnet masks, and default gateways on all routers and end devices. Initial inter-subnet connectivity was established using static routing. This foundation was then tested using commands like ping, tracert, and show ip route to verify correct addressing and routing paths between all segments.</p>
      <p>To enhance the network's resilience and manageability, I implemented two key features out of syllabus. I replaced static routes with OSPF (Open Shortest Path First) dynamic routing, incorporating a third router (R3) to serve as an automatic failover path. This ensures continuous network operation and fast convergence should the primary link between R1 and R2 fail, which was successfully demonstrated. Second, I introduced a centralized Syslog server to collect and timestamp system events from all routers. This centralized logging simplifies troubleshooting and aligns the network design with real-world best practices for monitoring and operational efficiency.</p>
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
    },
    driveLink: 'https://drive.google.com/drive/folders/1U5ERK0gg9HU10Ir6MSRqPn3q8PtGYyUt?usp=sharing',
    buttonText: 'View PT and Report!'
  },
  '2': {
    title: 'Lively App Prototype',
    subtitle: 'Interdisciplinary Project / 2024',
    summary: 'Intuitive dashboard for taking charge of your health.',
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
    },
    driveLink: 'https://drive.google.com/drive/folders/13wFpx7RHGz_a9Lt-ZUuVGVY1iooiwmPp?usp=sharing',
    buttonText: 'View Presentation Files'
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
      <p>Towards the end, retrained on the same dataset as risk of overfitting is extremely low, optimiser=AdamW for fine tuning.</p>
      <p>Optimized the model for production by exporting to ONNX format, significantly reducing inference latency and memory footprint to enable real-time deployment on resource-constrained hardware.</p>
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
    },
    driveLink: 'https://drive.google.com/drive/folders/116tm3P9zhabc0mInC21dBzW7KW6fa1-k?usp=sharing',
    buttonText: 'View Updated Table (and soon UI/UX)'
  },
  '4': {
    title: 'Portfolio Site',
    subtitle: 'Web Dev / 2025',
    summary: 'This very website! Built with Bootstrap and custom JS.',
    img: 'img/website.png',
    description: `
       <p>This very website! Built with Bootstrap and custom JS to showcase my projects and skills.</p>
      <p>Features a custom grid distortion effect and a dynamic project gallery.</p>
      <p>Leveraged AI to optimise for low end mobile devices anddesktops.</p>
    `,
    features: [
      'Responsive Design',
      'Custom WebGL Effects',
      'Dynamic Content Loading',
      'Undeniable je ne sais quoi'
    ],
    info: {
      role: 'Full Stack Dev',
      timeline: '3 Weeks',
      stack: 'HTML, CSS, Bootstrap, Three.js'
    },
    driveLink: 'https://prabean1.github.io/portfolio/',
    buttonText: 'View website!'
  },
  '5': {
    title: 'More incoming soon!',
    subtitle: 'Plans / 2025 onwards',
    summary: 'Hard at work on more cool projects, trust me.',
    img: 'https://placehold.co/1200x600/666/fff?text=WIP',
    description: `
      <p>Planning to pursue a more hardware centric project, but I need to finish my current projects first. Most likely working with Arduino and microcontrollers!</p>
    `,
    features: [
      'NA'
    ],
    info: {
      role: 'Student',
      timeline: 'NA',
      stack: 'My laptop, me and coffee'
    },
    driveLink: '#',
    buttonText: 'NA'
  }
};

const socialsData = {
  link: 'https://www.linkedin.com/in/praveen-mukesh-kumar/',
  buttonText: 'Connect on LinkedIn'
};
