/* ============================================
   THE HAPPINESS TREE — D3.js Visualisation
   Main JavaScript — Rewritten layout engine
   ============================================ */

// ---- Constants ----
const FACTORS = [
    { key: "Log GDP per capita", label: "GDP", color: "#E8B931", shortLabel: "GDP" },
    { key: "Social support", label: "Social Support", color: "#E85D75", shortLabel: "Social" },
    { key: "Healthy life expectancy at birth", label: "Health", color: "#5DBE6E", shortLabel: "Health" },
    { key: "Freedom to make life choices", label: "Freedom", color: "#5BA4CF", shortLabel: "Freedom" },
    { key: "Generosity", label: "Generosity", color: "#C77DFF", shortLabel: "Generosity" },
    { key: "Perceptions of corruption", label: "Trust", color: "#FF8C42", shortLabel: "Trust" }
];

// Country-to-region mapping
const REGION_MAP = {
    "Finland": "Western Europe", "Denmark": "Western Europe", "Iceland": "Western Europe",
    "Switzerland": "Western Europe", "Netherlands": "Western Europe", "Norway": "Western Europe",
    "Sweden": "Western Europe", "Luxembourg": "Western Europe", "Austria": "Western Europe",
    "Belgium": "Western Europe", "Ireland": "Western Europe", "Germany": "Western Europe",
    "France": "Western Europe", "United Kingdom": "Western Europe", "Malta": "Western Europe",
    "Spain": "Western Europe", "Italy": "Western Europe", "Portugal": "Western Europe",
    "Greece": "Western Europe", "Cyprus": "Western Europe",
    "Israel": "Middle East and North Africa", "Kuwait": "Middle East and North Africa",
    "United Arab Emirates": "Middle East and North Africa", "Saudi Arabia": "Middle East and North Africa",
    "Bahrain": "Middle East and North Africa", "Iran": "Middle East and North Africa",
    "Jordan": "Middle East and North Africa", "Iraq": "Middle East and North Africa",
    "State of Palestine": "Middle East and North Africa", "Lebanon": "Middle East and North Africa",
    "Libya": "Middle East and North Africa", "Egypt": "Middle East and North Africa",
    "Tunisia": "Middle East and North Africa", "Morocco": "Middle East and North Africa",
    "Yemen": "Middle East and North Africa", "Algeria": "Middle East and North Africa",
    "Turkmenistan": "Middle East and North Africa", "Turkey": "Middle East and North Africa",
    "Czechia": "Central and Eastern Europe", "Lithuania": "Central and Eastern Europe",
    "Slovenia": "Central and Eastern Europe", "Estonia": "Central and Eastern Europe",
    "Latvia": "Central and Eastern Europe", "Slovakia": "Central and Eastern Europe",
    "Poland": "Central and Eastern Europe", "Romania": "Central and Eastern Europe",
    "Croatia": "Central and Eastern Europe", "Hungary": "Central and Eastern Europe",
    "Serbia": "Central and Eastern Europe", "Bulgaria": "Central and Eastern Europe",
    "Montenegro": "Central and Eastern Europe", "North Macedonia": "Central and Eastern Europe",
    "Bosnia and Herzegovina": "Central and Eastern Europe", "Albania": "Central and Eastern Europe",
    "Kosovo": "Central and Eastern Europe", "Moldova": "Central and Eastern Europe",
    "Russia": "Central and Eastern Europe", "Ukraine": "Central and Eastern Europe",
    "Georgia": "Central and Eastern Europe", "Armenia": "Central and Eastern Europe",
    "Azerbaijan": "Central and Eastern Europe", "Belarus": "Central and Eastern Europe",
    "Kazakhstan": "Commonwealth of Independent States", "Uzbekistan": "Commonwealth of Independent States",
    "Kyrgyzstan": "Commonwealth of Independent States", "Tajikistan": "Commonwealth of Independent States",
    "Mongolia": "Commonwealth of Independent States",
    "Costa Rica": "Latin America and Caribbean", "Mexico": "Latin America and Caribbean",
    "Uruguay": "Latin America and Caribbean", "Chile": "Latin America and Caribbean",
    "Panama": "Latin America and Caribbean", "Brazil": "Latin America and Caribbean",
    "Guatemala": "Latin America and Caribbean", "Nicaragua": "Latin America and Caribbean",
    "El Salvador": "Latin America and Caribbean", "Argentina": "Latin America and Caribbean",
    "Honduras": "Latin America and Caribbean", "Dominican Republic": "Latin America and Caribbean",
    "Paraguay": "Latin America and Caribbean", "Colombia": "Latin America and Caribbean",
    "Ecuador": "Latin America and Caribbean", "Bolivia": "Latin America and Caribbean",
    "Peru": "Latin America and Caribbean", "Venezuela": "Latin America and Caribbean",
    "Jamaica": "Latin America and Caribbean", "Haiti": "Latin America and Caribbean",
    "Trinidad and Tobago": "Latin America and Caribbean", "Belize": "Latin America and Caribbean",
    "Cuba": "Latin America and Caribbean", "Guyana": "Latin America and Caribbean",
    "Suriname": "Latin America and Caribbean",
    "Singapore": "Southeast Asia", "Thailand": "Southeast Asia", "Philippines": "Southeast Asia",
    "Malaysia": "Southeast Asia", "Vietnam": "Southeast Asia", "Indonesia": "Southeast Asia",
    "Laos": "Southeast Asia", "Cambodia": "Southeast Asia", "Myanmar": "Southeast Asia",
    "Taiwan Province of China": "East Asia",
    "Japan": "East Asia", "South Korea": "East Asia", "China": "East Asia",
    "Hong Kong S.A.R. of China": "East Asia",
    "Australia": "North America and ANZ", "New Zealand": "North America and ANZ",
    "Canada": "North America and ANZ", "United States": "North America and ANZ",
    "India": "South Asia", "Nepal": "South Asia", "Bangladesh": "South Asia",
    "Pakistan": "South Asia", "Sri Lanka": "South Asia", "Afghanistan": "South Asia",
    "Mauritius": "Sub-Saharan Africa", "South Africa": "Sub-Saharan Africa",
    "Gabon": "Sub-Saharan Africa", "Ivory Coast": "Sub-Saharan Africa",
    "Senegal": "Sub-Saharan Africa", "Nigeria": "Sub-Saharan Africa",
    "Cameroon": "Sub-Saharan Africa", "Ghana": "Sub-Saharan Africa",
    "Kenya": "Sub-Saharan Africa", "Namibia": "Sub-Saharan Africa",
    "Mozambique": "Sub-Saharan Africa", "Niger": "Sub-Saharan Africa",
    "Burkina Faso": "Sub-Saharan Africa", "Benin": "Sub-Saharan Africa",
    "Uganda": "Sub-Saharan Africa", "Gambia": "Sub-Saharan Africa",
    "Mali": "Sub-Saharan Africa", "Guinea": "Sub-Saharan Africa",
    "Liberia": "Sub-Saharan Africa", "Madagascar": "Sub-Saharan Africa",
    "Togo": "Sub-Saharan Africa", "Chad": "Sub-Saharan Africa",
    "Ethiopia": "Sub-Saharan Africa", "Tanzania": "Sub-Saharan Africa",
    "Comoros": "Sub-Saharan Africa", "Zambia": "Sub-Saharan Africa",
    "Malawi": "Sub-Saharan Africa", "Botswana": "Sub-Saharan Africa",
    "Zimbabwe": "Sub-Saharan Africa", "Congo (Brazzaville)": "Sub-Saharan Africa",
    "Congo (Kinshasa)": "Sub-Saharan Africa", "Sierra Leone": "Sub-Saharan Africa",
    "Mauritania": "Sub-Saharan Africa", "Somaliland region": "Sub-Saharan Africa",
    "Somalia": "Sub-Saharan Africa", "Rwanda": "Sub-Saharan Africa",
    "Eswatini": "Sub-Saharan Africa", "Lesotho": "Sub-Saharan Africa",
    "Djibouti": "Sub-Saharan Africa", "Sudan": "Sub-Saharan Africa",
    "South Sudan": "Sub-Saharan Africa",
};

