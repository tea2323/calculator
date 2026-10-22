export function generateStandaloneHtml(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kingshot Bear Trap Calculator</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            chakra: ['"Chakra Petch"', 'sans-serif'],
            inter: ['"Inter"', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
          },
          colors: {
            deepNavy: '#0B0F19',
            cardBg: '#111827',
            cardBorder: '#1F2937',
            goldAccent: '#F59E0B',
            goldHover: '#D97706',
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: #0B0F19;
      color: #F8FAFC;
      font-family: 'Inter', sans-serif;
    }
    .font-chakra { font-family: 'Chakra Petch', sans-serif; }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    input[type=number] {
      -moz-appearance: textfield;
    }
  </style>
</head>
<body class="min-h-screen p-3 sm:p-6 md:p-8 flex flex-col items-center">
  <div class="w-full max-w-4xl space-y-6">

    <!-- Header -->
    <header class="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl relative overflow-hidden">
      <div class="absolute -right-12 -top-12 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="text-[11px] uppercase tracking-widest text-amber-400 font-bold mb-1 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Kingshot Combat Utility
          </div>
          <h1 class="text-2xl sm:text-3xl font-bold font-chakra text-white tracking-wide flex items-center gap-2.5">
            <span>🏹</span>
            <span>Kingshot Bear Trap Calculator</span>
          </h1>
          <p class="text-slate-400 text-xs sm:text-sm mt-1">
            Optimize troop splits across Infantry, Cavalry, and Archers for maximum Bear Trap damage.
          </p>
        </div>
      </div>
    </header>

    <!-- Quick Presets -->
    <div class="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
      <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quick Presets (Rally Ratio)</div>
      <div class="flex flex-wrap gap-2">
        <button onclick="applyPreset(10, 20, 70, 'Standard (10/20/70)')" class="px-3 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-amber-400 transition-colors shadow">
          ⭐ Standard Bear Trap (Archer Heavy 10/20/70)
        </button>
        <button onclick="applyPreset(0, 0, 100, 'Pure Archers (0/0/100)')" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-medium transition-colors">
          🏹 Pure Archers / Fill (0/0/100)
        </button>
        <button onclick="applyPreset(33, 33, 34, 'Equal Balance (33/33/34)')" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors">
          ⚖ Equal Balance
        </button>
        <button onclick="applyPreset(5, 15, 80, 'Sniper (5/15/80)')" class="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition-colors">
          🎯 Sniper (5/15/80)
        </button>
      </div>
    </div>

    <!-- Inputs Section -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-6 shadow-xl">
      <h2 class="text-base sm:text-lg font-bold font-chakra text-white border-b border-slate-800 pb-3 flex items-center justify-between">
        <span>Available Troops & March Settings</span>
        <span id="activePresetBadge" class="text-xs font-mono font-normal text-amber-400">Standard (10/20/70)</span>
      </h2>

      <!-- Available Troops Inputs (Infantry, Cavalry, Archers) -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <!-- Infantry -->
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
          <label class="text-xs font-semibold text-slate-400 block">🛡 Infantry Available</label>
          <input type="number" id="inputInf" value="200000" min="0" step="1000" oninput="calculate()" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-500 focus:outline-none">
          <div class="text-[11px] text-slate-500 font-mono">Frontline tank</div>
        </div>

        <!-- Cavalry -->
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
          <label class="text-xs font-semibold text-blue-400 block">🐎 Cavalry Available</label>
          <input type="number" id="inputCav" value="300000" min="0" step="1000" oninput="calculate()" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-blue-200 font-mono text-sm focus:border-blue-500 focus:outline-none">
          <div class="text-[11px] text-slate-500 font-mono">Secondary DPS</div>
        </div>

        <!-- Archers (Primary DPS) -->
        <div class="bg-slate-950 border border-amber-500/40 rounded-xl p-3.5 space-y-1.5 bg-gradient-to-r from-amber-500/5 to-transparent">
          <label class="text-xs font-semibold text-amber-400 block flex items-center justify-between">
            <span>🏹 Archers Available</span>
            <span class="text-[10px] text-amber-500 font-bold uppercase">Primary DPS</span>
          </label>
          <input type="number" id="inputArch" value="600000" min="0" step="1000" oninput="calculate()" class="w-full bg-slate-900 border border-amber-500/50 rounded-lg px-3 py-2 text-amber-300 font-mono text-sm font-bold focus:border-amber-400 focus:outline-none">
          <div class="text-[11px] text-amber-500/80 font-mono">~70%+ Bear Trap damage</div>
        </div>
      </div>

      <!-- Marches & My Rally Configuration -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <!-- Number of Available Marches -->
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-2">
          <label class="text-xs font-semibold text-slate-300 block">Total Number of Available Marches</label>
          <select id="selectMarches" onchange="calculate()" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2.5 text-white font-mono text-sm focus:border-amber-500 focus:outline-none">
            <option value="1">1 March</option>
            <option value="2">2 Marches</option>
            <option value="3">3 Marches</option>
            <option value="4">4 Marches</option>
            <option value="5" selected>5 Marches</option>
            <option value="6">6 Marches</option>
          </select>
          <div class="text-[11px] text-slate-500">Number of march queues you can deploy</div>
        </div>

        <!-- "My Rally" Settings Toggle & Capacity -->
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
          <div class="flex items-center justify-between">
            <label for="checkMyRally" class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" id="checkMyRally" checked onchange="toggleRallyCapacityInput()" class="w-4 h-4 rounded accent-amber-500 cursor-pointer">
              <span class="text-xs font-bold text-white">Are you leading a rally? ("My Rally")</span>
            </label>
            <span id="rallyStatusBadge" class="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              March 1 Lead Active
            </span>
          </div>

          <div id="rallyCapContainer" class="space-y-1.5 transition-all">
            <label class="text-xs text-slate-400 block">My Rally Capacity (Troops in March 1)</label>
            <input type="number" id="inputRallyCap" value="100000" min="5000" step="5000" oninput="calculate()" class="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm focus:border-amber-500 focus:outline-none">
            <div class="text-[11px] text-slate-500">Allocated first using the optimal ratio</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Output Dashboard -->
    <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-xl">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h2 class="text-lg font-bold font-chakra text-white">Kingshot March Breakdown</h2>
          <p class="text-xs text-slate-400">Allocated march squad numbers ready for in-game squad entry</p>
        </div>
        <button onclick="copyAllMarches()" class="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors shadow flex items-center gap-1.5 self-start sm:self-auto">
          <span>📋</span>
          <span>Copy All Marches</span>
        </button>
      </div>

      <!-- Summary Metrics Bar -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-3">
          <span class="text-slate-400 text-[11px] block">Total Available</span>
          <span id="statAvailable" class="text-base font-bold font-mono text-white mt-0.5 block">1,100,000</span>
        </div>
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-3">
          <span class="text-slate-400 text-[11px] block">Total Deployed</span>
          <span id="statDeployed" class="text-base font-bold font-mono text-emerald-400 mt-0.5 block">1,100,000</span>
        </div>
        <div class="bg-slate-950 border border-slate-800 rounded-xl p-3">
          <span class="text-slate-400 text-[11px] block">Unassigned Pool</span>
          <span id="statUnassigned" class="text-base font-bold font-mono text-slate-300 mt-0.5 block">0</span>
        </div>
        <div class="bg-slate-950 border border-amber-500/30 rounded-xl p-3">
          <span class="text-amber-400 text-[11px] block">Archer Proportion</span>
          <span id="statArcherPct" class="text-base font-bold font-mono text-amber-300 mt-0.5 block">54.5%</span>
        </div>
      </div>

      <!-- Marches Cards Container -->
      <div id="marchesList" class="space-y-3">
        <!-- Generated by JavaScript -->
      </div>
    </div>

  </div>

  <!-- Toast Notice -->
  <div id="toast" class="fixed bottom-6 right-6 bg-amber-500 text-slate-950 px-4 py-2.5 rounded-xl font-bold text-xs shadow-2xl transition-opacity duration-300 opacity-0 pointer-events-none">
    Copied to clipboard!
  </div>

  <script>
    let currentRatio = { inf: 10, cav: 20, arch: 70 };
    let currentCalculatedMarches = [];

    function applyPreset(inf, cav, arch, label) {
      currentRatio = { inf, cav, arch };
      document.getElementById('activePresetBadge').innerText = label;
      calculate();
    }

    function toggleRallyCapacityInput() {
      const isLeading = document.getElementById('checkMyRally').checked;
      const container = document.getElementById('rallyCapContainer');
      const badge = document.getElementById('rallyStatusBadge');
      if (isLeading) {
        container.style.opacity = '1';
        container.style.pointerEvents = 'auto';
        badge.innerText = 'March 1 Lead Active';
        badge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30';
      } else {
        container.style.opacity = '0.35';
        container.style.pointerEvents = 'none';
        badge.innerText = 'All Joiners Mode';
        badge.className = 'text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700';
      }
      calculate();
    }

    function showToast(text) {
      const t = document.getElementById('toast');
      t.innerText = text;
      t.classList.remove('opacity-0');
      setTimeout(() => t.classList.add('opacity-0'), 2500);
    }

    function copyMarch(text, label) {
      navigator.clipboard.writeText(text);
      showToast('Copied ' + label + ' to clipboard!');
    }

    function copyAllMarches() {
      if (!currentCalculatedMarches.length) return;
      let output = '=== KINGSHOT BEAR TRAP MARCH ASSIGNMENTS ===\\n';
      currentCalculatedMarches.forEach(m => {
        output += m.title + ': Inf ' + m.inf.toLocaleString() + ' | Cav ' + m.cav.toLocaleString() + ' | Arch ' + m.arch.toLocaleString() + ' (Total: ' + m.total.toLocaleString() + ')\\n';
      });
      navigator.clipboard.writeText(output);
      showToast('Copied all marches summary!');
    }

    function calculate() {
      const infAvail = Math.max(0, parseInt(document.getElementById('inputInf').value) || 0);
      const cavAvail = Math.max(0, parseInt(document.getElementById('inputCav').value) || 0);
      const archAvail = Math.max(0, parseInt(document.getElementById('inputArch').value) || 0);

      const numMarches = parseInt(document.getElementById('selectMarches').value) || 1;
      const isLeadingRally = document.getElementById('checkMyRally').checked;
      const rallyCap = Math.max(1000, parseInt(document.getElementById('inputRallyCap').value) || 100000);

      let remInf = infAvail;
      let remCav = cavAvail;
      let remArch = archAvail;

      const marches = [];

      if (isLeadingRally) {
        // March 1 (My Rally Lead)
        const ratioSum = currentRatio.inf + currentRatio.cav + currentRatio.arch;
        const normInf = ratioSum > 0 ? currentRatio.inf / ratioSum : 0.1;
        const normCav = ratioSum > 0 ? currentRatio.cav / ratioSum : 0.2;
        const normArch = ratioSum > 0 ? currentRatio.arch / ratioSum : 0.7;

        let targetM1Inf = Math.round(rallyCap * normInf);
        let targetM1Cav = Math.round(rallyCap * normCav);
        let targetM1Arch = Math.max(0, rallyCap - targetM1Inf - targetM1Cav);

        let m1Inf = Math.min(targetM1Inf, remInf);
        let m1Cav = Math.min(targetM1Cav, remCav);
        let m1Arch = Math.min(targetM1Arch, remArch);

        remInf -= m1Inf;
        remCav -= m1Cav;
        remArch -= m1Arch;

        let m1Total = m1Inf + m1Cav + m1Arch;
        let deficit = rallyCap - m1Total;

        // Backfill deficit with available pool (Archers first)
        if (deficit > 0) {
          const archFill = Math.min(deficit, remArch);
          m1Arch += archFill;
          remArch -= archFill;
          deficit -= archFill;

          if (deficit > 0) {
            const cavFill = Math.min(deficit, remCav);
            m1Cav += cavFill;
            remCav -= cavFill;
            deficit -= cavFill;
          }

          if (deficit > 0) {
            const infFill = Math.min(deficit, remInf);
            m1Inf += infFill;
            remInf -= infFill;
            deficit -= infFill;
          }
          m1Total = m1Inf + m1Cav + m1Arch;
        }

        marches.push({
          num: 1,
          title: 'March 1 (My Rally)',
          isLead: true,
          inf: m1Inf,
          cav: m1Cav,
          arch: m1Arch,
          total: m1Total,
          archPct: m1Total > 0 ? Math.round((m1Arch / m1Total) * 100) : 0
        });

        // Evenly distribute remaining across remaining joiner marches
        const joinerCount = numMarches - 1;
        if (joinerCount > 0) {
          const baseInf = Math.floor(remInf / joinerCount);
          const baseCav = Math.floor(remCav / joinerCount);
          const baseArch = Math.floor(remArch / joinerCount);

          const modInf = remInf % joinerCount;
          const modCav = remCav % joinerCount;
          const modArch = remArch % joinerCount;

          for (let j = 1; j <= joinerCount; j++) {
            const infVal = baseInf + (j <= modInf ? 1 : 0);
            const cavVal = baseCav + (j <= modCav ? 1 : 0);
            const archVal = baseArch + (j <= modArch ? 1 : 0);
            const marchTotal = infVal + cavVal + archVal;

            marches.push({
              num: j + 1,
              title: 'March ' + (j + 1) + ' (Joiner)',
              isLead: false,
              inf: infVal,
              cav: cavVal,
              arch: archVal,
              total: marchTotal,
              archPct: marchTotal > 0 ? Math.round((archVal / marchTotal) * 100) : 0
            });
          }
          remInf = 0;
          remCav = 0;
          remArch = 0;
        }
      } else {
        // All joiners evenly distributed
        const count = numMarches;
        const baseInf = Math.floor(remInf / count);
        const baseCav = Math.floor(remCav / count);
        const baseArch = Math.floor(remArch / count);

        const modInf = remInf % count;
        const modCav = remCav % count;
        const modArch = remArch % count;

        for (let k = 1; k <= count; k++) {
          const infVal = baseInf + (k <= modInf ? 1 : 0);
          const cavVal = baseCav + (k <= modCav ? 1 : 0);
          const archVal = baseArch + (k <= modArch ? 1 : 0);
          const marchTotal = infVal + cavVal + archVal;

          marches.push({
            num: k,
            title: 'March ' + k + ' (Joiner)',
            isLead: false,
            inf: infVal,
            cav: cavVal,
            arch: archVal,
            total: marchTotal,
            archPct: marchTotal > 0 ? Math.round((archVal / marchTotal) * 100) : 0
          });
        }
        remInf = 0;
        remCav = 0;
        remArch = 0;
      }

      currentCalculatedMarches = marches;

      // Summary stats
      const totalAvail = infAvail + cavAvail + archAvail;
      let totalUsed = 0;
      let totalArchersUsed = 0;
      marches.forEach(m => {
        totalUsed += m.total;
        totalArchersUsed += m.arch;
      });

      document.getElementById('statAvailable').innerText = totalAvail.toLocaleString();
      document.getElementById('statDeployed').innerText = totalUsed.toLocaleString();
      document.getElementById('statUnassigned').innerText = (totalAvail - totalUsed).toLocaleString();
      document.getElementById('statArcherPct').innerText = totalUsed > 0 ? ((totalArchersUsed / totalUsed) * 100).toFixed(1) + '%' : '0%';

      // Render cards
      const container = document.getElementById('marchesList');
      container.innerHTML = marches.map(m => {
        const copyPayload = m.title + ': Inf ' + m.inf.toLocaleString() + ' | Cav ' + m.cav.toLocaleString() + ' | Arch ' + m.arch.toLocaleString() + ' (Total: ' + m.total.toLocaleString() + ')';
        return \`
          <div class="rounded-xl border p-4 transition-all \${m.isLead ? 'bg-gradient-to-r from-slate-900 to-amber-950/20 border-amber-500/40 shadow-lg' : 'bg-slate-950 border-slate-800'}">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-lg flex items-center justify-center font-bold font-mono text-sm border \${m.isLead ? 'bg-amber-500 text-slate-950 border-amber-400' : 'bg-slate-900 text-slate-300 border-slate-700'}">
                  #\${m.num}
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-white text-sm">\${m.title}</span>
                    \${m.isLead ? '<span class="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">PRIORITY RALLY</span>' : ''}
                  </div>
                  <div class="text-xs text-slate-400 font-mono">Total: \${m.total.toLocaleString()} troops (\${m.archPct}% Archers)</div>
                </div>
              </div>

              <button onclick="copyMarch('\${copyPayload}', '\${m.title}')" class="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-colors">
                <span>📋</span>
                <span>Copy</span>
              </button>
            </div>

            <!-- Troop Numbers -->
            <div class="grid grid-cols-3 gap-2.5 pt-3 text-xs">
              <div class="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span class="text-slate-400 text-[10px] block uppercase font-semibold">Infantry</span>
                <span class="font-mono font-bold text-white text-sm mt-0.5 block">\${m.inf.toLocaleString()}</span>
              </div>
              <div class="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                <span class="text-blue-400 text-[10px] block uppercase font-semibold">Cavalry</span>
                <span class="font-mono font-bold text-blue-200 text-sm mt-0.5 block">\${m.cav.toLocaleString()}</span>
              </div>
              <div class="bg-slate-900 p-2.5 rounded-lg border border-amber-500/40 bg-amber-500/5">
                <span class="text-amber-400 text-[10px] block uppercase font-semibold">Archers</span>
                <span class="font-mono font-bold text-amber-300 text-sm mt-0.5 block">\${m.arch.toLocaleString()}</span>
              </div>
            </div>
          </div>
        \`;
      }).join('');
    }

    window.onload = function() {
      calculate();
    }
  </script>
</body>
</html>`;
}

export function downloadStandaloneHtmlFile(): void {
  const content = generateStandaloneHtml();
  const blob = new Blob([content], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kingshot-bear-trap-calculator.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
