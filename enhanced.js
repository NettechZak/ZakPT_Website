/**
 * Enhanced JavaScript for ZakPT Website
 * Includes scroll animations, interactive features, theme toggle, and performance optimizations
 */

// ========================================
// CONFIGURATION
// ========================================

// CONFIG loaded from data.js

// WORKBENCH_DATA loaded from data.js

// ========================================
// SERVER & MODAL DATA
// ========================================

// SERVER_DATA loaded from data.js

// TOPOLOGY_DATA loaded from data.js

// NETWORK_NODES loaded from data.js

// SERVICE_DATA loaded from data.js

// ========================================
// CYBERSECURITY DATA
// ========================================

// CYBER_LABS_DATA loaded from data.js
// CYBER_CHEATSHEETS_DATA loaded from data.js
// CYBER_FRAMEWORKS_DATA loaded from data.js
// CYBER_TOOLS_DATA loaded from data.js
// ========================================
// MODAL SYSTEM
// ========================================

function openModal(content) {
    console.log('openModal called with content length:', content ? content.length : 0);
    const modal = document.getElementById('detail-modal');
    const modalBody = document.getElementById('modal-body');
    console.log('Modal element:', modal);
    console.log('Modal body element:', modalBody);

    if (!modal || !modalBody) {
        console.error('Modal or modalBody not found!');
        return;
    }

    modalBody.innerHTML = content;
    modal.classList.add('active');
    console.log('Modal classList after adding active:', modal.classList);
    console.log('Modal display style:', window.getComputedStyle(modal).display);
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('detail-modal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function renderServerModal(serverId) {
    const server = SERVER_DATA[serverId];
    if (!server) return;

    // Check if it's a switch to render the Port Manager UI
    if (serverId === 'unifi-udm-pro' || serverId === 'udm-enterprise-poe') {
        renderPortManagerModal(server, serverId);
        return;
    }

    const html = `
        <h2 class="modal-title">${server.name}</h2>
        <span class="modal-subtitle mono">${server.type}</span>
        <div class="modal-specs">
            ${Object.entries(server.specs).map(([key, value]) => `
                <div class="spec-row">
                    <span class="spec-label">${key.toUpperCase()}</span>
                    <span class="spec-value mono">${value}</span>
                </div>
            `).join('')}
            <div class="spec-row">
                <span class="spec-label">UPTIME</span>
                <span class="spec-value mono">${server.uptime}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">POWER DRAW</span>
                <span class="spec-value mono">${server.powerDraw}</span>
            </div>
        </div>
        <div class="modal-services">
            <h3>Running Services</h3>
            <div class="service-tags">
                ${server.services.map(s => `<span class="service-tag">${s}</span>`).join('')}
            </div>
        </div>
    `;
    openModal(html);
}

// Port Manager State
let currentPortManagerTab = 'ports';
let activeServerId = null;

function renderPortManagerModal(server, serverId) {
    activeServerId = serverId;
    currentPortManagerTab = 'ports'; // Reset to default tab

    const html = `
        <div class="unifi-port-manager">
            <div class="upm-header">
                <div class="upm-title">UniFi</div>
                <div class="upm-tabs">
                    <button class="upm-tab active" onclick="switchPortManagerTab('ports')">Ports</button>
                    <button class="upm-tab" onclick="switchPortManagerTab('insights')">Insights</button>
                    <button class="upm-tab" onclick="switchPortManagerTab('vlans')">VLANs</button>
                </div>
                <div style="color: #888; font-size: 0.9rem;">${server.name}</div>
            </div>
            <div class="upm-device-view" id="upm-content">
                ${renderPortsView(server)}
            </div>
        </div>
    `;
    openModal(html);
}

function switchPortManagerTab(tab) {
    currentPortManagerTab = tab;

    // Update Tab UI
    document.querySelectorAll('.upm-tab').forEach(t => {
        t.classList.remove('active');
        if (t.textContent.toLowerCase() === tab) t.classList.add('active');
    });

    // Render Content
    const container = document.getElementById('upm-content');
    const server = SERVER_DATA[activeServerId];

    if (tab === 'ports') {
        container.innerHTML = renderPortsView(server);
    } else if (tab === 'insights') {
        container.innerHTML = renderInsightsView(server);
    } else if (tab === 'vlans') {
        container.innerHTML = renderVlansView(server);
    }
}

function renderPortsView(server) {
    let portsHtml = '';
    const model = server.specs.model;

    if (model === 'UDM-PRO') {
        // 8x GbE Ports (Stacked 1-8)
        for (let i = 1; i <= 7; i += 2) {
            portsHtml += createPortPair(
                createPortData(i, 'gbe', '1 GbE', true),
                createPortData(i + 1, 'gbe', '1 GbE', true)
            );
        }

        // SFP+ Ports (Stacked 9-10)
        portsHtml += createPortPair(
            createPortData(9, 'ten-gbe', '10 GbE SFP+', false, 'sfp'),
            createPortData(10, 'ten-gbe', '10 GbE SFP+', false, 'sfp')
        );

        // WAN Port (Separate)
        portsHtml += createPortPair(
            createPortData('W', 'gbe', 'WAN (1 GbE)', false, 'wan'),
            null
        );

    } else if (model === 'ECS-24-PoE') {
        // 24x RJ45 Ports (Stacked 1-24)
        for (let i = 1; i <= 23; i += 2) {
            const topPort = i;
            const bottomPort = i + 1;

            // Determine type (1-8 = 2.5G, 9-24 = 10G)
            const topType = topPort <= 8 ? '2.5 GbE' : '10 GbE';
            const bottomType = bottomPort <= 8 ? '2.5 GbE' : '10 GbE';
            const topClass = topPort <= 8 ? 'gbe' : 'ten-gbe';
            const bottomClass = bottomPort <= 8 ? 'gbe' : 'ten-gbe';

            portsHtml += createPortPair(
                createPortData(topPort, topClass, topType, true),
                createPortData(bottomPort, bottomClass, bottomType, true)
            );
        }

        // 2x 25G SFP28 (Stacked 25-26)
        portsHtml += createPortPair(
            createPortData(25, 'sfp25', '25 GbE SFP28', false, 'sfp'),
            createPortData(26, 'sfp25', '25 GbE SFP28', false, 'sfp')
        );
    }

    return `
        <div class="upm-port-grid controller-style">
            ${portsHtml}
        </div>
        <div class="upm-legend">
            <div class="legend-item"><div class="legend-dot" style="background: #2ecc71;"></div> GbE</div>
            <div class="legend-item"><div class="legend-dot" style="background: #3498db;"></div> 10 GbE</div>
            <div class="legend-item"><div class="legend-dot" style="background: #9b59b6;"></div> 25 GbE</div>
            <div class="legend-item"><div class="legend-dot" style="background: #2a2a2a; border: 1px solid #444;"></div> Disconnected</div>
        </div>
    `;
}

function createPortData(id, type, tooltip, canHaveDevice = false, iconType = null) {
    const isConnected = Math.random() > 0.4;
    let device = null;

    if (isConnected && canHaveDevice) {
        const devices = [
            { type: 'desktop', icon: 'fa-desktop', name: 'Desktop-PC' },
            { type: 'laptop', icon: 'fa-laptop', name: 'MacBook-Pro' },
            { type: 'server', icon: 'fa-server', name: 'Ubuntu-Srv' },
            { type: 'wifi', icon: 'fa-wifi', name: 'U6-Pro' },
            { type: 'printer', icon: 'fa-print', name: 'HP-LaserJet' }
        ];
        const randomDevice = devices[Math.floor(Math.random() * devices.length)];
        device = {
            ...randomDevice,
            name: randomDevice.name + '-' + Math.floor(Math.random() * 99)
        };
    }

    return {
        id: id,
        class: isConnected ? type : 'disconnected',
        tooltip: isConnected ? tooltip : 'Disconnected',
        device: device,
        iconType: iconType // 'wan', 'sfp', or null
    };
}

function createPortPair(top, bottom) {
    let html = '<div class="port-column">';

    // Top Device
    html += '<div class="device-slot top">';
    if (top && top.device) {
        html += `
            <div class="device-icon"><i class="fas ${top.device.icon}"></i></div>
            <div class="device-name">${top.device.name}</div>
            <div class="connection-line"></div>
        `;
    }
    html += '</div>';

    // Top Port
    if (top) {
        let innerIcon = '';
        if (top.iconType === 'wan') innerIcon = '<i class="fas fa-globe"></i>';
        if (top.iconType === 'sfp') innerIcon = '<span style="font-size: 0.6rem">SFP</span>';

        html += `<div class="upm-port top ${top.class}" data-tooltip="Port ${top.id}: ${top.tooltip}">
                    <span class="port-id">${top.id}</span>
                    ${innerIcon}
                 </div>`;
    } else {
        html += '<div class="upm-port-spacer"></div>';
    }

    // Bottom Port
    if (bottom) {
        let innerIcon = '';
        if (bottom.iconType === 'wan') innerIcon = '<i class="fas fa-globe"></i>';
        if (bottom.iconType === 'sfp') innerIcon = '<span style="font-size: 0.6rem">SFP</span>';

        html += `<div class="upm-port bottom ${bottom.class}" data-tooltip="Port ${bottom.id}: ${bottom.tooltip}">
                    <span class="port-id">${bottom.id}</span>
                    ${innerIcon}
                 </div>`;
    } else {
        html += '<div class="upm-port-spacer"></div>';
    }

    // Bottom Device
    html += '<div class="device-slot bottom">';
    if (bottom && bottom.device) {
        html += `
            <div class="connection-line"></div>
            <div class="device-icon"><i class="fas ${bottom.device.icon}"></i></div>
            <div class="device-name">${bottom.device.name}</div>
        `;
    }
    html += '</div>';

    html += '</div>';
    return html;
}

function renderInsightsView(server) {
    return `
        <div class="upm-insights">
            <div class="insight-card">
                <h3>Traffic History</h3>
                <div class="chart-placeholder" style="height: 150px; background: linear-gradient(180deg, rgba(52, 152, 219, 0.2) 0%, rgba(0,0,0,0) 100%); border-bottom: 2px solid #3498db; display: flex; align-items: flex-end; justify-content: space-around; padding-bottom: 5px;">
                    ${Array(12).fill(0).map(() => `<div style="width: 6%; background: #3498db; opacity: 0.5; height: ${20 + Math.random() * 80}%;"></div>`).join('')}
                </div>
            </div>
            <div class="insight-stats">
                <div class="stat-box">
                    <span class="label">Tx Packets</span>
                    <span class="value">${Math.floor(Math.random() * 1000000).toLocaleString()}</span>
                </div>
                <div class="stat-box">
                    <span class="label">Rx Packets</span>
                    <span class="value">${Math.floor(Math.random() * 1000000).toLocaleString()}</span>
                </div>
                <div class="stat-box">
                    <span class="label">PoE Usage</span>
                    <span class="value">${Math.floor(Math.random() * 400)}W / 1050W</span>
                </div>
            </div>
        </div>
    `;
}

function renderVlansView(server) {
    const vlans = [
        { id: 1, name: 'Default', subnet: '192.168.1.0/24' },
        { id: 10, name: 'IoT', subnet: '192.168.10.0/24' },
        { id: 20, name: 'Guest', subnet: '192.168.20.0/24' },
        { id: 30, name: 'Cameras', subnet: '192.168.30.0/24' },
        { id: 40, name: 'Servers', subnet: '192.168.40.0/24' }
    ];

    return `
        <div class="upm-vlans">
            <table class="vlan-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Subnet</th>
                        <th>Clients</th>
                    </tr>
                </thead>
                <tbody>
                    ${vlans.map(v => `
                        <tr>
                            <td>${v.id}</td>
                            <td>${v.name}</td>
                            <td class="mono">${v.subnet}</td>
                            <td>${Math.floor(Math.random() * 20)}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function renderTopologyModal() {
    const topo = TOPOLOGY_DATA;
    const html = `
        <h2 class="modal-title">${topo.title}</h2>
        <span class="modal-subtitle mono">${topo.description}</span>
        <div class="modal-specs">
            <div class="spec-row">
                <span class="spec-label">ROUTING</span>
                <span class="spec-value mono">${topo.routing}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">FIREWALL</span>
                <span class="spec-value mono">${topo.firewall}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">DNS</span>
                <span class="spec-value mono">${topo.dns}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">BANDWIDTH</span>
                <span class="spec-value mono">${topo.bandwidth}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">TOTAL DEVICES</span>
                <span class="spec-value mono">${topo.devices.total} (${topo.devices.wired} wired / ${topo.devices.wireless} wireless)</span>
            </div>
        </div>
        <div class="modal-services">
            <h3>VLANs</h3>
            ${topo.vlans.map(vlan => `
                <div class="spec-row">
                    <span class="spec-label">VLAN ${vlan.id} - ${vlan.name.toUpperCase()}</span>
                    <span class="spec-value mono">${vlan.subnet} (${vlan.devices} devices)</span>
                </div>
            `).join('')}
        </div>
    `;
    openModal(html);
}

function renderNodeModal(nodeId) {
    const node = NETWORK_NODES[nodeId];
    if (!node) return;

    let detailsHtml = '';

    // Different rendering based on node type
    if (node.specs) {
        detailsHtml = `
            <div class="modal-specs">
                ${node.ip ? `<div class="spec-row">
                    <span class="spec-label">IP ADDRESS</span>
                    <span class="spec-value mono">${node.ip}</span>
                </div>` : ''}
                ${Object.entries(node.specs).map(([key, value]) => `
                    <div class="spec-row">
                        <span class="spec-label">${key.toUpperCase().replace(/_/g, ' ')}</span>
                        <span class="spec-value mono">${value}</span>
                    </div>
                `).join('')}
                ${node.uptime ? `<div class="spec-row">
                    <span class="spec-label">UPTIME</span>
                    <span class="spec-value mono">${node.uptime}</span>
                </div>` : ''}
                ${node.connected_devices ? `<div class="spec-row">
                    <span class="spec-label">CONNECTED DEVICES</span>
                    <span class="spec-value mono">${node.connected_devices}</span>
                </div>` : ''}
                ${node.connected_clients ? `<div class="spec-row">
                    <span class="spec-label">CONNECTED CLIENTS</span>
                    <span class="spec-value mono">${node.connected_clients}</span>
                </div>` : ''}
            </div>
        `;
    } else if (node.vlan) {
        // VLAN segment rendering
        detailsHtml = `
            <div class="modal-specs">
                <div class="spec-row">
                    <span class="spec-label">VLAN ID</span>
                    <span class="spec-value mono">${node.vlan}</span>
                </div>
                <div class="spec-row">
                    <span class="spec-label">SUBNET</span>
                    <span class="spec-value mono">${node.subnet}</span>
                </div>
                <div class="spec-row">
                    <span class="spec-label">GATEWAY</span>
                    <span class="spec-value mono">${node.gateway}</span>
                </div>
                ${node.device_count ? `<div class="spec-row">
                    <span class="spec-label">DEVICE COUNT</span>
                    <span class="spec-value mono">${node.device_count}</span>
                </div>` : ''}
                ${node.security ? `<div class="spec-row">
                    <span class="spec-label">SECURITY</span>
                    <span class="spec-value mono">${node.security}</span>
                </div>` : ''}
            </div>
        `;
    }

    const html = `
        <h2 class="modal-title">${node.name}</h2>
        <span class="modal-subtitle mono">${node.type}</span>
        ${detailsHtml}
        ${node.features ? `
            <div class="modal-services">
                <h3>Features</h3>
                <div class="service-tags">
                    ${node.features.map(f => `<span class="service-tag">${f}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        ${node.devices && Array.isArray(node.devices) ? `
            <div class="modal-services">
                <h3>Devices</h3>
                <div class="service-tags">
                    ${node.devices.map(d => `<span class="service-tag">${d}</span>`).join('')}
                </div>
            </div>
        ` : ''}
        ${node.services ? `
            <div class="modal-services">
                <h3>Services</h3>
                <div class="service-tags">
                    ${node.services.map(s => `<span class="service-tag">${s}</span>`).join('')}
                </div>
            </div>
        ` : ''}
    `;
    openModal(html);
}

function renderServiceModal(serviceId) {
    const service = SERVICE_DATA[serviceId];
    if (!service) return;

    const html = `
        <h2 class="modal-title">${service.name}</h2>
        <span class="modal-subtitle mono">${service.description}</span>
        <div class="modal-specs">
            <div class="spec-row">
                <span class="spec-label">CONTAINER</span>
                <span class="spec-value mono">${service.container}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">HOST</span>
                <span class="spec-value mono">${service.host}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">PORTS</span>
                <span class="spec-value mono">${service.ports.join(', ')}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">CPU USAGE</span>
                <span class="spec-value mono">${service.resources.cpu}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">RAM USAGE</span>
                <span class="spec-value mono">${service.resources.ram}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">STORAGE</span>
                <span class="spec-value mono">${service.resources.storage}</span>
            </div>
            <div class="spec-row">
                <span class="spec-label">UPTIME</span>
                <span class="spec-value mono">${service.uptime}</span>
            </div>
            ${service.url ? `
                <div class="spec-row">
                    <span class="spec-label">URL</span>
                    <span class="spec-value mono">${service.url}</span>
                </div>
            ` : ''}
        </div>
        ${service.stats ? `
            <div class="modal-services">
                <h3>Statistics</h3>
                <div class="service-tags">
                    ${Object.entries(service.stats).map(([key, value]) =>
        `<span class="service-tag">${key}: ${value}</span>`
    ).join('')}
                </div>
            </div>
        ` : ''}
    `;
    openModal(html);
}

// ========================================
// CYBERSECURITY MODAL RENDERERS
// ========================================

function renderCyberProjectModal(projectId) {
    const project = CYBER_LABS_DATA[projectId];
    if (!project) return;

    const html = `
        <h2 class="modal-title">${project.name}</h2>
        <span class="modal-subtitle">${project.category}</span>
        
        <div class="modal-section">
            <h3>DESCRIPTION</h3>
            <p>${project.description}</p>
        </div>

        <div class="modal-section">
            <h3>LEARNING OBJECTIVES</h3>
            <ul>
                ${project.objectives.map(obj => `<li>${obj}</li>`).join('')}
            </ul>
        </div>

        <div class="modal-section">
            <h3>TOOLS & TECHNOLOGIES</h3>
            <div class="service-tags">
                ${project.tools.map(tool => `<span class="service-tag">${tool}</span>`).join('')}
            </div>
        </div>

        ${project.code ? `
        <div class="modal-section">
            <h3>CODE EXAMPLE</h3>
            <pre class="mono" style="background: #000; padding: 1rem; border-radius: 4px; color: #00ff00; overflow-x: auto;">${project.code}</pre>
        </div>
        ` : ''}

        ${project.resources && project.resources.length > 0 ? `
        <div class="modal-section">
            <h3>RESOURCES</h3>
            <ul>
                ${project.resources.map(res => `<li><a href="${res.url}" target="_blank" style="color: var(--accent-blue);">${res.name}</a></li>`).join('')}
            </ul>
        </div>
        ` : ''}
    `;
    openModal(html);
}

function renderCyberDocModal(docId) {
    const doc = CYBER_CHEATSHEETS_DATA[docId];
    if (!doc) return;

    const html = `
        <h2 class="modal-title">${doc.name}</h2>
        <span class="modal-subtitle">${doc.category}</span>
        
        <div class="modal-section">
            <h3>DESCRIPTION</h3>
            <p>${doc.description}</p>
        </div>

        ${doc.content ? `
        <div class="modal-section">
            <h3>CHEATSHEET CONTENT</h3>
            <pre class="mono" style="background: #000; padding: 1.5rem; border-radius: 4px; color: #00ff00; overflow-x: auto; line-height: 1.6; white-space: pre-wrap;">${doc.content}</pre>
        </div>
        ` : ''}

        ${doc.tools && doc.tools.length > 0 ? `
        <div class="modal-section">
            <h3>TOOLS & TECHNOLOGIES</h3>
            <div class="service-tags">
                ${doc.tools.map(tool => `<span class="service-tag">${tool}</span>`).join('')}
            </div>
        </div>
        ` : ''}
    `;
    openModal(html);
}

function renderCyberFrameworkModal(frameworkId) {
    const framework = CYBER_FRAMEWORKS_DATA[frameworkId];
    if (!framework) return;

    const html = `
        <h2 class="modal-title">${framework.name}</h2>
        
        <div class="modal-section">
            <h3>OVERVIEW</h3>
            <p>${framework.description}</p>
            <p style="margin-top: 1rem;">${framework.overview}</p>
        </div>

        ${framework.tactics ? `
        <div class="modal-section">
            <h3>TACTICS</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem;">
                ${framework.tactics.map(tactic => `<div class="mono" style="background: rgba(0, 255, 102, 0.1); padding: 0.5rem; border-radius: 4px; border: 1px solid var(--accent-green);">${tactic}</div>`).join('')}
            </div>
        </div>
        ` : ''}

        ${framework.phases ? `
        <div class="modal-section">
            <h3>PHASES</h3>
            <ul>
                ${framework.phases.map(phase => `<li class="mono" style="margin-bottom: 0.5rem;">${phase}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        ${framework.functions ? `
        <div class="modal-section">
            <h3>CORE FUNCTIONS</h3>
            <ul>
                ${framework.functions.map(func => `<li class="mono" style="margin-bottom: 0.5rem;">${func}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        ${framework.controls ? `
        <div class="modal-section">
            <h3>KEY CONTROLS</h3>
            <ul>
                ${framework.controls.map(control => `<li class="mono" style="margin-bottom: 0.5rem;">${control}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        <div class="modal-section">
            <h3>USE CASE</h3>
            <p>${framework.useCase}</p>
        </div>

        ${framework.resources && framework.resources.length > 0 ? `
        <div class="modal-section">
            <h3>RESOURCES</h3>
            <ul>
                ${framework.resources.map(res => `<li><a href="${res.url}" target="_blank" style="color: var(--accent-blue);">${res.name}</a></li>`).join('')}
            </ul>
        </div>
        ` : ''}
    `;
    openModal(html);
}

function renderCyberToolModal(toolId) {
    const tool = CYBER_TOOLS_DATA[toolId];
    if (!tool) return;

    const html = `
        <h2 class="modal-title">${tool.name}</h2>
        <span class="modal-subtitle">${tool.category}</span>
        
        <div class="modal-section">
            <p>${tool.description}</p>
        </div>

        ${tool.useCases && tool.useCases.length > 0 ? `
        <div class="modal-section">
            <h3>USE CASES</h3>
            <ul>
                ${tool.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
            </ul>
        </div>
        ` : ''}

        ${tool.commands && tool.commands.length > 0 ? `
        <div class="modal-section">
            <h3>COMMON COMMANDS</h3>
            <pre class="mono" style="background: #000; padding: 1rem; border-radius: 4px; color: #00ff00; overflow-x: auto;">${tool.commands.join('\n')}</pre>
        </div>
        ` : ''}
    `;
    openModal(html);
}

// ========================================
// DYNAMIC CONTENT LOADING
// ======================================== 

const SEARCH_DATA = [
    { type: 'page', title: 'Home', description: 'Main landing page with workbench and feed', url: 'index.html' },
    { type: 'page', title: 'Homelab', description: 'Server rack, network topology, and services', url: 'homelab.html' },
    { type: 'page', title: 'Content', description: 'YouTube videos and blog posts', url: 'content.html' },
    {
        type: 'page',
        title: 'Cybersecurity',
        description: 'Red Team, Blue Team, CTF, and Research hub.',
        url: 'cybersecurity.html'
    },
    {
        type: 'page',
        title: 'Cyber Projects',
        description: 'Hacking labs, Rubber Ducky scripts, and CTF writeups.',
        url: 'cyber-projects.html'
    },
    {
        type: 'page',
        title: 'Cyber Documentation',
        description: 'Cheatsheets, hardening guides, and reference materials.',
        url: 'cyber-docs.html'
    },
    { type: 'page', title: 'Photography', description: 'Photo gallery and portfolio', url: 'photography.html' },
    { type: 'page', title: 'About', description: 'Bio, skills, timeline and contact', url: 'about.html' },
    { type: 'page', title: 'Gear', description: 'Hardware, software and desk setup', url: 'gear.html' },
    { type: 'page', title: 'Sponsors', description: 'Support options and affiliate products', url: 'sponsors.html' },
    { type: 'page', title: 'Links', description: 'Curated tools and resources', url: 'links.html' }
];

// Add workbench projects to search data
WORKBENCH_DATA.forEach(project => {
    SEARCH_DATA.push({
        type: 'project',
        title: project.title,
        description: project.description,
        url: project.link || '#'
    });
});

// Add servers to search data
Object.entries(SERVER_DATA).forEach(([id, server]) => {
    SEARCH_DATA.push({
        type: 'resource',
        title: server.name,
        description: `${server.type} - ${server.specs.cpu}`,
        url: '#',
        action: () => renderServerModal(id)
    });
});

// Add services to search data
Object.entries(SERVICE_DATA).forEach(([id, service]) => {
    SEARCH_DATA.push({
        type: 'resource',
        title: service.name,
        description: `${service.description} - Running on ${service.host}`,
        url: '#',
        action: () => renderServiceModal(id)
    });
});

// Add cyber projects to search data
if (typeof CYBER_LABS_DATA !== 'undefined') {
    Object.entries(CYBER_LABS_DATA).forEach(([id, project]) => {
        SEARCH_DATA.push({
            type: 'project',
            title: project.name,
            description: project.description,
            url: 'cyber-projects.html'
        });
    });
}

// Add cyber docs to search data
if (typeof CYBER_CHEATSHEETS_DATA !== 'undefined') {
    Object.entries(CYBER_CHEATSHEETS_DATA).forEach(([id, doc]) => {
        SEARCH_DATA.push({
            type: 'doc',
            title: doc.name,
            description: doc.description,
            url: 'cyber-docs.html'
        });
    });
}

let fuse;

function initSearch() {
    const searchIcon = document.getElementById('search-icon-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close-btn');
    const searchResults = document.getElementById('search-results');

    if (!searchIcon || !searchOverlay || !searchInput) return;

    // Initialize Fuse.js
    fuse = new Fuse(SEARCH_DATA, {
        keys: ['title', 'description'],
        threshold: 0.4,
        includeScore: true
    });

    // Open search
    searchIcon.addEventListener('click', () => {
        searchOverlay.classList.add('active');
        setTimeout(() => searchInput.focus(), 100);
    });

    // Close search
    searchClose?.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
        searchResults.classList.remove('has-results');
    });

    // Search input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (!query) {
            searchResults.classList.remove('has-results');
            searchResults.innerHTML = '';
            return;
        }

        const results = fuse.search(query).slice(0, 8);
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-no-results mono">No results found</div>';
        } else {
            searchResults.innerHTML = results.map(r => {
                const item = r.item;
                if (item.action) {
                    return `
                        <div class="search-result-item" data-action="true" data-id="${item.title}">
                            <span class="search-result-type ${item.type} mono">${item.type.toUpperCase()}</span>
                            <div class="search-result-title">${item.title}</div>
                            <div class="search-result-description">${item.description}</div>
                        </div>
                    `;
                } else {
                    return `
                        <a href="${item.url}" class="search-result-item">
                            <span class="search-result-type ${item.type} mono">${item.type.toUpperCase()}</span>
                            <div class="search-result-title">${item.title}</div>
                            <div class="search-result-description">${item.description}</div>
                        </a>
                    `;
                }
            }).join('');

            // Add click handlers for action items
            document.querySelectorAll('.search-result-item[data-action="true"]').forEach(item => {
                item.addEventListener('click', () => {
                    const result = results.find(r => r.item.title === item.dataset.id);
                    if (result && result.item.action) {
                        result.item.action();
                        searchOverlay.classList.remove('active');
                        searchInput.value = '';
                        searchResults.innerHTML = '';
                    }
                });
            });
        }
        searchResults.classList.add('has-results');
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (searchOverlay.classList.contains('active')) {
                searchOverlay.classList.remove('active');
                searchInput.value = '';
                searchResults.innerHTML = '';
            }
            if (document.getElementById('detail-modal')?.classList.contains('active')) {
                closeModal();
            }
        }
    });

    // Close search overlay on click outside
    searchOverlay.addEventListener('click', (e) => {
        if (e.target === searchOverlay) {
            searchOverlay.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

}
// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Debounce function to limit function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Check if element is in viewport
 */
function isInViewport(element, offset = 100) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset &&
        rect.bottom >= offset
    );
}

// ========================================
// SCROLL ANIMATIONS
// ========================================

/**
 * Initialize scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');

    if (!animatedElements.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));
}

// ========================================
// PARTICLE BACKGROUND
// ========================================

/**
 * Create animated particle background
 */
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';

        // Random color
        const colors = ['var(--accent-orange)', 'var(--accent-purple)', 'var(--accent-blue)', 'var(--accent-green)'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];

        particlesContainer.appendChild(particle);
    }
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================

/**
 * Initialize scroll to top button
 */
function initScrollToTop() {
    // Create button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '↑';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);

    // Show/hide on scroll
    const toggleButton = debounce(() => {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }, 100);

    window.addEventListener('scroll', toggleButton);

    // Scroll to top on click
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// REAL-TIME STATS SIMULATION
// ========================================

/**
 * Animate stats with realistic fluctuations
 */
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const text = stat.textContent.trim();

        // Power draw simulation
        if (text.includes('W')) {
            setInterval(() => {
                const baseValue = 450;
                const variance = Math.floor(Math.random() * 20) - 10;
                stat.textContent = (baseValue + variance) + 'W';
            }, 3000);
        }

        // Temperature simulation
        if (text.includes('°C')) {
            setInterval(() => {
                const baseValue = 24;
                const variance = Math.floor(Math.random() * 4) - 2;
                stat.textContent = (baseValue + variance) + '°C';
            }, 5000);
        }
    });
}

// ========================================
// INTERACTIVE SERVER RACK
// ========================================

/**
 * Add interactivity to server units
 */
function initInteractiveRack() {
    const serverUnits = document.querySelectorAll('.server-unit');

    serverUnits.forEach((unit, index) => {
        unit.classList.add('interactive', 'tooltip');

        // Add tooltip data
        const label = unit.querySelector('.server-label, .server-name');
        if (label) {
            unit.setAttribute('data-tooltip', `Click for ${label.textContent} details`);
        }

        // Add click handler
        unit.addEventListener('click', () => {
            // Could open a modal with server details
            console.log(`Server unit ${index + 1} clicked`);
            unit.style.borderLeftColor = 'var(--accent-green)';
            setTimeout(() => {
                unit.style.borderLeftColor = '';
            }, 1000);
        });
    });
}

// ========================================
// NETWORK FLOW ANIMATION
// ========================================

/**
 * Add animated data flow to network topology
 */
function initNetworkFlow() {
    const connectors = document.querySelectorAll('.topo-connector.vertical');

    connectors.forEach(connector => {
        // Create flow particles
        setInterval(() => {
            const flow = document.createElement('div');
            flow.className = 'network-flow';
            connector.style.position = 'relative';
            connector.appendChild(flow);

            // Remove after animation
            setTimeout(() => flow.remove(), 3000);
        }, 2000 + Math.random() * 2000);
    });
}

// ========================================
// ENHANCED TYPING EFFECT
// ========================================

/**
 * Enhanced typing effect with cursor
 */
function enhancedTypingEffect() {
    const textToType = "Exploring the digital frontier.";
    const typingElement = document.getElementById('typing-text');

    if (!typingElement) return;

    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, 80 + Math.random() * 40); // Variable speed for realism
        }
    }

    setTimeout(type, 1500);
}