const REGION_COLORS = {
    "Western Europe": "#4CAF50",
    "Central and Eastern Europe": "#7E57C2",
    "Latin America and Caribbean": "#FF7043",
    "North America and ANZ": "#29B6F6",
    "East Asia": "#EF5350",
    "Southeast Asia": "#26A69A",
    "South Asia": "#FFA726",
    "Middle East and North Africa": "#AB47BC",
    "Sub-Saharan Africa": "#8D6E63",
    "Commonwealth of Independent States": "#78909C"
};

// ---- State ----
let allData = [];
let currentYear = 2023;
let selectedFactors = new Set(FACTORS.map(f => f.key)); // multi-select, all on by default
let selectedRegion = null;
let isAllYears = false;
let isPlaying = false;
let playInterval = null;
let currentSeason = "spring";
let leaves = [];

// Deterministic seeded random for stable layouts
function seededRandom(seed) {
    let s = seed;
    return function() {
        s = (s * 16807 + 0) % 2147483647;
        return (s - 1) / 2147483646;
    };
}

// ---- Load Data & Init ----
d3.csv("data.csv").then(function(raw) {
    allData = raw.map(d => ({
        country: d["Country name"],
        year: +d["year"],
        happiness: +d["Life Ladder"] || null,
        gdp: +d["Log GDP per capita"] || null,
        social: +d["Social support"] || null,
        health: +d["Healthy life expectancy at birth"] || null,
        freedom: +d["Freedom to make life choices"] || null,
        generosity: +d["Generosity"] || null,
        corruption: +d["Perceptions of corruption"] || null,
        region: REGION_MAP[d["Country name"]] || "Other"
    })).filter(d => d.region !== "Other");

    setupEventListeners();
    initLeaves();
    drawTree();
});

// ---- Helpers ----
function getFilteredData() {
    if (isAllYears) {
        const grouped = d3.group(allData, d => d.country);
        return Array.from(grouped, ([country, rows]) => {
            const valid = rows.filter(r => r.happiness != null);
            if (valid.length === 0) return null;
            return {
                country, year: "All",
                happiness: d3.mean(valid, r => r.happiness),
                gdp: d3.mean(valid.filter(r => r.gdp != null), r => r.gdp),
                social: d3.mean(valid.filter(r => r.social != null), r => r.social),
                health: d3.mean(valid.filter(r => r.health != null), r => r.health),
                freedom: d3.mean(valid.filter(r => r.freedom != null), r => r.freedom),
                generosity: d3.mean(valid.filter(r => r.generosity != null), r => r.generosity),
                corruption: d3.mean(valid.filter(r => r.corruption != null), r => r.corruption),
                region: REGION_MAP[country] || "Other"
            };
        }).filter(d => d != null && d.region !== "Other");
    }
    return allData.filter(d => d.year === currentYear && d.happiness != null);
}

