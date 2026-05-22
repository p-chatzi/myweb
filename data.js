const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

window.caseStudiesData = {
    'projet-0': {
        title: 'Vulnerability Scanner as a Service',
        image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem
    },
    'projet-1': {
        title: 'Conception d\'Infrastructures Résilientes, Sécurisées et Auditées',
        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem
    },
    'projet-2': {
        title: 'Laboratoire SOC & Analyse de Télémétrie',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem
    },
    'projet-3': {
        title: 'Maintenance Systèmes & Hardware',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem
    },
    'projet-4': {
        title: 'Moteur de Jeu d\'Échecs en Langage C',
        image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem
    },
    'tech-0': {
        title: 'Réseau & Sécurité Applicative',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem,
        tags: ['Cisco Secure Firewall', 'FortiGate', 'OPNsense', 'Azure WAF', 'WireGuard', 'ACLs'],
        tagsDesc: "Ces technologies constituent le socle de mes architectures réseaux sécurisées. Elles me permettent de segmenter rigoureusement les flux, de filtrer les menaces en temps réel et d'assurer des communications chiffrées de bout en bout pour garantir l'intégrité et la confidentialité des données."
    },
    'tech-1': {
        title: 'Identity & Access Management',
        image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem,
        tags: ['Microsoft AD', 'Azure Entra ID', 'Authentik', 'Keycloak', 'FreeRADIUS', 'Samba4'],
        tagsDesc: "L'identité est le nouveau périmètre de sécurité. Avec ces outils, je conçois et déploie des systèmes d'authentification forte (MFA, SSO), centralisant la gestion des accès et assurant que seuls les utilisateurs et machines légitimes accèdent aux ressources critiques de l'organisation."
    },
    'tech-2': {
        title: 'Systèmes & Virtualisation',
        image: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem,
        tags: ['Linux', 'Windows Server', 'VMware', 'Docker', 'Kubernetes', 'Proxmox', 'ESXI'],
        tagsDesc: "L'administration système et la virtualisation m'offrent la capacité de concevoir des environnements hautement disponibles, scalables et isolés. Des conteneurs légers aux hyperviseurs robustes, j'optimise l'utilisation des ressources matérielles tout en minimisant la surface d'attaque."
    },
    'tech-3': {
        title: 'Cybersécurité (Detection & Response)',
        image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem,
        tags: ['Elastic Defend', 'Wazuh', 'Splunk', 'Suricata', 'Cisco Snort', 'MITRE ATT&CK'],
        tagsDesc: "Face à des menaces constantes, la visibilité est primordiale. J'implémente des solutions SIEM et EDR/XDR pour ingérer, corréler et analyser la télémétrie en temps réel. En m'appuyant sur des frameworks comme MITRE ATT&CK, je détecte les comportements malveillants et automatise la réponse à incident."
    },
    'tech-4': {
        title: 'Durcissement & Conformité (Hardening)',
        image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem,
        tags: ['CIS Benchmarks', 'GPOs', 'AppArmor', 'SELinux', 'OpenSCAP', 'Guides de l\'ANSSI'],
        tagsDesc: "La sécurité par défaut (secure by default) est essentielle. Je mets en application des politiques de durcissement rigoureuses via des GPOs ou des modules de sécurité kernel (SELinux/AppArmor) et j'audite la conformité globale des systèmes en m'alignant sur les standards de l'industrie et de l'ANSSI."
    },
    'tech-5': {
        title: 'Programmation & Scripting',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=3840&q=80',
        problematic: lorem, methodology: lorem, obstacles: lorem, solutions: lorem,
        tags: ['Bash', 'Python', 'Go', 'C', 'PowerShell', 'JavaScript'],
        tagsDesc: "L'automatisation est la clé d'une sécurité efficace et évolutive. Ces langages me permettent de développer des scripts pour automatiser des tâches d'administration redondantes, concevoir des outils d'audit sur mesure et scripter des déploiements d'infrastructures de manière fiable et reproductible."
    }
};