// ========================================
// KEYBOARD NAVIGATION
// ========================================

/**
 * Enhanced keyboard navigation
 */
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K for search (placeholder)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            console.log('Search triggered');
        }

        // Escape to close modals
        if (e.key === 'Escape') {
            // Close any open modals
            console.log('Escape pressed');
        }
    });
}

// ========================================
// LOADING SCREEN
// ========================================

/**
 * Show loading screen and hide when page is ready
 */
function initLoadingScreen() {
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-logo">
            <span class="bracket">[</span><span class="accent-orange">ZAK</span><span class="accent-purple">PT</span><span class="bracket">]</span>
        </div>
    `;
    document.body.prepend(loadingScreen);

    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => loadingScreen.remove(), 500);
        }, 500);
    });
}

// ========================================
// ENHANCED CARD EFFECTS
// ========================================

/**
 * Add 3D tilt effect to cards
 */
function init3DCards() {
    const cards = document.querySelectorAll('.project-card, .content-card');

    cards.forEach(card => {
        card.classList.add('card-3d');
    });
}

// ========================================
// SMOOTH SCROLL
// ========================================

/**
 * Enhanced smooth scrolling for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// GENERATE SWITCH PORT LIGHTS
// ========================================

/**
 * Generate switch port lights with animations
 */
function generateSwitchPorts() {
    const switchUnit = document.querySelector('.switch .port-lights');
    if (switchUnit) {
        for (let i = 0; i < 24; i++) {
            const light = document.createElement('div');
            light.classList.add('port-light');

            if (Math.random() > 0.3) {
                light.style.opacity = 1;
                light.style.boxShadow = '0 0 2px #00ff00';

                if (Math.random() > 0.7) {
                    light.style.animation = `blink ${0.1 + Math.random() * 0.5}s infinite alternate`;
                }
            } else {
                light.style.opacity = 0.2;
            }
            switchUnit.appendChild(light);
        }
    }

    // Homelab page switch ports - UDM-PRO (8x 1GbE + 2x 10G SFP+)
    const udmProPorts = document.getElementById('udm-pro-ports');
    if (udmProPorts) {
        // Create 8x 1GbE RJ45 ports
        for (let i = 1; i <= 8; i++) {
            const portContainer = document.createElement('div');
            portContainer.classList.add('port-container');
            portContainer.title = `Port ${i} - 1GbE RJ45`;

            const port = document.createElement('div');
            port.classList.add('port', 'port-rj45', 'port-1g');

            const led = document.createElement('div');
            led.classList.add('port-led');

            const label = document.createElement('div');
            label.classList.add('port-label');
            label.innerHTML = `${i}<span class="port-speed">1G</span>`;

            // Random active state
            if (Math.random() > 0.3) {
                port.classList.add('active');
                led.classList.add('active');
                if (Math.random() > 0.7) {
                    const blinkSpeed = 0.3 + Math.random() * 0.5;
                    led.style.animation = `blink ${blinkSpeed}s infinite alternate`;
                }
            }

            portContainer.appendChild(port);
            portContainer.appendChild(led);
            portContainer.appendChild(label);
            udmProPorts.appendChild(portContainer);
        }

        // Create 2x 10G SFP+ ports
        for (let i = 1; i <= 2; i++) {
            const portContainer = document.createElement('div');
            portContainer.classList.add('port-container');
            portContainer.title = `SFP+ ${i} - 10GbE SFP+`;

            const port = document.createElement('div');
            port.classList.add('port', 'port-sfp', 'port-10g');

            const led = document.createElement('div');
            led.classList.add('port-led');

            const label = document.createElement('div');
            label.classList.add('port-label');
            label.innerHTML = `SFP${i}<span class="port-speed">10G</span>`;

            // Random active state
            if (Math.random() > 0.5) {
                port.classList.add('active');
                led.classList.add('active');
            }

            portContainer.appendChild(port);
            portContainer.appendChild(led);
            portContainer.appendChild(label);
            udmProPorts.appendChild(portContainer);
        }
    }

    // Enterprise Campus 24 PoE (8x 2.5GbE + 16x 10GbE + 2x 25G SFP28)
    const enterpriseSwitchPorts = document.getElementById('enterprise-switch-ports');
    if (enterpriseSwitchPorts) {
        // Create 8x 2.5GbE RJ45 ports
        for (let i = 1; i <= 8; i++) {
            const portContainer = document.createElement('div');
            portContainer.classList.add('port-container');
            portContainer.title = `Port ${i} - 2.5GbE RJ45`;

            const port = document.createElement('div');
            port.classList.add('port', 'port-rj45', 'port-2.5g');

            const led = document.createElement('div');
            led.classList.add('port-led');

            const label = document.createElement('div');
            label.classList.add('port-label');
            label.innerHTML = `${i}<span class="port-speed">2.5G</span>`;

            // Random active state
            if (Math.random() > 0.3) {
                port.classList.add('active');
                led.classList.add('active');
                if (Math.random() > 0.7) {
                    const blinkSpeed = 0.3 + Math.random() * 0.5;
                    led.style.animation = `blink ${blinkSpeed}s infinite alternate`;
                }
            }

            portContainer.appendChild(port);
            portContainer.appendChild(led);
            portContainer.appendChild(label);
            enterpriseSwitchPorts.appendChild(portContainer);
        }

        // Create 16x 10GbE RJ45 ports
        for (let i = 9; i <= 24; i++) {
            const portContainer = document.createElement('div');
            portContainer.classList.add('port-container');
            portContainer.title = `Port ${i} - 10GbE RJ45`;

            const port = document.createElement('div');
            port.classList.add('port', 'port-rj45', 'port-10g');

            const led = document.createElement('div');
            led.classList.add('port-led');

            const label = document.createElement('div');
            label.classList.add('port-label');
            label.innerHTML = `${i}<span class="port-speed">10G</span>`;

            // Random active state
            if (Math.random() > 0.3) {
                port.classList.add('active');
                led.classList.add('active');
                if (Math.random() > 0.7) {
                    const blinkSpeed = 0.3 + Math.random() * 0.5;
                    led.style.animation = `blink ${blinkSpeed}s infinite alternate`;
                }
            }

            portContainer.appendChild(port);
            portContainer.appendChild(led);
            portContainer.appendChild(label);
            enterpriseSwitchPorts.appendChild(portContainer);
        }

        // Create 2x 25G SFP28 ports
        for (let i = 1; i <= 2; i++) {
            const portContainer = document.createElement('div');
            portContainer.classList.add('port-container');
            portContainer.title = `SFP+ ${i} - 25GbE SFP28`;

            const port = document.createElement('div');
            port.classList.add('port', 'port-sfp', 'port-25g');

            const led = document.createElement('div');
            led.classList.add('port-led');

            const label = document.createElement('div');
            label.classList.add('port-label');
            label.innerHTML = `SFP${i}<span class="port-speed">25G</span>`;

            // Random active state
            if (Math.random() > 0.5) {
                port.classList.add('active');
                led.classList.add('active');
            }

            portContainer.appendChild(port);
            portContainer.appendChild(led);
            portContainer.appendChild(label);
            enterpriseSwitchPorts.appendChild(portContainer);
        }
    }
}

// ========================================
// CONTENT FETCHING (YOUTUBE & BLOG)
// ========================================

/**
 * Mock data to use when real API is not configured
 */
const MOCK_CONTENT = [
    {
        type: 'video',
        title: 'Ultimate Watercooled PC Build Guide',
        description: 'Building my dream workstation with custom hardline tubing and RGB everything.',
        thumbnail: 'custom_watercooled_pc_orange_purple_1764094798420.png',
        date: '1 Week Ago',
        meta: '42.1K Views',
        duration: '18:42',
        link: '#'
    },
    {
        type: 'blog',
        title: 'Why I Switched to Proxmox',
        description: 'Moving away from ESXi was the best decision for my homelab. Here\'s why.',
        icon: '📝',
        date: '2 Weeks Ago',
        meta: '8 min read',
        link: '#'
    },
    {
        type: 'video',
        title: 'Home Assistant Dashboard Tour 2025',
        description: 'A complete walkthrough of my smart home setup and custom automations.',
        thumbnail: 'home assistant .png',
        date: '2 Weeks Ago',
        meta: '28.5K Views',
        duration: '24:15',
        link: '#'
    },
    {
        type: 'blog',
        title: 'Building a NAS for Under $500',
        description: 'Budget-friendly TrueNAS build that doesn\'t compromise on performance.',
        icon: '🔧',
        date: '3 Weeks Ago',
        meta: '15 min read',
        link: '#'
    },
    {
        type: 'video',
        title: 'My Homelab Tour 2025',
        description: 'Full rack tour, network topology, and all the services I\'m running.',
        thumbnail: 'server_rack_close_up_1764094020059.png',
        date: '1 Month Ago',
        meta: '67.2K Views',
        duration: '32:08',
        link: '#'
    },
    {
        type: 'blog',
        title: 'Photography Workflow 2025',
        description: 'How I edit, organize, and backup thousands of photos efficiently.',
        icon: '🎨',
        date: '1 Month Ago',
        meta: '10 min read',
        link: '#'
    }
];

/**
 * Fetch content from APIs or use mock data
 */
/**
 * Fetch content from APIs or use mock data
 */
/**
 * Fetch content from APIs or use mock data
 */
async function fetchContent() {
    const contentGrid = document.getElementById('recent-content-grid');
    const homeFeed = document.getElementById('home-feed-container');
    const featuredContainer = document.getElementById('featured-content-container');

    if (!contentGrid && !homeFeed && !featuredContainer) return;

    // Show loading state
    const loadingHtml = `
        <div class="loading-indicator" style="grid-column: 1/-1; text-align: center; padding: 4rem; width: 100%;">
            <div class="spinner" style="margin-bottom: 1rem;">[ ... ]</div>
            <span class="mono">FETCHING DATA...</span>
        </div>
    `;

    if (contentGrid) contentGrid.innerHTML = loadingHtml;
    if (homeFeed) homeFeed.innerHTML = loadingHtml;
    if (featuredContainer) featuredContainer.innerHTML = loadingHtml;

    try {
        let content = [];

        if (CONFIG.USE_REAL_DATA) {
            console.log('Fetching real data...');

            // Fetch YouTube Data
            const ytPromise = fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=${CONFIG.YOUTUBE_CHANNEL_ID}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status !== 'ok') return [];
                    return data.items.map(item => ({
                        type: 'video',
                        title: item.title,
                        description: item.description ? item.description.substring(0, 100) + '...' : 'No description available.',
                        thumbnail: item.thumbnail,
                        date: new Date(item.pubDate).toLocaleDateString(),
                        timestamp: new Date(item.pubDate).getTime(),
                        meta: 'Watch Now',
                        duration: 'New',
                        link: item.link
                    }));
                })
                .catch(err => {
                    console.error('YouTube Fetch Error:', err);
                    return [];
                });

            // Fetch Blog Data
            const blogPromise = fetch(`https://api.rss2json.com/v1/api.json?rss_url=${CONFIG.BLOG_RSS_URL}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status !== 'ok') return [];
                    return data.items.map(item => {
                        // Attempt to find an image
                        let imageUrl = item.thumbnail;
                        if (!imageUrl && item.enclosure && item.enclosure.link) {
                            imageUrl = item.enclosure.link;
                        }
                        if (!imageUrl && item.description) {
                            const imgMatch = item.description.match(/<img[^>]+src="([^">]+)"/);
                            if (imgMatch) {
                                imageUrl = imgMatch[1];
                            }
                        }

                        return {
                            type: 'blog',
                            title: item.title,
                            description: item.description ? item.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'Read more...',
                            thumbnail: imageUrl,
                            icon: '📝',
                            date: new Date(item.pubDate).toLocaleDateString(),
                            timestamp: new Date(item.pubDate).getTime(),
                            meta: 'Read Post',
                            link: item.link
                        };
                    });
                })
                .catch(err => {
                    console.error('Blog Fetch Error:', err);
                    return [];
                });

            const [ytItems, blogItems] = await Promise.all([ytPromise, blogPromise]);
            content = [...ytItems, ...blogItems].sort((a, b) => b.timestamp - a.timestamp);

            if (content.length === 0) {
                console.warn('No content fetched, falling back to mock data.');
                content = MOCK_CONTENT;
            }

        } else {
            await new Promise(resolve => setTimeout(resolve, 800));
            content = MOCK_CONTENT;
        }

        // Render Featured Content (Content Page)
        let gridContent = content;
        if (featuredContainer && content.length > 0) {
            renderFeatured(content[0], featuredContainer);
            // Remove the featured item from the grid list so it's not duplicated
            gridContent = content.slice(1);
        }

        // Render to Content Page Grid (Remaining items)
        if (contentGrid) {
            renderContent(gridContent, contentGrid, 'grid');
        }

        // Render to Home Page Feed (Top 2 items only)
        if (homeFeed) {
            renderContent(content.slice(0, 2), homeFeed, 'feed');
        }

    } catch (error) {
        console.error('Error fetching content:', error);
        const errorHtml = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; color: #ff5f56; width: 100%;">
                <span class="mono">ERROR: COULD NOT LOAD CONTENT</span>
            </div>
        `;
        if (contentGrid) contentGrid.innerHTML = errorHtml;
        if (homeFeed) homeFeed.innerHTML = errorHtml;
        if (featuredContainer) featuredContainer.innerHTML = errorHtml;
    }
}

/**
 * Render featured content card
 */
function renderFeatured(item, container) {
    container.innerHTML = '';

    const card = document.createElement('div');
    card.className = 'featured-card gradient-border fade-in';
    card.style.cursor = 'pointer';
    card.onclick = () => window.open(item.link, '_blank');

    let thumbnailHtml = '';

    if (item.thumbnail) {
        const playOverlay = item.type === 'video' ? `
            <div class="play-overlay">
                <div class="play-icon">▶</div>
            </div>` : '';

        const badgeClass = item.type === 'video' ? 'video' : 'blog';
        const badgeText = item.type.toUpperCase();
        const badgeStyle = item.type === 'blog' ? 'style="background: var(--accent-purple);"' : '';

        thumbnailHtml = `
            <div class="featured-thumbnail">
                <img src="${item.thumbnail}" alt="${item.title}">
                ${playOverlay}
                <span class="content-badge ${badgeClass}" ${badgeStyle}>${badgeText}</span>
            </div>
        `;
    } else {
        thumbnailHtml = `
            <div class="featured-thumbnail" style="display: flex; align-items: center; justify-content: center; background: #222;">
                <span style="font-size: 5rem;">${item.icon}</span>
                <span class="content-badge blog" style="background: var(--accent-purple);">BLOG</span>
            </div>
        `;
    }

    card.innerHTML = `
        ${thumbnailHtml}
        <div class="featured-info">
            <span class="category-tag mono">${item.type.toUpperCase()}</span>
            <h2>${item.title}</h2>
            <p class="description">${item.description}</p>
            <div class="meta-info">
                <span class="mono">${item.date}</span>
                <span class="separator">•</span>
                <span class="mono">${item.meta}</span>
            </div>
        </div>
    `;

    container.appendChild(card);

    // Observer for animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    observer.observe(card);
}

/**
 * Render content cards to the container
 * @param {Array} items - List of content items
 * @param {HTMLElement} container - Target container
 * @param {string} layout - 'grid' or 'feed'
 */
function renderContent(items, container, layout) {
    container.innerHTML = ''; // Clear loading

    items.forEach(item => {
        const card = document.createElement('div');

        // Make clickable
        card.style.cursor = 'pointer';
        card.onclick = () => window.open(item.link, '_blank');

        if (layout === 'grid') {
            // Content Page Layout (Vertical Cards)
            card.className = `content-card ${item.type}-card fade-in card-3d`;

            let thumbnailHtml = '';

            if (item.thumbnail) {
                const playBtn = item.type === 'video' ? '<div class="play-btn-small">▶</div>' : '';
                const duration = item.type === 'video' ? `<span class="duration mono">${item.duration}</span>` : '';

                thumbnailHtml = `
                    <div class="card-thumbnail">
                        <img src="${item.thumbnail}" alt="${item.title}">
                        ${playBtn}
                        ${duration}
                    </div>
                `;
            } else {
                thumbnailHtml = `
                    <div class="card-thumbnail blog-thumb">
                        <div class="blog-icon">${item.icon}</div>
                    </div>
                `;
            }

            const tagColorClass = item.type === 'blog' ? 'accent-purple' : '';

            card.innerHTML = `
                ${thumbnailHtml}
                <div class="card-content">
                    <span class="category-tag mono small ${tagColorClass}">${item.type.toUpperCase()}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <div class="card-meta mono">
                        <span>${item.date}</span>
                        <span>•</span>
                        <span>${item.meta}</span>
                    </div>
                </div>
            `;

        } else if (layout === 'feed') {
            // Home Page Layout (Horizontal/Compact Cards)
            card.className = `video-card fade-in`; // Reusing video-card class for styling

            let thumbnailHtml = '';

            if (item.thumbnail) {
                const playBtn = item.type === 'video' ? '<div class="play-btn">▶</div>' : '';

                thumbnailHtml = `
                    <div class="thumbnail">
                        <img src="${item.thumbnail}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                        ${playBtn}
                    </div>
                `;
            } else {
                thumbnailHtml = `
                    <div class="thumbnail" style="background: #222; display: flex; align-items: center; justify-content: center;">
                        <span style="font-size: 2rem;">${item.icon}</span>
                    </div>
                `;
            }

            card.innerHTML = `
                ${thumbnailHtml}
                <div class="video-info">
                    <h3>${item.title}</h3>
                    <span class="meta mono">${item.date} • ${item.meta}</span>
                </div>
            `;
        }

        container.appendChild(card);

        // Observer for animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        observer.observe(card);
    });
}


// ========================================
// PERFORMANCE MONITORING
// ========================================

/**
 * Log performance metrics (optional)
 */
function logPerformance() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page Load Time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
        });
    }
}

/**
 * Render Workbench Projects
 */
function renderWorkbench() {
    const container = document.getElementById('workbench-grid');
    if (!container) return;

    container.innerHTML = '';

    WORKBENCH_DATA.forEach(project => {
        const card = document.createElement('div');
        card.className = `project-card ${project.featured ? 'featured active-build' : ''}`;

        // Status Badge
        const statusHtml = `
            <div class="card-status ${project.status === 'COMPLETED' ? 'completed' : (project.status === 'PLANNED' ? 'planned' : '')}">
                <span class="status-dot ${project.statusClass}"></span>
                <span class="mono">${project.status}</span>
            </div>
        `;

        // Image/Icon Area
        const imageHtml = `
            <div class="card-image placeholder-${project.icon.replace('fa-', '')}">
                <i class="fas ${project.icon}"></i>
            </div>
        `;

        // Header (Tag + Completion if exists)
        let headerHtml = `<span class="tag mono">${project.tag}</span>`;
        if (project.completion) {
            headerHtml = `
                <div class="card-header">
                    <span class="tag mono">${project.tag}</span>
                    <span class="completion mono">${project.completion}</span>
                </div>
            `;
        }

        // Progress Bar (if completion exists)
        let progressHtml = '';
        if (project.completion) {
            const width = project.completion.replace('%', '');
            progressHtml = `
                <div class="build-progress">
                    <div class="progress-bar">
                        <div class="fill" style="width: ${width}%"></div>
                    </div>
                </div>
            `;
        }

        // Tech Stack
        const techStackHtml = `
            <div class="tech-stack">
                ${project.techStack.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
        `;

        // Link
        const linkHtml = project.link ? `<a href="${project.link}" class="btn-link">${project.linkText}</a>` : '';

        card.innerHTML = `
            ${statusHtml}
            ${imageHtml}
            <div class="card-content">
                ${headerHtml}
                <h3>${project.title}</h3>
                ${progressHtml}
                <p>${project.description}</p>
                ${techStackHtml}
                ${linkHtml}
            </div>
        `;

        container.appendChild(card);
    });
}

// ========================================
// INITIALIZATION
// ========================================

// ========================================
// CORE FUNCTIONS
// ========================================

/**
 * Initialize Typing Effect
 * Migrated from main.js
 */
function initTypingEffect() {
    const textToType = "Exploring the digital frontier.";
    const typingElement = document.getElementById('typing-text');

    if (!typingElement) return;

    // Clear existing text first
    typingElement.textContent = '';

    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            typingElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            requestAnimationFrame(() => setTimeout(type, 100));
        }
    }

    // Start after initial "boot" sequence
    setTimeout(type, 1500);
}

/**
 * Initialize Switch Port Lights
 * Migrated from main.js and optimized
 */
function initSwitchPorts() {
    // 1. Generic Switch Units (e.g. in Index/Gear pages)
    const switchUnits = document.querySelectorAll('.switch .port-lights');
    if (switchUnits.length > 0) {
        switchUnits.forEach(switchUnit => {
            // Check if already populated to prevent duplicates
            if (switchUnit.hasChildNodes()) return;

            for (let i = 0; i < 24; i++) {
                const light = document.createElement('div');
                light.classList.add('port-light');

                // Randomly active ports
                if (Math.random() > 0.3) {
                    light.style.opacity = 1;
                    light.style.boxShadow = '0 0 2px #00ff00';
                    // Random blink animation using CSS class if possible, else inline
                    if (Math.random() > 0.7) {
                        light.style.setProperty('--blink-speed', (0.1 + Math.random() * 0.5) + 's');
                        light.style.animation = `blink var(--blink-speed) infinite alternate`;
                    }
                } else {
                    light.style.opacity = 0.2;
                }
                switchUnit.appendChild(light);
            }
        });
    }

    // 2. Homelab Specific Ports
    const switchPorts = document.getElementById('switch-ports');
    if (switchPorts && !switchPorts.hasChildNodes()) {
        for (let i = 0; i < 24; i++) {
            const port = document.createElement('div');
            port.classList.add('port');
            // Randomly activate some ports
            if (Math.random() > 0.3) {
                port.classList.add('active');
                if (Math.random() > 0.7) {
                    const blinkSpeed = 0.1 + Math.random() * 0.5;
                    port.style.animation = `blink ${blinkSpeed}s infinite alternate`;
                }
            }
            switchPorts.appendChild(port);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Logic
    initTypingEffect();
    initSwitchPorts();

    // Smooth Scroll (Migrated from main.js)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ... existing init code ...
    // Core features
    initLoadingScreen();
    enhancedTypingEffect();
    generateSwitchPorts();
    initSmoothScroll();

    // Enhanced features
    initScrollAnimations();
    createParticles();
    initScrollToTop();
    init3DCards();
    initKeyboardNav();

    // Interactive features
    initInteractiveRack();
    initNetworkFlow();
    animateStats();

    // Content Loading
    fetchContent();
    renderWorkbench(); // Render Workbench Projects

    // Modal and Search
    initSearch();

    // Server unit click handlers
    document.querySelectorAll('[data-server]').forEach(unit => {
        unit.addEventListener('click', () => {
            renderServerModal(unit.dataset.server);
        });
    });

    // Network node click handlers
    document.querySelectorAll('[data-node]').forEach(node => {
        node.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent event bubbling
            renderNodeModal(node.dataset.node);
        });
    });

    // Service click handlers
    document.querySelectorAll('[data-service]').forEach(card => {
        card.addEventListener('click', () => {
            renderServiceModal(card.dataset.service);
        });
    });

    // Cybersecurity Project click handlers
    document.querySelectorAll('[data-project]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const projectId = card.dataset.project;
            console.log('Project clicked:', projectId);
            renderCyberProjectModal(projectId);
        });
    });

    // Cybersecurity Doc click handlers
    document.querySelectorAll('[data-doc]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const docId = card.dataset.doc;
            console.log('Doc clicked:', docId);
            renderCyberDocModal(docId);
        });
    });

    // Cybersecurity Framework click handlers
    document.querySelectorAll('[data-framework]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const frameworkId = card.dataset.framework;
            console.log('Framework clicked:', frameworkId);
            renderCyberFrameworkModal(frameworkId);
        });
    });

    // Cybersecurity Tool click handlers
    document.querySelectorAll('[data-tool]').forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            const toolId = card.dataset.tool;
            console.log('Tool clicked:', toolId);
            renderCyberToolModal(toolId);
        });
    });

    // Modal close handlers
    const modalCloseBtn = document.querySelector('.modal-close-btn');
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    const modal = document.getElementById('detail-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Performance
    logPerformance();

    console.log('%c[ZAKPT] %cWebsite Enhanced! 🚀', 'color: #FF9900; font-weight: bold', 'color: #9D00FF');
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        isInViewport,
        initScrollAnimations
    };
}