function getFactorValue(d, factorKey) {
    const map = {
        "Log GDP per capita": d.gdp,
        "Social support": d.social,
        "Healthy life expectancy at birth": d.health,
        "Freedom to make life choices": d.freedom,
        "Generosity": d.generosity,
        "Perceptions of corruption": d.corruption
    };
    return map[factorKey];
}

function getNormalizedValue(value, factorKey, data) {
    const allVals = data.map(d => getFactorValue(d, factorKey)).filter(v => v != null);
    const ext = d3.extent(allVals);
    if (ext[0] === ext[1]) return 0.5;
    return (value - ext[0]) / (ext[1] - ext[0]);
}

function getActiveFactors() {
    return FACTORS.filter(f => selectedFactors.has(f.key));
}

function getFilterScore(d) {
    const active = getActiveFactors();
    if (active.length === 0) return d.happiness || 0;
    if (active.length === FACTORS.length) return d.happiness || 0;
    const vals = active.map(f => getFactorValue(d, f.key)).filter(v => v != null);
    return vals.length ? d3.mean(vals) : 0;
}

// Quadratic Bezier helpers
function bzPt(p0x, p0y, cpx, cpy, p1x, p1y, t) {
    const o = 1 - t;
    return { x: o*o*p0x + 2*o*t*cpx + t*t*p1x, y: o*o*p0y + 2*o*t*cpy + t*t*p1y };
}
function bzNorm(p0x, p0y, cpx, cpy, p1x, p1y, t) {
    const o = 1 - t;
    const tx = 2*o*(cpx-p0x) + 2*t*(p1x-cpx);
    const ty = 2*o*(cpy-p0y) + 2*t*(p1y-cpy);
    const len = Math.hypot(tx, ty) || 1;
    return { x: -ty/len, y: tx/len };
}

