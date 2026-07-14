// AeroVibe AI Flight Safety Simulator Engine

document.addEventListener('DOMContentLoaded', () => {
  // Navigation / SPA Elements
  const navLinks = document.querySelectorAll('.drawer-link');
  const pageViews = document.querySelectorAll('.page-view');
  const goFlightdeckBtn = document.getElementById('go-to-flightdeck-btn');
  
  // Drawer Toggle Elements
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');
  const navDrawer = document.getElementById('nav-drawer');
  const drawerBtnDemo = document.getElementById('drawer-btn-demo');
  
  // HUD Elements
  const oscCanvas = document.getElementById('oscilloscope-canvas');
  const vibCanvas = document.getElementById('vibration-canvas');
  const specCanvas = document.getElementById('spectrogram-canvas');
  
  const oscAmplitude = document.getElementById('osc-amplitude');
  const vibAmplitude = document.getElementById('vib-amplitude');
  
  const sysStatusDot = document.getElementById('system-status-dot');
  const systemStateLabel = document.getElementById('system-state-label');
  const rotorRpm = document.getElementById('rotor-rpm');
  const egtTemp = document.getElementById('egt-temp');
  const netStatus = document.getElementById('net-status');
  const voiceStatusBadge = document.getElementById('voice-status-badge');
  
  // Portal Elements
  const portalRotorRpm = document.getElementById('portal-rotor-rpm');
  const portalEgtTemp = document.getElementById('portal-egt-temp');
  const portalStatusLabel = document.getElementById('portal-status-label');
  
  // SVG Digital Twin & Map Elements
  const mapPlaneGroup = document.getElementById('map-plane-group');
  const mapConnectionLabel = document.getElementById('map-connection-label');
  const engineCrossSection = document.getElementById('engine-cross-section');
  const spinningShaftLine = document.getElementById('spinning-shaft-line');
  const airflowChevronsGroup = document.getElementById('airflow-chevrons-group');
  const rotorCrossBlades = document.getElementById('rotor-cross-blades');
  const bearingFront = document.getElementById('bearing-front');
  const bearingRear = document.getElementById('bearing-rear');
  const bearingBalls = [
    document.getElementById('bearing-ball-1'),
    document.getElementById('bearing-ball-2'),
    document.getElementById('bearing-ball-3'),
    document.getElementById('bearing-ball-4')
  ];
  const fuelPipeLine = document.getElementById('fuel-pipe-line');
  const fuelFlowParticle = document.getElementById('fuel-flow-particle');
  const combustionFlames = document.getElementById('combustion-flames');
  const rotorStatusBadgeText = document.getElementById('rotor-status-badge-text');
  
  // Actuation / Input Elements
  const switchGuard = document.getElementById('switch-guard');
  const injectSevereBtn = document.getElementById('inject-severe-btn');
  const injectSoftBtn = document.getElementById('inject-soft-btn');
  const vetoOverrideBtn = document.getElementById('veto-override-btn');
  const resetSystemBtn = document.getElementById('reset-system-btn');
  
  const inferenceResult = document.getElementById('inference-result');
  const confidencePercentage = document.getElementById('confidence-percentage');
  const confidenceBar = document.getElementById('confidence-bar');
  
  const valveLight = document.getElementById('valve-light');
  const valveState = document.getElementById('valve-state');
  const vgvLight = document.getElementById('vgv-light');
  const vgvState = document.getElementById('vgv-state');

  // NASA Alert & Acknowledge
  const nasaAlert = document.getElementById('nasa-alert');
  const btnAckAlert = document.getElementById('btn-ack-alert');
  
  // Predictive PdM Metrics
  const pdmRul = document.getElementById('pdm-rul');
  const pdmWear = document.getElementById('pdm-wear');
  const pdmSched = document.getElementById('pdm-sched');
  const pdmHealthRing = document.getElementById('pdm-health-ring');
  const pdmHealthText = document.getElementById('pdm-health-text');
  
  // FDR Scrubber Timeline elements
  const btnFdrPlay = document.getElementById('btn-fdr-play');
  const btnFdrPause = document.getElementById('btn-fdr-pause');
  const btnFdrReplay = document.getElementById('btn-fdr-replay');
  const fdrSlider = document.getElementById('fdr-slider');
  const fdrTimeLabel = document.getElementById('fdr-time-label');
  const fdrStatusBadge = document.getElementById('fdr-status-badge');

  // GCP Firebase Integrations Console
  const firestoreLiveLog = document.getElementById('firestore-live-log');
  const geminiApiKeyInput = document.getElementById('gemini-api-key-input');
  const btnSaveApiKey = document.getElementById('btn-save-api-key');
  const apiKeyStatusLabel = document.getElementById('api-key-status-label');
  
  // Explainability (XAI) elements
  const heatmapGridElement = document.getElementById('heatmap-grid-element');
  const attentionTagText = document.getElementById('attention-tag');
  const confidenceColumns = document.querySelectorAll('#confidence-bar-chart .chart-column');
  const featBar1 = document.getElementById('feat-bar-1');
  const featBar2 = document.getElementById('feat-bar-2');
  const featBar3 = document.getElementById('feat-bar-3');
  const featVal1 = document.getElementById('feat-val-1');
  const featVal2 = document.getElementById('feat-val-2');
  const featVal3 = document.getElementById('feat-val-3');
  
  // CLI & Chatbot Elements
  const terminalOutput = document.getElementById('terminal-output');
  const terminalInput = document.getElementById('terminal-input-field');
  const cmdShortcuts = document.querySelectorAll('.cmd-shortcut-btn');
  
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input-field');
  const chatSendBtn = document.getElementById('chat-send-btn');
  const botModelBadge = document.getElementById('bot-model-badge');
  
  const tripTimeline = document.getElementById('trip-timeline');
  const timelinePlaceholder = document.getElementById('timeline-placeholder');

  // Simulation state variables
  let isTripped = false;
  let isGuardOpen = false;
  let rpm = 14250;
  let targetRpm = 14250;
  let temp = 740;
  let targetTemp = 740;
  
  // Flight Route Progress
  let flightProgress = 35;
  
  // Scrubber / FDR Modes: 'LIVE' or 'REPLAY'
  let fdrMode = 'LIVE'; 
  let fdrInterval = null;
  
  // Command Shell History list
  const availableCommands = [
    'help', 'status', 'diagnostics', 'sensor status', 'cnn', 
    'temperature', 'rpm', 'logs', 'export', 'latency', 'restart', 'clear',
    'arinc', 'calibration'
  ];
  let commandHistory = [];
  let historyIndex = -1;
  
  // Canvas Contexts
  const oscCtx = oscCanvas.getContext('2d');
  const vibCtx = vibCanvas.getContext('2d');
  const specCtx = specCanvas.getContext('2d');
  const partCanvas = document.getElementById('particle-canvas');
  const partCtx = partCanvas.getContext('2d');
  
  // Antigravity Particle Field Simulation
  const particles = [];
  const numParticles = 45;
  let isCountdownActive = false;
  let isSoftWarningActive = false;
  let countdownTimer = null;
  let countdownVal = 3.00;
  
  function initParticles() {
    if (!partCanvas) return;
    particles.length = 0;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * partCanvas.width,
        y: Math.random() * partCanvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.5
      });
    }
  }
  
  // Resize Canvases
  function resizeCanvases() {
    if (oscCanvas.parentElement.clientWidth > 0) {
      oscCanvas.width = oscCanvas.parentElement.clientWidth;
      oscCanvas.height = oscCanvas.parentElement.clientHeight - 25;
      
      vibCanvas.width = vibCanvas.parentElement.clientWidth;
      vibCanvas.height = vibCanvas.parentElement.clientHeight - 25;
      
      specCanvas.width = specCanvas.parentElement.clientWidth;
      specCanvas.height = specCanvas.parentElement.clientHeight - 25;
    }
    if (partCanvas && partCanvas.parentElement.clientWidth > 0) {
      partCanvas.width = partCanvas.parentElement.clientWidth;
      partCanvas.height = partCanvas.parentElement.clientHeight;
      if (particles.length === 0) {
        initParticles();
      }
    }
  }
  
  resizeCanvases();
  window.addEventListener('resize', resizeCanvases);

  // Spectrogram Initialization
  specCtx.fillStyle = '#05070a';
  specCtx.fillRect(0, 0, specCanvas.width, specCanvas.height);

  // Signal Generators variables
  let oscOffset = 0;
  let crackSignalStrength = 0;
  let vibrationSignalStrength = 0;

  // SPA Page Router Navigation
  function switchPage(targetPageId) {
    pageViews.forEach(page => {
      if (page.id === targetPageId) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    navLinks.forEach(link => {
      if (link.getAttribute('data-page') === targetPageId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (targetPageId === 'page-flightdeck') {
      setTimeout(resizeCanvases, 50);
    }
  }

  function openDrawerMenu() {
    if (navDrawer) navDrawer.classList.add('open');
    if (menuToggleBtn) menuToggleBtn.classList.add('open');
  }

  function closeDrawerMenu() {
    if (navDrawer) navDrawer.classList.remove('open');
    if (menuToggleBtn) menuToggleBtn.classList.remove('open');
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      switchPage(link.getAttribute('data-page'));
      closeDrawerMenu();
    });
  });

  if (menuToggleBtn) {
    menuToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navDrawer && navDrawer.classList.contains('open')) {
        closeDrawerMenu();
      } else {
        openDrawerMenu();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', () => {
      closeDrawerMenu();
    });
  }

  if (navDrawer) {
    navDrawer.addEventListener('click', (e) => {
      if (e.target === navDrawer) {
        closeDrawerMenu();
      }
    });
  }

  if (drawerBtnDemo) {
    drawerBtnDemo.addEventListener('click', () => {
      closeDrawerMenu();
      startAutomatedDemo();
    });
  }

  if (goFlightdeckBtn) {
    goFlightdeckBtn.addEventListener('click', () => {
      switchPage('page-flightdeck');
    });
  }

  // Real-Time Frame Update Loop
  function updateSimulation() {
    if (fdrMode === 'LIVE') {
      // 1. Smoothly decay RPM and Temperature if Tripped
      if (isTripped) {
        targetRpm = 0;
        targetTemp = 110;
      } else {
        targetRpm = 14250 + Math.sin(Date.now() * 0.002) * 80;
        targetTemp = 740 + Math.cos(Date.now() * 0.001) * 3;
      }
      
      rpm += (targetRpm - rpm) * 0.035;
      temp += (targetTemp - temp) * 0.015;
      
      const rpmFormatted = `${Math.round(rpm).toLocaleString()} RPM`;
      const tempFormatted = `${Math.round(temp)} °C`;
      
      if (rotorRpm) rotorRpm.innerText = rpmFormatted;
      if (egtTemp) egtTemp.innerText = tempFormatted;
      
      if (portalRotorRpm) portalRotorRpm.innerText = rpmFormatted;
      if (portalEgtTemp) portalEgtTemp.innerText = tempFormatted;

      const hudRpm = document.getElementById('hud-rpm');
      const hudTemp = document.getElementById('hud-temp');
      const hudVib = document.getElementById('hud-vib');
      const hudConf = document.getElementById('hud-conf');
      
      if (hudRpm) {
        hudRpm.innerText = rpmFormatted;
        hudRpm.className = isTripped ? 'hud-tele-val text-red' : 'hud-tele-val text-green';
      }
      if (hudTemp) {
        hudTemp.innerText = tempFormatted;
        hudTemp.className = isTripped ? 'hud-tele-val text-red' : 'hud-tele-val text-green';
      }
      if (hudVib) {
        hudVib.innerText = (isTripped ? '0.95 G' : (0.04 + Math.sin(Date.now() * 0.005) * 0.01).toFixed(2) + ' G');
        hudVib.className = isTripped ? 'hud-tele-val text-red' : 'hud-tele-val text-green';
      }
      if (hudConf) {
        hudConf.innerText = (isTripped ? '99.4%' : '99.8%');
        hudConf.className = isTripped ? 'hud-tele-val text-red' : 'hud-tele-val text-green';
      }

      // 2. Animate World Map
      animateWorldMap();
      
      // 3. Draw oscilloscopes, waterfalls, and casing particles
      if (oscCanvas.width > 0) {
        drawOscilloscope();
        drawVibration();
        drawSpectrogramWaterfall();
      }
      if (partCanvas && partCanvas.width > 0) {
        drawParticles();
      }
      
      // Update slider to show 0 when live running
      if (fdrSlider) fdrSlider.value = 0;
      if (fdrTimeLabel) fdrTimeLabel.innerText = "0.0 ms";
    }

    requestAnimationFrame(updateSimulation);
  }

  // Draw floating zero-gravity particles
  function drawParticles() {
    if (!partCanvas || !partCtx) return;
    const width = partCanvas.width;
    const height = partCanvas.height;
    
    partCtx.fillStyle = 'rgba(4, 6, 9, 0.2)';
    partCtx.fillRect(0, 0, width, height);
    
    let color = 'rgba(0, 240, 255, 0.7)';
    let lineColor = 'rgba(0, 240, 255, 0.08)';
    
    if (isCountdownActive) {
      color = 'rgba(255, 170, 0, 0.8)';
      lineColor = 'rgba(255, 170, 0, 0.15)';
    } else if (isTripped) {
      color = 'rgba(255, 0, 85, 0.9)';
      lineColor = 'rgba(255, 0, 85, 0.2)';
    } else if (isSoftWarningActive) {
      color = 'rgba(255, 170, 0, 0.8)';
      lineColor = 'rgba(255, 170, 0, 0.12)';
    }
    
    particles.forEach((p, idx) => {
      if (isTripped) {
        const dx = width / 2 - p.x;
        const dy = height / 2 - p.y;
        p.vx += dx * 0.012;
        p.vy += dy * 0.012;
        p.vx *= 0.82;
        p.vy *= 0.82;
      } else {
        p.vx += (Math.random() - 0.5) * 0.03;
        p.vy += (Math.random() - 0.5) * 0.03;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const maxSpeed = isSoftWarningActive || isCountdownActive ? 1.0 : 0.4;
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }
      }
      
      p.x += p.vx;
      p.y += p.vy;
      
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      
      p.x = Math.max(0, Math.min(width, p.x));
      p.y = Math.max(0, Math.min(height, p.y));
      
      partCtx.beginPath();
      partCtx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      partCtx.fillStyle = color;
      partCtx.fill();
      
      for (let j = idx + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dist = Math.sqrt((p.x - p2.x)*(p.x - p2.x) + (p.y - p2.y)*(p.y - p2.y));
        if (dist < 60) {
          partCtx.beginPath();
          partCtx.moveTo(p.x, p.y);
          partCtx.lineTo(p2.x, p2.y);
          partCtx.strokeStyle = lineColor;
          partCtx.lineWidth = 0.8;
          partCtx.stroke();
        }
      }
    });
  }

  // Animate Flight path plane and Connection states
  function animateWorldMap() {
    flightProgress += 0.008;
    if (flightProgress > 100) {
      flightProgress = 0;
    }

    let px, py;
    if (isSoftWarningActive) {
      // Divert route to BOM Hub (180, 80)
      const t = flightProgress / 100;
      px = (1-t)*120 + t*180;
      py = (1-t)*32 + t*80;
    } else {
      const t = flightProgress / 100;
      px = (1-t)*(1-t)*80 + 2*(1-t)*t*200 + t*t*320;
      py = (1-t)*(1-t)*40 + 2*(1-t)*t*15 + t*t*40;
    }

    if (mapPlaneGroup) {
      const circles = mapPlaneGroup.querySelectorAll('circle');
      circles.forEach(c => {
        c.setAttribute('cx', px);
        c.setAttribute('cy', py);
      });
    }

    const distToOutage = Math.sqrt((px - 200) * (px - 200) + (py - 30) * (py - 30));
    
    if (isTripped) {
      if (netStatus) {
        netStatus.className = 'net-badge critical';
        netStatus.innerText = 'TRIPPED // VALVE ISOLATED';
      }
      if (mapConnectionLabel) {
        mapConnectionLabel.innerText = 'CONTAINMENT ACTIVE // OFFLINE';
        mapConnectionLabel.className = 'map-status status-critical';
      }
    } else if (distToOutage < 45) {
      if (netStatus) {
        netStatus.className = 'net-badge warning';
        netStatus.innerText = 'SATELLITE LOST // EDGE AI ACTIVE';
      }
      if (mapConnectionLabel) {
        mapConnectionLabel.innerText = 'NO WAN CONNECTION // OFFLINE';
        mapConnectionLabel.className = 'map-status status-warning';
      }
    } else {
      if (netStatus) {
        netStatus.className = 'net-badge';
        netStatus.innerText = 'SATELLITE SYNC // ONLINE';
      }
      if (mapConnectionLabel) {
        mapConnectionLabel.innerText = 'SATELLITE LINK ACTIVE // SECURED';
        mapConnectionLabel.className = 'map-status status-healthy';
      }
    }
  }

  // Draw Casing Acoustic Oscilloscope
  function drawOscilloscope() {
    const width = oscCanvas.width;
    const height = oscCanvas.height;
    oscCtx.fillStyle = '#040609';
    oscCtx.fillRect(0, 0, width, height);

    oscCtx.strokeStyle = 'rgba(0, 240, 255, 0.025)';
    oscCtx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      oscCtx.beginPath(); oscCtx.moveTo(x, 0); oscCtx.lineTo(x, height); oscCtx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      oscCtx.beginPath(); oscCtx.moveTo(0, y); oscCtx.lineTo(width, y); oscCtx.stroke();
    }

    oscCtx.beginPath();
    oscCtx.lineWidth = 1.5;
    oscCtx.strokeStyle = isTripped ? 'rgba(255, 0, 85, 0.75)' : 'rgba(0, 240, 255, 0.75)';
    
    let maxAmp = 0;
    
    for (let x = 0; x < width; x++) {
      const time = oscOffset + x * 0.04;
      let signal = Math.sin(time) * (height * 0.12) * (rpm / 14250);
      signal += Math.sin(time * 2.3) * (height * 0.05) * (rpm / 14250);
      signal += (Math.random() - 0.5) * 4;
      
      if (crackSignalStrength > 0) {
        const burstFrequency = 22.0; 
        const burstInterval = 110;
        const sampleOffset = (x + Math.floor(oscOffset * 10)) % burstInterval;
        
        let transient = Math.sin(sampleOffset * burstFrequency) * (height * 0.38) * Math.exp(-sampleOffset * 0.045);
        signal += transient * crackSignalStrength;
      }
      
      const y = height / 2 + signal;
      if (x === 0) oscCtx.moveTo(x, y);
      else oscCtx.lineTo(x, y);
      
      const absoluteAmpVal = Math.abs(signal) / (height / 2);
      if (absoluteAmpVal > maxAmp) maxAmp = absoluteAmpVal;
    }
    
    oscCtx.stroke();
    const voltScale = (maxAmp * 1.8).toFixed(2);
    if (oscAmplitude) oscAmplitude.innerText = `${voltScale} V`;
    
    if (!isTripped || rpm > 100) {
      oscOffset += 1.8;
    }
  }

  // Draw Accelerometer Shaft Vibration
  function drawVibration() {
    const width = vibCanvas.width;
    const height = vibCanvas.height;
    vibCtx.fillStyle = '#040609';
    vibCtx.fillRect(0, 0, width, height);

    vibCtx.strokeStyle = 'rgba(0, 255, 102, 0.015)';
    vibCtx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      vibCtx.beginPath(); vibCtx.moveTo(x, 0); vibCtx.lineTo(x, height); vibCtx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      vibCtx.beginPath(); vibCtx.moveTo(0, y); vibCtx.lineTo(width, y); vibCtx.stroke();
    }

    vibCtx.beginPath();
    vibCtx.lineWidth = 1.5;
    vibCtx.strokeStyle = isTripped ? 'rgba(255, 170, 0, 0.7)' : 'rgba(0, 255, 102, 0.7)';
    
    let maxAmp = 0;
    
    for (let x = 0; x < width; x++) {
      const time = (oscOffset * 0.5) + x * 0.025;
      let signal = Math.sin(time) * (height * 0.15) * (rpm / 14250);
      signal += Math.sin(time * 0.45) * (height * 0.05) * (rpm / 14250);
      signal += (Math.random() - 0.5) * 1.5;
      
      if (vibrationSignalStrength > 0) {
        let crackImbalance = Math.sin(time * 1.1) * (height * 0.35) * vibrationSignalStrength;
        signal += crackImbalance;
        
        if (isTripped) {
          vibrationSignalStrength -= 0.00035;
          if (vibrationSignalStrength < 0) vibrationSignalStrength = 0;
        }
      }
      
      const y = height / 2 + signal;
      if (x === 0) vibCtx.moveTo(x, y);
      else vibCtx.lineTo(x, y);
      
      const absoluteAmpVal = Math.abs(signal) / (height / 2);
      if (absoluteAmpVal > maxAmp) maxAmp = absoluteAmpVal;
    }
    
    vibCtx.stroke();
    const gScale = (maxAmp * 0.6).toFixed(2);
    if (vibAmplitude) vibAmplitude.innerText = `${gScale} G`;
  }

  // Draw Spectrogram Waterfall
  function drawSpectrogramWaterfall() {
    const width = specCanvas.width;
    const height = specCanvas.height;
    
    specCtx.drawImage(specCanvas, 0, 0, width, height - 1.2, 0, 1.2, width, height - 1.2);
    
    const numBins = 64;
    const binWidth = width / numBins;
    
    for (let i = 0; i < numBins; i++) {
      let intensity = 0;
      
      if (isTripped && rpm < 500) {
        intensity = Math.random() * 10;
      } else {
        if (i < 8) {
          intensity = (Math.sin(Date.now() * 0.003 + i) * 30 + 50) * (rpm / 14250);
        } else {
          intensity = Math.random() * 25;
        }
        
        if (crackSignalStrength > 0 && i >= 32 && i <= 52) {
          const centerFreqMatch = 1 - Math.abs(i - 42) / 10;
          intensity += (centerFreqMatch * 190 + Math.random() * 50) * crackSignalStrength;
        }
      }
      
      intensity = Math.max(0, Math.min(255, intensity));
      
      let color = 'rgb(5, 7, 10)';
      if (intensity > 220) {
        color = `rgb(255, 255, 255)`;
      } else if (intensity > 160) {
        color = `rgb(255, ${Math.floor(255 - (intensity - 160) * 3.5)}, 60)`;
      } else if (intensity > 100) {
        color = `rgb(${Math.floor((intensity - 100) * 4)}, 240, 80)`;
      } else if (intensity > 40) {
        color = `rgb(0, ${Math.floor((intensity - 40) * 3 + 60)}, ${Math.floor((intensity - 40) * 3 + 120)})`;
      } else if (intensity > 10) {
        color = `rgb(5, 20, ${Math.floor(intensity * 4)})`;
      }
      
      specCtx.fillStyle = color;
      specCtx.fillRect(i * binWidth, 0, binWidth + 0.5, 2);
    }
  }

  // Cover Latch & Inject Crack Actions
  // Active Profile Selector
  const flightProfileSelect = document.getElementById('flight-profile-select');
  let activeProfile = 'international'; // default based on HTML selected
  
  if (flightProfileSelect) {
    flightProfileSelect.addEventListener('change', () => {
      activeProfile = flightProfileSelect.value;
      updateFlightProfileDisplay();
    });
  }

  function updateFlightProfileDisplay() {
    const routeTitle = document.getElementById('map-route-title');
    const alertFlightUnit = document.getElementById('alert-flight-unit');
    const alertMainTitle = document.getElementById('alert-main-title');
    
    if (activeProfile === 'domestic') {
      if (routeTitle) routeTitle.innerText = "AIR INDIA DOMESTIC ROUTE (AI-401)";
      if (alertFlightUnit) alertFlightUnit.innerText = "Air India Flight AI-401 // Airbus A320neo";
      if (alertMainTitle) alertMainTitle.innerText = "AI-401 ENGINE EMERGENCY ISOLATION COMPLETE";
      logToTerminal('SYSTEM', 'Flight profile configuration loaded: Airbus A320neo (Domestic AI-401).');
    } else {
      if (routeTitle) routeTitle.innerText = "AIR INDIA TRANS-OCEANIC ROUTE (AI-101) [ETOPS]";
      if (alertFlightUnit) alertFlightUnit.innerText = "Air India Flight AI-101 // Boeing 787-8 Dreamliner";
      if (alertMainTitle) alertMainTitle.innerText = "AI-101 CRITICAL ETOPS SAFETY SHUTDOWN COMPLETE";
      logToTerminal('SYSTEM', 'Flight profile configuration loaded: Boeing 787-8 Dreamliner (ETOPS AI-101).');
    }
  }

  // Cover Latch & Inject Actions
  switchGuard.addEventListener('click', () => {
    isGuardOpen = !isGuardOpen;
    if (isGuardOpen) {
      switchGuard.classList.add('flipped');
      switchGuard.innerText = 'GUARD Flipped';
      if (injectSevereBtn) {
        injectSevereBtn.classList.remove('disabled');
        injectSevereBtn.removeAttribute('disabled');
      }
      if (injectSoftBtn) {
        injectSoftBtn.classList.remove('disabled');
        injectSoftBtn.removeAttribute('disabled');
      }
      logToTerminal('WARN', 'Safety cover opened. Emergency manually injected triggers armed.');
    } else {
      switchGuard.classList.remove('flipped');
      switchGuard.innerText = 'GUARD CLOSED';
      if (injectSevereBtn) {
        injectSevereBtn.classList.add('disabled');
        injectSevereBtn.setAttribute('disabled', 'true');
      }
      if (injectSoftBtn) {
        injectSoftBtn.classList.add('disabled');
        injectSoftBtn.setAttribute('disabled', 'true');
      }
      logToTerminal('INFO', 'Safety cover closed. Triggers secured.');
    }
  });

  if (injectSevereBtn) {
    injectSevereBtn.addEventListener('click', () => {
      if (!isGuardOpen || isTripped) return;
      triggerSevereStrikeCountdown();
    });
  }

  if (injectSoftBtn) {
    injectSoftBtn.addEventListener('click', () => {
      if (!isGuardOpen || isTripped) return;
      triggerSoftImpactWarning();
    });
  }

  if (vetoOverrideBtn) {
    vetoOverrideBtn.addEventListener('click', () => {
      vetoAutomatedShutdown();
    });
  }

  function triggerSevereStrikeCountdown() {
    isCountdownActive = true;
    isSoftWarningActive = false;
    countdownVal = 3.00;
    
    if (injectSevereBtn) injectSevereBtn.style.display = 'none';
    if (injectSoftBtn) injectSoftBtn.style.display = 'none';
    if (vetoOverrideBtn) {
      vetoOverrideBtn.style.display = 'block';
      vetoOverrideBtn.removeAttribute('disabled');
      vetoOverrideBtn.classList.remove('disabled');
    }
    
    const filterCBox = document.getElementById('filter-c-box');
    const filterCStatus = document.getElementById('filter-c-status');
    const filterCDesc = document.getElementById('filter-c-desc');
    
    if (filterCBox) filterCBox.style.background = 'rgba(255, 170, 0, 0.15)';
    
    logToTerminal('WARN', 'Rotor acoustic peak stress exceeds critical limits!');
    logToTerminal('WARN', 'Filter C: Pilot override armed. Manual veto window active.');
    
    countdownTimer = setInterval(() => {
      countdownVal -= 0.05;
      if (countdownVal <= 0) {
        countdownVal = 0;
        clearInterval(countdownTimer);
        executeSevereStrikeShutdown();
      }
      
      const timeStr = countdownVal.toFixed(2);
      if (filterCStatus) {
        filterCStatus.innerText = `VETO: ${timeStr}s`;
        filterCStatus.style.color = '#ffaa00';
      }
      if (filterCDesc) {
        filterCDesc.innerText = `Interactive countdown active. Click [VETO OVERRIDE] to abort isolation.`;
      }
    }, 50);
  }

  function vetoAutomatedShutdown() {
    clearInterval(countdownTimer);
    isCountdownActive = false;
    
    if (injectSevereBtn) injectSevereBtn.style.display = 'block';
    if (injectSoftBtn) injectSoftBtn.style.display = 'block';
    if (vetoOverrideBtn) {
      vetoOverrideBtn.style.display = 'none';
      vetoOverrideBtn.setAttribute('disabled', 'true');
      vetoOverrideBtn.classList.add('disabled');
    }
    
    const filterCBox = document.getElementById('filter-c-box');
    const filterCStatus = document.getElementById('filter-c-status');
    const filterCDesc = document.getElementById('filter-c-desc');
    
    if (filterCBox) filterCBox.style.background = 'rgba(0, 255, 102, 0.05)';
    if (filterCStatus) {
      filterCStatus.innerText = 'VETOED / ARMED';
      filterCStatus.style.color = '#00ff66';
    }
    if (filterCDesc) {
      filterCDesc.innerText = 'Pilot manual veto engaged. Automated engine isolation aborted.';
    }
    
    logToTerminal('SYSTEM', 'Captain manual bypass veto RECEIVED. Engine containment isolation aborted.');
    logToTerminal('SYSTEM', 'Propulsion systems stabilized in manual override state.');
    
    resetSafetyComputer();
  }

  function executeSevereStrikeShutdown() {
    isCountdownActive = false;
    isTripped = true;
    
    if (injectSevereBtn) injectSevereBtn.style.display = 'block';
    if (injectSoftBtn) injectSoftBtn.style.display = 'block';
    if (vetoOverrideBtn) {
      vetoOverrideBtn.style.display = 'none';
      vetoOverrideBtn.setAttribute('disabled', 'true');
      vetoOverrideBtn.classList.add('disabled');
    }
    
    const filterCStatus = document.getElementById('filter-c-status');
    if (filterCStatus) {
      filterCStatus.innerText = 'BYPASSED';
      filterCStatus.style.color = '#ff0055';
    }
    
    const alertOverrideStatus = document.getElementById('alert-override-status');
    if (alertOverrideStatus) alertOverrideStatus.innerText = '[BYPASSED - TIME EXPIRED]';
    
    executeCrackTripSequence();
  }

  function triggerSoftImpactWarning() {
    isSoftWarningActive = true;
    isCountdownActive = false;
    
    crackSignalStrength = 0.4;
    vibrationSignalStrength = 0.2;
    
    logToTerminal('WARN', 'Prognostics: Soft blade impact / acoustic micro-crack identified.');
    logToTerminal('WARN', 'Estimated Remaining Useful Life: 35 Minutes.');
    logToTerminal('SYSTEM', 'Diverting trans-oceanic flight to nearest Mumbai (BOM) Hub.');
    
    if (pdmRul) {
      pdmRul.innerText = '35 Minutes';
      pdmRul.className = 'pdm-val text-amber';
    }
    if (pdmWear) {
      pdmWear.innerText = '42%';
      pdmWear.className = 'pdm-val text-amber';
    }
    if (pdmSched) {
      pdmSched.innerText = 'PRECAUTIONARY DIVERSION';
      pdmSched.className = 'pdm-val text-amber';
    }
    if (pdmHealthText) {
      pdmHealthText.innerText = '82%';
      pdmHealthText.style.color = '#ffaa00';
    }
    if (pdmHealthRing) {
      pdmHealthRing.setAttribute('stroke-dasharray', '82, 100');
      pdmHealthRing.setAttribute('stroke', '#ffaa00');
    }
    
    const diversionPath = document.getElementById('map-diversion-path');
    const diversionHub = document.getElementById('diversion-hub-marker');
    if (diversionPath) diversionPath.style.display = 'block';
    if (diversionHub) diversionHub.style.display = 'block';
    
    const warningBanner = document.getElementById('prognostics-warning-banner');
    if (warningBanner) {
      warningBanner.style.display = 'block';
      warningBanner.innerHTML = `⚠️ <strong>PRECAUTIONARY ALERT:</strong> Micro-crack detected. ETOPS margins degraded. Precautionary diversion to Mumbai (BOM) Hub route engaged. (RUL: 35 Mins).`;
    }
  }

  // Acknowledge alert button listener
  btnAckAlert.addEventListener('click', () => {
    if (nasaAlert) {
      nasaAlert.classList.remove('show');
    }
    logSimulatedFirestoreWrite('AIRINDIA_ALERT_ACK', {
      user: 'CAPT. S. VAISHNAV',
      action: 'ALERT_ACKNOWLEDGED',
      gcs_sync: true,
      flight: activeProfile === 'domestic' ? 'AI-401' : 'AI-101'
    });
  });

  if (resetSystemBtn) {
    resetSystemBtn.addEventListener('click', () => {
      resetSafetyComputer();
    });
  }

  // Trip Sequence Execution
  function executeCrackTripSequence() {
    isTripped = true;
    crackSignalStrength = 1.0;
    vibrationSignalStrength = 1.0;
    
    // Write simulated firestore query
    const tripLogId = activeProfile === 'domestic' ? 'AIRINDIA_AI401_TRIP' : 'AIRINDIA_AI101_TRIP';
    logSimulatedFirestoreWrite(tripLogId, {
      status: 'TRIPPED',
      latencies: { adc: 1.2, fft: 3.1, cnn: 11.4, gpio: 1.5, total: 17.2 },
      bearing_wear: '84%',
      rul_hours: 0,
      timestamp: new Date().toISOString()
    });
    
    if (injectSevereBtn) {
      injectSevereBtn.classList.add('disabled');
      injectSevereBtn.setAttribute('disabled', 'true');
    }
    if (injectSoftBtn) {
      injectSoftBtn.classList.add('disabled');
      injectSoftBtn.setAttribute('disabled', 'true');
    }

    if (timelinePlaceholder) timelinePlaceholder.style.display = 'none';
    if (tripTimeline) tripTimeline.innerHTML = '';
    
    const t_adc = 1.2;
    const t_fft = 3.1;
    const t_cnn = 11.4;
    const t_gpio = 1.5;
    
    const steps = [
      { 
        id: '1', 
        ms: t_adc, 
        desc: 'Piezoelectric casing sensor triggers ADC interrupt. Acoustic burst captured.', 
        class: 'healthy-step',
        action: () => {
          const crackLine = document.getElementById('blade-crack-line');
          if (crackLine) crackLine.style.opacity = '1';
          document.body.classList.add('tripping');
          logToTerminal('CRITICAL', 'Acoustic casing sensor signal threshold exceeded (>1.8V peak).');
        }
      },
      { 
        id: '2', 
        ms: t_adc + t_fft, 
        desc: 'ESP32 completes 64-bin FFT vector. Spectrogram column queued.', 
        class: 'healthy-step',
        action: () => {
          if (heatmapGridElement) heatmapGridElement.classList.add('attention-focused');
          logToTerminal('TFLITE', 'CNN classification process running on spectrogram input block...');
        }
      },
      { 
        id: '3', 
        ms: t_adc + t_fft + t_cnn, 
        desc: 'Pi 4 TFLite INT8 CNN completes forward pass. Confidence: 99.4% BLADE_CRACK.', 
        class: 'trip-step',
        action: () => {
          inferenceResult.innerText = 'BLADE_CRACK';
          inferenceResult.className = 'inference-status status-critical';
          confidencePercentage.innerText = '99.4%';
          confidenceBar.className = 'bar-inner cracked';
          confidenceBar.style.width = '99.4%';
          confidenceColumns.forEach(c => c.classList.add('cracked'));
          if (attentionTagText) {
            attentionTagText.innerText = '99.4% BLADE CRACK DETECTED (FREQUENCY BINS 38-44)';
            attentionTagText.className = 'attention-tag-text cracked';
          }
          if (featBar1) {
            featBar1.style.width = '92%';
            featBar1.className = 'feat-bar-inner high';
            featVal1.innerText = '0.92';
          }
          if (featBar2) {
            featBar2.style.width = '35%';
            featVal2.innerText = '0.35';
          }
          if (featBar3) {
            featBar3.style.width = '85%';
            featBar3.className = 'feat-bar-inner high';
            featVal3.innerText = '0.85';
          }
        }
      },
      { 
        id: '4', 
        ms: t_adc + t_fft + t_cnn + t_gpio, 
        desc: 'GPIO Pin 18 fires. Solenoid relay tripped. Variable Guide Vanes swiveled to stall pitch.', 
        class: 'trip-step',
        action: () => {
          if (engineCrossSection) engineCrossSection.classList.add('tripped');
          if (spinningShaftLine) spinningShaftLine.className = 'stopped';
          if (airflowChevronsGroup) airflowChevronsGroup.classList.add('stalled');
          if (rotorCrossBlades) {
            rotorCrossBlades.className = 'stopped';
            rotorCrossBlades.classList.add('tripped-blades');
          }
          if (bearingFront) bearingFront.classList.add('bearing-hot');
          if (bearingRear) bearingRear.classList.add('bearing-hot');
          bearingBalls.forEach(b => { if (b) b.classList.add('bearing-ball-hot'); });
          if (fuelPipeLine) fuelPipeLine.classList.add('stalled');
          if (fuelFlowParticle) fuelFlowParticle.classList.add('stalled');
          if (combustionFlames) combustionFlames.classList.add('tripped-engine');
          
          if (rotorStatusBadgeText) {
            rotorStatusBadgeText.innerText = 'EMERGENCY SHUTDOWN';
            rotorStatusBadgeText.className = 'status-critical';
          }

          if (pdmRul) { pdmRul.innerText = '0 Hours'; pdmRul.className = 'pdm-val text-red'; }
          if (pdmWear) { pdmWear.innerText = '84%'; pdmWear.className = 'pdm-val text-red'; }
          if (pdmSched) { pdmSched.innerText = 'IMMEDIATE SHUTDOWN'; pdmSched.className = 'pdm-val text-red'; }
          if (pdmHealthRing) { pdmHealthRing.setAttribute('stroke-dasharray', '0, 100'); pdmHealthRing.setAttribute('stroke', '#ff0055'); }
          if (pdmHealthText) { pdmHealthText.innerText = '0%'; pdmHealthText.style.color = '#ff0055'; }

          document.getElementById('fuel-valve-box').classList.add('tripped');
          valveLight.className = 'device-status-indicator red';
          valveState.innerText = 'SHUT (FUEL FLOW HALTED)';
          valveState.className = 'device-state state-closed';
          document.getElementById('valve-graphic').classList.add('tripped');
          
          document.getElementById('vgv-box').classList.add('tripped');
          vgvLight.className = 'device-status-indicator red';
          vgvState.innerText = 'STALL PITCH (78.2°)';
          vgvState.className = 'device-state state-stalled';
          
          document.querySelectorAll('.vane').forEach((vane, i) => {
            const angle = (i * 45) + 30;
            vane.style.transform = `rotate(${angle}deg)`;
          });

          if (sysStatusDot) sysStatusDot.className = 'pulse-dot red';
          if (systemStateLabel) {
            systemStateLabel.innerText = 'TRIPPED';
            systemStateLabel.className = 'metric-value status-critical';
          }
          if (portalStatusLabel) {
            portalStatusLabel.innerText = 'TRIPPED (EMERGENCY CONTAINMENT ACTIVE)';
            portalStatusLabel.className = 'status-critical';
          }

          logToTerminal('ACTUATION', 'Fuel shutoff valve isolated in 1.5ms.');
          logToTerminal('ACTUATION', 'Variable Guide Vanes (VGV) pitch servos set to stall pitch (78.2°).');
          logToTerminal('SYSTEM', 'CLOSED-LOOP CONTAINMENT PREVENTION COMPLETED (17.2ms).');
          
          // Simulated ARINC 429 Sync Log Sequence (Faculty QA Defense)
          setTimeout(() => {
            logToTerminal('ARINC', 'BUS SYNC: Packaging telemetry metrics into ARINC 429 data words...');
            logToTerminal('ARINC', 'BUS SYNC: Serialized Label 340 (Engine Safety Status) -> 0x8C02 (CRITICAL_TRIP)');
            logToTerminal('ARINC', 'BUS SYNC: Serialized Label 345 (Rotor Wear Index) -> 0xFF00 (100% FAULT)');
            logToTerminal('ARINC', 'BUS SYNC: Sending payload frame up to Flight Control Computer AFDX bus...');
          }, 800);
          
          setTimeout(() => {
            logToTerminal('DISPLAY', 'DISPLAY SYNC: Cockpit Avionics System reports telemetry sync status COMPLETE.');
            logToTerminal('DISPLAY', 'DISPLAY SYNC: Cockpit flight displays updated successfully (ARINC lag: 3.14s).');
          }, 3140);
          
          completeActuationVisuals();
        }
      }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        if (step.action) step.action();

        const node = document.createElement('div');
        node.className = `timeline-step ${step.class}`;
        node.innerHTML = `
          <div class="step-bubble">${step.id}</div>
          <div class="step-details">
            <span class="step-time">${step.ms.toFixed(1)} ms</span>
            <span class="step-desc">${step.desc}</span>
          </div>
        `;
        
        if (idx < steps.length - 1) {
          const connector = document.createElement('div');
          connector.className = 'step-connector';
          if (tripTimeline) {
            tripTimeline.appendChild(node);
            tripTimeline.appendChild(connector);
          }
        } else {
          if (tripTimeline) tripTimeline.appendChild(node);
        }
        
        if (tripTimeline) tripTimeline.scrollLeft = tripTimeline.scrollWidth;
      }, step.ms * 120);
    });
  }

  function completeActuationVisuals() {
    // Show Fullscreen NASA Style Alert Overlay
    if (nasaAlert) {
      nasaAlert.classList.add('show');
    }
  }

  function resetSafetyComputer() {
    isTripped = false;
    crackSignalStrength = 0;
    vibrationSignalStrength = 0;
    isGuardOpen = false;
    fdrMode = 'LIVE';
    
    const banner = document.getElementById('trip-banner');
    if (banner) banner.remove();
    
    if (nasaAlert) nasaAlert.classList.remove('show');
    document.body.classList.remove('tripping');
    
    const crackLine = document.getElementById('blade-crack-line');
    if (crackLine) crackLine.style.opacity = '0';
    
    // 1. Reset SVG digital twin animations
    if (engineCrossSection) engineCrossSection.classList.remove('tripped');
    if (spinningShaftLine) spinningShaftLine.className = 'spinning';
    if (airflowChevronsGroup) airflowChevronsGroup.classList.remove('stalled');
    if (rotorCrossBlades) {
      rotorCrossBlades.className = 'spinning';
      rotorCrossBlades.classList.remove('tripped-blades');
    }
    if (bearingFront) bearingFront.classList.remove('bearing-hot');
    if (bearingRear) bearingRear.classList.remove('bearing-hot');
    bearingBalls.forEach(b => { if (b) b.classList.remove('bearing-ball-hot'); });
    if (fuelPipeLine) fuelPipeLine.classList.remove('stalled');
    if (fuelFlowParticle) fuelFlowParticle.classList.remove('stalled');
    if (combustionFlames) combustionFlames.classList.remove('tripped-engine');
    
    if (rotorStatusBadgeText) {
      rotorStatusBadgeText.innerText = 'SPINNING NOMINAL // 14,250 RPM';
      rotorStatusBadgeText.className = 'status-healthy';
    }

    // 2. Reset Predictive PdM Metrics
    if (pdmRul) {
      pdmRul.innerText = '127 Hours';
      pdmRul.className = 'pdm-val text-green';
    }
    if (pdmWear) {
      pdmWear.innerText = '12%';
      pdmWear.className = 'pdm-val text-green';
    }
    if (pdmSched) {
      pdmSched.innerText = 'within 8 flights';
      pdmSched.className = 'pdm-val text-green';
    }
    if (pdmHealthRing) {
      pdmHealthRing.setAttribute('stroke-dasharray', '98, 100');
      pdmHealthRing.setAttribute('stroke', '#00ff66');
    }
    if (pdmHealthText) {
      pdmHealthText.innerText = '98%';
      pdmHealthText.style.color = '#ffffff';
    }

    // 3. Reset Explainability (XAI) elements
    if (heatmapGridElement) heatmapGridElement.classList.remove('attention-focused');
    if (attentionTagText) {
      attentionTagText.innerText = 'Nominal Ambient Background Noise';
      attentionTagText.className = 'attention-tag-text';
    }
    confidenceColumns.forEach(c => {
      c.classList.remove('cracked');
    });
    
    if (featBar1) {
      featBar1.style.width = '25%';
      featBar1.className = 'feat-bar-inner';
      featVal1.innerText = '0.25';
    }
    if (featBar2) {
      featBar2.style.width = '15%';
      featVal2.innerText = '0.15';
    }
    if (featBar3) {
      featBar3.style.width = '45%';
      featBar3.className = 'feat-bar-inner';
      featVal3.innerText = '0.45';
    }
    
    if (sysStatusDot) sysStatusDot.className = 'pulse-dot green';
    if (systemStateLabel) {
      systemStateLabel.innerText = 'NOMINAL';
      systemStateLabel.className = 'metric-value status-healthy';
    }
    if (portalStatusLabel) {
      portalStatusLabel.innerText = 'NOMINAL / SECURED';
      portalStatusLabel.className = 'status-healthy';
    }
    
    switchGuard.classList.remove('flipped');
    switchGuard.innerText = 'GUARD CLOSED';
    
    if (injectSevereBtn) {
      injectSevereBtn.classList.add('disabled');
      injectSevereBtn.setAttribute('disabled', 'true');
      injectSevereBtn.style.display = 'block';
    }
    if (injectSoftBtn) {
      injectSoftBtn.classList.add('disabled');
      injectSoftBtn.setAttribute('disabled', 'true');
      injectSoftBtn.style.display = 'block';
    }
    if (vetoOverrideBtn) {
      vetoOverrideBtn.style.display = 'none';
      vetoOverrideBtn.setAttribute('disabled', 'true');
      vetoOverrideBtn.classList.add('disabled');
    }
    
    // Clear countdown & warnings
    if (countdownTimer) {
      clearInterval(countdownTimer);
      countdownTimer = null;
    }
    isCountdownActive = false;
    isSoftWarningActive = false;
    
    const warningBanner = document.getElementById('prognostics-warning-banner');
    if (warningBanner) warningBanner.style.display = 'none';
    
    const diversionPath = document.getElementById('map-diversion-path');
    const diversionHub = document.getElementById('diversion-hub-marker');
    if (diversionPath) diversionPath.style.display = 'none';
    if (diversionHub) diversionHub.style.display = 'none';
    
    const filterCBox = document.getElementById('filter-c-box');
    const filterCStatus = document.getElementById('filter-c-status');
    const filterCDesc = document.getElementById('filter-c-desc');
    if (filterCBox) filterCBox.style.background = 'rgba(255, 170, 0, 0.02)';
    if (filterCStatus) {
      filterCStatus.innerText = 'ARMED';
      filterCStatus.style.color = 'var(--warning-amber)';
    }
    if (filterCDesc) {
      filterCDesc.innerText = 'Interactive countdown permits manual pilot bypass before isolation.';
    }
    
    inferenceResult.innerText = 'HEALTHY';
    inferenceResult.className = 'inference-status status-healthy';
    confidencePercentage.innerText = '99.8%';
    confidenceBar.className = 'bar-inner healthy';
    confidenceBar.style.width = '99.8%';
    
    const latSample = document.getElementById('lat-sample');
    const latFft = document.getElementById('lat-fft');
    const latCnn = document.getElementById('lat-cnn');
    const latGpio = document.getElementById('lat-gpio');
    const totalLat = document.getElementById('total-latency-val');
    if (latSample) latSample.innerText = '1.2 ms';
    if (latFft) latFft.innerText = '3.1 ms';
    if (latCnn) latCnn.innerText = '11.4 ms';
    if (latGpio) latGpio.innerText = '1.5 ms';
    if (totalLat) totalLat.innerText = '17.2 ms';

    document.getElementById('fuel-valve-box').classList.remove('tripped');
    valveLight.className = 'device-status-indicator green';
    valveState.innerText = 'OPEN (FUEL FLOW ACTIVE)';
    valveState.className = 'device-state state-open';
    document.getElementById('valve-graphic').classList.remove('tripped');
    
    document.getElementById('vgv-box').classList.remove('tripped');
    vgvLight.className = 'device-status-indicator green';
    vgvState.innerText = 'NORMAL PITCH (15.5°)';
    vgvState.className = 'device-state state-normal';
    
    document.querySelectorAll('.vane').forEach(vane => {
      vane.style.transform = `rotate(0deg)`;
    });

    if (timelinePlaceholder) timelinePlaceholder.style.display = 'block';
    if (tripTimeline) tripTimeline.innerHTML = '';
    
    if (fdrStatusBadge) {
      fdrStatusBadge.innerText = 'FDR SOURCE: LIVE TELEMETRY';
      fdrStatusBadge.className = 'fdr-state-label text-green';
    }

    const resetLogId = activeProfile === 'domestic' ? 'AIRINDIA_AI401_RESET' : 'AIRINDIA_AI101_RESET';
    logSimulatedFirestoreWrite(resetLogId, {
      status: 'NOMINAL',
      bearing_wear: '12%',
      rul_hours: 127,
      timestamp: new Date().toISOString()
    });

    logToTerminal('SYSTEM', 'System reset command executed. Safety loop armed and operational.');
  }

  // Scrubber / FDR Playback Engine Math (Milestone frames)
  function setSimulationStateToMs(ms) {
    if (fdrTimeLabel) fdrTimeLabel.innerText = `${ms.toFixed(1)} ms`;
    
    if (ms < 1.2) {
      // PRE-CRACK STATE
      rpm = 14250;
      temp = 740;
      crackSignalStrength = 0;
      vibrationSignalStrength = 0;
      
      // Digital twin
      if (engineCrossSection) engineCrossSection.classList.remove('tripped');
      if (spinningShaftLine) spinningShaftLine.className = 'spinning';
      if (airflowChevronsGroup) airflowChevronsGroup.classList.remove('stalled');
      if (rotorCrossBlades) {
        rotorCrossBlades.className = 'spinning';
        rotorCrossBlades.classList.remove('tripped-blades');
      }
      if (bearingFront) bearingFront.classList.remove('bearing-hot');
      if (bearingRear) bearingRear.classList.remove('bearing-hot');
      bearingBalls.forEach(b => { if (b) b.classList.remove('bearing-ball-hot'); });
      if (fuelPipeLine) fuelPipeLine.classList.remove('stalled');
      if (fuelFlowParticle) fuelFlowParticle.classList.remove('stalled');
      if (combustionFlames) combustionFlames.classList.remove('tripped-engine');
      
      // VGV & Valve
      valveLight.className = 'device-status-indicator green';
      valveState.innerText = 'OPEN (FUEL FLOW ACTIVE)';
      valveState.className = 'device-state state-open';
      document.getElementById('fuel-valve-box').classList.remove('tripped');
      document.getElementById('valve-graphic').classList.remove('tripped');
      
      vgvLight.className = 'device-status-indicator green';
      vgvState.innerText = 'NORMAL PITCH (15.5°)';
      vgvState.className = 'device-state state-normal';
      document.getElementById('vgv-box').classList.remove('tripped');
      document.querySelectorAll('.vane').forEach(vane => vane.style.transform = 'rotate(0deg)');
      
      // PdM
      if (pdmRul) pdmRul.innerText = '127 Hours';
      if (pdmWear) pdmWear.innerText = '12%';
      if (pdmSched) pdmSched.innerText = 'within 8 flights';
      if (pdmHealthText) pdmHealthText.innerText = '98%';
      if (pdmHealthRing) pdmHealthRing.setAttribute('stroke-dasharray', '98, 100');
      
      // XAI
      if (heatmapGridElement) heatmapGridElement.classList.remove('attention-focused');
      confidenceColumns.forEach(c => c.classList.remove('cracked'));
      
    } else if (ms >= 1.2 && ms < 4.3) {
      // SENSOR FRACTURE DETECTED (Acoustic burst captured)
      crackSignalStrength = 1.0;
      vibrationSignalStrength = 0.5;
      
    } else if (ms >= 4.3 && ms < 15.7) {
      // SPECTROGRAM FFT COMPRESSION (Inference running)
      if (heatmapGridElement) heatmapGridElement.classList.add('attention-focused');
      
    } else if (ms >= 15.7 && ms < 17.2) {
      // TFLite CNN COMPLETED (Classification flips)
      inferenceResult.innerText = 'BLADE_CRACK';
      inferenceResult.className = 'inference-status status-critical';
      confidencePercentage.innerText = '99.4%';
      confidenceBar.className = 'bar-inner cracked';
      confidenceBar.style.width = '99.4%';
      confidenceColumns.forEach(c => c.classList.add('cracked'));
      
    } else if (ms >= 17.2) {
      // ACTUATORS ENGAGED (Valve isolated, Guide Vanes Stall, bearings overheat)
      rpm = 1200; // decelerated state during playback
      temp = 680;
      
      if (engineCrossSection) engineCrossSection.classList.add('tripped');
      if (spinningShaftLine) spinningShaftLine.className = 'stopped';
      if (airflowChevronsGroup) airflowChevronsGroup.classList.add('stalled');
      if (rotorCrossBlades) {
        rotorCrossBlades.className = 'stopped';
        rotorCrossBlades.classList.add('tripped-blades');
      }
      if (bearingFront) bearingFront.classList.add('bearing-hot');
      if (bearingRear) bearingRear.classList.add('bearing-hot');
      bearingBalls.forEach(b => { if (b) b.classList.add('bearing-ball-hot'); });
      if (fuelPipeLine) fuelPipeLine.classList.add('stalled');
      if (fuelFlowParticle) fuelFlowParticle.classList.add('stalled');
      if (combustionFlames) combustionFlames.classList.add('tripped-engine');
      
      // Valve close
      valveLight.className = 'device-status-indicator red';
      valveState.innerText = 'SHUT (FUEL FLOW HALTED)';
      valveState.className = 'device-state state-closed';
      document.getElementById('fuel-valve-box').classList.add('tripped');
      document.getElementById('valve-graphic').classList.add('tripped');
      
      // VGV Stall
      vgvLight.className = 'device-status-indicator red';
      vgvState.innerText = 'STALL PITCH (78.2°)';
      vgvState.className = 'device-state state-stalled';
      document.getElementById('vgv-box').classList.add('tripped');
      document.querySelectorAll('.vane').forEach((vane, i) => {
        const angle = (i * 45) + 30;
        vane.style.transform = `rotate(${angle}deg)`;
      });
      
      // PdM
      if (pdmRul) pdmRul.innerText = '0 Hours';
      if (pdmWear) pdmWear.innerText = '84%';
      if (pdmSched) pdmSched.innerText = 'IMMEDIATE SHUTDOWN';
      if (pdmHealthText) pdmHealthText.innerText = '0%';
      if (pdmHealthRing) pdmHealthRing.setAttribute('stroke-dasharray', '0, 100');
    }
    
    // Draw canvases at the scrub values
    drawOscilloscope();
    drawVibration();
    drawSpectrogramWaterfall();
  }

  // Scrubber user interaction listener
  if (fdrSlider) {
    fdrSlider.addEventListener('input', () => {
      fdrMode = 'REPLAY';
      if (fdrStatusBadge) {
        fdrStatusBadge.innerText = 'FDR SOURCE: SCRUBBING REPLAY BUFFER';
        fdrStatusBadge.className = 'fdr-state-label text-amber';
      }
      clearInterval(fdrInterval);
      const val = parseFloat(fdrSlider.value);
      setSimulationStateToMs(val);
    });
  }

  // FDR Play/Pause Buttons click listener
  if (btnFdrPlay) {
    btnFdrPlay.addEventListener('click', () => {
      fdrMode = 'REPLAY';
      if (fdrStatusBadge) {
        fdrStatusBadge.innerText = 'FDR SOURCE: PLAYING BACK DATA';
        fdrStatusBadge.className = 'fdr-state-label text-cyan';
      }
      clearInterval(fdrInterval);
      
      fdrInterval = setInterval(() => {
        let val = parseFloat(fdrSlider.value);
        val += 0.5;
        if (val > 20) {
          val = 20;
          clearInterval(fdrInterval);
          fdrStatusBadge.innerText = 'FDR SOURCE: REPLAY PLAYBACK ENDED';
        }
        fdrSlider.value = val;
        setSimulationStateToMs(val);
      }, 100);
    });
  }

  if (btnFdrPause) {
    btnFdrPause.addEventListener('click', () => {
      clearInterval(fdrInterval);
      if (fdrStatusBadge) {
        fdrStatusBadge.innerText = 'FDR SOURCE: PLAYBACK PAUSED';
      }
    });
  }

  if (btnFdrReplay) {
    btnFdrReplay.addEventListener('click', () => {
      fdrMode = 'REPLAY';
      fdrSlider.value = 0;
      setSimulationStateToMs(0);
      
      if (fdrStatusBadge) {
        fdrStatusBadge.innerText = 'FDR SOURCE: SLOW-MOTION TRIP REPLAY';
        fdrStatusBadge.className = 'fdr-state-label text-cyan';
      }
      clearInterval(fdrInterval);
      
      fdrInterval = setInterval(() => {
        let val = parseFloat(fdrSlider.value);
        val += 0.5;
        if (val > 20) {
          val = 20;
          clearInterval(fdrInterval);
          fdrStatusBadge.innerText = 'FDR SOURCE: TRIP REPLAY COMPLETED';
        }
        fdrSlider.value = val;
        setSimulationStateToMs(val);
      }, 100); // 4 seconds total duration replay
    });
  }

  // Voice Command Parsing using web speech API
  function initializeVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (voiceStatusBadge) {
        voiceStatusBadge.innerText = 'VOICE MIC: UNSUPPORTED';
        voiceStatusBadge.className = 'voice-badge';
        voiceStatusBadge.style.animation = 'none';
      }
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      logToTerminal('VOICE', `Voice trigger recognized: "${command}"`);
      parseVoiceCommand(command);
    };

    recognition.onerror = (e) => {
      console.warn("Speech recognition error:", e.error);
    };

    recognition.onend = () => {
      // Loop restart
      try { recognition.start(); } catch (err) {}
    };

    try {
      recognition.start();
    } catch (e) {
      console.warn("Voice failed to start:", e);
    }
  }

  function parseVoiceCommand(cmd) {
    if (cmd.includes('inject') || cmd.includes('crack') || cmd.includes('fracture')) {
      if (!isGuardOpen) {
        // Open guard first
        isGuardOpen = true;
        switchGuard.classList.add('flipped');
        switchGuard.innerText = 'GUARD Flipped';
        injectBtn.classList.remove('disabled');
        injectBtn.removeAttribute('disabled');
        logToTerminal('VOICE', 'Flipping switch cover cover via voice override.');
      }
      setTimeout(() => {
        executeCrackTripSequence();
      }, 500);
    } else if (cmd.includes('reset') || cmd.includes('restart system') || cmd.includes('re-arm')) {
      resetSafetyComputer();
    } else if (cmd.includes('diagnostics') || cmd.includes('test') || cmd.includes('self test')) {
      runDiagnosticsSelfTest();
      switchPage('page-shell');
    } else if (cmd.includes('status')) {
      printStatus();
      switchPage('page-shell');
    }
  }

  // Start Voice recognition
  initializeVoiceRecognition();

  // GCP Firebase simulated write helpers
  function logSimulatedFirestoreWrite(docName, data) {
    if (firestoreLiveLog) {
      firestoreLiveLog.innerText = `[FIRESTORE] db.collection('simulation_logs').doc('${docName}').set(${JSON.stringify(data)})`;
    }
  }

  // CLI Command Shell Command Parser
  function logToTerminal(subsystem, text) {
    const time = new Date().toLocaleTimeString();
    const line = document.createElement('div');
    
    let colorClass = 'text-primary';
    if (subsystem === 'CRITICAL' || subsystem === 'ACTUATION') colorClass = 'status-critical';
    if (subsystem === 'WARN') colorClass = 'status-warning';
    if (subsystem === 'TFLITE') colorClass = 'terminal-line';
    if (subsystem === 'SYSTEM') colorClass = 'status-healthy';
    
    line.innerHTML = `[${time}] <span class="${colorClass}">[${subsystem}]</span> ${text}`;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const val = terminalInput.value.trim().toLowerCase();
      if (val === '') return;
      
      const match = availableCommands.find(cmd => cmd.startsWith(val));
      if (match) {
        terminalInput.value = match;
      }
    }
    
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        if (historyIndex === -1) {
          historyIndex = commandHistory.length - 1;
        } else if (historyIndex > 0) {
          historyIndex--;
        }
        terminalInput.value = commandHistory[historyIndex];
      }
    }
    
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex];
        } else {
          historyIndex = -1;
          terminalInput.value = '';
        }
      }
    }
  });

  terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const command = terminalInput.value.trim();
      terminalInput.value = '';
      if (command === '') return;
      
      commandHistory.push(command);
      historyIndex = -1;
      
      const echo = document.createElement('div');
      echo.className = 'terminal-line';
      echo.innerHTML = `<span class="prompt">$</span> <span>${command}</span>`;
      terminalOutput.appendChild(echo);
      
      parseCommand(command.toLowerCase());
    }
  });

  cmdShortcuts.forEach(btn => {
    btn.addEventListener('click', () => {
      const command = btn.getAttribute('data-cmd');
      const echo = document.createElement('div');
      echo.className = 'terminal-line';
      echo.innerHTML = `<span class="prompt">$</span> <span>${command}</span>`;
      terminalOutput.appendChild(echo);
      
      commandHistory.push(command);
      historyIndex = -1;
      
      parseCommand(command);
      switchPage('page-shell');
    });
  });

  function parseCommand(cmd) {
    if (cmd === '') return;
    
    switch (cmd) {
      case 'help':
        printHelp();
        break;
      case 'status':
        printStatus();
        break;
      case 'diagnostics':
        runDiagnosticsSelfTest();
        break;
      case 'sensor status':
        printSensorStatus();
        break;
      case 'cnn':
        printCNNParams();
        break;
      case 'temperature':
        logToTerminal('SHELL', `Core Temperature: ${Math.round(temp)} °C (Exhaust Gas Limit: 920 °C)`);
        break;
      case 'rpm':
        logToTerminal('SHELL', `Rotor Speed: ${Math.round(rpm).toLocaleString()} RPM`);
        break;
      case 'logs':
        logToTerminal('SHELL', `--- FDR Blackbox Log History ---`);
        logToTerminal('SHELL', `Event 01: Systems Armed (NOMINAL state)`);
        if (isTripped) {
          logToTerminal('SHELL', `Event 02: CRITICAL - Acoustic casing threshold exceeded.`);
          logToTerminal('SHELL', `Event 03: CNN classified BLADE_CRACK at 99.4% probability.`);
          logToTerminal('SHELL', `Event 04: CLOSED-LOOP INTERCEPT COMPLETE (17.2ms).`);
        }
        break;
      case 'export':
        exportFlightTelemetryLog();
        break;
      case 'latency':
        logToTerminal('SHELL', `Latency Profile: Sampling (1.2ms) + FFT (3.1ms) + CNN (11.4ms) + GPIO (1.5ms) = 17.2ms Total.`);
        break;
      case 'restart':
        logToTerminal('SYSTEM', 'Rebooting core systems...');
        setTimeout(() => {
          resetSafetyComputer();
          logToTerminal('SYSTEM', 'Edge AI AeroVibe Flight Safety Computer successfully restarted.');
        }, 1200);
        break;
      case 'clear':
        terminalOutput.innerHTML = '';
        break;
      case 'arinc':
        logToTerminal('SHELL', '--- ARINC 429 Payload Emulation ---');
        logToTerminal('SHELL', `Label 340 (Engine Safety Status): 0x${isTripped ? '8C02 (CRITICAL_TRIP)' : '0F00 (NOMINAL)'}`);
        logToTerminal('SHELL', `Label 345 (Rotor Wear Index):   0x${isTripped ? 'FF00 (100% FAULT)' : '1E00 (12% WEAR)'}`);
        logToTerminal('SHELL', `Label 350 (Engine Shaft RPM):    0x${Math.round(rpm).toString(16).toUpperCase()}`);
        logToTerminal('SHELL', `Label 355 (Exhaust Temperature): 0x${Math.round(temp).toString(16).toUpperCase()}`);
        logToTerminal('SHELL', 'Packaging complete. Syncing payload to FMC (AFDX network) at 100kbps...');
        break;
      case 'calibration':
        logToTerminal('SYSTEM', 'Initiating automatic baseline casing acoustic calibration...');
        logToTerminal('SYSTEM', 'Step 1/3: Reading background noise mask at current shaft speed...');
        setTimeout(() => {
          logToTerminal('SYSTEM', 'Step 2/3: Generating spectral correction coefficient array...');
        }, 800);
        setTimeout(() => {
          logToTerminal('SYSTEM', 'Step 3/3: Uploading normal baseline masks (42.4 kHz center band) to co-processor registers.');
          logToTerminal('SYSTEM', 'Baseline Calibration Complete. New ambient acoustic signature registered.');
        }, 1600);
        break;
      default:
        logToTerminal('SHELL', `Command not recognized: '${cmd}'. Type 'help' for options.`);
    }
  }

  function printHelp() {
    logToTerminal('SHELL', 'Available commands:');
    logToTerminal('SHELL', '  status       - Show current active engine telemetry.');
    logToTerminal('SHELL', '  diagnostics  - Run diagnostic test routine of edge nodes.');
    logToTerminal('SHELL', '  sensor status- Print raw voltages/G-force vibration states.');
    logToTerminal('SHELL', '  cnn          - Print INT8 quantization layer profiles.');
    logToTerminal('SHELL', '  temperature  - Output current Exhaust Gas Temperature.');
    logToTerminal('SHELL', '  rpm          - Output current compressor RPM.');
    logToTerminal('SHELL', '  logs         - Display recent blackbox system registers.');
    logToTerminal('SHELL', '  export       - Download FDR flight logs (JSON).');
    logToTerminal('SHELL', '  latency      - Detailed microsecond action loop timings.');
    logToTerminal('SHELL', '  restart      - Reset safety variables and reboot system.');
    logToTerminal('SHELL', '  clear        - Clear console buffer.');
    logToTerminal('SHELL', '  arinc        - Package and print ARINC 429 serialization frames.');
    logToTerminal('SHELL', '  calibration  - Run automatic casing acoustic baseline calibration.');
  }

  function printStatus() {
    logToTerminal('SHELL', `--- Edge AI AeroVibe System Status ---`);
    logToTerminal('SHELL', `Core State:       ${isTripped ? 'TRIPPED (EMERGENCY)' : 'NOMINAL'}`);
    logToTerminal('SHELL', `Rotor RPM:        ${Math.round(rpm)} RPM`);
    logToTerminal('SHELL', `Exhaust Temp:     ${Math.round(temp)} °C`);
    logToTerminal('SHELL', `Solenoid Valve:   ${isTripped ? 'CLOSED (ISOLATED)' : 'OPEN (ACTIVE)'}`);
    logToTerminal('SHELL', `Guide Vane pitch: ${isTripped ? 'STALL (78.2°)' : 'NOMINAL (15.5°)'}`);
  }

  function printSensorStatus() {
    logToTerminal('SHELL', `--- Sensor Registers ---`);
    logToTerminal('SHELL', `Casing Contact Piezo:  ${oscAmplitude.innerText} (Target Crack Limit: >1.80V)`);
    logToTerminal('SHELL', `Shaft Accelerometer:    ${vibAmplitude.innerText} (Standard Running Limit: 0.15G)`);
  }

  function printCNNParams() {
    logToTerminal('SHELL', `--- TFLite CNN INT8 Layers ---`);
    logToTerminal('SHELL', `Layer 1 (Input):  64x32x1 Spectrogram block`);
    logToTerminal('SHELL', `Layer 2 (Conv2D): 16 filters (3x3), Stride: 1`);
    logToTerminal('SHELL', `Layer 3 (MaxPool):Pool size: 2x2, Stride: 2`);
    logToTerminal('SHELL', `Layer 4 (Dense):  64 units, activation: ReLU`);
    logToTerminal('SHELL', `Layer 5 (Softmax):2 units (Outputs Crack Prob)`);
  }

  function runDiagnosticsSelfTest() {
    logToTerminal('SHELL', 'Initializing Edge Node diagnostics self-test...');
    setTimeout(() => {
      logToTerminal('SHELL', '[ OK ] ADC Casing Piezo sensor sync solid (20,000Hz).');
    }, 300);
    setTimeout(() => {
      logToTerminal('SHELL', '[ OK ] ADXL345 Shaft Accelerometer registers clean (I2C 0x53).');
    }, 600);
    setTimeout(() => {
      logToTerminal('SHELL', '[ OK ] ESP32 DSP Node FFT core online. 64 bins active.');
    }, 900);
    setTimeout(() => {
      logToTerminal('SHELL', `[ OK ] Pi 4 TFLite INT8 CNN loaded. Size: 4.2MB (Arena check OK).`);
      logToTerminal('SYSTEM', 'SELF-TEST DIAGNOSTICS COMPLETE. Systems armed.');
    }, 1200);
  }

  // Google Gemini API Configuration & Chatbot Integration
  let geminiKey = localStorage.getItem('gemini_api_key') || '';
  
  if (geminiKey) {
    geminiApiKeyInput.value = geminiKey;
    apiKeyStatusLabel.innerText = 'Connected: Google Gemini 1.5 Flash Model active';
    apiKeyStatusLabel.className = 'api-key-status online';
    botModelBadge.innerText = 'LIVE GEMINI AI';
    botModelBadge.className = 'bot-badge live';
  }

  btnSaveApiKey.addEventListener('click', () => {
    const enteredKey = geminiApiKeyInput.value.trim();
    if (enteredKey === '') {
      localStorage.removeItem('gemini_api_key');
      geminiKey = '';
      apiKeyStatusLabel.innerText = 'Offline Mock Model Active';
      apiKeyStatusLabel.className = 'api-key-status';
      botModelBadge.innerText = 'SECURE OFFLINE AI';
      botModelBadge.className = 'bot-badge';
      alert('Gemini API key removed. Falling back to local offline safety assistant.');
    } else {
      localStorage.setItem('gemini_api_key', enteredKey);
      geminiKey = enteredKey;
      apiKeyStatusLabel.innerText = 'Connected: Google Gemini 1.5 Flash Model active';
      apiKeyStatusLabel.className = 'api-key-status online';
      botModelBadge.innerText = 'LIVE GEMINI AI';
      botModelBadge.className = 'bot-badge live';
      alert('Google Gemini API Key successfully saved and connected!');
    }
  });

  // Chat message send handler
  chatSendBtn.addEventListener('click', () => { handleChatInput(); });
  chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChatInput(); });

  async function handleChatInput() {
    const text = chatInput.value.trim();
    if (text === '') return;
    
    chatInput.value = '';
    addChatMessage('user', text);
    
    if (geminiKey) {
      addChatTypingIndicator();
      
      try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are the Edge AI AeroVibe Jet Safety Specialist. A CSE student is pitching this system. 
                       Answer this question clearly, conversationally, and scientifically: "${text}".
                       Keep your answer short (under 4-5 sentences), easy to understand, and use bullet points where helpful.`
              }]
            }]
          })
        });
        
        const data = await response.json();
        removeChatTypingIndicator();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
          const aiReply = data.candidates[0].content.parts[0].text;
          const formattedReply = aiReply
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');
          addChatMessage('bot', formattedReply);
        } else {
          addChatMessage('bot', "Could not parse Gemini API response. Check your API key. Falling back to offline simulator specialist...");
          setTimeout(() => {
            const fallback = generateAIResponse(text.toLowerCase());
            addChatMessage('bot', fallback);
          }, 300);
        }
      } catch (err) {
        removeChatTypingIndicator();
        addChatMessage('bot', `API Error: ${err.message}. Falling back to offline assistant...`);
        setTimeout(() => {
          const fallback = generateAIResponse(text.toLowerCase());
          addChatMessage('bot', fallback);
        }, 300);
      }
    } else {
      setTimeout(() => {
        const response = generateAIResponse(text.toLowerCase());
        addChatMessage('bot', response);
      }, 400);
    }
  }

  function addChatTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'chat-message bot typing-indicator-msg';
    indicator.id = 'chat-typing-indicator';
    indicator.innerHTML = `<div class="message-content"><em>Gemini is analyzing safety logs and generating response...</em></div>`;
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Export Blackbox Telemetry (JSON Download)
  function exportFlightTelemetryLog() {
    const timestamp = new Date().toISOString();
    const flightData = {
      flight_recorder_id: "AEROM-FDR-9817B",
      recorded_at: timestamp,
      computer_profile: {
        air_gapped_status: "SECURED_OFFLINE",
        dsp_processor: "ESP32 Xtensa Dual-Core 240MHz",
        inference_core: "Raspberry Pi 4 ARM Cortex-A72",
        quantization: "INT8 8-Bit TFLite",
        active_pins: { solenoid_valve_relay: "GPIO 18", vane_pitch_servos: "GPIO 23" }
      },
      flight_metrics: {
        engine_nominal_rpm: 14250,
        nominal_egt_temp: 740,
        recorded_rotor_rpm: Math.round(rpm),
        recorded_egt_temp: Math.round(temp),
        piezo_acoustic_voltage: oscAmplitude.innerText,
        accelerometer_g_vibration: vibAmplitude ? vibAmplitude.innerText : "0.05 G"
      },
      trip_state_log: {
        is_system_tripped: isTripped,
        classification_result: isTripped ? "BLADE_CRACK" : "HEALTHY",
        confidence: isTripped ? "99.4%" : "99.8%",
        latency_breakdown_ms: { adc_sampling: 1.2, fft_dsp_compression: 3.1, tflite_cnn_inference: 11.4, gpio_relay_actuation: 1.5, total_closed_loop: 17.2 },
        actuations: { combustion_fuel_valve: isTripped ? "SHUT_DOWN" : "ACTIVE_FLOW", guide_vanes_angle: isTripped ? "78.2_DEGREE_STALL" : "15.5_DEGREE_NOMINAL" }
      }
    };
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(flightData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aerovibe-flight-telemetry-log-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    
    logToTerminal('SYSTEM', 'Blackbox telemetry log exported successfully as JSON.');
  }

  function removeChatTypingIndicator() {
    const indicator = document.getElementById('chat-typing-indicator');
    if (indicator) indicator.remove();
  }

  function addChatMessage(sender, text) {
    const msg = document.createElement('div');
    msg.className = `chat-message ${sender}`;
    msg.innerHTML = `<div class="message-content">${text}</div>`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function generateAIResponse(query) {
    if (query.includes('how does') || query.includes('work') || query.includes('concept') || query.includes('explain system')) {
      return `Here is a simple, **3-step breakdown** of how the AeroVibe safety computer protects the engine:
              <br><br>
              <ul>
                <li>🔊 <strong>1. Listen (Sensors)</strong>: A high-frequency contact sensor on the outer engine casing listens for microscopic metal sound waves (stress cracks).</li>
                <li>🧠 <strong>2. Think (TinyML AI)</strong>: An offline AI model running on a Raspberry Pi 4 inside the engine housing continuously scans these sound signatures for damage.</li>
                <li>⚡ <strong>3. Act (Mitigation)</strong>: The moment a crack is recognized, the Pi trips a physical relay that shuts the fuel valve and twists the guide vanes to brake the engine in **17.2 milliseconds**.</li>
              </ul>
              This entire process is automatic, keeping the turbine intact before a blade can tear off.`;
    }

    if (query.includes('offline') || query.includes('air-gapped') || query.includes('internet') || query.includes('cloud')) {
      return `We run this system **100% offline and air-gapped** for two crucial reasons:
              <br><br>
              <ol>
                <li>🌐 <strong>No Coverage</strong>: Planes fly over oceans and remote polar zones where there is zero internet connection.</li>
                <li>⏱️ <strong>Too Much Lag</strong>: Standard cloud processing via satellite takes **3 to 5 seconds**. A physical metal fracture breaks the engine in **milliseconds**. Connecting to the cloud is too slow to help.</li>
              </ol>
              Operating strictly on local edge-hardware is the only way to achieve the microsecond speeds required.`;
    }

    if (query.includes('sensor') || query.includes('acoustic') || query.includes('piezo') || query.includes('vibration') || query.includes('accelerometer') || query.includes('adxl')) {
      return `The computer uses a **dual-sensor network** to track structural health:
              <br><br>
              <ul>
                <li>🎙️ <strong>Piezo Casing Sensor</strong>: Monitors high-frequency stress sound waves ($20\\text{ kHz}$ to $100\\text{ kHz}$). An ESP32 compresses this data into FFT frequency vectors every 1.2ms.</li>
                <li>🎯 <strong>ADXL345 Accelerometer</strong>: Monitors low-frequency physical rotation imbalances ($0.1\\text{ G}$ to $2.0\\text{ G}$). If a crack begins, the shaft alignment shifts, causing vibration G-forces to spike from $0.05\\text{ G}$ up to $0.45\\text{ G}$.</li>
              </ul>`;
    }
    
    if (query.includes('cnn') || query.includes('tensorflow') || query.includes('tflite') || query.includes('model') || query.includes('quantized') || query.includes('ml')) {
      return `Our **TinyML classifier** is built with a lightweight Convolutional Neural Network (CNN) configured as follows:
              <br><br>
              <ul>
                <li>💼 <strong>Quantized Precision</strong>: The model is compressed using 8-bit weight quantization (INT8), shrinking its size from 16.8 MB down to just **4.2 MB**.</li>
                <li>⚡ <strong>Inference Latency</strong>: Quantization allows the model to perform a forward pass on the Pi 4 ARM chip in a rapid **11.4 milliseconds**.</li>
                <li>🖼️ <strong>Input spectogram</strong>: It analyzes frequency-over-time "sound images" (spectrograms) to classify engine states as <code>HEALTHY</code> or <code>BLADE_CRACK</code>.</li>
              </ul>`;
    }
    
    if (query.includes('latency') || query.includes('time') || query.includes('speed') || query.includes('ms')) {
      return `Here is the microsecond-accurate timeline of the **17.2 millisecond** action loop:
              <br><br>
              <ol>
                <li>⏱️ <strong>1.2 ms</strong>: Acoustic sensor captures the fracture sound.</li>
                <li>⏱️ <strong>3.1 ms</strong>: ESP32 DSP finishes compressing the raw audio wave using FFT.</li>
                <li>⏱️ <strong>11.4 ms</strong>: Pi 4 running TensorFlow Lite CNN classifies the crack.</li>
                <li>⏱️ <strong>1.5 ms</strong>: GPIO pin triggers the solenoid isolation relay.</li>
              </ol>
              <strong>Total Closed-Loop Time: 17.2 milliseconds.</strong>`;
    }
    
    if (query.includes('valve') || query.includes('vane') || query.includes('mitigation') || query.includes('actuation')) {
      return `When a crack is detected, two physical components react instantly to neutralize rotor energy:
              <br><br>
              <ol>
                <li>⛽ <strong>Fuel Shutoff Solenoid</strong>: Isolates the fuel flow in under 2ms, immediately killing the combustion driving the rotor.</li>
                <li>🌀 <strong>Variable Guide Vanes (VGV)</strong>: Twist from their normal flight angle ($15.5^\\circ$) to an extreme stall angle ($78.2^\\circ$). This blocks incoming airflow, acting as an aerodynamic brake to slow down the blades and lower mechanical containment stress.</li>
              </ol>`;
    }

    if (query.includes('use') || query.includes('how to guide') || query.includes('instructions') || query.includes('how do i')) {
      return `To run the simulation:
              <br><br>
              <ol>
                <li>1. Go to the **Flight Deck** tab.</li>
                <li>2. Click the red switch guard cover (**GUARD CLOSED**). It swings open.</li>
                <li>3. To test a bird strike: Click **INJECT SEVERE STRIKE**. A 3-second pilot countdown begins. You can click **[VETO AUTOMATED SHUTDOWN]** to abort it. Otherwise, the engine isolates automatically.</li>
                <li>4. To test a micro-crack: Click **INJECT SOFT IMPACT**. It triggers a 35-minute RUL warning and routes an alternative diversion path to Mumbai (BOM) on the map.</li>
                <li>5. Click **RESET SAFETY LOOP** to clear.</li>
              </ol>`;
    }

    if (query.includes('hi') || query.includes('hello') || query.includes('status') || query.includes('check')) {
      return `Hello Captain. I am online and the safety computer is currently operational. 
              <br><br>
              You can navigate to the **Flight Deck** tab to test manual crack injection, or ask me specific questions about our sensors, TinyML model, or guide vanes!`;
    }

    return `Captain, I can explain the technical specs of the containment computer in simple terms. 
            <br><br>
            Please ask about our:
            <ul>
              <li><strong>Concept:</strong> "How does the system work?"</li>
              <li><strong>Offline Security:</strong> "Why is it offline/air-gapped?"</li>
              <li><strong>Sensors:</strong> Casing piezo and ADXL345 accelerometer.</li>
              <li><strong>TinyML Core:</strong> Quantized CNN model properties.</li>
              <li><strong>Actuators:</strong> Fuel shutoff valve and variable guide vanes.</li>
              <li><strong>Operations:</strong> "How do I use this website?"</li>
            </ul>`;
  }

  // Unified automated demo function
  function startAutomatedDemo() {
    console.log("[DEMO] startAutomatedDemo() triggered.");
    resetSafetyComputer();
    switchPage('page-flightdeck');
    
    setTimeout(() => {
      isGuardOpen = true;
      if (switchGuard) {
        switchGuard.classList.add('flipped');
        switchGuard.innerText = 'GUARD Flipped';
      }
      if (injectSevereBtn) {
        injectSevereBtn.classList.remove('disabled');
        injectSevereBtn.removeAttribute('disabled');
      }
      if (injectSoftBtn) {
        injectSoftBtn.classList.remove('disabled');
        injectSoftBtn.removeAttribute('disabled');
      }
      logToTerminal('SYSTEM', '[DEMO] Switch cover flipped automatically.');
      console.log("[DEMO] Switch guard cover opened.");
    }, 1000);
    
    setTimeout(() => {
      logToTerminal('SYSTEM', '[DEMO] Injected severe strike signal.');
      console.log("[DEMO] Injecting severe strike.");
      executeCrackTripSequence();
    }, 2500);

    setTimeout(() => {
      if (nasaAlert && nasaAlert.classList.contains('show')) {
        nasaAlert.classList.remove('show');
        logSimulatedFirestoreWrite('AIRINDIA_ALERT_ACK', {
          user: 'CAPT. S. VAISHNAV',
          action: 'DEMO_ALERT_ACKNOWLEDGED',
          gcs_sync: true,
          flight: 'AI-101'
        });
        logToTerminal('SYSTEM', '[DEMO] Emergency alert automatically acknowledged.');
        console.log("[DEMO] Failsafe alert overlay acknowledged.");
      }
    }, 7500);
  }

  // Pitch Roadmap navigation smooth scrolling
  const roadmapSteps = document.querySelectorAll('.roadmap-step');
  roadmapSteps.forEach(step => {
    step.addEventListener('click', () => {
      const targetId = step.getAttribute('data-target');
      console.log("[ROADMAP] Clicked step:", targetId);
      if (targetId) {
        if (targetId === 'deck-demo') {
          startAutomatedDemo();
        } else {
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            roadmapSteps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');
          }
        }
      }
    });
  });

  // Judge Demo Mode button click listener
  const btnJudgeDemo = document.getElementById('btn-judge-demo');
  if (btnJudgeDemo) {
    btnJudgeDemo.addEventListener('click', () => {
      startAutomatedDemo();
    });
  }
 
  // Dataset Action Buttons Event Listeners (Faculty QA datasets loading)
  const datasetButtons = document.querySelectorAll('.dataset-action-btn');
  datasetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const engine = btn.getAttribute('data-engine');
      const dataset = btn.getAttribute('data-dataset');
      
      logToTerminal('SYSTEM', `Loading pre-compiled neural weights for ${engine} turbofan engine...`);
      logToTerminal('SYSTEM', `Dataset source: ${dataset}. Initializing transfer learning fine-tuning...`);
      
      setTimeout(() => {
        logToTerminal('TFLITE', `[ OK ] Loaded weights tensor layer shape checks completed.`);
        logToTerminal('SYSTEM', `Model calibrated for ${engine} acoustic and vibration profile.`);
        alert(`Successfully loaded transfer learning calibration weights for the ${engine} engine using the ${dataset} dataset!`);
      }, 1000);
      
      switchPage('page-shell');
    });
  });

  // Start simulation loop
  updateSimulation();
  
  // Initialize Active Flight Profile UI Layout
  updateFlightProfileDisplay();
  
  // Initial message
  logToTerminal('SYSTEM', 'Edge AI AeroVibe Flight Safety Computer initialized. Waiting for commands.');
});