// ========================================================
// DRAW THE TREE
// ========================================================
function drawTree() {
    const data = getFilteredData();
    if (data.length === 0) return;

    const regionGroups = d3.group(data, d => d.region);
    const regionScores = Array.from(regionGroups, ([region, countries]) => ({
        region,
        score: d3.mean(countries, d => getFilterScore(d)),
        countries: countries.slice().sort((a, b) => getFilterScore(b) - getFilterScore(a))
    })).sort((a, b) => b.score - a.score);

    // --- SVG Setup ---
    const containerWidth = document.getElementById("tree-container").clientWidth;
    const W = Math.min(containerWidth, 1400);
    const H = Math.max(920, W * 0.8);
    const svg = d3.select("#tree-svg")
        .attr("viewBox", `0 0 ${W} ${H}`)
        .attr("preserveAspectRatio", "xMidYMid meet");
    svg.selectAll("*").remove();

    const defs = svg.append("defs");

    // Trunk gradient
    const tg = defs.append("linearGradient").attr("id", "trunkGrad").attr("x1","0%").attr("x2","100%");
    tg.append("stop").attr("offset","0%").attr("stop-color","#4E342E");
    tg.append("stop").attr("offset","35%").attr("stop-color","#6D4C41");
    tg.append("stop").attr("offset","65%").attr("stop-color","#5D4037");
    tg.append("stop").attr("offset","100%").attr("stop-color","#3E2723");

    // Ground gradient
    const gg = defs.append("linearGradient").attr("id","groundGrad").attr("x1","0%").attr("y1","0%").attr("x2","0%").attr("y2","100%");
    gg.append("stop").attr("offset","0%").attr("stop-color","var(--ground-gradient-start)");
    gg.append("stop").attr("offset","100%").attr("stop-color","var(--ground-gradient-end)");

    const cx = W / 2;
    const groundY = H - 55;
    const trunkTopY = H * 0.52;
    const trunkW = W * 0.02;

    // --- Ground ---
    svg.append("ellipse")
        .attr("cx", cx).attr("cy", groundY + 18)
        .attr("rx", W * 0.46).attr("ry", 38)
        .attr("fill", "url(#groundGrad)").attr("opacity", 0.6);

    // --- Trunk ---
    svg.append("path")
        .attr("d", `
            M ${cx - trunkW} ${groundY}
            C ${cx - trunkW*0.85} ${groundY - (groundY-trunkTopY)*0.35},
              ${cx - trunkW*0.45} ${groundY - (groundY-trunkTopY)*0.75},
              ${cx - trunkW*0.2} ${trunkTopY}
            L ${cx + trunkW*0.2} ${trunkTopY}
            C ${cx + trunkW*0.45} ${groundY - (groundY-trunkTopY)*0.75},
              ${cx + trunkW*0.85} ${groundY - (groundY-trunkTopY)*0.35},
              ${cx + trunkW} ${groundY}
            Z`)
        .attr("fill", "url(#trunkGrad)").attr("stroke","#3E2723").attr("stroke-width",0.8);

    // Bark
    const rng = seededRandom(42);
    for (let i = 0; i < 14; i++) {
        const t = 0.08 + rng()*0.8;
        const by = groundY - t*(groundY-trunkTopY);
        const bx = cx + (rng()-0.5)*trunkW*0.5;
        svg.append("line").attr("x1",bx).attr("y1",by)
            .attr("x2",bx+(rng()-0.5)*3).attr("y2",by - 8 - rng()*20)
            .attr("stroke","#3E2723").attr("stroke-width",0.5).attr("opacity",0.2);
    }

    // --- Canopy ---
    const canopy = svg.append("g").attr("class", "tree-canopy");

    // Split left/right alternating by rank
    const leftBranches = [], rightBranches = [];
    regionScores.forEach((rs, i) => {
        if (i % 2 === 0) leftBranches.push(rs); else rightBranches.push(rs);
    });

    // All flower positions for global collision
    const allFlowers = [];

    function layoutSide(branches, side) {
        const count = branches.length;
        if (!count) return;
        const sign = side === "left" ? -1 : 1;

        // Angular range: top-most branch near vertical, bottom near horizontal
        const minAngleDeg = 12;
        const maxAngleDeg = 80;

        branches.forEach((rs, idx) => {
            const region = rs.region;
            const countries = rs.countries;
            const regionColor = REGION_COLORS[region] || "#888";
            const n = countries.length;

            // Angle from vertical
            const angleDeg = minAngleDeg + (idx / Math.max(count-1, 1)) * (maxAngleDeg - minAngleDeg);
            const aRad = sign * angleDeg * Math.PI / 180;

            // Origin on trunk, staggered vertically
            const trunkT = 0.03 + (idx / Math.max(count-1, 1)) * 0.42;
            const sy = trunkTopY + trunkT * (groundY - trunkTopY);
            const sx = cx + sign * trunkW * 0.35;

            // Branch length based on country count — enough room for all bigger flowers
            const flowerDiam = 52;
            const neededLen = Math.max(n * flowerDiam * 0.42, 120);
            const maxLenX = (side === "left" ? sx - 50 : W - 50 - sx);
            const maxLenY = sy - 55;
            const branchLen = Math.min(neededLen, maxLenX * 0.92, maxLenY * 0.95, W * 0.42);

            // End point
            const ex = sx + Math.sin(aRad) * branchLen;
            const ey = sy - Math.cos(aRad) * branchLen;

            // Control point (gentle curve)
            const bend = 0.12 + rng() * 0.08;
            const cpx = sx + Math.sin(aRad)*branchLen*0.5 + Math.cos(aRad)*branchLen*bend*sign;
            const cpy = sy - Math.cos(aRad)*branchLen*0.5 + Math.sin(aRad)*branchLen*bend*0.2;

            const thick = Math.max(2, 2.5 + n * 0.12);

            const branchG = canopy.append("g").attr("class","branch-group").attr("data-region",region);

            // Shadow
            branchG.append("path")
                .attr("d", `M ${sx} ${sy} Q ${cpx} ${cpy}, ${ex} ${ey}`)
                .attr("stroke","#3E2723").attr("stroke-width",thick+2)
                .attr("fill","none").attr("stroke-linecap","round").attr("opacity",0.1);
            // Main branch
            branchG.append("path")
                .attr("class","branch-path")
                .attr("d", `M ${sx} ${sy} Q ${cpx} ${cpy}, ${ex} ${ey}`)
                .attr("stroke","#5D4037").attr("stroke-width",thick)
                .attr("fill","none").attr("stroke-linecap","round").attr("opacity",0.88);

            // Sub-branches for large regions (>10 countries)
            const subBranches = [];
            if (n > 10) {
                const numSubs = n > 22 ? 3 : 2;
                for (let si = 0; si < numSubs; si++) {
                    const ft = 0.35 + (si/(numSubs-0.5))*0.4;
                    const fp = bzPt(sx,sy,cpx,cpy,ex,ey,ft);
                    const fn = bzNorm(sx,sy,cpx,cpy,ex,ey,ft);
                    const dir = (si%2===0?1:-1);
                    const sLen = branchLen*(0.3+rng()*0.15);
                    // Sub-branch goes outward + along
                    const tangX = (ex-sx)/branchLen, tangY = (ey-sy)/branchLen;
                    const subEx = fp.x + fn.x*dir*sLen*0.6 + tangX*sLen*0.55;
                    const subEy = fp.y + fn.y*dir*sLen*0.6 + tangY*sLen*0.55 - sLen*0.1;
                    const subCpx = (fp.x+subEx)/2 + fn.x*dir*sLen*0.15;
                    const subCpy = (fp.y+subEy)/2 + fn.y*dir*sLen*0.15;
                    subBranches.push({sx:fp.x,sy:fp.y,cpx:subCpx,cpy:subCpy,ex:subEx,ey:subEy});

                    branchG.append("path")
                        .attr("d",`M ${fp.x} ${fp.y} Q ${subCpx} ${subCpy}, ${subEx} ${subEy}`)
                        .attr("stroke","#6D4C41").attr("stroke-width",Math.max(1.2,thick*0.45))
                        .attr("fill","none").attr("stroke-linecap","round").attr("opacity",0.65);
                }
            }

            // Distribute countries across main branch + sub-branches
            const mainSlots = subBranches.length > 0 ? Math.ceil(n * 0.4) : n;
            const branchFlowers = [];

            function placeOnCurve(c, ci, total, p0x,p0y,cx2,cy2,p1x,p1y) {
                const happiness = c.happiness || 0;
                const active = getActiveFactors();
                let fR;
                if (active.length === FACTORS.length || active.length === 0) {
                    fR = 10 + (happiness/10)*18;
                } else {
                    const vals = active.map(f => {
                        const v = getFactorValue(c, f.key);
                        if (v == null) return null;
                        return getNormalizedValue(v, f.key, data);
                    }).filter(v => v != null);
                    if (vals.length === 0) return;
                    fR = 10 + d3.mean(vals)*18;
                }
                const t2 = 0.08 + (ci / Math.max(total-1, 1)) * 0.88;
                const pt = bzPt(p0x,p0y,cx2,cy2,p1x,p1y,t2);
                const nm = bzNorm(p0x,p0y,cx2,cy2,p1x,p1y,t2);
                // Spread into 3 lanes with moderate spacing so flowers stay near branch
                const laneIdx = (ci % 3) - 1; // -1, 0, 1
                const laneSpacing = fR * 1.6 + 6;
                const fx = pt.x + nm.x * laneIdx * laneSpacing;
                const fy = pt.y + nm.y * laneIdx * laneSpacing;
                branchFlowers.push({
                    c, r:fR,
                    x: fx, y: fy,
                    origX: fx, origY: fy,
                    anchorX: pt.x, anchorY: pt.y  // point on branch for stem
                });
            }

            // Main branch flowers
            for (let ci = 0; ci < Math.min(mainSlots, n); ci++) {
                placeOnCurve(countries[ci], ci, mainSlots, sx,sy,cpx,cpy,ex,ey);
            }
            // Sub-branch flowers
            if (subBranches.length > 0) {
                const rest = countries.slice(mainSlots);
                const perSub = Math.ceil(rest.length / subBranches.length);
                subBranches.forEach((sb, si) => {
                    const chunk = rest.slice(si*perSub, (si+1)*perSub);
                    chunk.forEach((c, ci) => {
                        placeOnCurve(c, ci, chunk.length, sb.sx,sb.sy,sb.cpx,sb.cpy,sb.ex,sb.ey);
                    });
                });
            }

            // Local collision resolution
            for (let iter = 0; iter < 50; iter++) {
                let moved = false;
                for (let i = 0; i < branchFlowers.length; i++) {
                    for (let j = i+1; j < branchFlowers.length; j++) {
                        const a = branchFlowers[i], b = branchFlowers[j];
                        const dx = b.x-a.x, dy = b.y-a.y;
                        const d2 = dx*dx+dy*dy;
                        const minD = a.r+b.r+4;
                        if (d2 < minD*minD && d2 > 0.01) {
                            const dist = Math.sqrt(d2);
                            const ov = (minD-dist)*0.5;
                            const ux=dx/dist, uy=dy/dist;
                            a.x -= ux*ov; a.y -= uy*ov;
                            b.x += ux*ov; b.y += uy*ov;
                            moved = true;
                        }
                    }
                }
                if (!moved) break;
                // Moderate pull back to keep flowers attached near branch
                branchFlowers.forEach(f => {
                    f.x += (f.origX-f.x)*0.1;
                    f.y += (f.origY-f.y)*0.1;
                });
            }
            // Clamp
            branchFlowers.forEach(f => {
                f.x = Math.max(f.r+3, Math.min(W-f.r-3, f.x));
                f.y = Math.max(f.r+3, Math.min(groundY-f.r-12, f.y));
                allFlowers.push(f);
            });

            // Region label at tip
            branchG.append("text").attr("class","branch-label")
                .attr("x", ex + sign*8).attr("y", ey - 6)
                .attr("text-anchor", side==="left"?"end":"start")
                .attr("font-size", Math.min(11, 8+n*0.12)+"px")
                .attr("fill", regionColor).attr("font-weight","600").attr("opacity",0.9)
                .text(region);

            // Foliage leaves
            const leafN = Math.min(n, 8);
            for (let li = 0; li < leafN; li++) {
                const lt = 0.05 + rng()*0.65;
                const lp = bzPt(sx,sy,cpx,cpy,ex,ey,lt);
                const ln2 = bzNorm(sx,sy,cpx,cpy,ex,ey,lt);
                const lx = lp.x + ln2.x*((rng()-0.5)*22) + (rng()-0.5)*8;
                const ly = lp.y + ln2.y*((rng()-0.5)*22) + (rng()-0.5)*8;
                const ls = 5+rng()*7, lr = (rng()-0.5)*80;
                const lc = ["var(--leaf-color-1)","var(--leaf-color-2)","var(--leaf-color-3)"];
                canopy.append("ellipse")
                    .attr("cx",lx).attr("cy",ly).attr("rx",ls).attr("ry",ls*0.38)
                    .attr("fill",lc[li%3]).attr("opacity",0.35+rng()*0.3)
                    .attr("transform",`rotate(${lr},${lx},${ly})`);
            }

            // Branch click
            branchG.on("click", function(event) {
                event.stopPropagation();
                showRegionDetail(region, countries);
            });
        });
    }

    layoutSide(leftBranches, "left");
    layoutSide(rightBranches, "right");

    // --- Global cross-branch collision ---
    for (let iter = 0; iter < 30; iter++) {
        let moved = false;
        for (let i = 0; i < allFlowers.length; i++) {
            for (let j = i+1; j < allFlowers.length; j++) {
                const a = allFlowers[i], b = allFlowers[j];
                const dx = b.x-a.x, dy = b.y-a.y;
                const d2 = dx*dx+dy*dy;
                const minD = a.r+b.r+4;
                if (d2 < minD*minD && d2 > 0.01) {
                    const dist = Math.sqrt(d2);
                    const ov = (minD-dist)*0.45;
                    const ux=dx/dist, uy=dy/dist;
                    a.x -= ux*ov; a.y -= uy*ov;
                    b.x += ux*ov; b.y += uy*ov;
                    moved = true;
                }
            }
        }
        if (!moved) break;
    }
    // Final clamp
    allFlowers.forEach(f => {
        f.x = Math.max(f.r+3, Math.min(W-f.r-3, f.x));
        f.y = Math.max(f.r+3, Math.min(groundY-f.r-12, f.y));
    });

    // --- Draw stems from branch to each flower ---
    const stemGroup = canopy.append("g").attr("class", "stems-layer");
    allFlowers.forEach(f => {
        const dx = f.x - f.anchorX, dy = f.y - f.anchorY;
        const dist = Math.hypot(dx, dy);
        if (dist > 3) {
            // Slightly curved stem from branch point to flower base
            const perpX = -dy / dist, perpY = dx / dist;
            const wobble = dist * 0.08;
            const midX = (f.anchorX + f.x) / 2 + perpX * wobble;
            const midY = (f.anchorY + f.y) / 2 + perpY * wobble;
            stemGroup.append("path")
                .attr("d", `M ${f.anchorX} ${f.anchorY} Q ${midX} ${midY}, ${f.x} ${f.y}`)
                .attr("stroke", "#5a7a32")
                .attr("stroke-width", 1.3)
                .attr("fill", "none")
                .attr("opacity", 0.5)
                .attr("stroke-linecap", "round");
        }
    });

    // --- Draw all flowers ---
    allFlowers.forEach(f => drawFlower(canopy, f.c, f.x, f.y, data));

    canopy.selectAll(".flower-group").raise();
    if (selectedRegion) highlightRegion(selectedRegion);
}

// ========================================================
// DRAW A FLOWER
// ========================================================
function drawFlower(parent, c, x, y, allYearData) {
    const happiness = c.happiness || 0;
    const active = getActiveFactors();
    let flowerRadius;

    if (active.length === FACTORS.length || active.length === 0) {
        // All selected or none: size by happiness
        flowerRadius = 10 + (happiness/10)*18;
    } else {
        const vals = active.map(f => {
            const v = getFactorValue(c, f.key);
            if (v == null) return null;
            return getNormalizedValue(v, f.key, allYearData);
        }).filter(v => v != null);
        if (vals.length === 0) return;
        flowerRadius = 10 + d3.mean(vals)*18;
    }

    const g = parent.append("g")
        .attr("class","flower-group")
        .attr("transform",`translate(${x},${y})`);

    // Determine which petals to show
    const petalsToShow = active.length > 0 ? active : FACTORS;
    const numPetals = petalsToShow.length;

    petalsToShow.forEach((f, i) => {
        const val = getFactorValue(c, f.key);
        if (val == null) return;
        const norm = getNormalizedValue(val, f.key, allYearData);
        const pLen = flowerRadius * (0.6 + norm*0.6);
        const angle = (i/numPetals)*Math.PI*2 - Math.PI/2;
        const px = Math.cos(angle)*pLen, py = Math.sin(angle)*pLen;
        const pW = flowerRadius*0.35;
        const c1x = Math.cos(angle-0.35)*pLen*0.55, c1y = Math.sin(angle-0.35)*pLen*0.55;
        const c2x = Math.cos(angle+0.35)*pLen*0.55, c2y = Math.sin(angle+0.35)*pLen*0.55;

        g.append("path")
            .attr("d",`M 0 0 C ${c1x} ${c1y}, ${px-Math.sin(angle)*pW} ${py+Math.cos(angle)*pW}, ${px} ${py} C ${px+Math.sin(angle)*pW} ${py-Math.cos(angle)*pW}, ${c2x} ${c2y}, 0 0`)
            .attr("fill",f.color).attr("opacity",0.5+norm*0.45)
            .attr("stroke",d3.color(f.color).darker(0.5)).attr("stroke-width",0.5);
    });

    // Center circle
    g.append("circle").attr("r",flowerRadius*0.25)
        .attr("fill","#FFD54F").attr("stroke","#F9A825").attr("stroke-width",0.8);

    // Label
    g.append("text").attr("y",flowerRadius+11).attr("text-anchor","middle")
        .attr("font-size","7.5px").attr("font-family","var(--font-ui)")
        .attr("fill","var(--text-color)").attr("opacity",0.65)
        .text(c.country.length>14?c.country.slice(0,13)+"…":c.country);

    // Interactions
    g.on("mouseenter", function(event) {
        showTooltip(event, c);
        d3.select(this).raise().transition().duration(180)
            .attr("transform",`translate(${x},${y}) scale(1.35)`);
    })
    .on("mousemove", moveTooltip)
    .on("mouseleave", function() {
        hideTooltip();
        d3.select(this).transition().duration(180)
            .attr("transform",`translate(${x},${y}) scale(1)`);
    })
    .on("click", function(event) {
        event.stopPropagation();
        showTooltip(event, c);
    });
}

// ========================================================
// TOOLTIP
// ========================================================
function showTooltip(event, c) {
    d3.select("#tooltip-header").html(
        `🌸 ${c.country} <span style="opacity:0.6;font-size:0.85em;">(${c.year})</span>`
    );
    let html = "";
    FACTORS.forEach(f => {
        const val = getFactorValue(c, f.key);
        html += `<div class="tooltip-row">
            <span class="dot" style="background:${f.color}"></span>
            <span class="label">${f.label}</span>
            <span class="value">${val!=null?val.toFixed(3):"N/A"}</span>
        </div>`;
    });
    html += `<div class="tooltip-happiness">🌻 Happiness: ${c.happiness!=null?c.happiness.toFixed(2):"N/A"}</div>`;
    html += `<div style="text-align:center;opacity:0.5;font-size:0.75em;margin-top:4px;">${c.region}</div>`;
    d3.select("#tooltip-body").html(html);
    d3.select("#tooltip").classed("hidden", false);
    moveTooltip(event);
}
function moveTooltip(event) {
    const el = document.getElementById("tooltip");
    const pad = 16;
    let x = event.clientX+pad, y = event.clientY+pad;
    const r = el.getBoundingClientRect();
    if (x+r.width>window.innerWidth) x = event.clientX-r.width-pad;
    if (y+r.height>window.innerHeight) y = event.clientY-r.height-pad;
    el.style.left = x+"px"; el.style.top = y+"px";
}
function hideTooltip() { d3.select("#tooltip").classed("hidden",true); }

// ========================================================
// REGION DETAIL — Stacked Area Chart (countries × factors)
// ========================================================
function showRegionDetail(region, countries) {
    selectedRegion = region;
    highlightRegion(region);
    d3.select("#region-detail").classed("hidden", false);
    d3.select("#region-detail-title").text(`${region} — Happiness Breakdown by Country`);

    // Sort countries by happiness descending
    const sorted = countries.slice().sort((a, b) => (b.happiness || 0) - (a.happiness || 0));

    const factorKeys = FACTORS.map(f => f.key);

    // Build stack data: scale factors proportionally so they sum to happiness
    const stackData = sorted.map(c => {
        const obj = { country: c.country, happiness: c.happiness || 0 };
        const rawVals = {};
        let rawSum = 0;
        factorKeys.forEach(k => {
            let v = getFactorValue(c, k);
            if (v == null) v = 0;
            if (k === "Log GDP per capita") v = v / 12;
            else if (k === "Healthy life expectancy at birth") v = v / 80;
            rawVals[k] = Math.max(0, v);
            rawSum += Math.max(0, v);
        });
        const scale = rawSum > 0 ? obj.happiness / rawSum : 0;
        factorKeys.forEach(k => { obj[k] = rawVals[k] * scale; });
        return obj;
    });

    const margin = { top: 36, right: 20, bottom: 90, left: 50 };
    const el = document.getElementById("region-detail");
    const W = Math.max(el.clientWidth - 40, 500);
    const H = 400;
    const w = W - margin.left - margin.right;
    const h = H - margin.top - margin.bottom;

    const svg = d3.select("#region-chart")
        .attr("viewBox", `0 0 ${W} ${H}`)
        .attr("preserveAspectRatio", "xMidYMid meet");
    svg.selectAll("*").remove();

    const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

    const stack = d3.stack().keys(factorKeys).order(d3.stackOrderNone).offset(d3.stackOffsetNone);
    const series = stack(stackData);

    // X: point scale so countries are evenly spaced with an area curve between them
    const x = d3.scalePoint()
        .domain(sorted.map(c => c.country))
        .range([0, w])
        .padding(0.3);

    const yMax = d3.max(sorted, c => c.happiness || 0) || 10;
    const y = d3.scaleLinear().domain([0, Math.ceil(yMax)]).range([h, 0]);

    // Draw stacked areas
    const area = d3.area()
        .x((d, i) => x(sorted[i].country))
        .y0(d => y(d[0]))
        .y1(d => y(d[1]))
        .curve(d3.curveMonotoneX);

    series.forEach((layer, si) => {
        g.append("path")
            .datum(layer)
            .attr("d", area)
            .attr("fill", FACTORS[si].color)
            .attr("opacity", 0.75)
            .attr("stroke", d3.color(FACTORS[si].color).darker(0.4))
            .attr("stroke-width", 0.6);
    });

    // X axis — country names at 35° angle
    g.append("g")
        .attr("transform", `translate(0,${h})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-35)")
        .style("text-anchor", "end")
        .style("font-size", sorted.length > 20 ? "7px" : "8.5px")
        .style("font-family", "var(--font-ui)");

    // Y axis — happiness score
    g.append("g")
        .call(d3.axisLeft(y).ticks(6))
        .selectAll("text")
        .style("font-size", "9px")
        .style("font-family", "var(--font-ui)");

    // Y axis label
    g.append("text")
        .attr("x", -h / 2).attr("y", -38)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .style("font-size", "10px").style("font-family", "var(--font-ui)")
        .attr("fill", "var(--text-muted)")
        .text("Happiness Score (stacked factors)");

    // Legend
    const lg = svg.append("g").attr("transform", `translate(${margin.left + 5}, 8)`);
    FACTORS.forEach((f, i) => {
        const lx = i * 92;
        lg.append("rect").attr("x", lx).attr("y", 0).attr("width", 10).attr("height", 10).attr("rx", 2).attr("fill", f.color);
        lg.append("text").attr("x", lx + 14).attr("y", 9).text(f.shortLabel)
            .style("font-size", "8.5px").style("font-family", "var(--font-ui)").attr("fill", "var(--text-color)");
    });

    el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function highlightRegion(region) {
    d3.selectAll(".branch-group").each(function() {
        const r = d3.select(this).attr("data-region");
        d3.select(this).selectAll(".branch-path")
            .attr("opacity", r===region?1:0.3)
            .attr("stroke", r===region?(REGION_COLORS[r]||"#5D4037"):"#5D4037");
    });
}
function clearRegionHighlight() {
    d3.selectAll(".branch-group").selectAll(".branch-path")
        .attr("opacity",0.88).attr("stroke","#5D4037");
    selectedRegion = null;
}

// ========================================================
// FALLING LEAVES
// ========================================================
function initLeaves() {
    const cv = document.getElementById("leaves-canvas");
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    leaves = [];
    for (let i = 0; i < 22; i++) {
        leaves.push({
            x:Math.random()*cv.width, y:Math.random()*cv.height,
            size:4+Math.random()*7, speedY:0.25+Math.random()*0.6,
            speedX:(Math.random()-0.5)*0.4, rotation:Math.random()*360,
            rotSpeed:(Math.random()-0.5)*1.8, opacity:0.25+Math.random()*0.35
        });
    }
    animateLeaves();
}
function animateLeaves() {
    const cv = document.getElementById("leaves-canvas");
    const ctx = cv.getContext("2d");
    const sc = {
        spring:["#FFB7C5","#FF9DB5","#FFC1CC"],
        summer:["#FFD54F","#FFF176","#FFE082"],
        autumn:["#FF6D00","#FF8F00","#D84315","#E65100"],
        winter:["#E0E0E0","#B0BEC5","#CFD8DC","#FFF"]
    };
    (function frame(){
        cv.width=window.innerWidth; cv.height=window.innerHeight;
        ctx.clearRect(0,0,cv.width,cv.height);
        const cols = sc[currentSeason]||sc.spring;
        leaves.forEach(l=>{
            ctx.save(); ctx.translate(l.x,l.y);
            ctx.rotate(l.rotation*Math.PI/180);
            ctx.globalAlpha=l.opacity;
            ctx.fillStyle=cols[Math.abs(Math.floor(l.x*7+l.y*3))%cols.length];
            if(currentSeason==="winter"){ctx.beginPath();ctx.arc(0,0,l.size*0.45,0,Math.PI*2);ctx.fill();}
            else{ctx.beginPath();ctx.ellipse(0,0,l.size,l.size*0.42,0,0,Math.PI*2);ctx.fill();}
            ctx.restore();
            l.y+=l.speedY; l.x+=l.speedX+Math.sin(l.y*0.008)*0.25; l.rotation+=l.rotSpeed;
            if(l.y>cv.height+20){l.y=-15;l.x=Math.random()*cv.width;}
            if(l.x>cv.width+20)l.x=-15; if(l.x<-20)l.x=cv.width+15;
        });
        requestAnimationFrame(frame);
    })();
}

// ========================================================
// EVENT LISTENERS
// ========================================================
function setupEventListeners() {
    document.querySelectorAll(".factor-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const factor = this.dataset.factor;
            if (selectedFactors.has(factor)) {
                selectedFactors.delete(factor);
                this.classList.remove("active");
            } else {
                selectedFactors.add(factor);
                this.classList.add("active");
            }
            drawTree();
        });
    });

    const slider = document.getElementById("year-slider");
    slider.addEventListener("input", function() {
        currentYear = +this.value;
        document.getElementById("year-display").textContent = currentYear;
        isAllYears = false;
        document.getElementById("all-years-btn").classList.remove("active");
        drawTree();
    });

    document.getElementById("all-years-btn").addEventListener("click", function() {
        isAllYears = !isAllYears;
        this.classList.toggle("active", isAllYears);
        document.getElementById("year-display").textContent = isAllYears?"All Years":currentYear;
        drawTree();
    });

    document.getElementById("play-btn").addEventListener("click", function() {
        if (isPlaying) {
            clearInterval(playInterval); isPlaying=false; this.textContent="▶ Play"; return;
        }
        isPlaying=true; isAllYears=false;
        document.getElementById("all-years-btn").classList.remove("active");
        this.textContent="⏸ Pause";
        currentYear=2005; slider.value=currentYear;
        document.getElementById("year-display").textContent=currentYear;
        playInterval = setInterval(()=>{
            currentYear++; if(currentYear>2023) currentYear=2005;
            slider.value=currentYear;
            document.getElementById("year-display").textContent=currentYear;
            drawTree();
        }, 1200);
    });

    document.getElementById("close-region-detail").addEventListener("click", function() {
        d3.select("#region-detail").classed("hidden",true);
        clearRegionHighlight(); drawTree();
    });

    document.querySelectorAll(".season-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".season-btn").forEach(b=>b.classList.remove("active"));
            this.classList.add("active");
            currentSeason = this.dataset.season;
            document.body.className = currentSeason==="spring"?"":currentSeason;
        });
    });

    d3.select("#tree-svg").on("click", function() {
        clearRegionHighlight();
        d3.select("#region-detail").classed("hidden",true);
    });

    let resizeTimer;
    window.addEventListener("resize",()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(drawTree,150);});
}